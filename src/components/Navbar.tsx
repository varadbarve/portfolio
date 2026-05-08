import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const location = useLocation();
  const [isDark, setIsDark] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dark/Light mode toggle (#11)
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove("light-mode");
    } else {
      root.classList.add("light-mode");
    }
  }, [isDark]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const getLinkClass = (path: string) => {
    const isActive = location.pathname === path;
    return isActive
      ? "font-mono-label text-mono-label uppercase tracking-wider text-primary dark:text-primary-fixed-dim border-b-2 border-primary dark:border-primary-fixed-dim pb-1 transition-all duration-200 px-sm py-xs"
      : "font-mono-label text-mono-label uppercase tracking-wider text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed transition-colors px-sm py-xs rounded";
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-gutter py-sm max-w-[1440px] mx-auto bg-surface/80 dark:bg-surface-dim/80 backdrop-blur-md border-b border-white/10">
        <Link to="/" className="font-h3 text-h3 font-bold text-on-surface dark:text-surface-bright">
          Varad Barve
        </Link>
        <div className="hidden md:flex items-center space-x-lg">
          <Link to="/projects" className={getLinkClass("/projects")}>Projects</Link>
          <Link to="/skills" className={getLinkClass("/skills")}>Skills</Link>
          <Link to="/resume" className={getLinkClass("/resume")}>Resume</Link>
          <a href="mailto:varadvbarve@gmail.com" className={getLinkClass("/contact")}>Contact</a>
        </div>
        <div className="hidden md:flex items-center gap-sm">
          {/* Dark/Light Toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="w-9 h-9 rounded-full glass-panel flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <span className="material-symbols-outlined text-[20px]">
              {isDark ? "light_mode" : "dark_mode"}
            </span>
          </button>
          <Link to="/resume" className="flex items-center justify-center px-lg py-sm bg-primary-container text-[#0f172a] rounded-DEFAULT font-mono-label text-mono-label hover:opacity-90 transition-opacity">
            Download CV
          </Link>
        </div>
        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-xs">
          <button
            onClick={() => setIsDark(!isDark)}
            className="w-9 h-9 rounded-full glass-panel flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isDark ? "light_mode" : "dark_mode"}
            </span>
          </button>
          <button
            className="flex items-center justify-center text-on-surface"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="material-symbols-outlined">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-sm pt-[80px] px-gutter md:hidden">
          <div className="flex flex-col space-y-lg py-xl">
            <Link to="/projects" className="font-h3 text-h3 text-on-surface hover:text-primary transition-colors">Projects</Link>
            <Link to="/skills" className="font-h3 text-h3 text-on-surface hover:text-primary transition-colors">Skills</Link>
            <Link to="/resume" className="font-h3 text-h3 text-on-surface hover:text-primary transition-colors">Resume</Link>
            <a href="mailto:varadvbarve@gmail.com" className="font-h3 text-h3 text-on-surface hover:text-primary transition-colors">Contact</a>
            <div className="pt-md border-t border-outline-variant/30">
              <Link to="/resume" className="inline-flex items-center justify-center px-lg py-md bg-primary-container text-[#0f172a] rounded-DEFAULT font-mono-label text-mono-label">
                Download CV
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
