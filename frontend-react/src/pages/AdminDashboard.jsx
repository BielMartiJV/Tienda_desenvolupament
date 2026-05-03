// src/pages/AdminDashboard.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import StatsCard from '../components/dashboard/StatsCard';
import SalesChart from '../components/dashboard/SalesChart';

const API = 'http://127.0.0.1:3000';

const ESTAT_CONFIG = {
  pending:    { label: 'Pendent',    color: '#f59e0b' },
  paid:       { label: 'Pagat',      color: '#3b82f6' },
  processing: { label: 'Processant', color: '#8b5cf6' },
  shipped:    { label: 'Enviat',     color: '#06b6d4' },
  delivered:  { label: 'Entregat',   color: '#22c55e' },
  cancelled:  { label: 'Cancel·lat', color: '#ef4444' },
};

const EstatBadge = ({ estat }) => {
  const cfg = ESTAT_CONFIG[estat] || { label: estat, color: '#6b7280' };
  return (
    <span style={{
      background: `${cfg.color}15`, color: cfg.color,
      border: `1px solid ${cfg.color}44`,
      padding: '0.2rem 0.7rem', borderRadius: '999px',
      fontSize: '0.75rem', fontWeight: 700,
    }}>{cfg.label}</span>
  );
};

const ConfirmModal = ({ message, onConfirm, onCancel }) => (
  <div style={{
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
  }}>
    <div style={{
      background: '#111', border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '1rem', padding: '2rem', maxWidth: 400, width: '90%', textAlign: 'center',
    }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⚠️</div>
      <p style={{ color: '#e5e7eb', marginBottom: '1.5rem' }}>{message}</p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button onClick={onCancel} style={{
          padding: '0.6rem 1.5rem', background: 'rgba(255,255,255,0.07)',
          color: '#e5e7eb', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 600,
        }}>Cancel·lar</button>
        <button onClick={onConfirm} style={{
          padding: '0.6rem 1.5rem', background: '#ef4444',
          color: '#fff', border: 'none', borderRadius: '0.5rem',
          cursor: 'pointer', fontWeight: 700,
        }}>Confirmar</button>
      </div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const { token, refreshAccessToken, logout } = useAuth();
  const navigate = useNavigate();

  const [data, setData]           = useState(null);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [actionMsg, setActionMsg] = useState(null);
  const [confirm, setConfirm]     = useState(null); // { id, type }

  // ── Fetch amb refresh automàtic ──────────────────────────────────────────
  const apiFetch = async (url, options = {}) => {
    let res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...(options.headers || {}),
      },
    });

    if (res.status === 401) {
      const newToken = await refreshAccessToken();
      if (!newToken) { await logout(); navigate('/login'); return null; }
      res = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${newToken}`,
          ...(options.headers || {}),
        },
      });
    }
    if (res.status === 403) { navigate('/'); return null; }
    return res;
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await apiFetch(`${API}/api/dashboard/admin`);
      if (!res) return;
      if (!res.ok) { const e = await res.json(); throw new Error(e.message); }
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (token) loadData(); }, [token]);

  // ── Canviar rol ──────────────────────────────────────────────────────────
  const handleCanviarRol = async (id, currentRole) => {
    const newRole = currentRole === 'admin' ? 'client' : 'admin';
    const res = await apiFetch(`${API}/api/dashboard/admin/usuaris/${id}/rol`, {
      method: 'PATCH',
      body: JSON.stringify({ role: newRole }),
    });
    if (!res) return;
    if (res.ok) {
      setActionMsg(`✅ Rol canviat a "${newRole}" correctament`);
      loadData();
    } else {
      const e = await res.json();
      setActionMsg(`❌ ${e.message}`);
    }
    setTimeout(() => setActionMsg(null), 3000);
  };

  // ── Eliminar usuari ──────────────────────────────────────────────────────
  const handleEliminar = async (id) => {
    const res = await apiFetch(`${API}/api/dashboard/admin/usuaris/${id}`, { method: 'DELETE' });
    if (!res) return;
    if (res.ok) {
      setActionMsg('✅ Usuari eliminat correctament');
      loadData();
    } else {
      const e = await res.json();
      setActionMsg(`❌ ${e.message}`);
    }
    setConfirm(null);
    setTimeout(() => setActionMsg(null), 3000);
  };

  // ── Loading / Error ──────────────────────────────────────────────────────
  if (loading) return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: 48, height: 48, border: '3px solid rgba(168,85,247,0.2)',
          borderTopColor: '#a855f7', borderRadius: '50%',
          animation: 'spin 0.8s linear infinite', margin: '0 auto 1rem',
        }} />
        <p style={{ color: '#6b7280' }}>Carregant el dashboard d'admin...</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (error) return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        background: '#ef444415', border: '1px solid #ef444444',
        borderRadius: '1rem', padding: '2rem', textAlign: 'center', maxWidth: 400,
      }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⚠️</div>
        <h3 style={{ color: '#ef4444', marginBottom: '0.5rem' }}>Error</h3>
        <p style={{ color: '#9ca3af' }}>{error}</p>
        <button onClick={() => window.location.reload()} style={{
          marginTop: '1rem', padding: '0.5rem 1.5rem',
          background: '#ef4444', color: '#fff', border: 'none',
          borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 600,
        }}>Reintentar</button>
      </div>
    </div>
  );

  const { kpis, vendesPerMes, usuaris, comandesRecents } = data || {};

  const tabs = [
    { id: 'overview', label: '📊 Resum' },
    { id: 'users',    label: '👥 Usuaris' },
    { id: 'orders',   label: '📦 Comandes' },
  ];

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1.5rem' }}>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        .db-admin-card { animation: fadeUp 0.4s ease both; }
        .tab-btn { transition: all 0.2s; }
        .tab-btn:hover { background: rgba(168,85,247,0.1) !important; }
        .action-row:hover td { background: rgba(255,255,255,0.02) !important; }
      `}</style>

      {/* Modal de confirmació */}
      {confirm && (
        <ConfirmModal
          message={`Estàs segur que vols eliminar l'usuari? Aquesta acció no es pot desfer.`}
          onConfirm={() => handleEliminar(confirm.id)}
          onCancel={() => setConfirm(null)}
        />
      )}

      {/* Toast */}
      {actionMsg && (
        <div style={{
          position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 999,
          background: '#111', border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '0.75rem', padding: '1rem 1.5rem',
          color: '#e5e7eb', fontWeight: 600, boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          animation: 'fadeUp 0.3s ease',
        }}>
          {actionMsg}
        </div>
      )}

      {/* Header */}
      <div className="db-admin-card" style={{ marginBottom: '2rem' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(168,85,247,0.1) 0%, rgba(168,85,247,0.03) 100%)',
          border: '1px solid rgba(168,85,247,0.2)', borderRadius: '1.25rem',
          padding: '2rem', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 2,
            background: 'linear-gradient(90deg, transparent, #a855f7, transparent)',
          }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%',
              background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.5rem', flexShrink: 0,
            }}>⚙️</div>
            <div>
              <h1 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>
                Panel d'Administració
              </h1>
              <p style={{ color: '#9ca3af', margin: '0.25rem 0 0', fontSize: '0.9rem' }}>
                Vista global del sistema · {new Date().toLocaleDateString('ca-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="db-admin-card" style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem', marginBottom: '2rem', animationDelay: '0.05s',
      }}>
        <StatsCard icon="👥" label="Usuaris totals"   value={kpis?.totalUsuaris ?? 0}   color="#3b82f6" sub="registrats" />
        <StatsCard icon="📦" label="Comandes totals"  value={kpis?.totalComandes ?? 0}  color="#a855f7" sub="realitzades" />
        <StatsCard icon="💶" label="Ingressos totals" value={`€${kpis?.totalIngressos?.toFixed(2) ?? '0.00'}`} color="#22c55e" sub="pagaments confirmats" />
        <StatsCard icon="⚔️" label="Productes"        value={kpis?.totalProductes ?? 0} color="#ffe919" sub="al catàleg" />
      </div>

      {/* Tabs */}
      <div className="db-admin-card" style={{ marginBottom: '1.5rem', animationDelay: '0.1s' }}>
        <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(255,255,255,0.03)', padding: '0.4rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.07)' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              className="tab-btn"
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1, padding: '0.6rem 1rem', borderRadius: '0.5rem', border: 'none',
                cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem',
                background: activeTab === tab.id ? 'rgba(168,85,247,0.2)' : 'transparent',
                color: activeTab === tab.id ? '#a855f7' : '#9ca3af',
                transition: 'all 0.2s',
              }}
            >{tab.label}</button>
          ))}
        </div>
      </div>

      {/* ── Tab: Overview ────────────────────────────────────────────────── */}
      {activeTab === 'overview' && (
        <div className="db-admin-card" style={{ animationDelay: '0.15s' }}>
          <SalesChart vendesPerMes={vendesPerMes} />
        </div>
      )}

      {/* ── Tab: Usuaris ─────────────────────────────────────────────────── */}
      {activeTab === 'users' && (
        <div className="db-admin-card" style={{
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '1rem', padding: '1.5rem', animationDelay: '0.15s',
        }}>
          <h2 style={{ color: '#fff', fontWeight: 700, fontSize: '1rem', margin: '0 0 1rem' }}>
            👥 Gestió d'Usuaris ({usuaris?.length ?? 0})
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Nom', 'Email', 'Rol', 'Registre', 'Estat', 'Accions'].map(h => (
                    <th key={h} style={{
                      color: '#6b7280', fontSize: '0.75rem', fontWeight: 700,
                      textTransform: 'uppercase', letterSpacing: '0.08em',
                      padding: '0.75rem 1rem', textAlign: 'left',
                      borderBottom: '1px solid rgba(255,255,255,0.07)',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(usuaris || []).map((u, idx) => (
                  <tr key={u._id} className="action-row" style={{
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    animation: `fadeUp 0.3s ease both`,
                    animationDelay: `${0.04 * idx}s`,
                  }}>
                    <td style={{ padding: '0.85rem 1rem', color: '#e5e7eb', fontWeight: 600 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <div style={{
                          width: 30, height: 30, borderRadius: '50%',
                          background: u.role === 'admin' ? 'linear-gradient(135deg,#a855f7,#7c3aed)' : 'linear-gradient(135deg,#3b82f6,#1d4ed8)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '0.8rem', fontWeight: 800, color: '#fff', flexShrink: 0,
                        }}>
                          {u.nom?.[0]?.toUpperCase()}
                        </div>
                        {u.nom} {u.cognom}
                      </div>
                    </td>
                    <td style={{ padding: '0.85rem 1rem', color: '#9ca3af', fontSize: '0.85rem' }}>{u.email}</td>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <span style={{
                        background: u.role === 'admin' ? 'rgba(168,85,247,0.15)' : 'rgba(59,130,246,0.15)',
                        color: u.role === 'admin' ? '#a855f7' : '#3b82f6',
                        border: `1px solid ${u.role === 'admin' ? '#a855f744' : '#3b82f644'}`,
                        padding: '0.2rem 0.7rem', borderRadius: '999px',
                        fontSize: '0.75rem', fontWeight: 700,
                      }}>
                        {u.role === 'admin' ? '⚙️ Admin' : '👤 Client'}
                      </span>
                    </td>
                    <td style={{ padding: '0.85rem 1rem', color: '#6b7280', fontSize: '0.8rem' }}>
                      {new Date(u.dataRegistre).toLocaleDateString('ca-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <span style={{
                        background: u.actiu ? '#22c55e15' : '#ef444415',
                        color: u.actiu ? '#22c55e' : '#ef4444',
                        border: `1px solid ${u.actiu ? '#22c55e44' : '#ef444444'}`,
                        padding: '0.2rem 0.7rem', borderRadius: '999px',
                        fontSize: '0.75rem', fontWeight: 700,
                      }}>
                        {u.actiu ? '● Actiu' : '● Inactiu'}
                      </span>
                    </td>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => handleCanviarRol(u._id, u.role)}
                          title={`Canviar a ${u.role === 'admin' ? 'client' : 'admin'}`}
                          style={{
                            padding: '0.35rem 0.75rem', borderRadius: '0.4rem', border: 'none',
                            background: 'rgba(168,85,247,0.15)', color: '#a855f7',
                            cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600,
                            transition: 'background 0.2s',
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(168,85,247,0.3)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'rgba(168,85,247,0.15)'}
                        >
                          🔄 Rol
                        </button>
                        <button
                          onClick={() => setConfirm({ id: u._id })}
                          style={{
                            padding: '0.35rem 0.75rem', borderRadius: '0.4rem', border: 'none',
                            background: 'rgba(239,68,68,0.15)', color: '#ef4444',
                            cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600,
                            transition: 'background 0.2s',
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.3)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.15)'}
                        >
                          🗑️ Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Tab: Comandes ────────────────────────────────────────────────── */}
      {activeTab === 'orders' && (
        <div className="db-admin-card" style={{
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '1rem', padding: '1.5rem', animationDelay: '0.15s',
        }}>
          <h2 style={{ color: '#fff', fontWeight: 700, fontSize: '1rem', margin: '0 0 1rem' }}>
            📦 Comandes Recents ({comandesRecents?.length ?? 0})
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['ID', 'Client', 'Data', 'Articles', 'Total', 'Estat'].map(h => (
                    <th key={h} style={{
                      color: '#6b7280', fontSize: '0.75rem', fontWeight: 700,
                      textTransform: 'uppercase', letterSpacing: '0.08em',
                      padding: '0.75rem 1rem', textAlign: 'left',
                      borderBottom: '1px solid rgba(255,255,255,0.07)',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(comandesRecents || []).map((c, idx) => (
                  <tr key={c._id} className="action-row" style={{
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    animation: `fadeUp 0.3s ease both`,
                    animationDelay: `${0.04 * idx}s`,
                  }}>
                    <td style={{ padding: '1rem', color: '#9ca3af', fontSize: '0.8rem', fontFamily: 'monospace' }}>
                      #{c._id.slice(-8).toUpperCase()}
                    </td>
                    <td style={{ padding: '1rem', color: '#e5e7eb', fontSize: '0.85rem' }}>
                      {c.usuariId ? `${c.usuariId.nom} ${c.usuariId.cognom}` : '—'}
                      {c.usuariId?.email && (
                        <div style={{ color: '#6b7280', fontSize: '0.75rem' }}>{c.usuariId.email}</div>
                      )}
                    </td>
                    <td style={{ padding: '1rem', color: '#d1d5db', fontSize: '0.85rem' }}>
                      {new Date(c.dataComanda).toLocaleDateString('ca-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td style={{ padding: '1rem', color: '#d1d5db', fontSize: '0.85rem' }}>
                      {c.espases?.length ?? 0}
                    </td>
                    <td style={{ padding: '1rem', color: '#ffe919', fontWeight: 700 }}>
                      €{c.total?.toFixed(2)}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <EstatBadge estat={c.estat} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
