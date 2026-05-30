import BackgroundEffects   from './components/BackgroundEffects';
import CustomCursor        from './components/CustomCursor';
import Navbar              from './components/Navbar';
import HeroSection         from './components/HeroSection';
import TechTicker          from './components/TechTicker';
import AboutSection        from './components/AboutSection';
import ExperienceSection   from './components/ExperienceSection';
import ProjectsSection     from './components/ProjectsSection';
import SkillsSection       from './components/SkillsSection';
import ContactSection      from './components/ContactSection';
import './App.css';

export default function App() {
  return (
    <>
      {/* Custom cursor (pointer:fine devices only) */}
      <CustomCursor />

      {/* Fixed animated canvas background */}
      <div className="bg-canvas-fixed" aria-hidden="true">
        <BackgroundEffects hue={170} speedMultiplier={1.0} />
      </div>

      {/* Scrollable portfolio content */}
      <div className="portfolio-root">
        <Navbar />
        <main>
          <HeroSection />
          <TechTicker />
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <SkillsSection />
          <ContactSection />
        </main>
      </div>
    </>
  );
}
