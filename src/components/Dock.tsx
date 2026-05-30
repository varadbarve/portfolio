import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface DockItemProps {
  mouseX: any;
  icon: string;
  label: string;
  to?: string;
  isExternal?: boolean;
  isActive?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isMobile: boolean;
  className?: string;
}

function DockItem({
  mouseX,
  icon,
  label,
  to,
  isExternal = false,
  isActive = false,
  onClick,
  isMobile,
  className = "",
}: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Measure distance from mouse to the center of this item
  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    const centerX = bounds.x + bounds.width / 2;
    return val - centerX;
  });

  // Grow width and height based on proximity (within 150px)
  const defaultSize = isMobile ? 42 : 48;
  const peakSize = isMobile ? 62 : 78;
  
  const sizeTransform = useTransform(distance, [-150, 0, 150], [defaultSize, peakSize, defaultSize], { clamp: true });
  const size = useSpring(sizeTransform, {
    stiffness: 450,
    damping: 24,
    mass: 0.1,
  });

  // y-axis offset translation (lifting effect) on hover
  const yOffsetTransform = useTransform(distance, [-150, 0, 150], [0, -18, 0], { clamp: true });
  const y = useSpring(yOffsetTransform, {
    stiffness: 450,
    damping: 24,
    mass: 0.1,
  });

  // Scale up icon font size inside
  const iconSizeTransform = useTransform(distance, [-150, 0, 150], [18, 30, 18], { clamp: true });
  const iconSize = useSpring(iconSizeTransform, {
    stiffness: 450,
    damping: 24,
    mass: 0.1,
  });

  const innerContent = (
    <motion.div
      ref={ref}
      style={{ width: size, height: size, y }}
      className={`relative rounded-full flex items-center justify-center border transition-colors duration-200 shadow-lg ${
        isActive
          ? "bg-primary/20 border-primary text-primary"
          : "bg-surface-container/60 hover:bg-surface-container-high/80 border-white/5 text-on-surface-variant hover:text-primary"
      }`}
    >
      {/* Tooltip */}
      <div className="absolute bottom-full mb-sm px-xs py-base rounded bg-surface-container-highest border border-white/10 text-on-surface font-mono-label text-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md">
        {label}
      </div>

      {icon === "github" ? (
        <motion.svg
          style={{ width: iconSize, height: iconSize }}
          className="fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </motion.svg>
      ) : (
        <motion.span
          style={{ fontSize: iconSize }}
          className="material-symbols-outlined"
        >
          {icon}
        </motion.span>
      )}

      {/* Active Indicator dot */}
      {isActive && (
        <span className="absolute -bottom-2 w-1.5 h-1.5 rounded-full bg-primary" />
      )}
    </motion.div>
  );

  const wrapperClass = `group relative ${className}`;

  if (onClick) {
    return (
      <button onClick={(e) => onClick(e)} className={wrapperClass}>
        {innerContent}
      </button>
    );
  }

  if (!to) return null;

  if (isExternal) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className={wrapperClass}>
        {innerContent}
      </a>
    );
  }

  return (
    <Link to={to} className={wrapperClass}>
      {innerContent}
    </Link>
  );
}

export default function Dock() {
  const mouseX = useMotionValue(Infinity);
  
  const [isMobile, setIsMobile] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });

  const [activeSection, setActiveSection] = useState("hero-section");
  const [activeSuperheroTheme, setActiveSuperheroTheme] = useState(() => {
    return localStorage.getItem("superhero-theme") || "default";
  });

  useEffect(() => {
    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      setActiveSuperheroTheme(customEvent.detail.theme);
    };
    window.addEventListener("themechange", handleThemeChange);
    return () => window.removeEventListener("themechange", handleThemeChange);
  }, []);

  // Sync theme
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove("light-mode");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.add("light-mode");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Touch device detection
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll Spy Logic
  useEffect(() => {
    const sections = ["hero-section", "projects-section", "skills-section", "resume-section"];
    
    const handleScrollSpy = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScrollSpy);
    handleScrollSpy(); // Run once on mount

    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const items = [
    { label: "Home", icon: "home", sectionId: "hero-section" },
    { label: "Projects", icon: "terminal", sectionId: "projects-section" },
    { label: "Skills", icon: "sdk", sectionId: "skills-section" },
    { label: "Resume", icon: "description", sectionId: "resume-section" },
    {
      label: "Contact",
      icon: "mail",
      to: "mailto:varadvbarve@gmail.com",
      isExternal: true,
      className: "hidden sm:block",
    },
    {
      label: "GitHub",
      icon: "github",
      to: "https://github.com/varadbarve",
      isExternal: true,
      className: "hidden sm:block",
    },
  ];

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <motion.div
        onMouseMove={(e) => {
          if (!isTouch) mouseX.set(e.clientX);
        }}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="mx-auto flex h-[68px] items-end gap-xs sm:gap-sm rounded-2xl glass-panel px-sm pb-xs pt-base border border-white/10 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.5)] pointer-events-auto"
      >
        {items.map((item) => (
          <DockItem
            key={item.label}
            mouseX={mouseX}
            icon={item.icon}
            label={item.label}
            to={item.to}
            isExternal={item.isExternal}
            isActive={item.sectionId ? activeSection === item.sectionId : false}
            onClick={item.sectionId ? () => handleScroll(item.sectionId) : undefined}
            isMobile={isMobile}
            className={item.className}
          />
        ))}

        {activeSuperheroTheme === "default" && (
          <>
            {/* Separator line */}
            <div className="h-8 w-px bg-white/10 mx-xs sm:mx-base mb-xs self-center" />

            {/* Theme Toggle */}
            <DockItem
              mouseX={mouseX}
              icon={isDark ? "light_mode" : "dark_mode"}
              label={isDark ? "Light Mode" : "Dark Mode"}
              onClick={(e) => {
                const nextDark = !isDark;
                const doc = document as any;

                if (!doc.startViewTransition) {
                  setIsDark(nextDark);
                  return;
                }

                const x = e.clientX;
                const y = e.clientY;

                const endRadius = Math.hypot(
                  Math.max(x, window.innerWidth - x),
                  Math.max(y, window.innerHeight - y)
                );

                const transition = doc.startViewTransition(() => {
                  setIsDark(nextDark);
                });

                transition.ready.then(() => {
                  const clipPath = [
                    `circle(0px at ${x}px ${y}px)`,
                    `circle(${endRadius}px at ${x}px ${y}px)`,
                  ];
                  document.documentElement.animate(
                    {
                      clipPath: clipPath,
                    },
                    {
                      duration: 650,
                      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
                      pseudoElement: "::view-transition-new(root)",
                    }
                  );
                });
              }}
              isMobile={isMobile}
            />
          </>
        )}
      </motion.div>
    </div>
  );
}
