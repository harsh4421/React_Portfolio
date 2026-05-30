import { motion } from 'framer-motion';
import { FileCode, Globe, Cpu, Award, AlertCircle, Zap, Users, CheckCircle } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import { SoundManager } from './SoundManager';

const PROJECTS_DATA = {
  1: {
    id: 1,
    fileName: 'bill_splitter.exe',
    title: 'Bill Splitter & Tip Calculator',
    type: 'Application Binary',
    status: 'DEPLOYED',
    statusColor: '#22c55e',
    size: '1,024 KB',
    live: '#',
    code: 'https://github.com',
    desc: 'An automated billing node with dynamic tip allocation ratios and user share compiler. Real-time calculation engine with customizable split logic.',
    mission: 'Eliminate the hassle of splitting bills at restaurants/events with a clean, instant calculation tool.',
    stack: ['React.js', 'Vite', 'CSS Variables', 'Responsive Grid'],
    role: 'Lead Frontend Developer',
    impact: ['500+ daily active users', '0 calculation errors reported', '4.8★ avg user rating'],
    challenges: 'Optimizing real-time mathematical operations to avoid frame drops on low-end devices and designing a highly custom HSL color-coded tip ratio dial system.'
  },
  2: {
    id: 2,
    fileName: 'quiz_platform.sys',
    title: 'Aptitude Quiz Platform',
    type: 'System Config Driver',
    status: 'ACTIVE',
    statusColor: '#06b6d4',
    size: '2,560 KB',
    live: '#',
    code: 'https://github.com',
    desc: 'Feature-rich diagnostic quiz database. Features timed sessions, randomized indexing, and scores tracking telemetry with leaderboard integration.',
    mission: 'Deliver enterprise-grade quiz infrastructure for aptitude training with offline resilience.',
    stack: ['React.js', 'Node.js', 'Express', 'MongoDB', 'JWT Auth'],
    role: 'Full Stack Engineer',
    impact: ['1,200+ quiz sessions run', '98.5% uptime score', 'Sub-200ms response time'],
    challenges: 'Authoring an offline-tolerant state tracking system that caches quiz progress locally and syncs back to the database once connections stabilize.'
  },
  3: {
    id: 3,
    fileName: 'clinic_web.dll',
    title: 'Vision Care Clinic',
    type: 'Dynamic Link Library',
    status: 'LIVE',
    statusColor: '#a855f7',
    size: '4,096 KB',
    live: '#',
    code: 'https://github.com',
    desc: 'Patient care service hub featuring workflow schedules, staff telemetry logs, and clinic bookings gateway with real-time availability tracking.',
    mission: 'Modernize clinic operations with a seamless digital patient management interface.',
    stack: ['HTML5', 'CSS Modules', 'ES6 Vanilla JS', 'Flickity Scroll'],
    role: 'UI Designer & Web Developer',
    impact: ['300+ patient bookings/mo', '<0.8s load on 3G', 'Mobile-first responsive'],
    challenges: 'Optimizing high-resolution clinical images and layout loads to run under 0.8 seconds on 3G speeds, and coding a calendar cell selection widget.'
  },
  4: {
    id: 4,
    fileName: 'harsh_os.bin',
    title: 'HarshOS Portfolio',
    type: 'Operating System Binary',
    status: 'RUNNING',
    statusColor: '#f59e0b',
    size: '8,192 KB',
    live: '#',
    code: 'https://github.com',
    desc: 'The very environment you are interacting with. Immersive hacker OS with Web Audio synthesizer, real-time canvas effects, and 12+ easter eggs.',
    mission: 'Create a portfolio so immersive that every recruiter remembers it — a living OS, not a static page.',
    stack: ['React.js', 'Framer Motion', 'Web Audio API', 'HTML5 Canvas', 'CSS CRT Shaders'],
    role: 'System Architect',
    impact: ['12+ easter eggs hidden', '60 FPS canvas performance', '100% custom audio engine'],
    challenges: 'Synthesizing beeps/sweeps dynamically without external media files, and maintaining 60 FPS backdrop grids while canvas text streams run simultaneously.'
  },
  5: {
    id: 5,
    fileName: 'display_lab.sys',
    title: 'DisplayLab Creator Platform',
    type: 'System Component',
    status: 'BETA',
    statusColor: '#ef4444',
    size: '1,842 KB',
    live: '#',
    code: 'https://github.com',
    desc: 'Creator network database mapping user profiles, follow metrics, badges and tags dynamically with real-time SVG badge generation.',
    mission: 'Empower content creators with a dynamic profile showcase and custom downloadable badge system.',
    stack: ['React.js', 'REST Integration', 'SVG Generators', 'CSS Flexbox'],
    role: 'Frontend Developer',
    impact: ['200+ creator profiles', 'SVG download in 1-click', 'REST API integrated'],
    challenges: 'Implementing dynamic client-side SVG rendering vectors that allow creator badges to be customized and downloaded directly as high-resolution images.'
  }
};

export default function ProjectDetails({ activeProjectId, onSelectProject, hue }) {
  const selectedProject = PROJECTS_DATA[activeProjectId] || PROJECTS_DATA[1];

  const handleFileClick = (id) => {
    SoundManager.playBeep(1100, 0.05);
    onSelectProject(id);
  };

  // Render a custom animated SVG badge/hud graphic depending on selected project
  const renderProjectHUD = (id) => {
    const strokeColor = `hsl(${hue}, 95%, 55%)`;
    const glowColor = `hsl(${hue}, 95%, 55%, 0.4)`;
    
    switch (id) {
      case 1: // Bill Splitter
        return (
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <circle cx="50" cy="50" r="40" fill="none" stroke={strokeColor} strokeWidth="1" strokeDasharray="3, 3" />
            <circle cx="50" cy="50" r="30" fill="none" stroke={strokeColor} strokeWidth="2" />
            <line x1="50" y1="10" x2="50" y2="90" stroke={strokeColor} strokeWidth="0.5" />
            <line x1="10" y1="50" x2="90" y2="50" stroke={strokeColor} strokeWidth="0.5" />
            {/* Split pie representation */}
            <path d="M 50 50 L 50 20 A 30 30 0 0 1 80 50 Z" fill={`hsl(${hue}, 95%, 55%, 0.15)`} stroke={strokeColor} strokeWidth="1.5" />
            <text x="35" y="45" fill={strokeColor} fontSize="6" fontFamily="monospace">$ SPLIT</text>
            <text x="54" y="38" fill={strokeColor} fontSize="7" fontWeight="bold" fontFamily="monospace">33%</text>
          </svg>
        );
      case 2: // Quiz Platform
        return (
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            {/* Brain/Grid network nodes */}
            <rect x="15" y="15" width="70" height="70" fill="none" stroke={strokeColor} strokeWidth="1" />
            <circle cx="50" cy="50" r="10" fill="none" stroke={strokeColor} strokeWidth="1.5" />
            <circle cx="30" cy="30" r="4" fill={strokeColor} />
            <circle cx="70" cy="30" r="4" fill={strokeColor} />
            <circle cx="30" cy="70" r="4" fill={strokeColor} />
            <circle cx="70" cy="70" r="4" fill={strokeColor} />
            {/* Connections */}
            <line x1="30" y1="30" x2="43" y2="43" stroke={strokeColor} strokeWidth="1" />
            <line x1="70" y1="30" x2="57" y2="43" stroke={strokeColor} strokeWidth="1" />
            <line x1="30" y1="70" x2="43" y2="57" stroke={strokeColor} strokeWidth="1" />
            <line x1="70" y1="70" x2="57" y2="57" stroke={strokeColor} strokeWidth="1" />
            <path d="M 35 50 Q 50 35 65 50" fill="none" stroke={strokeColor} strokeWidth="0.75" strokeDasharray="2, 2" />
            <text x="30" y="80" fill={strokeColor} fontSize="5" fontFamily="monospace">BRAIN_LINK: ACTIVE</text>
          </svg>
        );
      case 3: // Vision Care Clinic
        return (
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            {/* Eye scanning telemetry */}
            <path d="M 15 50 Q 50 15 85 50 Q 50 85 15 50 Z" fill="none" stroke={strokeColor} strokeWidth="1.5" />
            <circle cx="50" cy="50" r="16" fill="none" stroke={strokeColor} strokeWidth="1" />
            <circle cx="50" cy="50" r="8" fill={strokeColor} />
            {/* Scan Reticle crosshairs */}
            <path d="M 50 20 L 50 30 M 50 70 L 50 80 M 20 50 L 30 50 M 70 50 L 80 50" stroke={strokeColor} strokeWidth="1.5" />
            <line x1="10" y1="15" x2="25" y2="15" stroke={strokeColor} strokeWidth="1" />
            <line x1="10" y1="15" x2="10" y2="30" stroke={strokeColor} strokeWidth="1" />
            <text x="25" y="80" fill={strokeColor} fontSize="5.5" fontFamily="monospace">OPTICAL_SCAN: PASS</text>
          </svg>
        );
      case 4: // Harsh OS Portfolio
        return (
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            {/* Operating System HUD */}
            <circle cx="50" cy="50" r="42" fill="none" stroke={strokeColor} strokeWidth="1" />
            <circle cx="50" cy="50" r="35" fill="none" stroke={strokeColor} strokeWidth="0.75" strokeDasharray="6, 3" />
            <circle cx="50" cy="50" r="28" fill="none" stroke={strokeColor} strokeWidth="1.5" />
            {/* Orbiting element */}
            <circle cx="50" cy="15" r="3" fill={strokeColor} />
            <line x1="50" y1="50" x2="50" y2="15" stroke={strokeColor} strokeWidth="0.5" />
            <rect x="42" y="42" width="16" height="16" fill={`hsl(${hue}, 95%, 55%, 0.15)`} stroke={strokeColor} strokeWidth="1" />
            <text x="44" y="52" fill={strokeColor} fontSize="5" fontFamily="monospace">SYS_C</text>
          </svg>
        );
      case 5: // DisplayLab Creator Platform
        return (
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            {/* Creator Badge layout */}
            <polygon points="50,15 80,30 80,70 50,85 20,70 20,30" fill="none" stroke={strokeColor} strokeWidth="1.5" />
            <polygon points="50,22 74,34 74,66 50,78 26,66 26,34" fill={`hsl(${hue}, 95%, 55%, 0.1)`} stroke={strokeColor} strokeWidth="0.75" strokeDasharray="3, 3" />
            <circle cx="50" cy="50" r="12" fill="none" stroke={strokeColor} strokeWidth="1.2" />
            <text x="44" y="52" fill={strokeColor} fontSize="7" fontWeight="bold" fontFamily="monospace">LAB</text>
            <text x="35" y="94" fill={strokeColor} fontSize="5" fontFamily="monospace">BADGE.SYS V1.0</text>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      
      {/* 1. PROJECT FILESYSTEM TREE EXPLORER */}
      <div>
        <div style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '0.7rem',
          fontWeight: 700,
          color: 'var(--text-dimmed)',
          letterSpacing: '0.15em',
          marginBottom: '8px',
          textTransform: 'uppercase'
        }}>
          PROJECTS_FILESYSTEM://
        </div>
        <div 
          className="filesystem-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
            gap: '8px'
          }}
        >
          {Object.values(PROJECTS_DATA).map((proj) => {
            const isActive = proj.id === selectedProject.id;
            return (
              <motion.div
                key={proj.id}
                onClick={() => handleFileClick(proj.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: `1px solid ${isActive ? 'var(--primary-color)' : 'rgba(255,255,255,0.06)'}`,
                  background: isActive ? `linear-gradient(135deg, hsl(${hue}, 90%, 55%, 0.1) 0%, transparent 100%)` : 'rgba(0,0,0,0.2)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.3s ease',
                  boxShadow: isActive ? `0 0 10px hsl(${hue}, 90%, 55%, 0.2)` : 'none'
                }}
              >
                <FileCode size={14} style={{ color: isActive ? 'var(--primary-color)' : 'var(--text-dimmed)' }} />
                <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                  <span 
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      fontWeight: isActive ? 'bold' : 'normal',
                      color: isActive ? 'var(--primary-color)' : 'var(--text-primary)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {proj.fileName}
                  </span>
                  <span style={{ fontSize: '0.55rem', color: 'var(--text-dimmed)' }}>{proj.size}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <hr style={{ border: '0', borderTop: '1px dashed rgba(255, 255, 255, 0.08)' }} />

      {/* 2. DYNAMIC RECORD INSPECTOR PANEL */}
      <motion.div
        key={selectedProject.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'rgba(0, 0, 0, 0.25)',
          border: '1px solid rgba(255, 255, 255, 0.03)',
          borderRadius: 'var(--radius-md)',
          padding: '16px',
          overflowY: 'auto'
        }}
      >
        <div>
          {/* ── MISSION BRIEF HEADER ── */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              {/* Status + Type row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px', flexWrap: 'wrap' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 800,
                  color: selectedProject.statusColor,
                  border: `1px solid ${selectedProject.statusColor}`,
                  padding: '2px 7px', borderRadius: '3px',
                  boxShadow: `0 0 8px ${selectedProject.statusColor}40`,
                  letterSpacing: '0.1em'
                }}>
                  STATUS: {selectedProject.status}
                </span>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                  color: 'var(--text-dimmed)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  padding: '2px 7px', borderRadius: '3px',
                  background: 'rgba(255,255,255,0.02)'
                }}>
                  {selectedProject.type}
                </span>
              </div>
              <h3 style={{
                fontFamily: 'var(--font-heading)', fontSize: '1rem',
                fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2
              }}>
                {selectedProject.title}
              </h3>
            </div>
            {/* SVG HUD */}
            <div style={{
              width: '46px', height: '46px', flexShrink: 0,
              background: 'rgba(0,0,0,0.3)', borderRadius: 'var(--radius-sm)',
              border: '1px solid rgba(255,255,255,0.05)', padding: '2px', marginLeft: '8px'
            }}>
              {renderProjectHUD(selectedProject.id)}
            </div>
          </div>

          {/* ── MISSION BRIEF ── */}
          <div style={{
            borderLeft: '2px solid var(--primary-color)', paddingLeft: '8px',
            marginBottom: '10px'
          }}>
            <div style={{ fontSize: '0.6rem', color: 'var(--text-dimmed)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', marginBottom: '2px' }}>MISSION_BRIEF:</div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-dimmed)', lineHeight: '1.4', margin: 0 }}>{selectedProject.mission}</p>
          </div>

          <p style={{
            fontSize: '0.77rem', color: 'var(--text-primary)',
            lineHeight: '1.5', marginBottom: '10px', opacity: 0.9
          }}>
            {selectedProject.desc}
          </p>

          {/* ── IMPACT METRICS ── */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '10px' }}>
            {selectedProject.impact.map((metric, i) => (
              <motion.div
                key={metric}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '4px',
                  padding: '3px 8px', borderRadius: '4px',
                  background: `${selectedProject.statusColor}12`,
                  border: `1px solid ${selectedProject.statusColor}30`,
                  fontSize: '0.6rem', fontFamily: 'var(--font-mono)',
                  color: selectedProject.statusColor, fontWeight: 700
                }}
              >
                <CheckCircle size={9} />
                {metric}
              </motion.div>
            ))}
          </div>

          {/* ── STACK BADGES ── */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '12px' }}>
            {selectedProject.stack.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                  color: 'var(--primary-color)',
                  background: 'rgba(255,255,255,0.03)',
                  padding: '3px 8px', borderRadius: '4px',
                  border: '1px solid var(--border-color)',
                  display: 'flex', alignItems: 'center', gap: '4px'
                }}
              >
                <Cpu size={9} />{tag}
              </motion.span>
            ))}
          </div>

          {/* ── ROLE + CHALLENGE ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.73rem', marginBottom: '10px' }}>
            <div style={{ borderLeft: '2px solid var(--primary-color)', paddingLeft: '8px' }}>
              <strong style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px', fontSize: '0.65rem' }}>
                <Award size={11} style={{ color: 'var(--primary-color)' }} /> Role:
              </strong>
              <span style={{ color: 'var(--text-dimmed)' }}>{selectedProject.role}</span>
            </div>
            <div style={{ borderLeft: '2px solid #f59e0b', paddingLeft: '8px' }}>
              <strong style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px', fontSize: '0.65rem' }}>
                <AlertCircle size={11} style={{ color: '#f59e0b' }} /> Challenge Overcome:
              </strong>
              <span style={{ color: 'var(--text-dimmed)' }}>{selectedProject.challenges}</span>
            </div>
          </div>
        </div>

        {/* Demo Links */}
        <div style={{
          display: 'flex',
          gap: '10px',
          borderTop: '1px dashed rgba(255,255,255,0.06)',
          paddingTop: '12px',
          marginTop: '6px'
        }}>
          <a
            href={selectedProject.live}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => SoundManager.playBeep(1400, 0.06)}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '8px',
              fontSize: '0.75rem',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
              color: '#050608',
              background: 'var(--primary-color)',
              borderRadius: 'var(--radius-sm)',
              boxShadow: '0 0 10px var(--primary-glow)',
              transition: 'all 0.3s ease'
            }}
            className="glow-on-hover"
          >
            <Globe size={12} />
            LIVE_LINK.DLL
          </a>
          <a
            href={selectedProject.code}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => SoundManager.playBeep(1400, 0.06)}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '8px',
              fontSize: '0.75rem',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-primary)',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: 'var(--radius-sm)',
              transition: 'all 0.3s ease'
            }}
            className="btn-outline-hover"
          >
            <GithubIcon size={12} style={{ color: 'var(--primary-color)' }} />
            SOURCE_CODE.BAT
          </a>
        </div>
      </motion.div>
    </div>
  );
}
