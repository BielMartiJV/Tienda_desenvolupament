// src/pages/UserDashboard.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const API = 'http://127.0.0.1:3000';

// Mapa d'estats amb colors i etiquetes en català
const ESTAT_CONFIG = {
  pending:    { label: 'Pendent',    color: '#f59e0b', bg: '#f59e0b15' },
  paid:       { label: 'Pagat',      color: '#3b82f6', bg: '#3b82f615' },
  processing: { label: 'Processant', color: '#8b5cf6', bg: '#8b5cf615' },
  shipped:    { label: 'Enviat',     color: '#06b6d4', bg: '#06b6d415' },
  delivered:  { label: 'Entregat',   color: '#22c55e', bg: '#22c55e15' },
  cancelled:  { label: 'Cancel·lat', color: '#ef4444', bg: '#ef444415' },
};

const EstatBadge = ({ estat }) => {
  const cfg = ESTAT_CONFIG[estat] || { label: estat, color: '#6b7280', bg: '#6b728015' };
  return (
    <span style={{
      background: cfg.bg, color: cfg.color,
      border: `1px solid ${cfg.color}44`,
      padding: '0.2rem 0.7rem', borderRadius: '999px',
      fontSize: '0.75rem', fontWeight: 700,
    }}>
      {cfg.label}
    </span>
  );
};

const UserDashboard = () => {
  const { user, token, refreshAccessToken, logout } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch amb gestió de 401 (token expirat → intent de refresh)
  const fetchDashboard = async (accessToken) => {
    const res = await fetch(`${API}/api/dashboard/user`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (res.status === 401) {
      // Intentem refrescar el token
      const newToken = await refreshAccessToken();
      if (!newToken) {
        await logout();
        navigate('/login');
        return;
      }
      // Reintent amb el nou token
      const retry = await fetch(`${API}/api/dashboard/user`, {
        headers: { Authorization: `Bearer ${newToken}` },
      });
      if (!retry.ok) {
        const err = await retry.json();
        throw new Error(err.message || 'Error al carregar el dashboard');
      }
      return retry.json();
    }

    if (res.status === 403) {
      navigate('/');
      return;
    }

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Error al carregar el dashboard');
    }
    return res.json();
  };

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    fetchDashboard(token)
      .then(json => {
        if (json) setData(json.data);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  // ── Loading ──────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 48, height: 48, border: '3px solid #ffe91933',
            borderTopColor: '#ffe919', borderRadius: '50%',
            animation: 'spin 0.8s linear infinite', margin: '0 auto 1rem',
          }} />
          <p style={{ color: '#6b7280' }}>Carregant el teu dashboard...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // ── Error ────────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          background: '#ef444415', border: '1px solid #ef444444',
          borderRadius: '1rem', padding: '2rem', textAlign: 'center', maxWidth: 400,
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⚠️</div>
          <h3 style={{ color: '#ef4444', marginBottom: '0.5rem' }}>Error</h3>
          <p style={{ color: '#9ca3af' }}>{error}</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '1rem', padding: '0.5rem 1.5rem',
              background: '#ef4444', color: '#fff', border: 'none',
              borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 600,
            }}
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  const { perfil, comandes, totalGastat, espasesRecents } = data || {};

  // ── Dashboard ─────────────────────────────────────────────────────────────
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1.5rem' }}>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        .db-card { animation: fadeUp 0.4s ease both; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {/* Header */}
      <div className="db-card" style={{ marginBottom: '2rem' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(255,233,25,0.08) 0%, rgba(255,233,25,0.02) 100%)',
          border: '1px solid rgba(255,233,25,0.15)', borderRadius: '1.25rem',
          padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem',
        }}>
          {/* Avatar */}
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: 'linear-gradient(135deg, #ffe919, #f59e0b)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.75rem', fontWeight: 900, color: '#000', flexShrink: 0,
          }}>
            {perfil?.nom?.[0]?.toUpperCase() || '?'}
          </div>
          <div>
            <h1 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>
              Hola, {perfil?.nom} {perfil?.cognom} 👋
            </h1>
            <p style={{ color: '#9ca3af', margin: '0.25rem 0 0', fontSize: '0.9rem' }}>
              {perfil?.email} · Membre des del{' '}
              {perfil?.dataRegistre
                ? new Date(perfil.dataRegistre).toLocaleDateString('ca-ES', { year: 'numeric', month: 'long', day: 'numeric' })
                : '—'}
            </p>
          </div>
          <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
            <div style={{ color: '#ffe919', fontSize: '2rem', fontWeight: 900 }}>
              €{totalGastat?.toFixed(2) ?? '0.00'}
            </div>
            <div style={{ color: '#6b7280', fontSize: '0.8rem' }}>Total gastat</div>
          </div>
        </div>
      </div>

      {/* KPI pills */}
      <div className="db-card" style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '1rem', marginBottom: '2rem', animationDelay: '0.05s',
      }}>
        {[
          { icon: '🛒', label: 'Comandes totals', value: comandes?.length ?? 0, color: '#3b82f6' },
          { icon: '✅', label: 'Entregades', value: comandes?.filter(c => c.estat === 'delivered').length ?? 0, color: '#22c55e' },
          { icon: '🚚', label: 'En curs', value: comandes?.filter(c => ['paid','processing','shipped'].includes(c.estat)).length ?? 0, color: '#8b5cf6' },
          { icon: '⚡', label: 'Pendents', value: comandes?.filter(c => c.estat === 'pending').length ?? 0, color: '#f59e0b' },
        ].map(({ icon, label, value, color }) => (
          <div key={label} style={{
            background: 'rgba(255,255,255,0.03)', border: `1px solid ${color}22`,
            borderRadius: '1rem', padding: '1.25rem', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{icon}</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff' }}>{value}</div>
            <div style={{ fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Espases recents */}
      {espasesRecents?.length > 0 && (
        <div className="db-card" style={{ marginBottom: '2rem', animationDelay: '0.1s' }}>
          <div style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '1rem', padding: '1.5rem',
          }}>
            <h2 style={{ color: '#fff', fontWeight: 700, fontSize: '1rem', margin: '0 0 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              ⚔️ Productes comprats recentment
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {espasesRecents.map((espasa) => (
                <div key={espasa._id} style={{
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '0.75rem', padding: '0.75rem 1.25rem',
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                }}>
                  <span style={{ fontSize: '1.25rem' }}>⚔️</span>
                  <div>
                    <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>{espasa.nom}</div>
                    <div style={{ color: '#ffe919', fontSize: '0.8rem', fontWeight: 700 }}>€{espasa.preu?.toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Historial de comandes */}
      <div className="db-card" style={{ animationDelay: '0.15s' }}>
        <div style={{
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '1rem', padding: '1.5rem',
        }}>
          <h2 style={{ color: '#fff', fontWeight: 700, fontSize: '1rem', margin: '0 0 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            📦 Historial de Comandes
          </h2>

          {!comandes || comandes.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#6b7280' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛒</div>
              <p>Encara no has fet cap comanda.</p>
              <button
                onClick={() => navigate('/')}
                style={{
                  marginTop: '1rem', padding: '0.6rem 1.5rem',
                  background: '#ffe919', color: '#000', border: 'none',
                  borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 700,
                }}
              >
                Explorar productes
              </button>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['ID Comanda', 'Data', 'Productes', 'Total', 'Estat'].map(h => (
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
                  {comandes.map((comanda, idx) => (
                    <tr key={comanda._id} style={{
                      borderBottom: '1px solid rgba(255,255,255,0.04)',
                      animation: `fadeUp 0.3s ease both`,
                      animationDelay: `${0.05 * idx}s`,
                    }}>
                      <td style={{ padding: '1rem', color: '#9ca3af', fontSize: '0.8rem', fontFamily: 'monospace' }}>
                        #{comanda._id.slice(-8).toUpperCase()}
                      </td>
                      <td style={{ padding: '1rem', color: '#d1d5db', fontSize: '0.85rem' }}>
                        {new Date(comanda.dataComanda).toLocaleDateString('ca-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                      <td style={{ padding: '1rem', color: '#d1d5db', fontSize: '0.85rem' }}>
                        {comanda.espases?.length ?? 0} {comanda.espases?.length === 1 ? 'producte' : 'productes'}
                      </td>
                      <td style={{ padding: '1rem', color: '#ffe919', fontWeight: 700 }}>
                        €{comanda.total?.toFixed(2)}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <EstatBadge estat={comanda.estat} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
