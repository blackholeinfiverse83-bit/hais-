import { createContext, useContext, useState, useEffect } from 'react';

const EventContext = createContext();

export function EventProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [connected, setConnected] = useState(false);
  const piIp = "localhost"; 

  useEffect(() => {

    // Initial Fetch
    const fetchEvents = async () => {
      try {
        const res = await fetch(`http://${piIp}:3000/events`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setEvents(data.slice(0, 50));
        }
      } catch (err) {
        console.warn("Initial fetch failed, using mock data", err);
        setEvents([
          { timestamp: Date.now(), name: "Riya Sharma", user_id: "G20230045", direction: "IN", method: "Face", decision: "ALLOW" },
          { timestamp: Date.now() - 30000, name: "Ananya Singh", user_id: "G20230091", direction: "IN", method: "RFID", decision: "DENY" },
          { timestamp: Date.now() - 60000, name: "Sneha Patel", user_id: "G20230102", direction: "IN", method: "Face", decision: "ALLOW" },
        ]);
      }
    };
    fetchEvents();

    // SSE Connection
    const evtSource = new EventSource(`http://${piIp}:3000/events/stream`);
    
    evtSource.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        setEvents((prev) => [data, ...prev.slice(0, 50)]);
      } catch (err) {
        console.error("Failed to parse SSE data", err);
      }
    };

    evtSource.onopen = () => setConnected(true);
    evtSource.onerror = () => setConnected(false);

    return () => evtSource.close();
  }, []);

  const triggerOverride = async (reason) => {
    try {
      const res = await fetch(`http://${piIp}:3000/override`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'OPEN_GATE', reason })
      });
      return await res.json();
    } catch (err) {
      console.error("Override failed", err);
    }
  };

  const triggerSimulation = async () => {
    const users = [
      { user_id: "G20230045", name: "Riya Sharma", method: "FACE" },
      { user_id: "B20230999", name: "Stranger", method: "RFID" }
    ];
    const user = users[Math.floor(Math.random() * users.length)];
    try {
      await fetch(`http://${piIp}:3000/access/event`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...user, direction: "IN", device_id: "booth_1_in" })
      });
    } catch (err) {
      console.error("Simulation failed", err);
    }
  };

  return (
    <EventContext.Provider value={{ events, connected, triggerOverride, triggerSimulation }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
}
