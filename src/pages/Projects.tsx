import { motion } from "framer-motion";
import { useState } from "react";
import { containerVariants, itemVariants } from "../animation/variants";
import ProjectRevealCard from "../components/ProjectRevealCard";

const highlightText = (text: string, query: string) => {
  if (!query.trim()) return text;
  const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${safeQuery})`, "gi"));
  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={index} className="bg-primary/20 text-primary rounded-sm px-0.5">{part}</span>
    ) : (
      part
    )
  );
};

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
      deployLink: "https://whtsppdrct.netlify.app/",
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
            <motion.h1 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-h1 text-h1 text-on-surface">Technical Projects</motion.h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
              A curated selection of intelligent systems, automation engines, and modern web architectures. Focused on high-performance execution and seamless user experiences.
            </p>

            <div className="mt-md flex flex-col md:flex-row gap-sm items-start md:items-center">
              <div className="flex-grow w-full md:w-auto relative glass-panel rounded-lg flex items-center px-sm py-md transition-colors duration-200 focus-within:border-primary focus-within:bg-surface-container-high overflow-hidden">
                <span className="material-symbols-outlined text-on-surface-variant mr-xs flex-shrink-0">search</span>
                <div className="flex items-center flex-grow min-w-0">
                  <span className="hidden sm:inline font-mono-label text-primary mr-xs opacity-70 whitespace-nowrap flex-shrink-0">grep -i "</span>
                  <input
                    className="bg-transparent border-none outline-none text-on-surface font-mono-label flex-grow min-w-0 focus:ring-0 p-0 placeholder-on-surface-variant/40"
                    placeholder="Search architecture, language, or concept..."
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <span className="hidden sm:inline font-mono-label text-primary ml-xs opacity-70 whitespace-nowrap flex-shrink-0">" ./projects</span>
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
          <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className={`${filteredProjects.length < 3 ? 'flex justify-center flex-wrap' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-md`}
        >
            {filteredProjects.map((proj) => (
              <motion.div
                key={proj.title}
                variants={itemVariants}
                layout
                className={filteredProjects.length < 3 ? 'w-full max-w-[400px]' : ''}
              >
                <ProjectRevealCard
                  proj={proj}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  highlightText={highlightText}
                />
              </motion.div>
            ))}
          </motion.div>

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
