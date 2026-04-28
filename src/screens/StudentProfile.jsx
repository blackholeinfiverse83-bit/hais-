import { User, Calendar, ShieldCheck, History, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import StatusBadge from '../components/ui/StatusBadge';

export default function StudentProfile() {
  const student = {
    name: 'Ananya Sharma',
    id: 'G20230045',
    course: 'B.Tech CS - Year 3',
    room: 'B-204',
    status: 'ACTIVE',
    lastAccess: 'Today, 10:15 AM',
    history: [
      { timestamp: Date.now() - 3600000, action: 'IN', gate: 'Main Gate', method: 'Face', status: 'ALLOW' },
      { timestamp: Date.now() - 14400000, action: 'OUT', gate: 'Main Gate', method: 'Face', status: 'ALLOW' },
      { timestamp: Date.now() - 86400000, action: 'IN', gate: 'Main Gate', method: 'Manual', status: 'ALLOW' },
    ]
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', gap: '30px', marginBottom: '30px' }}>
        <div style={{ width: '150px', height: '150px', backgroundColor: '#1e293b', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <User size={80} color="#64748b" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h1 style={{ fontSize: '32px', marginBottom: '4px' }}>{student.name}</h1>
              <p style={{ color: '#ff3b8f', fontWeight: '600', letterSpacing: '1px' }}>{student.id}</p>
            </div>
            <div style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
              {student.status}
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '20px' }}>
            <div>
              <p style={{ fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>COURSE</p>
              <p style={{ fontSize: '14px', fontWeight: '500' }}>{student.course}</p>
            </div>
            <div>
              <p style={{ fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>ROOM</p>
              <p style={{ fontSize: '14px', fontWeight: '500' }}>{student.room}</p>
            </div>
            <div>
              <p style={{ fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>LAST ACCESS</p>
              <p style={{ fontSize: '14px', fontWeight: '500' }}>{student.lastAccess}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <History size={20} color="#ff3b8f" /> ACCESS HISTORY
        </h3>
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Action</th>
              <th>Gate</th>
              <th>Method</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {student.history.map((h, i) => (
              <tr key={i}>
                <td style={{ color: '#94a3b8' }}>{new Date(h.timestamp).toLocaleString()}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: h.action === 'IN' ? '#22c55e' : '#ff3b8f' }}>
                    {h.action === 'IN' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    <span style={{ fontWeight: 'bold' }}>{h.action}</span>
                  </div>
                </td>
                <td>{h.gate}</td>
                <td>{h.method}</td>
                <td><StatusBadge type={h.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
