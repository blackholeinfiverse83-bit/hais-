import { useState, useEffect } from 'react';
import ReviewCard from '../components/ui/ReviewCard';
import { ShieldAlert } from 'lucide-react';

export default function ReviewQueue() {
  const [items, setItems] = useState([
    { id: 1, student_id: 'G20230045', confidence: 0.72, timestamp: Date.now(), trace_id: 'TRC-9921-X', image: null },
    { id: 2, student_id: 'G20230091', confidence: 0.65, timestamp: Date.now() - 5000, trace_id: 'TRC-9922-Y', image: null },
    { id: 3, student_id: 'G20230102', confidence: 0.45, timestamp: Date.now() - 15000, trace_id: 'TRC-9923-Z', image: null },
  ]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleAction = (id, action) => {
    console.log(`Action ${action} on item ${id}`);
    setItems(prev => prev.filter(item => item.id !== id));
    if (activeIndex >= items.length - 1) {
      setActiveIndex(Math.max(0, items.length - 2));
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      const currentItem = items[activeIndex];
      if (!currentItem) return;

      if (key === 'c') handleAction(currentItem.id, 'confirm');
      if (key === 'r') handleAction(currentItem.id, 'reject');
      if (key === 's') handleAction(currentItem.id, 'search');
      if (key === 'arrowdown') setActiveIndex(prev => Math.min(items.length - 1, prev + 1));
      if (key === 'arrowup') setActiveIndex(prev => Math.max(0, prev - 1));
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [items, activeIndex]);

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ fontSize: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ShieldAlert color="#ff3b8f" /> REVIEW QUEUE
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '14px' }}>Human-in-the-loop verification required</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '32px', fontWeight: 'bold' }}>{items.length}</span>
          <p style={{ color: '#94a3b8', fontSize: '12px' }}>PENDING</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '100px', color: '#64748b' }}>
            <ShieldAlert size={48} style={{ marginBottom: '20px', opacity: 0.2 }} />
            <h3>QUEUE CLEAR</h3>
            <p>All items have been processed.</p>
          </div>
        ) : (
          items.map((item, index) => (
            <ReviewCard 
              key={item.id} 
              data={item} 
              active={index === activeIndex}
              onConfirm={() => handleAction(item.id, 'confirm')}
              onReject={() => handleAction(item.id, 'reject')}
              onSearch={() => handleAction(item.id, 'search')}
            />
          ))
        )}
      </div>

      {/* Shortcuts Legend */}
      <div style={{ 
        position: 'fixed', 
        bottom: '20px', 
        left: '50%', 
        transform: 'translateX(-50%)',
        backgroundColor: '#111420',
        padding: '10px 20px',
        borderRadius: '30px',
        border: '1px solid #1e293b',
        display: 'flex',
        gap: '20px',
        fontSize: '12px',
        color: '#94a3b8'
      }}>
        <div><span style={{ color: 'white', fontWeight: 'bold' }}>C</span> Confirm</div>
        <div><span style={{ color: 'white', fontWeight: 'bold' }}>R</span> Reject</div>
        <div><span style={{ color: 'white', fontWeight: 'bold' }}>S</span> Search</div>
        <div><span style={{ color: 'white', fontWeight: 'bold' }}>↑↓</span> Navigate</div>
      </div>
    </div>
  );
}
