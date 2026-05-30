import { useEffect, useRef } from 'react';
import './AboutSection.css';

const STATS = [
  { value: '20+', label: 'GitHub Repos' },
  { value: '5+', label: 'Web Projects' },
  { value: '3+', label: 'Languages' },
  { value: '∞',  label: 'Curiosity' },
];

export default function AboutSection() {
  const refs = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } }),
      { threshold: 0.15 }
    );
    refs.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" className="about-section" aria-label="About me">
      <div className="divider" aria-hidden="true" />
      <div className="section-inner about-inner">

        {/* Left — bio */}
        <div className="about-bio reveal" ref={el => refs.current[0] = el}>
          <p className="eyebrow">— About Me</p>
          <h2 className="section-heading">
            Who I <span className="grad">am.</span>
          </h2>
          <p className="section-desc">
            Hi, I'm <strong>Harsh Kumar</strong>, a student and developer with a passion for building
            web applications and software solutions. I love turning complex problems into
            elegant, user-centered experiences.
          </p>
          <p className="section-desc" style={{ marginTop: '1rem' }}>
            I specialize in <span className="about-highlight">React</span>,&nbsp;
            <span className="about-highlight">JavaScript/HTML/CSS</span>, and&nbsp;
            <span className="about-highlight">C++</span> — and I'm continuously
            learning and building projects to expand my skill set.
          </p>

          {/* Availability badge */}
          <div className="about-avail">
            <span className="about-avail__ping">
              <span className="about-avail__core" aria-hidden="true" />
              <span className="about-avail__ring" aria-hidden="true" />
            </span>
            Available for internships &amp; collaborative projects
          </div>

          {/* Education card */}
          <div className="about-edu glass-card">
            <p className="about-edu__label">Education</p>
            <p className="about-edu__degree">B.Tech</p>
            <p className="about-edu__inst">Actively pursuing degree · Learning Full Stack Development</p>
            <span className="tag-pill" style={{ marginTop: '10px', display: 'inline-block' }}>Student</span>
          </div>
        </div>

        {/* Right — stats + quick tech */}
        <div className="about-right">
          {/* Stats grid */}
          <div className="about-stats reveal" ref={el => refs.current[1] = el}>
            {STATS.map(({ value, label }) => (
              <div key={label} className="about-stat glass-card">
                <span className="about-stat__val">{value}</span>
                <span className="about-stat__label">{label}</span>
              </div>
            ))}
          </div>

          {/* Quick tech — icon + name bubbles */}
          <div className="about-tech reveal" ref={el => refs.current[2] = el}>
            <p className="about-tech__title">Quick Stack</p>
            <div className="about-tech__grid">
              {['React','JavaScript','C++','HTML5','CSS3','Vite','Git','GitHub'].map(t => (
                <span key={t} className="about-tech__chip">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
