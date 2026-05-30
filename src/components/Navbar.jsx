import { useState, useEffect } from 'react';
import './Navbar.css';

const LINKS = [
  { label: 'About',      href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Contact',    href: '#contact' },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [active,    setActive]    = useState('');
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const ids = LINKS.map(l => l.href.slice(1));
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && window.scrollY + 100 >= el.offsetTop) {
          setActive('#' + ids[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`} aria-label="Main navigation">
      <div className="nav__inner">
        <a className="nav__logo" href="#hero" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          HK<span className="nav__logo-dot">.</span>
        </a>

        {/* Desktop pill nav — inspired by Deepanshu */}
        <div className="nav__pill">
          {LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className={`nav__pill-link ${active === href ? 'active' : ''}`}
              onClick={e => { e.preventDefault(); go(href); }}
            >
              {label}
            </a>
          ))}
        </div>

        <a href="mailto:harsh@example.com" className="nav__cta" aria-label="Contact Harsh">
          Let's Talk
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="5" y1="19" x2="19" y2="5"/><polyline points="10 5 19 5 19 14"/>
          </svg>
        </a>

        <button
          className={`nav__burger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(p => !p)}
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
        >
          <span/><span/><span/>
        </button>
      </div>

      {menuOpen && (
        <div className="nav__mobile" role="dialog">
          {LINKS.map(({ label, href }) => (
            <a key={href} href={href} className={`nav__m-link ${active === href ? 'active' : ''}`}
              onClick={e => { e.preventDefault(); go(href); }}>{label}</a>
          ))}
          <a href="mailto:harsh@example.com" className="nav__m-cta">Let's Talk →</a>
        </div>
      )}
    </nav>
  );
}
