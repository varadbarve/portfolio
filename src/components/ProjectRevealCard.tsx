import { useState, useRef } from "react";
import { motion } from "framer-motion";

interface Project {
  icon: string;
  title: string;
  desc: string;
  tags: string[];
  deployLink: string;
  githubLink: string;
  actionIcon: string;
}

interface ProjectRevealCardProps {
  proj: Project;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  highlightText: (text: string, query: string) => React.ReactNode;
}

export default function ProjectRevealCard({
  proj,
  searchQuery,
  setSearchQuery,
  highlightText,
}: ProjectRevealCardProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative overflow-hidden rounded-xl glass-panel glass-glow h-full min-h-[340px] flex flex-col transition-all duration-300 hover:shadow-[0_0_30px_rgba(78,222,163,0.15)] group"
    >
      {/* BASE LAYER (Initially Visible) */}
      <div className="absolute inset-0 p-sm sm:p-md flex flex-col justify-between z-10 pointer-events-none select-none">
        <div className="flex justify-between items-start">
          <div className="w-12 h-12 rounded bg-surface border border-outline-variant flex items-center justify-center text-primary shadow-sm">
            <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              {proj.icon}
            </span>
          </div>
        </div>
        <div>
          <h3 className="font-h3 text-h3 mb-xs text-on-surface tracking-wide pr-6">{proj.title}</h3>
          <div className="flex items-center gap-xs text-primary font-mono-label text-[11px] mt-md opacity-80">
            <span>[hover to scan]</span>
            <span className="material-symbols-outlined text-[14px] animate-pulse">radar</span>
          </div>
        </div>
      </div>

      {/* REVEAL LAYER (Hidden under clip-path, shown on hover) */}
      <div
        style={{
          clipPath: isHovered
            ? `circle(150% at ${mousePos.x}px ${mousePos.y}px)`
            : `circle(0px at ${mousePos.x}px ${mousePos.y}px)`,
          transition: "clip-path 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className="absolute inset-0 bg-surface-container-high/95 dark:bg-surface-container-lowest/98 p-sm sm:p-md flex flex-col h-full z-20"
      >
        {/* GitHub Link Icon in Corner */}
        <a
          href={proj.githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-3 right-3 w-8 h-8 rounded-full glass-panel flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/40 transition-all z-30"
          title="View Source on GitHub"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>

        <div className="flex justify-between items-start mb-sm">
          <div className="w-10 h-10 rounded bg-surface border border-outline-variant flex items-center justify-center text-primary">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              {proj.icon}
            </span>
          </div>
        </div>

        <h3 className="font-h3 text-h3 mb-xs pr-8 leading-snug text-on-surface">
          {highlightText(proj.title, searchQuery)}
        </h3>
        
        <p className="font-body-md text-body-md text-on-surface-variant mb-md flex-grow leading-relaxed">
          {highlightText(proj.desc, searchQuery)}
        </p>

        <div className="flex flex-wrap gap-xs mb-sm">
          {proj.tags.map((tag) => (
            <motion.button
              key={tag}
              onClick={(e) => {
                e.stopPropagation();
                setSearchQuery(tag);
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 12
              }}
              className="bg-surface-container border border-primary/20 text-on-surface px-xs py-base rounded-DEFAULT font-mono-label text-[11px] hover:border-primary/50 hover:text-primary transition-colors cursor-pointer"
            >
              {highlightText(tag, searchQuery)}
            </motion.button>
          ))}
        </div>

        <div className="pt-sm border-t border-outline-variant/30 flex justify-between items-center mt-auto">
          <a
            href={proj.deployLink}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono-label text-[12px] text-primary hover:text-primary-fixed flex items-center gap-xs group"
          >
            Live Deployment{" "}
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </a>
          <motion.span
            whileHover={{ scale: 1.2, rotate: 15 }}
            className="material-symbols-outlined text-on-surface-variant hover:text-on-surface cursor-pointer text-[20px]"
          >
            {proj.actionIcon}
          </motion.span>
        </div>
      </div>
    </div>
  );
}
