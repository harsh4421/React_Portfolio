import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Terminal, Folder, Cpu, Flame, AlertOctagon, ChevronDown, ChevronUp } from 'lucide-react';
import { SoundManager } from './SoundManager';
import ProjectDetails from './ProjectDetails';
import MissionTimeline from './MissionTimeline';
import SystemHUD from './SystemHUD';
import './TerminalConsole.css';

// ── Data ─────────────────────────────────────────────────────────────────────

const SKILLS_DATA = [
  { name: 'React.js / Next.js', level: 90 },
  { name: 'JavaScript (ES6+)', level: 85 },
  { name: 'HTML5 & CSS3', level: 95 },
  { name: 'TypeScript', level: 70 },
  { name: 'Node.js & Express', level: 78 },
  { name: 'MongoDB / SQL', level: 72 },
  { name: 'Git & DevOps', level: 82 }
];

// Hardcoded AI FAQ responses
const AI_RESPONSES = {
  'who are you': ['I am HARSH_OS AI v2.0 — Harsh Kumar\'s intelligent portfolio assistant.', 'I can answer questions about projects, skills, and hiring.'],
  'who is harsh': ['Harsh Kumar is a Full Stack Developer & React Specialist.', 'He builds modern web apps with React, Node.js, and MongoDB.', 'Currently open to full-time roles & freelance contracts.'],
  'what can you build': ['Full-stack web applications', 'React dashboards & SPAs', 'REST APIs with Node.js + Express', 'E-commerce & payment systems', 'CLI tools & developer portfolio sites'],
  'tech stack': ['Frontend: React, Next.js, TypeScript, CSS/Tailwind', 'Backend: Node.js, Express, REST APIs', 'Database: MongoDB, MySQL', 'Tools: Git, Vite, Vercel, Netlify'],
  'hire': ['Harsh is open to work! Type "sudo hire harsh" to send a signal.', 'Reach him at the contact section or type "contact" to start.'],
  'projects': ['Key projects include: Bill Splitter, Quiz Platform, Clinic Web App, HarshOS, Display Lab.', 'Type "projects" to see full project dossiers.'],
  'experience': ['3+ years of frontend & full-stack development.', 'Worked on freelance contracts and client-facing MVPs.', 'Type "experience" to see the timeline.'],
  'location': ['Based in India 🇮🇳. Available for remote work globally.'],
  'email': ['Use the "contact" command to reach Harsh through the built-in inquiry wizard.'],
  'salary': ['Harsh is open to negotiation based on role scope. Contact him directly for details.'],
  'default': ['I don\'t have a specific answer for that.', 'Try asking about: projects, skills, tech stack, hiring, or experience.', 'Type "help" for all available commands.']
};

const getAIResponse = (query) => {
  const q = query.toLowerCase().trim();
  for (const [key, response] of Object.entries(AI_RESPONSES)) {
    if (key !== 'default' && (q.includes(key) || key.includes(q))) {
      return response;
    }
  }
  return AI_RESPONSES['default'];
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function TerminalConsole({ hue, setHue, animSpeed, setAnimSpeed }) {
  const getPersisted = (key, fallback) => {
    try {
      const val = localStorage.getItem(key);
      if (val === null) return fallback;
      if (val === 'true') return true;
      if (val === 'false') return false;
      const num = parseFloat(val);
      return isNaN(num) ? val : num;
    } catch (e) { return fallback; }
  };

  // Hardware states
  const [blur, setBlur] = useState(() => getPersisted('harshos_blur', 16));
  const [glow, setGlow] = useState(() => getPersisted('harshos_glow', 1.0));
  const [powerOn, setPowerOn] = useState(true);
  const [matrixActive, setMatrixActive] = useState(() => getPersisted('harshos_matrix', false));
  const [scanlinesActive, setScanlinesActive] = useState(() => getPersisted('harshos_scanlines', true));
  const [fontSize, setFontSize] = useState(() => getPersisted('harshos_fontsize', 14));
  const [soundOn, setSoundOn] = useState(() => getPersisted('harshos_sound', false));
  const [panelCollapsed, setPanelCollapsed] = useState(false);

  // Terminal state — each line is { text, type } instead of plain string
  const [history, setHistory] = useState([
    { text: 'HARSH_OS [Version 2.0.5]', type: 'info' },
    { text: '(c) 2026 Harsh Corporation. All rights reserved.', type: 'dimmed' },
    { text: '', type: 'info' },
    { text: 'SYSTEM ONLINE. NEURAL LINK SECURED.', type: 'success' },
    { text: 'TYPE "help" FOR LIST OF SYSTEM DECRYPT SCRIPTS.', type: 'info' },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [isTyping, setIsTyping] = useState(false); // lock input while typewriter runs

  const availableCommands = [
    'help', 'about', 'skills', 'projects', 'experience',
    'contact', 'resume', 'socials', 'clear', 'theme',
    'matrix', 'scanlines', 'shutdown', 'hack', 'admin', 'sudo',
    'whoami', 'neofetch', 'date', 'ls', 'dir', 'ping', 'uname',
    'ask'
  ];

  const [activeInspectorView, setActiveInspectorView] = useState('sysinfo');
  const [selectedProjectId, setSelectedProjectId] = useState(1);
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const [wizardStep, setWizardStep] = useState(0);
  const [wizardData, setWizardData] = useState({ name: '', email: '', type: '', budget: '', msg: '' });

  const canvasRef = useRef(null);
  const logEndRef = useRef(null);
  const inputRef = useRef(null);
  const konamiRef = useRef([]);
  const soundOnRef = useRef(soundOn);

  useEffect(() => { soundOnRef.current = soundOn; }, [soundOn]);

  const focusTerminal = () => { if (inputRef.current) inputRef.current.focus(); };

  useEffect(() => {
    if (logEndRef.current) logEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Persist all settings
  useEffect(() => {
    document.documentElement.style.setProperty('--console-hue', hue);
    document.documentElement.style.setProperty('--console-blur', `${blur}px`);
    document.documentElement.style.setProperty('--console-glow', glow);
    document.documentElement.style.setProperty('--console-fontsize', `${fontSize}px`);
    document.documentElement.style.setProperty('--console-animspeed', `${1 / animSpeed}s`);
    try {
      localStorage.setItem('harshos_hue', hue);
      localStorage.setItem('harshos_blur', blur);
      localStorage.setItem('harshos_glow', glow);
      localStorage.setItem('harshos_fontsize', fontSize);
      localStorage.setItem('harshos_animspeed', animSpeed);
      localStorage.setItem('harshos_matrix', matrixActive);
      localStorage.setItem('harshos_scanlines', scanlinesActive);
      localStorage.setItem('harshos_sound', soundOn);
    } catch (e) {}
  }, [hue, blur, glow, fontSize, animSpeed, matrixActive, scanlinesActive, soundOn]);

  useEffect(() => { SoundManager.setEnabled(soundOn); }, [soundOn]);

  // ── Konami Code ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const konamiSequence = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    const handleKeyDown = (e) => {
      const seq = konamiRef.current;
      seq.push(e.key);
      if (seq.length > konamiSequence.length) seq.shift();
      const match = seq.every((val, idx) => val.toLowerCase() === konamiSequence[idx].toLowerCase());
      if (match) { konamiRef.current = []; triggerKonami(); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // ── Matrix Canvas ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (!matrixActive || !powerOn) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    const columns = Math.floor(canvas.width / 14);
    const drops = Array(columns).fill(1);
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$#@%&*()";
    let animationId;
    const drawMatrix = () => {
      ctx.fillStyle = 'rgba(5, 6, 8, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = `hsl(${hue}, 90%, 50%)`;
      ctx.font = '12px monospace';
      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * 14, drops[i] * 14);
        if (drops[i] * 14 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      animationId = requestAnimationFrame(drawMatrix);
    };
    animationId = requestAnimationFrame(drawMatrix);
    return () => { cancelAnimationFrame(animationId); window.removeEventListener('resize', resizeCanvas); };
  }, [matrixActive, powerOn, hue]);

  // ── Typewriter helper ────────────────────────────────────────────────────────
  const typeLines = useCallback((lines, baseDelay = 40) => {
    setIsTyping(true);
    let idx = 0;
    const step = () => {
      if (idx >= lines.length) { setIsTyping(false); return; }
      const line = lines[idx];
      setHistory(prev => [...prev, typeof line === 'string' ? { text: line, type: 'info' } : line]);
      if (soundOnRef.current) SoundManager.playKey();
      idx++;
      setTimeout(step, baseDelay + Math.random() * 30);
    };
    setTimeout(step, 30);
  }, []);

  // ── Power toggle ─────────────────────────────────────────────────────────────
  const togglePower = () => {
    if (!powerOn) {
      SoundManager.playBeep(600, 0.15);
      setHistory([
        { text: 'POWER COMMENCING...', type: 'info' },
        { text: 'LOADING FIRMWARE DIALS...', type: 'info' },
        { text: 'CONNECTING ANALOG CODES ... [ SUCCESS ]', type: 'success' },
        { text: 'SYSTEM TERMINAL RUNNING. TYPE "help" FOR SCRIPTS.', type: 'info' }
      ]);
      setPowerOn(true);
    } else {
      SoundManager.playPowerOff();
      setPowerOn(false);
      setHistory([]);
      setWizardStep(0);
    }
  };

  // ── Theme presets ─────────────────────────────────────────────────────────────
  const applyPreset = (presetName) => {
    SoundManager.playBeep(1200, 0.06);
    switch (presetName) {
      case 'cyberpunk': setHue(290); setGlow(1.5); setBlur(16); setScanlinesActive(true); setMatrixActive(false); break;
      case 'matrix':    setHue(120); setGlow(1.2); setBlur(12); setScanlinesActive(true); setMatrixActive(true);  break;
      case 'toxic':     setHue(80);  setGlow(1.8); setBlur(10); setScanlinesActive(true); setMatrixActive(false); break;
      case 'amber':     setHue(30);  setGlow(1.0); setBlur(14); setScanlinesActive(true); setMatrixActive(false); break;
      case 'synthwave': setHue(330); setGlow(1.6); setBlur(20); setScanlinesActive(true); setMatrixActive(false); break;
      case 'neon-cyan': setHue(170); setGlow(1.1); setBlur(16); setScanlinesActive(true); setMatrixActive(false); break;
      case 'light-neon':setHue(200); setGlow(0.6); setBlur(6);  setScanlinesActive(false);setMatrixActive(false); break;
      default: break;
    }
  };

  // ── Keyboard nav ──────────────────────────────────────────────────────────────
  const handleInputKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!cmdHistory.length) return;
      const newIdx = historyIdx < cmdHistory.length - 1 ? historyIdx + 1 : historyIdx;
      setHistoryIdx(newIdx);
      setInputVal(cmdHistory[cmdHistory.length - 1 - newIdx]);
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx <= 0) { setHistoryIdx(-1); setInputVal(''); }
      else { const newIdx = historyIdx - 1; setHistoryIdx(newIdx); setInputVal(cmdHistory[cmdHistory.length - 1 - newIdx]); }
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      const cur = inputVal.trim().toLowerCase();
      if (!cur) return;
      const match = availableCommands.find(cmd => cmd.startsWith(cur));
      if (match) { setInputVal(match); SoundManager.playKey(); }
    }
  };

  // ── Easter Egg: Konami ────────────────────────────────────────────────────────
  const triggerKonami = () => {
    SoundManager.playSuccess();
    setHue(120); setGlow(1.8); setMatrixActive(true); setScanlinesActive(true); setAdminUnlocked(true);
    setActiveInspectorView('skills');
    confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 }, colors: ['#22c55e','#10b981','#ffffff'] });
    typeLines([
      { text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', type: 'warn' },
      { text: '!!! SECURITY COMPROMISE: KONAMI CHEAT DETECTED !!!', type: 'error' },
      { text: 'SYS_ACCESS: UNRESTRICTED OVERRIDE ACTIVATED', type: 'warn' },
      { text: 'ADMIN COMMANDS INTEGRITY UNLOCKED.', type: 'success' },
      { text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', type: 'warn' },
    ]);
  };

  // ── Easter Egg: hack ──────────────────────────────────────────────────────────
  const triggerFakeHack = () => {
    const lines = [
      { text: 'INITIALIZING BRUTE FORCE LINK DETECTOR...', type: 'warn' },
      { text: 'CONNECTING GATEWAY TARGET IP: 185.22.4.120...', type: 'info' },
      { text: 'SENDING ENCRYPTED BUFFERS [PORT 22] ..... SSH-2.0-OpenSSH_8.2p1', type: 'info' },
      { text: 'INTRUSION INTEGRITY DECODED ... [ BYPASSED ]', type: 'success' },
      { text: 'DOWNLOADING REMOTE MASTER DIRECTORIES...', type: 'info' },
      { text: 'SECURE ROOT FILE ACCESS GRANTED ..... UID=0(root) GID=0(root)', type: 'success' },
      { text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', type: 'warn' },
      { text: '██   ██  █████   ██████ ██   ██ ███████ ██████  ', type: 'easter' },
      { text: '██   ██ ██   ██ ██      ██  ██  ██      ██   ██ ', type: 'easter' },
      { text: '███████ ███████ ██      █████   █████   ██   ██ ', type: 'easter' },
      { text: '██   ██ ██   ██ ██      ██  ██  ██      ██   ██ ', type: 'easter' },
      { text: '██   ██ ██   ██  ██████ ██   ██ ███████ ██████  ', type: 'easter' },
      { text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', type: 'warn' },
      { text: 'HOST MAINFRAME TOTALLY ACQUIRED. HACK PROTOCOLS DONE.', type: 'success' },
    ];
    typeLines(lines, 200);
  };

  // ── Easter Egg: glitch shutdown ───────────────────────────────────────────────
  const triggerSystemGlitch = () => {
    setGlitchActive(true);
    SoundManager.playGlitch();
    const steps = [
      { text: '!!! SECURITY CRISIS: INTRUSION DIRECTIVE DETECTED !!!', type: 'error' },
      { text: 'EXECUTING DIRECT KERNEL DELETE: sudo rm -rf /', type: 'error' },
      { text: 'DELETING /bin/kernel ........................ [ REMOVED ]', type: 'error' },
      { text: 'DELETING /etc/configs ....................... [ REMOVED ]', type: 'error' },
      { text: 'DELETING /sys/drivers ....................... [ REMOVED ]', type: 'error' },
      { text: 'DELETING /var/logs .......................... [ REMOVED ]', type: 'error' },
      { text: 'DELETING HOST PORTFOLIO DATABASE ............ [ ERASING ]', type: 'error' },
      { text: 'SYSTEM CRITICAL EXCEPTION ERR_0x00A78F', type: 'error' },
    ];
    typeLines(steps, 280);
    setTimeout(() => { setGlitchActive(false); togglePower(); }, steps.length * 300 + 1200);
  };

  // ── Command execution ─────────────────────────────────────────────────────────
  const executeCommand = (cmd) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    setHistory(prev => [...prev, { text: `harsh@dev_terminal:~$_ ${trimmed}`, type: 'cmd' }]);
    setCmdHistory(prev => [...prev, trimmed]);
    setHistoryIdx(-1);
    if (soundOn) SoundManager.playBeep(900, 0.05);

    if (wizardStep > 0) { handleWizardInput(trimmed); setInputVal(''); return; }

    const args = trimmed.toLowerCase().split(' ');
    const mainCmd = args[0];

    switch (mainCmd) {

      case 'help':
      case 'ls':
      case 'dir':
        typeLines([
          { text: '┌─── HARSH_OS :: FILESYSTEM DIRECTORY ─────────────────────────┐', type: 'info' },
          { text: '│                                                               │', type: 'info' },
          { text: '│  ABOUT.SYS      ➔  Agent profile & status report             │', type: 'success' },
          { text: '│  SKILLS.DB      ➔  Tech stack telemetry level diagnostics     │', type: 'success' },
          { text: '│  PROJECT.EXE    ➔  Mount the full projects catalog            │', type: 'success' },
          { text: '│  JOURNEY.LOG    ➔  Career timeline & mission logs             │', type: 'success' },
          { text: '│  RESUME.PDF     ➔  Unlock & download compiled resume          │', type: 'success' },
          { text: '│  CONTACT.BAT    ➔  Compile interactive inquiry wizard         │', type: 'success' },
          { text: '│  SOCIALS.NET    ➔  Open secure social gateway channels        │', type: 'success' },
          { text: '│                                                               │', type: 'info' },
          { text: '│  SYSTEM UTILITIES:                                            │', type: 'dimmed' },
          { text: '│  matrix  scanlines  theme <name>  clear  shutdown  ask <q>   │', type: 'dimmed' },
          { text: '│                                                               │', type: 'info' },
          { text: '│  HINT: Try "whoami" | "neofetch" | "sudo hire harsh"          │', type: 'warn' },
          { text: '└───────────────────────────────────────────────────────────────┘', type: 'info' },
        ]);
        break;

      case 'about':
        setActiveInspectorView('sysinfo');
        typeLines([
          { text: '--- DECRYPTED AGENT PROFILE: HARSH KUMAR ---', type: 'info' },
          { text: '  Role     : Full Stack Engineer & React Specialist', type: 'success' },
          { text: '  Exp      : 3+ Years software architecture & MVP builds', type: 'success' },
          { text: '  Location : India 🇮🇳  |  Remote: AVAILABLE', type: 'success' },
          { text: '  Status   : OPEN TO ADVANCED CONTRACT & FULL-TIME NODES', type: 'warn' },
          { text: '  Hint     : Check the right panel for full system profile.', type: 'dimmed' },
        ]);
        break;

      case 'skills':
        setActiveInspectorView('skills');
        typeLines([
          { text: '--- TELEMETRY LEVEL SPECS ---', type: 'info' },
          { text: '  React.js/Next.js [████████████████░] 90%', type: 'success' },
          { text: '  ES6 Javascript   [███████████████░░] 85%', type: 'success' },
          { text: '  HTML5 & CSS3     [█████████████████] 95%', type: 'success' },
          { text: '  TypeScript       [████████████░░░░░] 70%', type: 'success' },
          { text: '  NodeJS & Express [█████████████░░░░] 78%', type: 'success' },
          { text: '  Database models  [████████████░░░░░] 72%', type: 'success' },
          { text: '  Git / DevOps     [██████████████░░░] 82%', type: 'success' },
          { text: '  → Full interactive chart loaded on right panel.', type: 'dimmed' },
        ]);
        break;

      case 'projects':
      case 'project.exe': {
        setActiveInspectorView('projects');
        if (args.length > 1) {
          // projects view 3  OR  projects 3
          const idxArg = args.find(a => !isNaN(parseInt(a)));
          if (idxArg) {
            const num = parseInt(idxArg);
            if (num >= 1 && num <= 5) {
              setSelectedProjectId(num);
              typeLines([{ text: `[ OK ] Mounting project_${num}.exe — dossier loaded on right panel.`, type: 'success' }]);
            } else {
              typeLines([{ text: 'ERR: Project index out of range. Valid: 1-5.', type: 'error' }]);
            }
          }
        } else {
          typeLines([
            { text: '--- PROJECTS FILESYSTEM DIRECTORY ---', type: 'info' },
            { text: '  [1] bill_splitter.exe    → Expense splitting web app', type: 'success' },
            { text: '  [2] quiz_platform.sys    → Interactive MCQ engine', type: 'success' },
            { text: '  [3] clinic_web.dll       → Healthcare booking system', type: 'success' },
            { text: '  [4] harsh_os.bin         → This portfolio — HarshOS', type: 'success' },
            { text: '  [5] display_lab.sys      → Product display showcase', type: 'success' },
            { text: '  ─────────────────────────────────────────────────', type: 'dimmed' },
            { text: '  Type "projects <1-5>" to open project dossier.', type: 'dimmed' },
          ]);
        }
        break;
      }

      case 'experience':
      case 'journey':
        setActiveInspectorView('timeline');
        typeLines([
          { text: '--- MILITARY GRADE WORK LOG HISTORY ---', type: 'info' },
          { text: '  [ 2025 ] MISSION_UPGRADE: HARSH_OS (Portfolio Architect)', type: 'success' },
          { text: '  [ 2024 ] MISSION_RUN: FREELANCE CONTRACTS (Full Stack Dev)', type: 'success' },
          { text: '  [ 2023 ] MISSION_STEP: CLIENT GATEWAY (React Specialist)', type: 'success' },
          { text: '  [ 2022 ] MISSION_INIT: CLINICAL FRONTEND (UI Intern)', type: 'success' },
          { text: '  → Interactive animated timeline loaded on right panel.', type: 'dimmed' },
        ]);
        break;

      case 'contact':
        typeLines([
          { text: '--- COMPILING INQUIRY CONSOLE COMPILER ---', type: 'info' },
          { text: 'Initializing contact variables...', type: 'dimmed' },
          { text: 'Question [1/5]: State your identifier name:', type: 'warn' },
        ]);
        setWizardStep(1);
        break;

      case 'resume':
        typeLines([
          { text: '[ OK ] Reserving download buffer. Generating RESUME.PDF...', type: 'info' },
          { text: 'Redirecting to secure download target...', type: 'success' },
        ]);
        setTimeout(() => window.open('https://github.com', '_blank'), 800);
        break;

      case 'socials':
        typeLines([
          { text: '--- GATEWAY ENCRYPTION KEYS: SOCIAL CHANNELS ---', type: 'info' },
          { text: '  GITHUB   ➔ https://github.com/harshkumar', type: 'success' },
          { text: '  LINKEDIN ➔ https://linkedin.com/in/harshkumar', type: 'success' },
          { text: '  TWITTER  ➔ https://twitter.com/harshkumar', type: 'success' },
        ]);
        break;

      case 'clear':
        setHistory([]);
        break;

      case 'matrix':
        setMatrixActive(!matrixActive);
        typeLines([{ text: `Matrix backdrop overlay: ${!matrixActive ? 'DEPLOYED' : 'UNDEPLOYED'}`, type: matrixActive ? 'warn' : 'success' }]);
        break;

      case 'scanlines':
        setScanlinesActive(!scanlinesActive);
        typeLines([{ text: `Scanlines filter: ${!scanlinesActive ? 'DEPLOYED' : 'UNDEPLOYED'}`, type: !scanlinesActive ? 'success' : 'warn' }]);
        break;

      case 'theme':
        if (args.length > 1) {
          const themeName = args[1];
          const validThemes = ['cyberpunk','matrix','toxic','amber','synthwave','neon-cyan','light-neon'];
          if (validThemes.includes(themeName)) {
            applyPreset(themeName);
            typeLines([{ text: `[ SUCCESS ] HarshOS preset loaded: ${themeName.toUpperCase()}`, type: 'success' }]);
          } else {
            typeLines([{ text: `ERR: Theme "${themeName}" unrecognized. Try: cyberpunk | matrix | toxic | amber | synthwave | neon-cyan`, type: 'error' }]);
          }
        } else {
          typeLines([{ text: 'ERR: Parameter required. Use: "theme <name>"', type: 'error' }]);
        }
        break;

      case 'shutdown':
        togglePower();
        break;

      // ── Easter eggs ──────────────────────────────────────────────────────────

      case 'whoami':
        typeLines([
          { text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', type: 'info' },
          { text: '  ██╗  ██╗ █████╗ ██████╗ ███████╗██╗  ██╗', type: 'easter' },
          { text: '  ██║  ██║██╔══██╗██╔══██╗██╔════╝██║  ██║', type: 'easter' },
          { text: '  ███████║███████║██████╔╝███████╗███████║', type: 'easter' },
          { text: '  ██╔══██║██╔══██║██╔══██╗╚════██║██╔══██║', type: 'easter' },
          { text: '  ██║  ██║██║  ██║██║  ██║███████║██║  ██║', type: 'easter' },
          { text: '  ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝', type: 'easter' },
          { text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', type: 'info' },
          { text: '  USER   : Harsh Kumar', type: 'success' },
          { text: '  ROLE   : Full Stack Developer & React Architect', type: 'success' },
          { text: '  SHELL  : HARSH_OS v2.0.5', type: 'success' },
          { text: '  GROUPS : engineers, developers, creators, builders', type: 'success' },
          { text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', type: 'info' },
        ]);
        break;

      case 'neofetch': {
        const now = new Date();
        typeLines([
          { text: '          .          harsh@harsh_os', type: 'easter' },
          { text: '         /|\\         ─────────────────────────', type: 'easter' },
          { text: '        / | \\        OS     : HARSH_OS v2.0.5', type: 'info' },
          { text: '       /  |  \\       SHELL  : hsh (harsh shell)', type: 'info' },
          { text: '      /   |   \\      UPTIME : ' + now.toLocaleTimeString(), type: 'info' },
          { text: '     /____|____\\     CPU    : Neural Link Chip v9.2', type: 'info' },
          { text: '         |           RAM    : 65536 KB / 131072 KB', type: 'info' },
          { text: '         |           SKILLS : React, Node, TS, MongoDB', type: 'info' },
          { text: '         |           STATUS : Open To Work ✓', type: 'success' },
          { text: '  ████████████████   THEME  : NeonCyan / Cyberpunk', type: 'info' },
          { text: '  ████████████████   EDITOR : VS Code (hardened)', type: 'info' },
        ]);
        break;
      }

      case 'date':
        typeLines([
          { text: new Date().toString(), type: 'success' },
          { text: 'HARSH_OS kernel timestamp verified.', type: 'dimmed' },
        ]);
        break;

      case 'uname':
        typeLines([
          { text: 'HARSH_OS v2.0.5-neural-link #1 SMP Harsh Corporation 2026 x86_64', type: 'success' },
        ]);
        break;

      case 'ping': {
        const target = args[1] || 'harsh.dev';
        const pingLines = [
          { text: `PING ${target} (127.0.0.1) 56(84) bytes of data.`, type: 'info' },
          { text: `64 bytes from ${target}: icmp_seq=1 ttl=64 time=0.${Math.floor(Math.random()*900+100)} ms`, type: 'success' },
          { text: `64 bytes from ${target}: icmp_seq=2 ttl=64 time=0.${Math.floor(Math.random()*900+100)} ms`, type: 'success' },
          { text: `64 bytes from ${target}: icmp_seq=3 ttl=64 time=0.${Math.floor(Math.random()*900+100)} ms`, type: 'success' },
          { text: `--- ${target} ping statistics ---`, type: 'dimmed' },
          { text: `3 packets transmitted, 3 received, 0% packet loss`, type: 'success' },
        ];
        typeLines(pingLines, 300);
        break;
      }

      case 'sudo':
        if (args.length >= 3 && args[1] === 'hire' && args[2] === 'harsh') {
          SoundManager.playSuccess();
          confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 }, colors: ['#06b6d4','#a855f7','#22c55e','#f59e0b'] });
          typeLines([
            { text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', type: 'easter' },
            { text: ' 🎉  HIRE REQUEST SIGNAL TRANSMITTED SUCCESSFULLY!  🎉', type: 'easter' },
            { text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', type: 'easter' },
            { text: '  TARGET       : Harsh Kumar (Full Stack Developer)', type: 'success' },
            { text: '  AVAILABILITY : Immediate', type: 'success' },
            { text: '  SPECIALITY   : React · Node.js · Full Stack Architecture', type: 'success' },
            { text: '  NEXT STEP    : Type "contact" to start the inquiry wizard.', type: 'warn' },
            { text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', type: 'easter' },
          ]);
        } else if (args[1] === 'rm' && trimmed.includes('-rf')) {
          triggerSystemGlitch();
        } else {
          typeLines([{ text: 'ERR: Permission denied. HarshOS host key missing.', type: 'error' }]);
        }
        break;

      case 'hack':
        triggerFakeHack();
        break;

      case 'admin':
        if (adminUnlocked) {
          typeLines([{ text: 'SYS_STATUS: ADMIN STATUS ALREADY GRANTED. Welcome back, agent.', type: 'success' }]);
        } else {
          typeLines([{ text: 'Question: Enter Decrypt Host Admin Code (Hint: Try Konami code):', type: 'warn' }]);
          setWizardStep(99);
        }
        break;

      case 'ask':
        if (args.length < 2) {
          typeLines([
            { text: 'USAGE: ask <your question>', type: 'warn' },
            { text: 'EXAMPLE: ask who is harsh', type: 'dimmed' },
            { text: 'EXAMPLE: ask what can you build', type: 'dimmed' },
          ]);
        } else {
          const query = args.slice(1).join(' ');
          const responses = getAIResponse(query);
          typeLines([
            { text: `AI_ASSISTANT > Query: "${query}"`, type: 'info' },
            ...responses.map(r => ({ text: `  ${r}`, type: 'success' })),
          ]);
        }
        break;

      case 'secret':
      case 'easter':
        typeLines([
          { text: '🔓 EASTER EGG ARCHIVE DETECTED', type: 'easter' },
          { text: '  1. Konami Code (↑↑↓↓←→←→BA) — GOD MODE', type: 'warn' },
          { text: '  2. "sudo hire harsh"          — HIRE SIGNAL', type: 'warn' },
          { text: '  3. "hack"                     — FAKE HACK', type: 'warn' },
          { text: '  4. "sudo rm -rf /"            — SYSTEM GLITCH', type: 'warn' },
          { text: '  5. "neofetch"                 — SYSTEM INFO', type: 'warn' },
          { text: '  6. "whoami"                   — ASCII PROFILE', type: 'warn' },
          { text: '  7. "ask <question>"           — AI ASSISTANT', type: 'warn' },
          { text: '  8. More secrets await... keep exploring 👀', type: 'easter' },
        ]);
        break;

      default:
        typeLines([{ text: `ERR: Script "${trimmed}" not found. Type "help" for archives.`, type: 'error' }]);
        break;
    }

    setInputVal('');
  };

  // ── Wizard ────────────────────────────────────────────────────────────────────
  const handleWizardInput = (input) => {
    const trimmed = input.trim();
    if (!trimmed) {
      typeLines([{ text: 'ERR: Input cannot be empty. Re-compiling...', type: 'error' }]);
      return;
    }
    if (wizardStep === 99) {
      if (trimmed.toLowerCase() === 'uuddlrlrba' || trimmed.toLowerCase() === 'admin') {
        setAdminUnlocked(true);
        SoundManager.playSuccess();
        typeLines([{ text: '[ OK ] AUTHENTICATION UNLOCKED. God mode values loaded.', type: 'success' }]);
      } else {
        SoundManager.playGlitch();
        typeLines([{ text: 'ERR: DECRYPT CODE FAILED. Authentication terminated.', type: 'error' }]);
      }
      setWizardStep(0);
      return;
    }
    if (wizardStep === 1) {
      setWizardData(prev => ({ ...prev, name: trimmed }));
      typeLines([
        { text: `  Name recorded: ${trimmed}`, type: 'success' },
        { text: 'Question [2/5]: Enter diagnostic response email address:', type: 'warn' },
      ]);
      setWizardStep(2);
    } else if (wizardStep === 2) {
      if (!trimmed.includes('@')) {
        typeLines([{ text: 'ERR: Invalid email format. Re-submit email address:', type: 'error' }]);
        return;
      }
      setWizardData(prev => ({ ...prev, email: trimmed }));
      typeLines([
        { text: `  Email recorded: ${trimmed}`, type: 'success' },
        { text: 'Question [3/5]: Choose scope: (Web App | Mobile | Design | Audit)', type: 'warn' },
      ]);
      setWizardStep(3);
    } else if (wizardStep === 3) {
      setWizardData(prev => ({ ...prev, type: trimmed }));
      typeLines([
        { text: `  Scope recorded: ${trimmed}`, type: 'success' },
        { text: 'Question [4/5]: State budget allocation: (e.g. $5k-$10k | $10k+)', type: 'warn' },
      ]);
      setWizardStep(4);
    } else if (wizardStep === 4) {
      setWizardData(prev => ({ ...prev, budget: trimmed }));
      typeLines([
        { text: `  Budget recorded: ${trimmed}`, type: 'success' },
        { text: 'Question [5/5]: Supply your message or project details:', type: 'warn' },
      ]);
      setWizardStep(5);
    } else if (wizardStep === 5) {
      const finalData = { ...wizardData, msg: trimmed };
      typeLines([
        { text: `  Details recorded: ${trimmed}`, type: 'success' },
        { text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', type: 'info' },
        { text: 'TRANSMITTING COMPILED DATA VECTORS...', type: 'warn' },
        { text: `  Client  : ${finalData.name}`, type: 'success' },
        { text: `  Contact : ${finalData.email}`, type: 'success' },
        { text: `  Scope   : ${finalData.type}`, type: 'success' },
        { text: `  Budget  : ${finalData.budget}`, type: 'success' },
        { text: `  Message : ${finalData.msg}`, type: 'success' },
        { text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', type: 'info' },
        { text: '[ SUCCESS ] Packet transmitted. Inquiry compile successful.', type: 'success' },
        { text: '  → Harsh will respond to your email within 24–48 hours.', type: 'dimmed' },
      ]);
      setWizardStep(0);
      setWizardData({ name: '', email: '', type: '', budget: '', msg: '' });
      SoundManager.playSuccess();
    }
  };

  const handleFormSubmit = (e) => { e.preventDefault(); if (!isTyping) executeCommand(inputVal); };
  const triggerHardwareScript = (cmd) => { if (powerOn && !isTyping) executeCommand(cmd); };

  // ── Line type to CSS class ────────────────────────────────────────────────────
  const lineClass = (type) => {
    switch(type) {
      case 'success': return 'terminal-line t-success';
      case 'error':   return 'terminal-line t-error';
      case 'warn':    return 'terminal-line t-warn';
      case 'cmd':     return 'terminal-line t-cmd';
      case 'easter':  return 'terminal-line t-easter';
      case 'dimmed':  return 'terminal-line t-dimmed';
      default:        return 'terminal-line t-info';
    }
  };

  return (
    <div className={`console-desk ${glitchActive ? 'screen-glitch' : ''}`}>

      {/* LEFT: Hardware Control Panel */}
      <motion.div
        className="hardware-panel card"
        animate={{ width: panelCollapsed ? 52 : 360, opacity: panelCollapsed ? 0.6 : 1 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {/* Collapse toggle */}
        <button
          className="panel-collapse-btn"
          onClick={() => setPanelCollapsed(!panelCollapsed)}
          title={panelCollapsed ? 'Expand Panel' : 'Collapse Panel'}
        >
          {panelCollapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
        </button>

        {!panelCollapsed && (
          <>
            <div className="panel-title-bar">
              <span className="panel-screws">⛭</span>
              <span className="panel-label">HARSH_OS SYSTEM PANEL</span>
              <span className="panel-screws">⛭</span>
            </div>

            {/* LED Row */}
            <div className="led-row">
              {[
                { cls: 'led-green',  active: powerOn,       label: 'SYS_PWR' },
                { cls: 'led-yellow', active: wizardStep > 0, label: 'WIZ_ACT' },
                { cls: 'led-cyan',   active: matrixActive,   label: 'MAT_ACT' },
                { cls: 'led-red',    active: adminUnlocked,  label: 'GOD_MOD' },
              ].map(({ cls, active, label }) => (
                <div key={label} className="led-group">
                  <span className={`led-light ${cls} ${active ? 'active' : ''}`} />
                  <span className="led-text">{label}</span>
                </div>
              ))}
            </div>

            {/* Sliders */}
            <div className="sliders-section">
              {[
                { label: 'HUE ROTATION', value: `${hue}°`, min: 0, max: 360, step: 1, val: hue, set: (v) => setHue(parseInt(v)) },
                { label: 'NEON GLOW', value: `${glow}x`, min: 0.5, max: 2.0, step: 0.1, val: glow, set: (v) => setGlow(parseFloat(v)) },
                { label: 'BACKDROP BLUR', value: `${blur}px`, min: 0, max: 30, step: 1, val: blur, set: (v) => setBlur(parseInt(v)) },
                { label: 'CONSOLE FONT', value: `${fontSize}px`, min: 11, max: 18, step: 1, val: fontSize, set: (v) => setFontSize(parseInt(v)) },
                { label: 'ANIM SPEED', value: `${animSpeed}x`, min: 0.5, max: 2.0, step: 0.1, val: animSpeed, set: (v) => setAnimSpeed(parseFloat(v)) },
              ].map(({ label, value, min, max, step, val, set }) => (
                <div key={label} className="slider-container">
                  <div className="slider-header">
                    <label>{label}</label>
                    <span className="slider-value">{value}</span>
                  </div>
                  <input type="range" min={min} max={max} step={step} value={val}
                    onChange={(e) => set(e.target.value)} disabled={!powerOn} />
                </div>
              ))}
            </div>

            {/* Presets */}
            <div className="presets-section">
              <label className="section-divider">COLOR PROTOCOL PRESETS</label>
              <div className="preset-grid">
                {[['cyberpunk','cyb'],['matrix','mat'],['toxic','tox'],['amber','amb'],['synthwave','syn'],['neon-cyan','cya']].map(([name, cls]) => (
                  <motion.button
                    key={name}
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={!powerOn}
                    onClick={() => applyPreset(name)}
                    className={`preset-btn ${cls}`}
                  >
                    {name.toUpperCase().slice(0,5)}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Switches */}
            <div className="switches-section">
              {[
                { label: 'CRT OVERLAY SCANLINES', checked: scanlinesActive, onChange: () => { SoundManager.playBeep(1100,0.05); setScanlinesActive(!scanlinesActive); } },
                { label: 'SOUND SYNTHESIZER', checked: soundOn, onChange: () => { const n=!soundOn; setSoundOn(n); SoundManager.setEnabled(n); if(n) SoundManager.playBeep(880,0.08); } },
                { label: 'SYSTEM MAIN POWER', checked: powerOn, onChange: togglePower, isPower: true },
              ].map(({ label, checked, onChange, isPower }) => (
                <div key={label} className="switch-item">
                  <span className="switch-label">{label}</span>
                  <label className="toggle-lever">
                    <input type="checkbox" checked={checked} onChange={onChange} />
                    <span className={`lever-visual ${isPower ? 'pwr-lever' : ''}`} />
                  </label>
                </div>
              ))}
            </div>

            {/* Quick Script Buttons */}
            <div className="buttons-section">
              <label className="section-divider">RUN CORE SCRIPTS</label>
              <div className="button-grid">
                {[
                  ['help','HELP.BAT'],
                  ['about','ABOUT.SYS'],
                  ['skills','SKILLS.DB'],
                  ['experience','JOURNEY.LOG'],
                  ['projects','PROJECT.EXE'],
                  ['resume','RESUME.PDF'],
                ].map(([cmd, label]) => (
                  <motion.button
                    key={cmd}
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    disabled={!powerOn}
                    onClick={() => triggerHardwareScript(cmd)}
                    className="console-btn"
                  >
                    {label}
                  </motion.button>
                ))}
                <motion.button
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={!powerOn}
                  onClick={() => triggerHardwareScript('contact')}
                  className="console-btn contact-hw-btn"
                >
                  COMPILE_CONTACT.BAT
                </motion.button>
              </div>
            </div>
          </>
        )}
      </motion.div>

      {/* RIGHT: CRT Monitor Frame */}
      <div className={`crt-monitor-frame ${scanlinesActive ? 'crt-effect' : ''}`}>
        <div className="monitor-bezel-shadow" />

        <div className="monitor-inner-screen" onClick={focusTerminal}>
          <canvas ref={canvasRef} className={`matrix-canvas ${matrixActive && powerOn ? 'active' : ''}`} />

          {powerOn ? (
            <div className="os-pane-wrapper">

              {/* LEFT PANE: Terminal */}
              <div className="terminal-pane">
                {/* System HUD Strip */}
                <SystemHUD powerOn={powerOn} />

                <div className="pane-header">
                  <Terminal size={14} />
                  <span>HARSH_OS_CONSOLE://</span>
                  {isTyping && <span className="typing-indicator">▶ PROCESSING...</span>}
                </div>

                <div className="terminal-logs">
                  <AnimatePresence initial={false}>
                    {history.map((line, index) => (
                      <motion.div
                        key={index}
                        className={lineClass(line.type)}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        {line.text}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  <div ref={logEndRef} />
                </div>

                <form className="terminal-prompt" onSubmit={handleFormSubmit}>
                  <span className="prompt-label">harsh@dev_terminal:~$_</span>
                  <input
                    ref={inputRef}
                    type="text"
                    className="prompt-input"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                    autoComplete="off"
                    autoFocus
                    aria-label="Terminal CLI command prompt"
                    disabled={isTyping}
                  />
                  <span className="prompt-cursor">█</span>
                </form>
              </div>

              {/* RIGHT PANE: Visual Inspector */}
              <div className="inspector-pane">
                <div className="pane-header flex-header">
                  <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                    <Folder size={14} />
                    <span>VISUAL_MONITOR://</span>
                  </div>
                  <div className="inspector-tabs">
                    {[
                      { key:'sysinfo', label:'SYS' },
                      { key:'projects', label:'FILES' },
                      { key:'timeline', label:'LOGS' },
                      { key:'skills', label:'SKILLS' },
                    ].map(({ key, label }) => (
                      <motion.button
                        key={key}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`tab-btn ${activeInspectorView === key ? 'active' : ''}`}
                        onClick={(e) => { e.stopPropagation(); SoundManager.playBeep(1200, 0.05); setActiveInspectorView(key); }}
                      >
                        {label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="inspector-body">
                  <AnimatePresence mode="wait">
                    {activeInspectorView === 'sysinfo' && (
                      <motion.div
                        key="sysinfo"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        style={{ padding: '4px', fontSize: '0.8rem', lineHeight: '1.6' }}
                      >
                        <div style={{ fontFamily:'var(--font-heading)', color:'var(--primary-color)', fontSize:'0.9rem', fontWeight:700, marginBottom:'12px' }}>
                          HARSH_OS v2.0.5 SECURITY VERIFIED
                        </div>
                        <div className="sys-gauge-grid">
                          {[
                            { label:'CPU MATRIX PROCESSOR', w:'82%' },
                            { label:'NEURAL INTERACTION BANDWIDTH', w:'55%' },
                            { label:'FIREWALL SHIELD COMPATIBILITY', w:'99%' },
                          ].map(({label, w}) => (
                            <div key={label} className="gauge-item">
                              <span className="gauge-label">{label}</span>
                              <div className="gauge-bar-outer">
                                <motion.div
                                  className="gauge-bar-inner"
                                  initial={{ width: 0 }}
                                  animate={{ width: w }}
                                  transition={{ duration: 1.2, ease: 'easeOut' }}
                                  style={{ background: 'var(--primary-color)' }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                        <hr style={{ border:'none', borderTop:'1px dashed rgba(255,255,255,0.06)', margin:'14px 0' }} />
                        <div style={{ display:'flex', flexDirection:'column', gap:'8px', fontSize:'0.72rem', color:'var(--text-dimmed)' }}>
                          <div><strong>HOST:</strong> Harsh Kumar (Full-Stack Architect)</div>
                          <div><strong>TARGET IP:</strong> 127.0.0.1 (SECURE SOCKETS ACTIVE)</div>
                          <div><strong>HINT:</strong> Type "whoami" · "neofetch" · "sudo hire harsh" · "ask &lt;question&gt;"</div>
                          <div style={{ marginTop:'8px', color:'var(--primary-color)', fontSize:'0.68rem', display:'flex', alignItems:'center', gap:'4px' }}>
                            <Flame size={12} className="pulse-text" /> Unlock secret easter eggs with codes or commands.
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeInspectorView === 'projects' && (
                      <motion.div
                        key="projects"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ProjectDetails
                          activeProjectId={selectedProjectId}
                          onSelectProject={setSelectedProjectId}
                          hue={hue}
                        />
                      </motion.div>
                    )}

                    {activeInspectorView === 'timeline' && (
                      <motion.div
                        key="timeline"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <MissionTimeline hue={hue} />
                      </motion.div>
                    )}

                    {activeInspectorView === 'skills' && (
                      <motion.div
                        key="skills"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        style={{ padding: '4px' }}
                      >
                        <div style={{ fontFamily:'var(--font-heading)', fontSize:'0.7rem', color:'var(--text-dimmed)', letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'14px' }}>
                          HARDWARE DIAGNOSTIC: TECHS INDEX
                        </div>
                        <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
                          {SKILLS_DATA.map((skill, i) => (
                            <motion.div
                              key={skill.name}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.08, duration: 0.3 }}
                              style={{ display:'flex', flexDirection:'column', gap:'4px' }}
                            >
                              <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.72rem' }}>
                                <span style={{ color:'var(--text-primary)', fontWeight:'bold' }}>{skill.name}</span>
                                <span style={{ color:'var(--primary-color)', fontFamily:'var(--font-mono)' }}>{skill.level}%</span>
                              </div>
                              <div className="gauge-bar-outer" style={{ height:'6px' }}>
                                <motion.div
                                  className="gauge-bar-inner"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${skill.level}%` }}
                                  transition={{ duration: 0.8, delay: i * 0.08, ease: 'easeOut' }}
                                  style={{
                                    height: '100%',
                                    background: `linear-gradient(90deg, var(--primary-color) 0%, hsl(${hue}, 90%, 75%) 100%)`,
                                    boxShadow: '0 0 6px var(--primary-glow)'
                                  }}
                                />
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

            </div>
          ) : (
            <div className="dead-screen">
              <div className="static-noise" />
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'10px' }}>
                <AlertOctagon size={24} style={{ color:'#ef4444' }} />
                <span>[ MONITOR OFFLINE ]</span>
                <span style={{ fontSize:'0.7rem', color:'#64748b' }}>FLIP MAIN SYS_POWER LEVER ON DESK SWITCH</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Bottom Dock */}
      <div className="mobile-dock">
        {[['help','?'],['about','👤'],['skills','⚡'],['projects','📁'],['contact','✉']].map(([cmd, icon]) => (
          <button key={cmd} className="dock-btn" onClick={() => triggerHardwareScript(cmd)} disabled={!powerOn}>
            <span>{icon}</span>
            <span>{cmd}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
