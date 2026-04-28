import { ArrowUpRight, ArrowDownRight, User, Clock } from 'lucide-react';
import StatusBadge from './StatusBadge';
import TraceBadge from './TraceBadge';

export default function EventCard({ event }) {
  const isEntry = event.direction === 'IN';
  
  return (
    <div className="card" style={{
      display: 'grid',
      gridTemplateColumns: 'auto 1fr auto',
      gap: '16px',
      alignItems: 'center',
      padding: '12px 16px',
      marginBottom: '8px',
      border: '1px solid #1e293b',
      borderRadius: '8px',
      backgroundColor: '#111420'
    }}>
      {/* Subject Icon/Avatar */}
      <div style={{ 
        width: '40px', 
        height: '40px', 
        borderRadius: '50%', 
        backgroundColor: '#1e293b', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        border: '1px solid #334155'
      }}>
        <User size={20} color="#94a3b8" />
      </div>

      {/* Details */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontWeight: '600', fontSize: '14px' }}>{event.name || 'UNKNOWN'}</span>
          <TraceBadge id={event.trace_id} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: '#64748b' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: isEntry ? '#22c55e' : '#ff3b8f' }}>
            {isEntry ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            <span style={{ fontWeight: 'bold' }}>{event.direction}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={12} />
            {new Date(event.timestamp).toLocaleTimeString()}
          </div>
          <span>{event.method}</span>
        </div>
      </div>

      {/* Status */}
      <div>
        <StatusBadge type={event.decision} />
      </div>
    </div>
  );
}
