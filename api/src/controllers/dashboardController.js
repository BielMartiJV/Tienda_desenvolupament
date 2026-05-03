// src/controllers/dashboardController.js
const Usuari = require('../models/Usuari');
const Comanda = require('../models/Comanda');
const Espada = require('../models/Espada');

// ─── GET /api/dashboard/user ─────────────────────────────────────────────────
// Accés: rol 'client' (usuari autenticat)
const getUserDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1. Dades del perfil (sense password ni refreshToken)
    const usuari = await Usuari.findById(userId).select('-password -refreshToken');
    if (!usuari) {
      return res.status(404).json({ message: 'Usuari no trobat' });
    }

    // 2. Historial de comandes de l'usuari (populem les espases)
    const comandes = await Comanda.find({ usuariId: userId })
      .populate('espases.espasaId', 'nom colorFulla preu')
      .sort({ dataComanda: -1 });

    // 3. Total gastat (suma de comandes en estat paid/shipped/delivered)
    const totalGastat = comandes
      .filter(c => ['paid', 'processing', 'shipped', 'delivered'].includes(c.estat))
      .reduce((acc, c) => acc + c.total, 0);

    // 4. Últimes espases comprades (productes vistos/comprats recentment)
    const espasesComprades = [];
    const seenIds = new Set();
    for (const comanda of comandes) {
      for (const item of comanda.espases) {
        if (item.espasaId && !seenIds.has(item.espasaId._id?.toString())) {
          seenIds.add(item.espasaId._id?.toString());
          espasesComprades.push(item.espasaId);
        }
      }
      if (espasesComprades.length >= 5) break;
    }

    res.status(200).json({
      status: 'success',
      data: {
        perfil: {
          id: usuari._id,
          nom: usuari.nom,
          cognom: usuari.cognom,
          email: usuari.email,
          role: usuari.role,
          dataRegistre: usuari.dataRegistre,
          actiu: usuari.actiu,
        },
        comandes,
        totalGastat: parseFloat(totalGastat.toFixed(2)),
        espasesRecents: espasesComprades,
      }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// ─── GET /api/dashboard/admin ─────────────────────────────────────────────────
// Accés: rol 'admin'
const getAdminDashboard = async (req, res) => {
  try {
    // 1. KPIs generals
    const totalUsuaris = await Usuari.countDocuments();
    const totalComandes = await Comanda.countDocuments();
    const totalProductes = await Espada.countDocuments();

    // 2. Ingressos totals (comandes pagades)
    const ingressosResult = await Comanda.aggregate([
      { $match: { estat: { $in: ['paid', 'processing', 'shipped', 'delivered'] } } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);
    const totalIngressos = ingressosResult[0]?.total || 0;

    // 3. Vendes per mes (últims 6 mesos) per al gràfic
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1);
    sixMonthsAgo.setHours(0, 0, 0, 0);

    const vendesPerMes = await Comanda.aggregate([
      {
        $match: {
          dataComanda: { $gte: sixMonthsAgo },
          estat: { $in: ['paid', 'processing', 'shipped', 'delivered'] }
        }
      },
      {
        $group: {
          _id: {
            any: { $year: '$dataComanda' },
            mes: { $month: '$dataComanda' }
          },
          totalMes: { $sum: '$total' },
          numComandes: { $sum: 1 }
        }
      },
      { $sort: { '_id.any': 1, '_id.mes': 1 } }
    ]);

    // 4. Llista d'usuaris (sense dades sensibles)
    const usuaris = await Usuari.find()
      .select('-password -refreshToken')
      .sort({ dataRegistre: -1 });

    // 5. Comandes recents (últimes 10)
    const comandesRecents = await Comanda.find()
      .populate('usuariId', 'nom cognom email')
      .sort({ dataComanda: -1 })
      .limit(10);

    res.status(200).json({
      status: 'success',
      data: {
        kpis: {
          totalUsuaris,
          totalComandes,
          totalIngressos: parseFloat(totalIngressos.toFixed(2)),
          totalProductes,
        },
        vendesPerMes,
        usuaris,
        comandesRecents,
      }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// ─── PATCH /api/dashboard/admin/usuaris/:id/rol ──────────────────────────────
const canviarRolUsuari = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!['client', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Rol no vàlid. Valors permesos: client, admin' });
    }

    const usuari = await Usuari.findByIdAndUpdate(
      id,
      { role },
      { new: true, select: '-password -refreshToken' }
    );

    if (!usuari) {
      return res.status(404).json({ message: 'Usuari no trobat' });
    }

    res.status(200).json({ status: 'success', data: { usuari } });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// ─── DELETE /api/dashboard/admin/usuaris/:id ─────────────────────────────────
const eliminarUsuari = async (req, res) => {
  try {
    const { id } = req.params;

    // No es pot eliminar a si mateix
    if (req.user.id === id) {
      return res.status(400).json({ message: 'No pots eliminar el teu propi compte' });
    }

    const usuari = await Usuari.findByIdAndDelete(id);
    if (!usuari) {
      return res.status(404).json({ message: 'Usuari no trobat' });
    }

    res.status(200).json({ status: 'success', message: 'Usuari eliminat correctament' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

module.exports = { getUserDashboard, getAdminDashboard, canviarRolUsuari, eliminarUsuari };
