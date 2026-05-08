// src/components/dashboard/StatsCard.jsx
const StatsCard = ({ icon, label, value, sub, color = '#ffe919', trend }) => {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: `1px solid ${color}22`,
      borderRadius: '1rem',
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      position: 'relative',
      overflow: 'hidden',
      transition: 'transform 0.2s, box-shadow 0.2s',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = `0 8px 32px ${color}22`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Glow accent */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
      }} />

      {/* Icon + label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ fontSize: '1.5rem' }}>{icon}</span>
        <span style={{ color: '#9ca3af', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          {label}
        </span>
      </div>

      {/* Value */}
      <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>
        {value}
      </div>

      {/* Sub + trend */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
        {sub && <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>{sub}</span>}
        {trend !== undefined && (
          <span style={{
            fontSize: '0.75rem', fontWeight: 700,
            color: trend >= 0 ? '#22c55e' : '#ef4444',
            background: trend >= 0 ? '#22c55e15' : '#ef444415',
            padding: '0.1rem 0.5rem', borderRadius: '999px',
          }}>
            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
