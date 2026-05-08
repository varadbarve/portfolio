import { motion } from "framer-motion";

export default function Projects() {
  const projects = [
    {
      icon: "medical_services",
      title: "MediAssist AI",
      desc: "An AI-powered healthcare platform that automates patient communication. Translates complex medical reports into simple language and delivers them via automated voice calls.",
      tags: ["FastAPI", "Next.js", "AI", "Mako"],
      link: "View MediAssist",
      actionIcon: "clinical_notes"
    },
    {
      icon: "smart_display",
      title: "autoscroller Engine",
      desc: "A smart automation bot for YouTube Shorts and Instagram Reels. Features video-end detection and a real-time analytics dashboard for a hands-free viewing experience.",
      tags: ["Node.js", "Playwright", "CSS"],
      link: "Explore Bot",
      actionIcon: "auto_mode"
    },
    {
      icon: "qr_code_2",
      title: "WhatsApp Direct",
      desc: "A high-performance web utility to send WhatsApp messages without saving contacts. Features QR code generation, message prefilling, and smart input parsing.",
      tags: ["React", "TypeScript", "Vite", "Tailwind"],
      link: "Try Utility",
      actionIcon: "chat"
    },
    {
      icon: "robot",
      title: "SRM Feedback Bot",
      desc: "Automation tool designed to streamline student feedback processes at SRM University. Uses Playwright to handle complex form submissions automatically.",
      tags: ["Python", "Playwright", "Automation"],
      link: "View Repo",
      actionIcon: "feedback"
    },
    {
      icon: "traffic",
      title: "Traffic Detection",
      desc: "Real-time vehicle detection and tracking system using YOLOv8. Optimized for various weather conditions and high-density traffic scenarios.",
      tags: ["YOLOv8", "Computer Vision", "Python"],
      link: "View Model",
      actionIcon: "analytics"
    }
  ];

  return (
    <main className="flex-grow pt-[100px] pb-xl px-md mt-lg max-w-[1120px] mx-auto w-full">
      <div className="space-y-lg">
        {/* Header & Search */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-sm">
          <h1 className="font-h1 text-h1 text-on-surface">Technical Projects</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            A selection of high-performance distributed systems, machine learning utilities, and modern web architectures. Built with a focus on absolute performance and zero-overhead execution.
          </p>

          <div className="mt-md flex flex-col md:flex-row gap-sm items-start md:items-center">
            <div className="flex-grow w-full md:w-auto relative glass-panel rounded-DEFAULT flex items-center px-sm py-xs transition-colors duration-200 focus-within:border-primary focus-within:bg-[#0a0a0a]">
              <span className="material-symbols-outlined text-on-surface-variant mr-xs">search</span>
              <span className="font-mono-label text-primary mr-xs opacity-70">grep -i "</span>
              <input className="bg-transparent border-none outline-none text-on-surface font-mono-label w-full focus:ring-0 p-0 placeholder-on-surface-variant/50" placeholder="Search architecture, language, or concept..." type="text"/>
              <span className="font-mono-label text-primary ml-xs opacity-70">" ./projects</span>
            </div>
            <div className="flex gap-xs flex-wrap">
              {['Go', 'Rust', 'Kubernetes', 'React'].map(tag => (
                <span key={tag} className="bg-[#121212] border border-primary/20 text-primary px-xs py-base rounded-DEFAULT font-mono-label text-caption cursor-pointer hover:bg-primary/10">#{tag}</span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
          {projects.map((proj, i) => (
            <motion.div 
              key={proj.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ borderColor: "rgba(16, 185, 129, 0.4)", boxShadow: "0 0 15px rgba(16, 185, 129, 0.1)" }}
              className="glass-panel rounded-lg p-sm flex flex-col h-full transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-sm">
                <div className="w-10 h-10 rounded bg-surface border border-outline-variant flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{proj.icon}</span>
                </div>
                {i % 3 === 0 && (
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                )}
              </div>
              <h3 className="font-h3 text-h3 mb-xs">{proj.title}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-md flex-grow">{proj.desc}</p>
              
              <div className="flex flex-wrap gap-xs mb-sm">
                {proj.tags.map(tag => (
                  <span key={tag} className="bg-[#121212] border border-primary/20 text-on-surface px-xs py-base rounded-DEFAULT font-mono-label text-[11px]">{tag}</span>
                ))}
              </div>
              <div className="pt-sm border-t border-outline-variant/30 flex justify-between items-center mt-auto">
                <a className="font-mono-label text-caption text-primary hover:text-primary-fixed flex items-center gap-xs group" href="#">
                  {proj.link} <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </a>
                <span className="material-symbols-outlined text-on-surface-variant hover:text-on-surface cursor-pointer">{proj.actionIcon}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
