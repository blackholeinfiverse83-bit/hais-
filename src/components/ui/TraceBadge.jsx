import { Fingerprint } from 'lucide-react';

export default function TraceBadge({ id }) {
  if (!id) return null;
  
  const shortId = id.length > 8 ? `${id.substring(0, 8)}...` : id;
  
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      backgroundColor: '#1e293b',
      color: '#94a3b8',
      padding: '2px 8px',
      borderRadius: '12px',
      fontSize: '11px',
      fontFamily: 'monospace',
      border: '1px solid #334155'
    }}>
      <Fingerprint size={12} />
      {shortId}
    </div>
  );
}
