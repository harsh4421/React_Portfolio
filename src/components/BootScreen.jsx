import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Terminal, Cpu, Database, Network } from 'lucide-react';
import { SoundManager } from './SoundManager';

const BOOT_LOGS = [
  { text: 'SYSTEM INITIALIZING: HARSH_OS V2.0.5 KERNEL LOADED.', type: 'info', icon: 'Terminal' },
  { text: 'DETECTOR ARRAYS DETECTING SYSTEM SPECS...', type: 'info', icon: 'Cpu' },
  { text: 'CPU STACK: NEURAL LINK CHIP v9.2 COMPATIBLE ..... [ OK ]', type: 'success' },
  { text: 'VRAM: 8192 MB MATRIX CRT BUFFER SYNC ............ [ OK ]', type: 'success' },
  { text: 'RAM SYSTEM ALLOCATION: 65,536 KB ................ [ SUCCESS ]', type: 'success' },
  { text: 'FETCHING REMOTE REPOSITORY PORTFOLIO FILES...', type: 'info', icon: 'Database' },
  { text: 'READING PROJECTS/ECOMMERCE.EXE ................... [ MOUNTED ]', type: 'success' },
  { text: 'READING PROJECTS/AI_ASSISTANT.SYS ................ [ MOUNTED ]', type: 'success' },
  { text: 'READING PROJECTS/PAYMENT_GATEWAY.DLL .............. [ MOUNTED ]', type: 'success' },
  { text: 'MOUNTING FILE SYSTEM PATH /HARSH/PORTFOLIO/ ...... [ SUCCESS ]', type: 'success' },
  { text: 'ESTABLISHING HANDSHAKE PROTOCOLS...', type: 'info', icon: 'Network' },
  { text: 'DECRYPTING SOURCE CODE INTEGRITY (SHA-256) ....... [ SECURE ]', type: 'success' },
  { text: 'ESTABLISHING SECURE CLIENT SOCKETS .............. [ ENCRYPTED ]', type: 'success' },
  { text: 'AUTHENTICATION CODE REDIRECT SUCCESSFUL .......... [ TRUE ]', type: 'success' },
  { text: 'WELCOME TO HARSH_OS OPERATING SYSTEM TERMINAL.', type: 'info' }
];

const ICON_MAP = { Terminal, Cpu, Database, Network };

export default function BootScreen({ onBootComplete }) {
  const [soundOn, setSoundOn] = useState(false);
  const [lines, setLines] = useState([]);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [bootFinished, setBootFinished] = useState(false);
  const [enterTriggered, setEnterTriggered] = useState(false);
  const logEndRef = useRef(null);
  const soundOnRef = useRef(false);

  // Sync ref when soundOn changes (without restarting boot sequence)
  useEffect(() => {
    soundOnRef.current = soundOn;
  }, [soundOn]);

  // Auto scroll to bottom as logs come in
  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [lines]);

  // Boot sequence — runs ONCE on mount only
  useEffect(() => {
    let currentLineIdx = 0;
    let logInterval = null;

    logInterval = setInterval(() => {
      if (currentLineIdx < BOOT_LOGS.length) {
        const entry = BOOT_LOGS[currentLineIdx];
        setLines(prev => [...prev, entry]);
        if (soundOnRef.current) {
          SoundManager.playKey();
        }
        setCurrentProgress(Math.floor(((currentLineIdx + 1) / BOOT_LOGS.length) * 100));
        currentLineIdx++;
      } else {
        clearInterval(logInterval);
        logInterval = null;
        if (soundOnRef.current) {
          SoundManager.playSuccess();
        }
        setBootFinished(true);
      }
    }, 200);

    return () => {
      if (logInterval) clearInterval(logInterval);
    };
  }, []); // ← empty deps, runs once

  const toggleSound = () => {
    const nextVal = !soundOn;
    setSoundOn(nextVal);
    SoundManager.setEnabled(nextVal);
    if (nextVal) {
      SoundManager.playBeep(880, 0.1);
    }
  };

  const handleEnterOS = () => {
    setEnterTriggered(true);
    if (soundOnRef.current) {
      SoundManager.playBoot();
    }
    setTimeout(() => {
      onBootComplete();
    }, 800);
  };

  return (
    <AnimatePresence>
      {!enterTriggered && (
        <motion.div
          key="boot-screen"
          className="crt-effect"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#050608',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            fontFamily: "'Roboto Mono', monospace",
            color: '#06b6d4',
            padding: '30px',
            overflow: 'hidden'
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                className="blink-dot"
                style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#06b6d4'
                }}
              />
              <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.2em' }}>
                SYS_BOOT // LOCAL_INIT
              </span>
            </div>

            <button
              onClick={toggleSound}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                borderRadius: '4px',
                color: soundOn ? '#22c55e' : '#94a3b8',
                background: soundOn ? 'rgba(34, 197, 94, 0.08)' : 'rgba(255,255,255,0.02)',
                fontSize: '0.75rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {soundOn ? <Volume2 size={14} /> : <VolumeX size={14} />}
              AUDIO: {soundOn ? 'ACTIVE' : 'MUTED'}
            </button>
          </div>

          {/* Diagnostic Console Logs */}
          <div
            style={{
              flex: 1,
              margin: '24px 0',
              padding: '20px',
              background: 'rgba(0,0,0,0.4)',
              border: '1px solid rgba(6, 182, 212, 0.1)',
              borderRadius: '8px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              fontSize: '0.82rem'
            }}
          >
            {lines.map((line, idx) => {
              const Icon = line.icon ? ICON_MAP[line.icon] : null;
              return (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: line.type === 'success' ? '#22c55e' : '#06b6d4',
                    textShadow: line.type === 'success'
                      ? '0 0 6px rgba(34,197,94,0.3)'
                      : '0 0 6px rgba(6,182,212,0.3)'
                  }}
                >
                  {Icon && <Icon size={13} />}
                  <span>{line.text}</span>
                </div>
              );
            })}
            <div ref={logEndRef} />
          </div>

          {/* Progress Bar + CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 'bold' }}>
              <span>DECRYPTING HARSH_OS PORTFOLIO ENVIRONMENT</span>
              <span>{currentProgress}%</span>
            </div>

            <div style={{
              width: '100%',
              height: '6px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '3px',
              overflow: 'hidden',
              border: '1px solid rgba(6, 182, 212, 0.15)'
            }}>
              <div
                style={{
                  height: '100%',
                  width: `${currentProgress}%`,
                  background: 'linear-gradient(90deg, #06b6d4 0%, #a855f7 100%)',
                  boxShadow: '0 0 10px #06b6d4',
                  transition: 'width 0.2s ease'
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '8px', height: '48px' }}>
              {bootFinished ? (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleEnterOS}
                  style={{
                    padding: '12px 36px',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    color: '#050608',
                    background: '#06b6d4',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontFamily: "'Roboto Mono', monospace",
                    boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)'
                  }}
                >
                  DECRYPT AND ENTER OS
                </motion.button>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.78rem' }}>
                  <span className="pulse-text">DECOMPRESSING MODULES...</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
