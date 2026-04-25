import { LayoutDashboard, Users, UserCheck, UserX, Fingerprint } from 'lucide-react';

export default function Dashboard() {
  const kpis = [
    { name: 'Total Access', value: '1,248', icon: Users, color: '#3b82f6' },
    { name: 'Granted', value: '1,146', icon: UserCheck, color: '#22c55e' },
    { name: 'Denied', value: '26', icon: UserX, color: '#ef4444' },
    { name: 'Manual Overrides', value: '3', icon: Fingerprint, color: '#eab308' },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <LayoutDashboard color="#ff3b8f" /> SYSTEM DASHBOARD
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>Daily performance metrics</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
        {kpis.map((kpi, i) => (
          <div key={i} className="card" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              borderRadius: '12px', 
              backgroundColor: `${kpi.color}10`, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: kpi.color
            }}>
              <kpi.icon size={24} />
            </div>
            <div>
              <p style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase' }}>{kpi.name}</p>
              <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{kpi.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: '24px' }}>
        <h3 style={{ marginBottom: '20px' }}>Peak Access Hours</h3>
        <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
          {[40, 60, 45, 90, 100, 80, 50, 30, 20, 10, 5, 2].map((h, i) => (
            <div key={i} style={{ 
              flex: 1, 
              height: `${h}%`, 
              backgroundColor: '#1e293b', 
              borderRadius: '4px 4px 0 0',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }} 
            onMouseOver={(e) => e.target.style.backgroundColor = '#ff3b8f'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#1e293b'}
            />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', color: '#64748b', fontSize: '10px' }}>
          <span>08:00</span>
          <span>12:00</span>
          <span>16:00</span>
          <span>20:00</span>
          <span>00:00</span>
        </div>
      </div>
    </div>
  );
}
