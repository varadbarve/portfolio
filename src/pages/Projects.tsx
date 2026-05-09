import { motion } from "framer-motion";
import { useState } from "react";

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState("");

  const projects = [
    {
      icon: "medical_services",
      title: "MediAssist AI",
      desc: "An AI-powered healthcare platform that automates patient communication. Translates complex medical reports into simple language and delivers them via automated voice calls.",
      tags: ["FastAPI", "Next.js", "AI", "Mako"],
      deployLink: "https://medi-assist-01.vercel.app",
      githubLink: "https://github.com/varadbarve/MediAssist",
      actionIcon: "clinical_notes"
    },
    {
      icon: "rocket_launch",
      title: "Galga Lite",
      desc: "A high-performance interactive web application built for seamless user engagement. Features a modular architecture and is optimized for cloud deployment.",
      tags: ["Python", "JavaScript", "Vercel", "Web App"],
      deployLink: "https://galgalite.vercel.app",
      githubLink: "https://github.com/varadbarve/galgalite",
      actionIcon: "public"
    },
    {
      icon: "smart_display",
      title: "autoscroller Engine",
      desc: "A smart automation bot for YouTube Shorts and Instagram Reels. Features video-end detection and a real-time analytics dashboard for a hands-free viewing experience.",
      tags: ["Node.js", "Playwright", "CSS"],
      deployLink: "#",
      githubLink: "https://github.com/varadbarve/autoscroller",
      actionIcon: "auto_mode"
    },
    {
      icon: "qr_code_2",
      title: "WhatsApp Direct",
      desc: "A high-performance web utility to send WhatsApp messages without saving contacts. Features QR code generation, message prefilling, and smart input parsing.",
      tags: ["React", "TypeScript", "Vite", "Tailwind"],
      deployLink: "#",
      githubLink: "https://github.com/varadbarve/whatsapp_direct",
      actionIcon: "chat"
    },
    {
      icon: "robot",
      title: "SRM Feedback Bot",
      desc: "Automation tool designed to streamline student feedback processes at SRM University. Uses Playwright to handle complex form submissions automatically.",
      tags: ["Python", "Playwright", "Automation"],
      deployLink: "#",
      githubLink: "https://github.com/varadbarve/Feedback-Bot",
      actionIcon: "feedback"
    },
    {
      icon: "traffic",
      title: "Traffic Detection",
      desc: "Real-time vehicle detection and tracking system using YOLOv8. Optimized for various weather conditions and high-density traffic scenarios.",
      tags: ["YOLOv8", "Computer Vision", "Python"],
      deployLink: "#",
      githubLink: "https://github.com/varadbarve/Traffic_Object_Detection_System",
      actionIcon: "analytics"
    }
  ];

  // Functional search: filter by title, description, or tags
  const filteredProjects = projects.filter((proj) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      proj.title.toLowerCase().includes(q) ||
      proj.desc.toLowerCase().includes(q) ||
      proj.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  });

  return (
    <main className="flex-grow pt-[100px] pb-xl w-full bg-background">
      <div className="max-w-[1280px] mx-auto px-gutter w-full">
        <div className="space-y-lg mt-lg">
          {/* Header & Search */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-sm">
            <h1 className="font-h1 text-h1 text-on-surface">Technical Projects</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
              A curated selection of intelligent systems, automation engines, and modern web architectures. Focused on high-performance execution and seamless user experiences.
            </p>

            <div className="mt-md flex flex-col md:flex-row gap-sm items-start md:items-center">
              <div className="flex-grow w-full md:w-auto relative glass-panel rounded-lg flex items-center px-sm py-md transition-colors duration-200 focus-within:border-primary focus-within:bg-[#0a0a0a] overflow-hidden">
                <span className="material-symbols-outlined text-on-surface-variant mr-xs flex-shrink-0">search</span>
                <div className="flex items-center flex-grow min-w-0">
                  <span className="font-mono-label text-primary mr-xs opacity-70 whitespace-nowrap flex-shrink-0">grep -i "</span>
                  <input
                    className="bg-transparent border-none outline-none text-on-surface font-mono-label flex-grow min-w-0 focus:ring-0 p-0 placeholder-on-surface-variant/40"
                    placeholder="Search architecture, language, or concept..."
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <span className="font-mono-label text-primary ml-xs opacity-70 whitespace-nowrap flex-shrink-0">" ./projects</span>
                </div>
              </div>
            </div>

            {/* Active filter tags */}
            {searchQuery && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="flex items-center gap-sm"
              >
                <span className="font-mono-label text-[11px] text-on-surface-variant">
                  {filteredProjects.length} result{filteredProjects.length !== 1 ? "s" : ""} for
                </span>
                <span className="bg-primary/10 border border-primary/30 text-primary px-xs py-[2px] rounded font-mono-label text-[11px] flex items-center gap-xs">
                  "{searchQuery}"
                  <button onClick={() => setSearchQuery("")} className="hover:text-red-400 transition-colors">
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </span>
              </motion.div>
            )}
          </motion.div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
            {filteredProjects.map((proj, i) => (
              <motion.div
                key={proj.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                layout
                className="glass-panel rounded-xl p-sm flex flex-col h-full transition-all duration-200 relative group hover:border-primary/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]"
              >
                {/* GitHub Link Icon in Corner */}
                <a
                  href={proj.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-3 right-3 w-8 h-8 rounded-full glass-panel flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/40 transition-all z-20"
                  title="View Source on GitHub"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>

                <div className="flex justify-between items-start mb-sm">
                  <div className="w-10 h-10 rounded bg-surface border border-outline-variant flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{proj.icon}</span>
                  </div>
                </div>
                <h3 className="font-h3 text-h3 mb-xs pr-8 leading-snug">{proj.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-md flex-grow leading-relaxed">{proj.desc}</p>

                <div className="flex flex-wrap gap-xs mb-sm">
                  {proj.tags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      className="bg-[#121212] border border-primary/20 text-on-surface px-xs py-base rounded-DEFAULT font-mono-label text-[11px] hover:border-primary/50 hover:text-primary transition-colors cursor-pointer"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                <div className="pt-sm border-t border-outline-variant/30 flex justify-between items-center mt-auto">
                  <a
                    href={proj.deployLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono-label text-[12px] text-primary hover:text-primary-fixed flex items-center gap-xs group"
                  >
                    Live Deployment <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </a>
                  <span className="material-symbols-outlined text-on-surface-variant hover:text-on-surface cursor-pointer text-[20px]">{proj.actionIcon}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* No results state */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-panel rounded-lg p-xl text-center space-y-md"
            >
              <span className="material-symbols-outlined text-[48px] text-on-surface-variant/50">search_off</span>
              <p className="font-mono-label text-mono-label text-on-surface-variant">
                No projects match "<span className="text-primary">{searchQuery}</span>"
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="font-mono-label text-caption text-primary hover:underline"
              >
                Clear search
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}
