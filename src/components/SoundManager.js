// SoundManager.js - Browser-synthesized Web Audio API sound effects for HarshOS
let audioCtx = null;
let isSoundEnabled = false;

// Check localStorage for persist state
try {
  const persisted = localStorage.getItem('harshos_sound');
  isSoundEnabled = persisted === 'true';
} catch (e) {
  isSoundEnabled = false;
}

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export const SoundManager = {
  setEnabled(enabled) {
    isSoundEnabled = enabled;
    try {
      localStorage.setItem('harshos_sound', enabled ? 'true' : 'false');
    } catch (e) {}
    if (enabled) {
      initAudio();
    }
  },

  isEnabled() {
    return isSoundEnabled;
  },

  // Click keyboard key sound: very quick, tiny pop
  playKey() {
    if (!isSoundEnabled) return;
    try {
      const ctx = initAudio();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      // Randomize frequency slightly to sound like different typewriter keys
      const freq = 600 + Math.random() * 400;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.type = 'triangle';
      
      gainNode.gain.setValueAtTime(0.015, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  },

  // Standard short beep
  playBeep(frequency = 900, duration = 0.08) {
    if (!isSoundEnabled) return;
    try {
      const ctx = initAudio();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      
      gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      
      osc.start();
      osc.stop(ctx.currentTime + duration + 0.02);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  },

  // Double beep for success
  playSuccess() {
    if (!isSoundEnabled) return;
    this.playBeep(880, 0.06);
    setTimeout(() => {
      this.playBeep(1320, 0.08);
    }, 70);
  },

  // Deep synth power-up drone sweep
  playBoot() {
    if (!isSoundEnabled) return;
    try {
      const ctx = initAudio();
      const duration = 2.8;
      const now = ctx.currentTime;
      
      // Master filter to sweep low-pass frequency
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(60, now);
      filter.frequency.exponentialRampToValueAtTime(1200, now + duration);
      filter.connect(ctx.destination);
      
      const oscs = [];
      const gains = [];
      
      // Stacking sawtooth oscillators for a fat rich drone
      const notes = [65.41, 130.81, 196.00, 261.63, 392.00]; // C2, C3, G3, C4, G4
      
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = idx % 2 === 0 ? 'sawtooth' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        
        // Slightly detune for chorus effect
        osc.detune.setValueAtTime((Math.random() - 0.5) * 15, now);
        
        // Slide frequencies slightly upwards
        osc.frequency.linearRampToValueAtTime(freq * 1.05, now + duration);
        
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.04, now + 0.4);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
        
        osc.connect(gain);
        gain.connect(filter);
        
        osc.start();
        osc.stop(now + duration + 0.1);
        
        oscs.push(osc);
        gains.push(gain);
      });
    } catch (e) {
      console.warn("Audio error:", e);
    }
  },

  // Glitch static/error sound
  playGlitch() {
    if (!isSoundEnabled) return;
    try {
      const ctx = initAudio();
      const now = ctx.currentTime;
      const duration = 0.5;
      
      // Create noise buffer
      const bufferSize = ctx.sampleRate * duration;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      
      // Glitch filter
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800, now);
      filter.Q.setValueAtTime(3.0, now);
      
      // Modulate filter frequency rapidly
      for (let i = 0; i < 10; i++) {
        const timeOffset = (i / 10) * duration;
        filter.frequency.setValueAtTime(100 + Math.random() * 3000, now + timeOffset);
      }
      
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.08, now);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      
      noise.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      noise.start();
      noise.stop(now + duration);
    } catch (e) {
      // Fallback simple harsh sweep
      this.playBeep(200, 0.3);
    }
  },

  // Power off descending sweep
  playPowerOff() {
    if (!isSoundEnabled) return;
    try {
      const ctx = initAudio();
      const now = ctx.currentTime;
      const duration = 0.6;
      
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + duration);
      
      gainNode.gain.setValueAtTime(0.04, now);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      
      osc.start();
      osc.stop(now + duration + 0.05);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }
};
