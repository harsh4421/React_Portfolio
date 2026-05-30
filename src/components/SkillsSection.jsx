import { useEffect, useRef } from 'react';
import './SkillsSection.css';

const SKILL_GROUPS = [
  {
    icon: '</>',
    category: 'Languages',
    grad: 'from-cyan to-blue',
    skills: ['C++', 'JavaScript', 'HTML5', 'CSS3'],
  },
  {
    icon: '▣',
    category: 'Frontend Core',
    grad: 'from-violet to-purple',
    skills: ['React', 'Vite', 'DOM Manipulation', 'Responsive Design'],
  },
  {
    icon: '▲',
    category: 'Tools & Platforms',
    grad: 'from-indigo to-blue',
    skills: ['Git', 'GitHub', 'Vercel', 'Terminal / CLI', 'VS Code'],
  },
  {
    icon: '⚡',
    category: 'Concepts',
    grad: 'from-emerald to-teal',
    skills: ['Object-Oriented Programming (OOP)', 'Data Structures', 'Algorithms'],
  },
];

const GRAD_MAP = {
  'from-cyan to-blue':     'linear-gradient(135deg, #00e5cc, #3b82f6)',
  'from-violet to-purple': 'linear-gradient(135deg, #7c6fff, #a855f7)',
  'from-emerald to-teal':  'linear-gradient(135deg, #34d399, #14b8a6)',
  'from-indigo to-blue':   'linear-gradient(135deg, #6366f1, #3b82f6)',
};

export default function SkillsSection() {
  const refs = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    refs.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" className="skills-section" aria-label="Technical skills">
      <div className="divider" aria-hidden="true" />
      <div className="section-inner">
        <div className="reveal" ref={el => refs.current[0] = el}>
          <p className="eyebrow">— Skills</p>
          <h2 className="section-heading">What I <span className="grad">work with.</span></h2>
          <p className="section-desc">Technologies I use for building web apps and solving problems.</p>
        </div>

        <div className="sk-grid" role="list">
          {SKILL_GROUPS.map((g, i) => {
            const bg = GRAD_MAP[g.grad];
            return (
              <div
                key={g.category}
                className="sk-card glass-card reveal"
                ref={el => refs.current[i + 1] = el}
                role="listitem"
                style={{ '--sk-bg': bg, transitionDelay: `${i * 0.08}s` }}
                aria-label={`${g.category} skills`}
              >
                {/* Icon */}
                <div className="sk-card__icon" style={{ background: bg }} aria-hidden="true">
                  {g.icon}
                </div>

                <h3 className="sk-card__title">{g.category}</h3>

                {/* Gradient separator (Deepanshu-inspired) */}
                <div className="sk-card__sep" style={{ background: bg }} aria-hidden="true" />

                <ul className="sk-card__list" role="list">
                  {g.skills.map(s => (
                    <li key={s} className="sk-card__item" role="listitem">
                      <span className="sk-card__bullet" style={{ background: bg }} aria-hidden="true" />
                      <span className="sk-card__name">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
