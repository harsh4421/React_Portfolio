import { useEffect, useRef } from 'react';

export default function BackgroundEffects({ hue = 170, active = true, speedMultiplier = 1.0 }) {
  const safeHue = isNaN(hue) || hue === null ? 170 : hue;
  const safeSpeed = isNaN(speedMultiplier) || speedMultiplier === null ? 1.0 : speedMultiplier;
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };
    // Initialize mouse in middle
    mouseRef.current.x = window.innerWidth / 2;
    mouseRef.current.y = window.innerHeight / 2;
    mouseRef.current.targetX = window.innerWidth / 2;
    mouseRef.current.targetY = window.innerHeight / 2;

    window.addEventListener('mousemove', handleMouseMove);

    // Initialize particles (little floating square dots / code fragments)
    const particleCount = 40;
    const particles = [];
    const charList = ['0', '1', '{', '}', ';', '=>', '[]', '$', '<>', '/'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 8 + 4,
        speedY: -(Math.random() * 0.5 + 0.2),
        speedX: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.5 + 0.1,
        text: charList[Math.floor(Math.random() * charList.length)],
        type: Math.random() > 0.5 ? 'char' : 'dot'
      });
    }

    let animationFrameId;
    let gridOffset = 0;

    const render = () => {
      // Clear with dark tech background
      ctx.fillStyle = '#0b0c0f';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Lerp mouse movement for smooth cursor glow lag
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // 1. Draw Mouse-Reactive Glow Spotlight
      const radialGlow = ctx.createRadialGradient(
        mouse.x, mouse.y, 10,
        mouse.x, mouse.y, 450
      );
      radialGlow.addColorStop(0, `hsla(${safeHue}, 95%, 55%, 0.12)`);
      radialGlow.addColorStop(0.5, `hsla(${safeHue}, 95%, 55%, 0.03)`);
      radialGlow.addColorStop(1, 'transparent');
      
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Draw Futuristic Grid System with parallax/scroll
      gridOffset += 0.15 * safeSpeed;
      const gridSize = 60;
      ctx.strokeStyle = `hsla(${safeHue}, 80%, 40%, 0.06)`;
      ctx.lineWidth = 1;

      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Horizontal lines (moving down)
      const startY = (gridOffset % gridSize);
      for (let y = startY; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw subtle intersections/nodes on the grid
      ctx.fillStyle = `hsla(${safeHue}, 90%, 55%, 0.12)`;
      for (let x = 0; x < canvas.width; x += gridSize * 2) {
        for (let y = (gridOffset % (gridSize * 2)); y < canvas.height; y += gridSize * 2) {
          ctx.fillRect(x - 1.5, y - 1.5, 3, 3);
        }
      }

      // 3. Draw Floating Code Fragments / Particles
      particles.forEach((p) => {
        // Move particle
        p.y += p.speedY * safeSpeed;
        p.x += p.speedX * safeSpeed;

        // Reset if goes off top or sides
        if (p.y < -20) {
          p.y = canvas.height + 20;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -20 || p.x > canvas.width + 20) {
          p.x = Math.random() * canvas.width;
        }

        // Apply mouse interaction (push particles away slightly)
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150;
          p.x += (dx / dist) * force * 1.5;
          p.y += (dy / dist) * force * 1.5;
        }

        // Draw
        ctx.fillStyle = `hsla(${safeHue}, 95%, 60%, ${p.opacity})`;
        if (p.type === 'char') {
          ctx.font = `${p.size}px monospace`;
          ctx.fillText(p.text, p.x, p.y);
        } else {
          ctx.fillRect(p.x, p.y, p.size / 3, p.size / 3);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [active, safeHue, safeSpeed]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
}
