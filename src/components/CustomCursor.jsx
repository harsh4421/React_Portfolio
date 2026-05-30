import { useEffect, useRef } from 'react';
import './CustomCursor.css';

/* Daksh-inspired custom cursor: small dot + larger trailing ring */
export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let rX = -100, rY = -100; // ring position (lagged)
    let mX = -100, mY = -100; // actual mouse position
    let rafId;

    const onMove = (e) => {
      mX = e.clientX;
      mY = e.clientY;
      dot.style.transform  = `translate(${mX}px, ${mY}px) translate(-50%, -50%)`;
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      rX = lerp(rX, mX, 0.13);
      rY = lerp(rY, mY, 0.13);
      ring.style.transform = `translate(${rX}px, ${rY}px) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(animate);
    };
    animate();

    // Scale ring on hoverable elements
    const onEnter = () => ring.classList.add('cursor--hover');
    const onLeave = () => ring.classList.remove('cursor--hover');

    const targets = document.querySelectorAll('a, button, [role="tab"]');
    targets.forEach(el => { el.addEventListener('mouseenter', onEnter); el.addEventListener('mouseleave', onLeave); });

    window.addEventListener('mousemove', onMove);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      targets.forEach(el => { el.removeEventListener('mouseenter', onEnter); el.removeEventListener('mouseleave', onLeave); });
    };
  }, []);

  return (
    <>
      <div className="cursor-dot"  ref={dotRef}  aria-hidden="true" />
      <div className="cursor-ring" ref={ringRef} aria-hidden="true" />
    </>
  );
}
