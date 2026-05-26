import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";

interface DockItemProps {
  mouseX: any;
  icon: string;
  label: string;
  to: string;
  isExternal?: boolean;
  isActive?: boolean;
}

function DockItem({ mouseX, icon, label, to, isExternal = false, isActive = false }: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Measure distance from mouse to the center of this item
  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    // Center x of the item
    const centerX = bounds.x + bounds.width / 2;
    return val - centerX;
  });

  // Grow width and height based on proximity (within 150px)
  // Normal size: 48px, Peak size: 76px
  const sizeTransform = useTransform(distance, [-150, 0, 150], [48, 76, 48], { clamp: true });
  const size = useSpring(sizeTransform, {
    stiffness: 400,
    damping: 25,
    mass: 0.1,
  });

  // Also scale up icon size inside
  const iconSizeTransform = useTransform(distance, [-150, 0, 150], [20, 32, 20], { clamp: true });
  const iconSize = useSpring(iconSizeTransform, {
    stiffness: 400,
    damping: 25,
    mass: 0.1,
  });

  const content = (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      className={`relative rounded-full flex items-center justify-center border transition-colors duration-200 shadow-sm ${
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
        <span className="absolute -bottom-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
      )}
    </motion.div>
  );

  if (isExternal) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className="group relative">
        {content}
      </a>
    );
  }

  return (
    <Link to={to} className="group relative">
      {content}
    </Link>
  );
}

export default function Dock() {
  const mouseX = useMotionValue(Infinity);
  const location = useLocation();

  const items = [
    { label: "Home", icon: "home", to: "/" },
    { label: "Projects", icon: "terminal", to: "/projects" },
    { label: "Skills", icon: "sdk", to: "/skills" },
    { label: "Resume", icon: "description", to: "/resume" },
    { label: "Contact", icon: "mail", to: "mailto:varadvbarve@gmail.com", isExternal: true },
    { label: "GitHub", icon: "github", to: "https://github.com/varadbarve", isExternal: true },
  ];

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="mx-auto flex h-[68px] items-end gap-sm rounded-2xl glass-panel px-sm pb-xs pt-base border border-white/10 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.5)] pointer-events-auto"
      >
        {items.map((item) => (
          <DockItem
            key={item.label}
            mouseX={mouseX}
            icon={item.icon}
            label={item.label}
            to={item.to}
            isExternal={item.isExternal}
            isActive={location.pathname === item.to}
          />
        ))}
      </motion.div>
    </div>
  );
}
