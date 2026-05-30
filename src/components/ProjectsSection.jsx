import { useState, useEffect, useRef } from 'react';
import './ProjectsSection.css';

const PROJECTS = [
  {
    id: 'bloom-box',
    num: '01',
    title: 'Bloom Box',
    category: 'web',
    period: 'Mar 2026',
    description: 'A responsive frontend website for a flower shop. Built with HTML, CSS, and JavaScript, featuring a clean layout and modern design.',
    image: '/project-web.png',
    tags: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/harsh4421/Bloom-Box-HTML-CSS-JS',
    live: 'https://bloom-box-theta.vercel.app/',
    status: 'Shipped',
    accent: '#00e5cc',
  },
  {
    id: 'tip-calculator',
    num: '02',
    title: 'Tip Calculator',
    category: 'web',
    period: 'May 2026',
    description: 'An interactive web app to calculate tips and split bills among multiple people. Built with vanilla JavaScript focusing on DOM manipulation.',
    image: '/project-web.png',
    tags: ['JavaScript', 'HTML', 'CSS'],
    github: 'https://github.com/harsh4421/Tip_Calculator',
    live: 'https://tip-calculator-omega-ruddy.vercel.app',
    status: 'Shipped',
    accent: '#7c6fff',
  },
  {
    id: 'display-lab',
    num: '03',
    title: 'Display Lab',
    category: 'web',
    period: 'Feb 2026',
    description: 'A frontend project showcasing various CSS display properties and layout techniques in a visually appealing manner.',
    image: '/project-web.png',
    tags: ['HTML', 'CSS'],
    github: 'https://github.com/harsh4421/Display-Lab',
    live: 'https://display-labs.vercel.app',
    status: 'Shipped',
    accent: '#ff6b6b',
  },
  {
    id: 'scholarship-system',
    num: '04',
    title: 'Scholarship Management System',
    category: 'software',
    period: 'Mar 2026',
    description: 'A terminal-based C++ application utilizing Object-Oriented Programming (OOP) to manage and process scholarship applications.',
    image: '/project-ai.png', // Reusing placeholder for now
    tags: ['C++', 'OOP', 'Terminal'],
    github: 'https://github.com/harsh4421/Scholarship-Management-System-CPP',
    status: 'Completed',
    accent: '#00e5cc',
  },
];

const FILTERS = [
  { key: 'all',      label: 'All' },
  { key: 'web',      label: 'Web' },
  { key: 'software', label: 'Software' },
];

export default function ProjectsSection() {
  const [filter, setFilter] = useState('all');
  const headerRef = useRef(null);
  const cardRefs  = useRef([]);

  const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  useEffect(() => {
    const obs = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    [headerRef.current, ...cardRefs.current].forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      el.classList.remove('in');
      setTimeout(() => el?.classList.add('in'), 80 + i * 60);
    });
  }, [filter]);

  return (
    <section id="projects" className="projects-section" aria-label="Selected projects">
      <div className="divider" aria-hidden="true" />
      <div className="section-inner">
        <div className="reveal" ref={headerRef}>
          <p className="eyebrow">— Projects</p>
          <h2 className="section-heading">What I've <span className="grad">built.</span></h2>
          <p className="section-desc">Web applications, UI layouts, and C++ software systems.</p>
        </div>

        {/* Filters */}
        <div className="pj-filters" role="tablist">
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              id={`pj-filter-${key}`}
              className={`pj-filter ${filter === key ? 'active' : ''}`}
              role="tab"
              aria-selected={filter === key}
              onClick={() => setFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="pj-grid" role="tabpanel">
          {filtered.map((p, i) => (
            <article
              key={p.id}
              id={`project-${p.id}`}
              className="pj-card reveal glass-card"
              ref={el => cardRefs.current[i] = el}
              style={{ '--pj-accent': p.accent, transitionDelay: `${i * 0.07}s` }}
              aria-label={`${p.title} project`}
            >
              {/* Image */}
              <div className="pj-img">
                <img src={p.image} alt={`${p.title} preview`} loading="lazy" />
                <div className="pj-img__overlay" aria-hidden="true" />
                <div className="pj-img__num" aria-hidden="true">{p.num}</div>
                <div className="pj-img__status" style={{ color: p.accent, borderColor: `${p.accent}30`, background: `${p.accent}12` }}>
                  <span className="pj-img__dot" style={{ background: p.accent }} aria-hidden="true" />
                  {p.status}
                </div>
              </div>

              {/* Body */}
              <div className="pj-body">
                <div className="pj-meta">
                  <span className="pj-cat">{p.category}</span>
                  <span className="pj-period">{p.period}</span>
                </div>
                <h3 className="pj-title">
                  {p.title}
                  <svg className="pj-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 7h10v10"/><path d="M7 17 17 7"/>
                  </svg>
                </h3>
                <p className="pj-desc">{p.description}</p>

                <div className="pj-foot">
                  <div className="pj-tags">
                    {p.tags.slice(0, 4).map(t => <span key={t} className="tag-pill">{t}</span>)}
                    {p.tags.length > 4 && <span className="pj-more">+{p.tags.length - 4}</span>}
                  </div>
                  <div className="pj-links">
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noopener noreferrer" className="pj-link" aria-label={`${p.title} GitHub`}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                        </svg>
                        Code
                      </a>
                    )}
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noopener noreferrer" className="pj-link" aria-label={`${p.title} live demo`}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        </svg>
                        Live
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
