import { Activity, Server, Database, Globe, Cpu, Clock, AlertTriangle } from 'lucide-react';

export default function SystemStatus() {
  const services = [
    { name: 'Core API Gateway', status: 'Healthy', uptime: '99.98%', latency: '24ms', icon: Globe },
    { name: 'Event Processor', status: 'Healthy', uptime: '100%', latency: '12ms', icon: Activity },
    { name: 'Identity Service', status: 'Warning', uptime: '99.95%', latency: '156ms', icon: Database },
    { name: 'Storage Engine', status: 'Healthy', uptime: '99.99%', latency: '8ms', icon: Server },
    { name: 'AI Inference Node', status: 'Healthy', uptime: '99.90%', latency: '450ms', icon: Cpu },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Activity color="#ff3b8f" /> SYSTEM OBSERVABILITY
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>Service health and failure monitoring</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {services.map((s, i) => (
          <div key={i} className="card" style={{ position: 'relative', overflow: 'hidden' }}>
            {s.status === 'Warning' && (
              <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', backgroundColor: '#eab308' }} />
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ padding: '8px', borderRadius: '8px', backgroundColor: '#1e293b' }}>
                  <s.icon size={20} color="#94a3b8" />
                </div>
                <h3 style={{ fontSize: '15px' }}>{s.name}</h3>
              </div>
              <div style={{ 
                fontSize: '10px', 
                fontWeight: 'bold', 
                padding: '4px 8px', 
                borderRadius: '4px',
                backgroundColor: s.status === 'Healthy' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(234, 179, 8, 0.1)',
                color: s.status === 'Healthy' ? '#22c55e' : '#eab308',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                {s.status === 'Warning' && <AlertTriangle size={10} />}
                {s.status.toUpperCase()}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div style={{ padding: '10px', borderRadius: '6px', backgroundColor: '#0a0c14' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '10px', marginBottom: '4px' }}>
                  <Clock size={10} /> UPTIME
                </div>
                <div style={{ fontSize: '14px', fontWeight: '600' }}>{s.uptime}</div>
              </div>
              <div style={{ padding: '10px', borderRadius: '6px', backgroundColor: '#0a0c14' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '10px', marginBottom: '4px' }}>
                  <Activity size={10} /> LATENCY
                </div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: s.latency.includes('ms') && parseInt(s.latency) > 100 ? '#eab308' : 'white' }}>
                  {s.latency}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
