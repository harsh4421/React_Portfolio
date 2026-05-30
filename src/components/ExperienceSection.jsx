import { useEffect, useRef } from 'react';
import './ExperienceSection.css';

const EXPERIENCES = [
  {
    role: 'Frontend Web Developer',
    company: 'Personal Projects',
    type: 'Self-Taught',
    period: '2025 – Present',
    color: 'cyan',
    bullets: [
      'Built and deployed responsive web applications like Bloom Box and Display Lab using modern HTML/CSS and JavaScript.',
      'Developed interactive tools like a custom Tip Calculator.',
      'Gained experience with frontend frameworks like React and build tools like Vite.',
    ],
    tags: ['HTML', 'CSS', 'JavaScript', 'React'],
    badge: 'Web Apps Shipped',
  },
  {
    role: 'C++ Programmer',
    company: 'Academic / Personal',
    type: 'Learning',
    period: '2024 – Present',
    color: 'violet',
    bullets: [
      'Documenting a comprehensive C++ learning journey through structured repositories.',
      'Developed a Scholarship Management System utilizing object-oriented programming principles in C++.',
      'Practicing problem-solving and algorithmic thinking.',
    ],
    tags: ['C++', 'OOP', 'Data Structures'],
    badge: 'OOP Applied',
  },
  {
    role: 'Student',
    company: 'B.Tech Program',
    type: 'Academic',
    period: 'Present',
    color: 'coral',
    bullets: [
      'Actively pursuing a Bachelor of Technology degree.',
      'Focusing on foundational computer science concepts, programming, and software engineering.',
      'Collaborating with peers on technical projects and assignments.',
    ],
    tags: ['Computer Science', 'Engineering', 'Learning'],
    badge: 'Continuous Learner',
  },
];

const COLOR_MAP = {
  cyan:   { glow: 'rgba(0,229,204,0.18)',   dot: 'var(--clr-accent)',  badge: 'rgba(0,229,204,0.12)', badgeBorder: 'rgba(0,229,204,0.25)' },
  violet: { glow: 'rgba(124,111,255,0.18)', dot: 'var(--clr-accent2)', badge: 'rgba(124,111,255,0.1)', badgeBorder: 'rgba(124,111,255,0.25)' },
  coral:  { glow: 'rgba(255,107,107,0.15)', dot: 'var(--clr-accent3)', badge: 'rgba(255,107,107,0.1)', badgeBorder: 'rgba(255,107,107,0.25)' },
};

export default function ExperienceSection() {
  const refs = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    refs.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="experience" className="exp-section" aria-label="Professional experience">
      <div className="divider" aria-hidden="true" />
      <div className="section-inner">
        <div className="reveal" ref={el => refs.current[0] = el}>
          <p className="eyebrow">— Journey</p>
          <h2 className="section-heading">My <span className="grad">path.</span></h2>
          <p className="section-desc">Academic focus, self-taught web development, and programming projects.</p>
        </div>

        <div className="exp-timeline" role="list">
          {EXPERIENCES.map((exp, i) => {
            const c = COLOR_MAP[exp.color];
            return (
              <div
                key={i}
                className="exp-item reveal"
                ref={el => refs.current[i + 1] = el}
                role="listitem"
                style={{ '--item-glow': c.glow, '--item-dot': c.dot, transitionDelay: `${i * 0.1}s` }}
              >
                {/* Left: timeline number */}
                <div className="exp-num" aria-hidden="true">
                  <span className="exp-num__dot" style={{ background: c.dot }} />
                  <span className="exp-num__line" />
                </div>

                {/* Right: card */}
                <div className="exp-card glass-card">
                  {/* Subtle glow on hover */}
                  <div className="exp-card__glow" aria-hidden="true" />

                  <div className="exp-card__top">
                    <div>
                      <div className="exp-card__type">{exp.type}</div>
                      <h3 className="exp-card__role">
                        {exp.role}
                        <span className="exp-card__at"> @ </span>
                        <span className="exp-card__company">{exp.company}</span>
                      </h3>
                    </div>
                    <time className="exp-card__period">{exp.period}</time>
                  </div>

                  <ul className="exp-card__bullets">
                    {exp.bullets.map((b, j) => (
                      <li key={j}>
                        <span className="exp-card__bullet-icon" style={{ color: c.dot }} aria-hidden="true">▸</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="exp-card__foot">
                    <div className="exp-card__tags">
                      {exp.tags.map(t => <span key={t} className="tag-pill">{t}</span>)}
                    </div>
                    <span className="exp-card__badge"
                      style={{ background: c.badge, borderColor: c.badgeBorder, color: c.dot }}>
                      ✓ {exp.badge}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
