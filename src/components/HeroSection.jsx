import { useEffect, useRef } from 'react';
import './HeroSection.css';

export default function HeroSection() {
  const nameRef    = useRef(null);
  const taglineRef = useRef(null);
  const ctaRef     = useRef(null);

  useEffect(() => {
    const delays = [[nameRef, 0], [taglineRef, 280], [ctaRef, 550]];
    delays.forEach(([ref, delay]) => {
      if (!ref.current) return;
      setTimeout(() => ref.current?.classList.add('in'), delay);
    });
  }, []);

  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="hero" aria-label="Hero section">
      <div className="hero__blob hero__blob--tl" aria-hidden="true" />
      <div className="hero__blob hero__blob--br" aria-hidden="true" />

      <span className="hero__hud hero__hud--tl" aria-hidden="true">SYS.INIT // 2025</span>
      <span className="hero__hud hero__hud--tr" aria-hidden="true">OPEN TO OPPORTUNITIES</span>
      <span className="hero__hud hero__hud--bl" aria-hidden="true">LOC // INDIA</span>
      <span className="hero__hud hero__hud--br" aria-hidden="true">STACK // FULLSTACK · C++ · WEB</span>

      <div className="hero__center">
        <div className="hero__status" aria-label="Open to opportunities">
          <span className="hero__ping" aria-hidden="true">
            <span className="hero__ping-core" />
            <span className="hero__ping-ring" />
          </span>
          Available for Internships &amp; Projects
        </div>

        <h1 className="hero__name reveal" ref={nameRef} aria-label="Harsh Kumar">
          <span className="hero__name-line">Harsh</span>
          <span className="hero__name-line hero__name-line--offset">
            Kumar<span className="hero__name-accent">.</span>
          </span>
        </h1>

        <p className="hero__tagline reveal" ref={taglineRef}>
          CS Student &amp; Developer —
          <span className="hero__tagline-em"> building real products from scratch.</span>
        </p>

        <div className="hero__ctas reveal" ref={ctaRef}>
          <button id="hero-projects-btn" className="hero__btn hero__btn--fill" onClick={() => scrollTo('projects')}>
            View Projects
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </button>
          <button id="hero-contact-btn" className="hero__btn hero__btn--ghost" onClick={() => scrollTo('contact')}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
            Get in Touch
          </button>

          <a href="https://github.com/harsh4421" target="_blank" rel="noopener noreferrer" className="hero__social-pill" aria-label="GitHub profile">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/harsh-kumar-862331367/" target="_blank" rel="noopener noreferrer" className="hero__social-pill" aria-label="LinkedIn profile">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span className="hero__scroll-line" />
        <span className="hero__scroll-label">scroll</span>
      </div>
    </section>
  );
}
