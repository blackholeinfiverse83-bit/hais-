import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Monitor, List, Users, Cpu, ShieldAlert, 
  FileBarChart, Settings, User, Bell, Clock, Calendar,
  Activity, ShieldCheck, Database, CheckCircle2, Wifi, 
  Lock, ArrowUpRight, ArrowDownRight, Search, Filter, ChevronDown,
  LogOut, Heart
} from 'lucide-react';
import StatusBadge from './components/ui/StatusBadge';
import { useEvents, EventProvider } from './context/EventContext';
import DashboardScreen from './screens/Dashboard';
import LiveMonitor from './screens/LiveMonitor';
import ReviewQueue from './screens/ReviewQueue';
import SystemStatus from './screens/SystemStatus';

function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'live', name: 'Live Monitor', icon: Monitor },
    { id: 'logs', name: 'Access Logs', icon: List },
    { id: 'users', name: 'Users', icon: Users },
    { id: 'devices', name: 'Devices', icon: Cpu },
    { id: 'manual', name: 'Manual Override', icon: ShieldAlert },
    { id: 'alerts', name: 'Alerts', icon: Bell },
    { id: 'reports', name: 'Reports', icon: FileBarChart },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <div style={{ backgroundColor: '#d63384', padding: '8px', borderRadius: '8px' }}>
          <ShieldAlert color="white" size={24} />
        </div>
        <div>
          <h2 style={{ fontSize: '18px', lineHeight: 1 }}>HIAS</h2>
          <p style={{ fontSize: '10px', color: '#64748b' }}>Hostel Integrated Access System</p>
        </div>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column' }}>
        {menuItems.map((item) => (
          <a 
            key={item.id}
            href="#" 
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); setActiveTab(item.id); }}
          >
            <item.icon size={20} />
            {item.name}
          </a>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="empowered-space">
          <Heart size={48} color="#d63384" fill="#d63384" style={{ opacity: 0.3 }} />
          <p>Empowered Space. <br/> Safe Place.</p>
        </div>
        <div className="system-time-card">
          <p style={{ fontSize: '10px', color: '#64748b', marginBottom: '4px' }}>SYSTEM TIME</p>
          <p style={{ fontSize: '12px', fontWeight: 'bold' }}>20 May 2025 | 10:30:45 AM</p>
        </div>
      </div>
    </div>
  );
}

function MainFeed() {
  const { events } = useEvents();

  return (
    <div className="feed-container">
      <div className="feed-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <h3 style={{ fontSize: '14px' }}>LIVE ACCESS FEED</h3>
          <div className="live-indicator">
            <div className="live-dot" />
            <span>Live</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ backgroundColor: '#0a0c14', padding: '8px 12px', borderRadius: '6px', border: '1px solid #1e293b', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
            All Gates <ChevronDown size={14} />
          </div>
          <div style={{ backgroundColor: '#0a0c14', padding: '8px', borderRadius: '6px', border: '1px solid #1e293b' }}>
            <Filter size={16} />
          </div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Name</th>
            <th>User ID</th>
            <th>Direction</th>
            <th>Method</th>
            <th>Gate / Booth</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {events.length === 0 ? (
            <tr><td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>Waiting for stream...</td></tr>
          ) : (
            events.map((e, i) => (
              <tr key={i}>
                <td style={{ color: '#94a3b8' }}>{new Date(e.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</td>
                <td>
                  <div className="subject-cell">
                    <div className="avatar" />
                    <span>{e.name}</span>
                  </div>
                </td>
                <td style={{ color: '#94a3b8' }}>{e.user_id}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: e.direction === 'IN' ? '#22c55e' : '#ef4444' }}>
                    {e.direction === 'IN' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    <span style={{ fontWeight: 'bold' }}>{e.direction}</span>
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8' }}>
                    <Monitor size={14} /> {e.method}
                  </div>
                </td>
                <td style={{ color: '#94a3b8' }}>Booth 1 - Entry</td>
                <td>
                  <span className={`status-label ${e.decision === 'ALLOW' ? 'allowed' : 'denied'}`}>
                    {e.decision === 'ALLOW' ? 'ALLOWED' : 'DENIED'}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div style={{ padding: '16px', textAlign: 'center', fontSize: '12px', color: '#d63384', cursor: 'pointer' }}>
        View All Logs &gt;
      </div>
    </div>
  );
}

function RightPanel() {
  const { connected, triggerOverride, triggerSimulation } = useEvents();
  const [reason, setReason] = useState('');

  const handleOverride = async () => {
    if (!reason) return alert("Reason required for override");
    await triggerOverride(reason);
    setReason('');
  };

  return (
    <div className="right-panel">
      {/* System Status */}
      <div className="panel-card">
        <div className="panel-title">
          <Activity size={18} color="#d63384" /> SYSTEM STATUS
        </div>
        {[
          { name: 'Controller', val: connected ? 'Online' : 'Offline' },
          { name: 'Face Devices', val: '4 / 4 Online' },
          { name: 'RFID Readers', val: '2 / 2 Online' },
          { name: 'Relay / Door Locks', val: 'All OK' },
          { name: 'Network', val: 'Online' },
          { name: 'Power Supply', val: 'Normal' },
        ].map((s, i) => (
          <div key={i} className="status-row">
            <span style={{ color: '#94a3b8' }}>{s.name}</span>
            <div className="status-value">
              <span>{s.val}</span>
              <div className="dot-online" style={{ backgroundColor: s.val.includes('Online') || s.val === 'All OK' || s.val === 'Normal' ? '#22c55e' : '#dc3545' }} />
            </div>
          </div>
        ))}
      </div>

      {/* Manual Override */}
      <div className="panel-card">
        <div className="panel-title">
          <ShieldAlert size={18} color="#d63384" /> MANUAL OVERRIDE
        </div>
        <p style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '16px' }}>Use only in emergency or authorized situations.</p>
        <button className="btn-open-gate" onClick={handleOverride}>
          <Lock size={16} /> OPEN GATE
        </button>
        <div style={{ marginTop: '16px' }}>
          <p style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '8px' }}>Reason (Required)</p>
          <input 
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter reason"
            style={{ width: '100%', backgroundColor: '#0a0c14', border: '1px solid #1e293b', borderRadius: '6px', padding: '10px', color: 'white', fontSize: '12px' }}
          />
        </div>
      </div>

      {/* Today Summary */}
      <div className="panel-card">
        <div className="panel-title">
          <FileBarChart size={18} color="#d63384" /> TODAY SUMMARY
        </div>
        <div className="summary-grid">
          <div className="summary-card">
            <h4>GRANTED</h4>
            <p style={{ color: '#22c55e' }}>1,146</p>
          </div>
          <div className="summary-card">
            <h4>DENIED</h4>
            <p style={{ color: '#ef4444' }}>26</p>
          </div>
          <div className="summary-card">
            <h4>OVERRIDES</h4>
            <p style={{ color: '#eab308' }}>3</p>
          </div>
          <div className="summary-card">
            <h4>TOTAL</h4>
            <p>1,248</p>
          </div>
        </div>
        <button 
          onClick={triggerSimulation}
          style={{ width: '100%', marginTop: '16px', backgroundColor: '#1e293b', border: 'none', color: '#94a3b8', padding: '8px', borderRadius: '6px', fontSize: '11px', cursor: 'pointer' }}
        >
          [DEV] SIMULATE ACCESS EVENT
        </button>
      </div>
    </div>
  );
}

function AppContent() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { connected } = useEvents();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardScreen />;
      case 'live':
        return <LiveMonitor />;
      case 'logs':
        return <MainFeed />;
      case 'manual':
        return <ReviewQueue />;
      case 'devices':
        return <SystemStatus />;
      default:
        return (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
            <h2>Module Under Construction</h2>
            <p>The {activeTab} module is currently being integrated by the team.</p>
          </div>
        );
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div className="layout-container">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="main-area">
          <header className="header">
            <div className="header-welcome">
              <h1>Welcome, Administrator <ShieldCheck size={18} color="#22c55e" /></h1>
              <p style={{ fontSize: '12px', color: '#94a3b8' }}>Girls Only Hostel Access Console</p>
            </div>
            
            <div className="safe-secure-badge">
              <Heart size={16} fill="#d63384" color="#d63384" />
              <span>Safe. Secure. For Her.</span>
            </div>

            <div className="top-actions">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={16} color="#94a3b8" />
                <div style={{ fontSize: '12px' }}>
                  <p style={{ fontWeight: 'bold' }}>20 May 2025</p>
                  <p style={{ color: '#94a3b8' }}>10:30:45 AM</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderLeft: '1px solid #1e293b', paddingLeft: '20px' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: '#d63384', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User size={18} color="white" />
                </div>
                <span style={{ fontSize: '13px' }}>Administrator <ChevronDown size={14} /></span>
              </div>
            </div>
          </header>

          <div style={{ flex: 1, overflowY: 'auto' }}>
            {renderContent()}
          </div>

          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', backgroundColor: '#121826', padding: '16px', borderRadius: '12px', border: '1px solid #1e293b', marginTop: '20px' }}>
            <div style={{ fontSize: '14px', fontWeight: 'bold' }}>SEARCH USER</div>
            <div style={{ flex: 1, position: 'relative' }}>
              <input 
                type="text" 
                placeholder="Search by Name or User ID..." 
                style={{ width: '100%', backgroundColor: '#0a0c14', border: '1px solid #1e293b', padding: '10px 40px 10px 12px', borderRadius: '6px', color: 'white', fontSize: '13px' }}
              />
              <Search size={18} color="#64748b" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>
        </main>

        <RightPanel />
      </div>

      <footer className="layout-footer">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldCheck size={14} />
          HIAS - Securing Her Space, Every Day.
        </div>
        <div>v1.0.0</div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <EventProvider>
      <AppContent />
    </EventProvider>
  );
}

export default App;
