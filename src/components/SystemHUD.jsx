import { useState, useEffect, useRef } from 'react';

const randomWalk = (current, min, max, step = 3) => {
  const delta = (Math.random() - 0.48) * step;
  return Math.min(max, Math.max(min, Math.round(current + delta)));
};

export default function SystemHUD({ powerOn = true }) {
  const startTime = useRef(Date.now());

  const [cpu, setCpu] = useState(23);
  const [mem, setMem] = useState(74);
  const [net, setNet] = useState(true); // secure = true
  const [uptime, setUptime] = useState(0);
  const [aiPulse, setAiPulse] = useState(true);

  // Uptime tick every second
  useEffect(() => {
    if (!powerOn) return;
    const id = setInterval(() => {
      setUptime(Math.floor((Date.now() - startTime.current) / 1000));
    }, 1000);
    return () => clearInterval(id);
  }, [powerOn]);

  // CPU + MEM random walk every 2s
  useEffect(() => {
    if (!powerOn) return;
    const id = setInterval(() => {
      setCpu(prev => randomWalk(prev, 8, 95, 6));
      setMem(prev => randomWalk(prev, 42, 91, 4));
    }, 2000);
    return () => clearInterval(id);
  }, [powerOn]);

  // AI pulse blink every 1.5s
  useEffect(() => {
    const id = setInterval(() => setAiPulse(p => !p), 1500);
    return () => clearInterval(id);
  }, []);

  const formatUptime = (secs) => {
    const h = String(Math.floor(secs / 3600)).padStart(2, '0');
    const m = String(Math.floor((secs % 3600) / 60)).padStart(2, '0');
    const s = String(secs % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const cpuColor = cpu > 80 ? '#ef4444' : cpu > 55 ? '#f59e0b' : 'var(--primary-color)';
  const memColor = mem > 85 ? '#ef4444' : mem > 70 ? '#f59e0b' : 'var(--primary-color)';

  if (!powerOn) return null;

  return (
    <div className="system-hud">
      <div className="hud-item">
        <span className="hud-dot" style={{ background: '#22c55e', boxShadow: '0 0 6px #22c55e' }} />
        <span className="hud-label">NET:</span>
        <span className="hud-value" style={{ color: '#22c55e' }}>SECURE</span>
      </div>

      <div className="hud-sep">▸</div>

      <div className="hud-item">
        <span className="hud-label">CPU:</span>
        <span className="hud-value" style={{ color: cpuColor, transition: 'color 0.5s ease' }}>
          {cpu}%
        </span>
        <div className="hud-mini-bar">
          <div style={{ width: `${cpu}%`, background: cpuColor, height: '100%', borderRadius: '1px', transition: 'width 1s ease, background 0.5s ease' }} />
        </div>
      </div>

      <div className="hud-sep">▸</div>

      <div className="hud-item">
        <span className="hud-label">MEM:</span>
        <span className="hud-value" style={{ color: memColor, transition: 'color 0.5s ease' }}>
          {mem}%
        </span>
        <div className="hud-mini-bar">
          <div style={{ width: `${mem}%`, background: memColor, height: '100%', borderRadius: '1px', transition: 'width 1s ease, background 0.5s ease' }} />
        </div>
      </div>

      <div className="hud-sep">▸</div>

      <div className="hud-item">
        <span className="hud-label">UP:</span>
        <span className="hud-value hud-mono">{formatUptime(uptime)}</span>
      </div>

      <div className="hud-sep">▸</div>

      <div className="hud-item">
        <span
          className="hud-dot"
          style={{
            background: aiPulse ? 'var(--primary-color)' : 'transparent',
            border: '1px solid var(--primary-color)',
            boxShadow: aiPulse ? '0 0 6px var(--primary-color)' : 'none',
            transition: 'all 0.4s ease'
          }}
        />
        <span className="hud-label">AI:</span>
        <span className="hud-value">ONLINE</span>
      </div>
    </div>
  );
}
