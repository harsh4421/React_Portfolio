import './TechTicker.css';

const ITEMS = [
  'React', 'JavaScript', 'C++', 'HTML5', 'CSS3', 'Vite',
  'Object-Oriented Programming', 'Data Structures', 'Git', 'GitHub', 'Vercel', 'VS Code',
  'Responsive Design', 'DOM Manipulation', 'Algorithms', 'Frontend Web Development'
];

/* Duplicate for seamless loop */
const TRACK = [...ITEMS, ...ITEMS];

export default function TechTicker() {
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__fade ticker__fade--left" />
      <div className="ticker__fade ticker__fade--right" />
      <div className="ticker__track">
        {TRACK.map((item, i) => (
          <span key={i} className="ticker__item">
            <span className="ticker__dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
