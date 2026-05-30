import { motion } from 'framer-motion';
import { Terminal, Award, BookOpen, Rocket, CheckCircle2 } from 'lucide-react';

const TIMELINE_DATA = [
  {
    year: '2022',
    title: 'MISSION_INIT: CLINICAL FRONTEND',
    subtitle: 'Frontend Developer Intern @ Innovate Labs',
    icon: BookOpen,
    logs: [
      'Rendered pixel-perfect layouts from Figma design specs.',
      'Speed-optimized clinical booking calendars reducing page load by 35%.',
      'Acquired core mastery of ES6 Javascript, HTML5 Semantic Nodes, and CSS Flexbox.'
    ]
  },
  {
    year: '2023',
    title: 'MISSION_STEP: CLIENT GATEWAY',
    subtitle: 'React Specialist @ Tech Agency Contract',
    icon: Terminal,
    logs: [
      'Refactored legacy applications to single page applications (SPAs).',
      'Designed and coded a reusable UI library adopted by 4 team nodes.',
      'Mastered React hooks, state management, and optimized render trees.'
    ]
  },
  {
    year: '2024',
    title: 'MISSION_RUN: FREELANCE PROTOCOLS',
    subtitle: 'Full-Stack Developer & DSA Scholar',
    icon: Award,
    logs: [
      'Built 15+ custom client web platforms, handling full lifecycle operations.',
      'Integrated Express REST API routes, schema validation, and SQL/NoSQL databases.',
      'Studied Data Structures & Algorithms, reducing client database query overheads by 40%.'
    ]
  },
  {
    year: '2025',
    title: 'MISSION_UPGRADE: HARSH_OS BUILD',
    subtitle: 'Advanced Systems Frontend Architect',
    icon: Rocket,
    logs: [
      'Engineered interactive dashboard frameworks using Framer Motion and canvas overlays.',
      'Configured real-time sound synthesis interfaces utilizing Web Audio APIs.',
      'Specialized in premium micro-interactions, canvas grids, and custom styling systems.'
    ]
  }
];

export default function MissionTimeline({ hue }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -15 },
    show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 80 } }
  };

  return (
    <div style={{ padding: '4px', overflowY: 'auto', height: '100%' }}>
      <div style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '0.7rem',
        fontWeight: 700,
        color: 'var(--text-dimmed)',
        letterSpacing: '0.15em',
        marginBottom: '16px',
        textTransform: 'uppercase'
      }}>
        MISSION_LOGS_DB://
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        style={{
          position: 'relative',
          paddingLeft: '20px',
          borderLeft: `1px solid hsl(${hue}, 90%, 55%, 0.2)`
        }}
      >
        {TIMELINE_DATA.map((milestone, index) => {
          const Icon = milestone.icon;
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              style={{
                position: 'relative',
                marginBottom: '24px'
              }}
            >
              {/* Timeline dot node */}
              <div style={{
                position: 'absolute',
                left: '-26px',
                top: '4px',
                width: '11px',
                height: '11px',
                borderRadius: '50%',
                backgroundColor: '#050608',
                border: `2px solid hsl(${hue}, 90%, 55%)`,
                boxShadow: `0 0 6px hsl(${hue}, 90%, 55%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 5
              }}>
                <span className="blink-dot" style={{
                  width: '3px',
                  height: '3px',
                  borderRadius: '50%',
                  backgroundColor: `hsl(${hue}, 90%, 55%)`
                }} />
              </div>

              {/* Log Card */}
              <div 
                className="mission-card"
                style={{
                  background: 'rgba(0, 0, 0, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.04)',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px',
                  transition: 'all 0.3s ease'
                }}
              >
                {/* Year Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    color: `hsl(${hue}, 90%, 55%)`,
                    textShadow: `0 0 8px hsl(${hue}, 90%, 55%, 0.4)`
                  }}>
                    [ CYCLE_{milestone.year} ]
                  </span>
                  <Icon size={14} style={{ color: 'var(--text-dimmed)' }} />
                </div>

                <h4 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '2px'
                }}>
                  {milestone.title}
                </h4>
                <p style={{
                  fontSize: '0.7rem',
                  color: 'var(--text-dimmed)',
                  marginBottom: '10px',
                  fontWeight: 500
                }}>
                  {milestone.subtitle}
                </p>

                {/* Sublogs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {milestone.logs.map((log, lidx) => (
                    <div key={lidx} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '6px',
                      fontSize: '0.72rem',
                      lineHeight: '1.4',
                      color: 'var(--text-primary)',
                      opacity: 0.9
                    }}>
                      <CheckCircle2 size={11} style={{ color: `hsl(${hue}, 85%, 45%)`, marginTop: '2px', flexShrink: 0 }} />
                      <span>{log}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
