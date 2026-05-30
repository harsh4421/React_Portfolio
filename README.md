# Harsh Kumar — Developer Portfolio

A completely custom, highly interactive personal portfolio built from scratch with React, Vite, and modern CSS.

This portfolio was designed to stand out, combining a glassmorphic aesthetic with an electric cyberpunk-inspired color palette, custom animations, and a dynamic hardware-accelerated canvas background.

## 🌟 Key Features

*   **Custom Particle Canvas Background**: A highly optimized HTML5 Canvas background that renders an animated, floating grid with mouse-reactive glow and particle effects.
*   **Unique UI / UX Design**:
    *   **Glassmorphism**: Beautiful frosted glass elements integrated seamlessly throughout the UI.
    *   **Dynamic Animations**: Scroll-driven reveal effects using `IntersectionObserver`, staggered enter animations, and micro-interactions.
    *   **Custom Cursor**: A lagged, lerp-animated tracking ring cursor with a blend-mode effect that expands when hovering over interactive elements.
    *   **Infinite Tech Ticker**: An auto-scrolling marquee showcasing the technology stack with gradient fade masks.
*   **Modular Architecture**: Built entirely with functional React components and pure CSS (no bloated UI libraries).
*   **Fully Responsive**: Mobile-first approach ensuring a pixel-perfect experience across all devices.
*   **Performance Focused**: Optimized asset loading, lazy-rendered animations, and native CSS custom properties.

## 🛠️ Technology Stack

*   **Framework**: [React 18](https://react.dev/)
*   **Build Tool**: [Vite](https://vitejs.dev/)
*   **Styling**: Pure Vanilla CSS3 (Custom Properties, Grid, Flexbox, Keyframes)
*   **Animations**: Native CSS Animations, HTML5 Canvas API, `IntersectionObserver` API
*   **Deployment**: Vercel / GitHub Pages

## 🚀 Getting Started

### Prerequisites

You will need **Node.js** installed on your system.

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/harsh4421/React_Portfolio.git
    cd React_Portfolio_v1
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```

4.  Open your browser and navigate to `http://localhost:5173`.

## 📁 Project Structure

```text
src/
├── assets/                  # Images and static files
├── components/              # Modular React components
│   ├── AboutSection.jsx     # Bio, stats, education, and quick stack
│   ├── BackgroundEffects.jsx# Interactive HTML5 Canvas background
│   ├── ContactSection.jsx   # Giant CTA and social links
│   ├── CustomCursor.jsx     # Animated trailing ring cursor
│   ├── ExperienceSection.jsx# Timeline for academic & project history
│   ├── HeroSection.jsx      # Landing hero with staggered reveal
│   ├── Navbar.jsx           # Floating glassmorphic navigation
│   ├── ProjectsSection.jsx  # Project showcase with hover effects
│   ├── SkillsSection.jsx    # Tech stack grouped by category
│   └── TechTicker.jsx       # Infinite scrolling marquee strip
├── App.jsx                  # Main application layout entry point
├── App.css                  # Global layout styles
├── index.css                # Global design system (CSS variables, typography)
└── main.jsx                 # React root render
```

## 🎨 Design Inspiration & Credits

The unique aesthetic of this portfolio was inspired by analyzing and combining the best elements of several modern portfolios:
*   Pill-shaped navigation and gradient headers inspired by Deepanshu Singh.
*   Giant, bold scale-in typography and custom cursor interactions inspired by Daksh Srivastava.
*   Creative card layouts and section dividers inspired by Naitik Kashyap.
*   *Designed and developed by Harsh Kumar.*

## 🔗 Connect with me

*   **GitHub**: [harsh4421](https://github.com/harsh4421)
*   **LinkedIn**: [Harsh Kumar](https://www.linkedin.com/in/harsh-kumar-862331367/)

---
*Built with 💙 by Harsh Kumar | © 2026*
