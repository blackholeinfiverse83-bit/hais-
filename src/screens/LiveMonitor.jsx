import { useState, useEffect } from 'react';
import { Activity, Eye, EyeOff } from 'lucide-react';
import EventCard from '../components/ui/EventCard';
import { useEvents } from '../context/EventContext';

export default function LiveMonitor() {
  const { events } = useEvents();
  const [autoScroll, setAutoScroll] = useState(true);

  return (
    <div style={{ padding: '20px', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Activity color="#ff3b8f" /> LIVE MONITOR
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '14px' }}>Real-time access tracking</p>
        </div>
        <button 
          onClick={() => setAutoScroll(!autoScroll)}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            backgroundColor: autoScroll ? 'rgba(34, 197, 94, 0.1)' : '#1e293b',
            color: autoScroll ? '#22c55e' : '#94a3b8',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: '600'
          }}
        >
          {autoScroll ? <Eye size={16} /> : <EyeOff size={16} />}
          {autoScroll ? 'AUTO-SCROLL ON' : 'AUTO-SCROLL OFF'}
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', paddingRight: '10px' }}>
        {events.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '100px', color: '#64748b' }}>
            <Activity size={48} style={{ marginBottom: '20px', opacity: 0.2 }} />
            <h3>WAITING FOR EVENTS</h3>
            <p>System is online and listening...</p>
          </div>
        ) : (
          events.map((e, i) => (
            <EventCard key={i} event={e} />
          ))
        )}
      </div>
    </div>
  );
}
