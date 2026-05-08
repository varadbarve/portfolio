import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const getLinkClass = (path: string) => {
    const isActive = location.pathname === path;
    return isActive
      ? "font-mono-label text-mono-label uppercase tracking-wider text-primary dark:text-primary-fixed-dim border-b-2 border-primary dark:border-primary-fixed-dim pb-1 hover:bg-white/5 transition-all duration-200 px-sm py-xs opacity-80 scale-95 transition-transform"
      : "font-mono-label text-mono-label uppercase tracking-wider text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed transition-colors hover:bg-white/5 transition-all duration-200 px-sm py-xs rounded";
  };

  return (
    <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-gutter py-sm max-w-[1440px] mx-auto bg-surface/80 dark:bg-surface-dim/80 backdrop-blur-md border-b border-white/10 flat no shadows">
      <Link to="/" className="font-h3 text-h3 font-bold text-on-surface dark:text-surface-bright">
        Varad Barve
      </Link>
      <div className="hidden md:flex items-center space-x-lg">
        <Link to="/projects" className={getLinkClass("/projects")}>Projects</Link>
        <Link to="/skills" className={getLinkClass("/skills")}>Skills</Link>
        <Link to="/resume" className={getLinkClass("/resume")}>Resume</Link>
        <a href="mailto:varadvbarve@gmail.com" className={getLinkClass("/contact")}>Contact</a>
      </div>
      <button className="hidden md:flex items-center justify-center px-lg py-sm bg-primary-container text-[#0f172a] rounded-DEFAULT font-mono-label text-mono-label hover:opacity-90 transition-opacity">
        Download CV
      </button>
      <button className="md:hidden flex items-center justify-center text-on-surface">
        <span className="material-symbols-outlined">menu</span>
      </button>
    </nav>
  );
}
