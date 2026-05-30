import { useEffect, useRef } from 'react';
import './ContactSection.css';

export default function ContactSection() {
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } }),
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="contact" className="contact-section" aria-label="Contact">
      <div className="divider" aria-hidden="true" />

      {/* Giant gradient heading — Deepanshu-inspired */}
      <div className="contact-inner">
        <div className="reveal contact-hero" ref={ref}>
          <p className="eyebrow" style={{ justifyContent: 'center' }}>— Get in Touch</p>
          <h2 className="contact-heading">
            Building my path in<br />
            <span className="contact-heading-grad">software engineering</span>
            <span className="contact-heading-plain"> — let's connect.</span>
          </h2>

          {/* Primary CTA (Deepanshu-inspired large pill) */}
          <div className="contact-cta-wrap">
            <a
              id="contact-email-cta"
              href="mailto:hello@example.com"
              className="contact-cta-btn"
              aria-label="Email Harsh Kumar"
            >
              <span>Let's Talk</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="19" x2="19" y2="5"/><polyline points="10 5 19 5 19 14"/>
              </svg>
            </a>
          </div>

          {/* Social pill buttons — Deepanshu-inspired */}
          <div className="contact-pills" role="list" aria-label="Social links">
            {[
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/harsh-kumar-862331367/', color: '#0A66C2',
                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              },
              { label: 'GitHub', href: 'https://github.com/harsh4421', color: '#fff',
                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              },
            ].map(({ label, href, icon, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-pill"
                role="listitem"
                aria-label={`Connect on ${label}`}
                style={{ '--pill-hover': `${color}20`, '--pill-border': `${color}40` }}
              >
                <span style={{ color }}>{icon}</span>
                <span>Connect on {label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="site-footer" role="contentinfo">
        <div className="site-footer__inner">
          <span className="site-footer__copy">© 2026 Harsh Kumar</span>
          <button className="site-footer__top" onClick={() => window.scrollTo({ top:0, behavior:'smooth' })} aria-label="Back to top">
            Back to top ↑
          </button>
        </div>
      </footer>
    </section>
  );
}
