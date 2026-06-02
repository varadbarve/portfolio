import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import HologramCanvas from "../components/HologramCanvas";
import ThemeSwitcher from "../components/ThemeSwitcher";
import AnimatedCounter from "../components/AnimatedCounter";
import ScrollReveal from "../components/ScrollReveal";
import useSmoothScroll from "../hooks/useSmoothScroll";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 15,
    },
  },
} as const;

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

export default function Home() {
  const [themeColor, setThemeColor] = useState(() => {
    const saved = localStorage.getItem("superhero-theme");
    if (saved === "batman") return "FDE047";
    if (saved === "spiderman") return "E60000";
    if (saved === "invincible") return "3b82f6";
    return "00e1ab";
  });
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [ghChartLoaded, setGhChartLoaded] = useState(false);
  const [ghChartCache] = useState<Set<string>>(() => new Set());

  const heroRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<HTMLDivElement>(null);
  const smoothScroll = useSmoothScroll();
  const { scrollY } = useScroll();

  // Dissolve effect for Hero Section on scroll
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 1.15]);
  const heroBlurVal = useTransform(scrollY, [0, 500], [0, 15]);
  const heroBlur = useTransform(heroBlurVal, (v) => `blur(${v}px)`);

  // Multi-layer parallax transforms for hero text elements
  const heroTitleY = useTransform(scrollY, [0, 600], [0, -80]);
  const heroSubtitleY = useTransform(scrollY, [0, 600], [0, -50]);
  const heroCtaY = useTransform(scrollY, [0, 600], [0, -25]);
  const heroLabelY = useTransform(scrollY, [0, 600], [0, -100]);

  // Scroll progress bar animation
  useEffect(() => {
    let raf: number;
    const updateProgress = () => {
      if (scrollProgressRef.current && smoothScroll.current) {
        const progress = smoothScroll.current.progress;
        scrollProgressRef.current.style.height = `${progress * 100}%`;
      }
      raf = requestAnimationFrame(updateProgress);
    };
    raf = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(raf);
  }, [smoothScroll]);

  // Detect scroll pos to show top nav header
  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderVisible(window.scrollY > window.innerHeight * 0.4);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Listen to active theme color changes from ThemeSwitcher
  useEffect(() => {
    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      const newColor = customEvent.detail.color.replace("#", "");
      setThemeColor(newColor);
      // Only show skeleton if this color's chart hasn't been preloaded yet
      if (!ghChartCache.has(newColor)) {
        setGhChartLoaded(false);
      }
    };
    window.addEventListener("themechange", handleThemeChange);

    return () => window.removeEventListener("themechange", handleThemeChange);
  }, [ghChartCache]);

  // Preload all theme chart images on mount so theme switches are instant
  useEffect(() => {
    const colors = ["00e1ab", "FDE047", "E60000", "3b82f6"];
    colors.forEach((color) => {
      const img = new Image();
      img.src = `https://ghchart.rshah.org/${color}/varadbarve`;
      img.onload = () => ghChartCache.add(color);
    });
  }, [ghChartCache]);

  const handleScrollTo = (id: string) => {
    if (id === "hero-section") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(id);
      if (el) {
        let top = 0;
        let current: HTMLElement | null = el;
        while (current) {
          top += current.offsetTop;
          current = current.offsetParent as HTMLElement | null;
        }
        window.scrollTo({ top: Math.max(0, top - 100), behavior: "smooth" });
      }
    }
  };

  // Projects list
  const projects = [
    {
      icon: "medical_services",
      title: "MediAssist AI",
      desc: "Autonomous video and document processing pipeline leveraging GPT-4o and Whisper for patient clinical metadata generation and communication.",
      tags: ["FastAPI", "Next.js", "AI", "Mako"],
      deployLink: "https://medi-assist-01.vercel.app",
      githubLink: "https://github.com/varadbarve/MediAssist",
      actionIcon: "clinical_notes"
    },
    {
      icon: "rocket_launch",
      title: "Galga Lite",
      desc: "A high-performance interactive web application built for seamless user engagement. Features a modular architecture and cloud deployment.",
      tags: ["Python", "JavaScript", "Vercel", "Web App"],
      deployLink: "https://galgalite.vercel.app/",
      githubLink: "https://github.com/varadbarve/galgalite",
      actionIcon: "public"
    },
    {
      icon: "smart_display",
      title: "autoscroller Engine",
      desc: "High-frequency browser automation suite for YouTube Shorts and Instagram Reels. Features smart video-end detection and analytics.",
      tags: ["Node.js", "Playwright", "CSS"],
      githubLink: "https://github.com/varadbarve/autoscroller",
      actionIcon: "auto_mode"
    },
    {
      icon: "qr_code_2",
      title: "WhatsApp Direct",
      desc: "Streamlined communication gateway to send direct WhatsApp messages without saving contacts. Includes QR generation and parsing.",
      tags: ["React", "TypeScript", "Vite", "Tailwind"],
      deployLink: "https://whtsppdrct.netlify.app/",
      githubLink: "https://github.com/varadbarve/whatsapp_direct",
      actionIcon: "chat"
    },
    {
      icon: "robot",
      title: "SRM Feedback Bot",
      desc: "Automation tool designed to streamline student feedback processes at SRM University. Uses Playwright to handle complex form submissions.",
      tags: ["Python", "Playwright", "Automation"],
      githubLink: "https://github.com/varadbarve/Feedback-Bot",
      actionIcon: "feedback"
    },
    {
      icon: "traffic",
      title: "Traffic Detection",
      desc: "Real-time vehicle detection and tracking system using YOLOv8. Optimized for various weather conditions and high-density traffic.",
      tags: ["YOLOv8", "Computer Vision", "Python"],
      githubLink: "https://github.com/varadbarve/Traffic_Object_Detection_System",
      actionIcon: "analytics"
    }
  ];

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
    <div className="w-full relative min-h-screen overflow-x-hidden">
      {/* Floating Assistive Theme Switcher */}
      <ThemeSwitcher />

      {/* Scroll Progress Bar */}
      <div ref={scrollProgressRef} className="scroll-progress-bar" />

      {/* Top Slide-in Brutalist Header */}
      <header
        className={`bg-background/90 backdrop-blur-md fixed top-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] md:w-[calc(100%-6rem)] max-w-[1200px] border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-2xl flex justify-between items-center px-6 py-3 z-50 transition-all duration-500 ${isHeaderVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-32 pointer-events-none"
          }`}
      >
        <div className="font-label-caps text-label-caps theme-accent-border theme-accent-text border-2 px-3 py-1 bg-black/10">
          SYS_STATUS: ONLINE
        </div>
        <nav className="hidden md:flex items-center gap-gutter">
          <button
            onClick={() => handleScrollTo("hero-section")}
            className="font-label-caps text-label-caps text-on-surface hover:theme-accent-text transition-colors font-bold uppercase"
          >
            Systems
          </button>
          <button
            onClick={() => handleScrollTo("projects-section")}
            className="font-label-caps text-label-caps text-on-surface hover:theme-accent-text transition-colors font-bold uppercase"
          >
            Arsenal
          </button>
          <button
            onClick={() => handleScrollTo("skills-section")}
            className="font-label-caps text-label-caps text-on-surface hover:theme-accent-text transition-colors font-bold uppercase"
          >
            Proficiency
          </button>
          <button
            onClick={() => handleScrollTo("resume-section")}
            className="font-label-caps text-label-caps text-on-surface hover:theme-accent-text transition-colors font-bold uppercase"
          >
            Timeline
          </button>
          <button
            onClick={() => handleScrollTo("contact-section")}
            className="font-label-caps text-label-caps text-on-surface hover:theme-accent-text transition-colors font-bold uppercase"
          >
            Contact
          </button>
        </nav>
        <div className="flex items-center gap-4">
          <span
            className="material-symbols-outlined theme-accent-text cursor-pointer hover:scale-110 transition-transform"
            onClick={() => handleScrollTo("contact-section")}
          >
            terminal
          </span>
          <img
            alt="Developer Avatar"
            className="w-10 h-10 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] grayscale"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuChHsRyhYhoJcLRVz6FzaQSIHTMP1W_LQw6CR4XzilaoH0iktmaOjKta1fKtV6aOy1uEDVjFpb_qWVlMUaekSyLbyyjr2LjYUVGR8WnNHkZdmg_dOm8mC9psujbpt8RyT59tEsYkkFXv_JkmROQ-RUTKm3SGnfMxi9LMrMI9KbgMrWs7ZD6fMHJUwj23FkY4QtrUaj-MOekkBECdpuTdqze0NYliIPFdF1Py3fuN--jLwEw7JR66LA7lvxIOo22f4q7QFY4Ga7tpwA"
          />
        </div>
      </header>

      {/* Fixed Fullscreen Hero Section */}
      <motion.section
        id="hero-section"
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale, filter: heroBlur }}
        className="fixed inset-0 w-full h-screen flex flex-col items-center justify-center z-10 pointer-events-none"
      >
        <HologramCanvas />
        <div className="relative z-10 text-center px-margin-mobile flex flex-col items-center pointer-events-auto">
          <motion.div style={{ y: heroLabelY }} className="theme-accent-text font-label-caps text-label-caps tracking-[0.3em] mb-4 opacity-80 uppercase text-xs md:text-sm select-none">
            Cognitive Architecture System
          </motion.div>
          <motion.h1 style={{ y: heroTitleY }} className="font-display-xl text-headline-lg-mobile md:text-display-xl uppercase leading-none mb-6 text-on-background select-none">
            VARAD <span className="theme-accent-text">BARVE</span>
          </motion.h1>
          <motion.div style={{ y: heroSubtitleY }} className="h-1.5 w-32 theme-accent-bg mb-8 border border-black shadow-[2px_2px_0px_rgba(0,0,0,0.5)]"></motion.div>
          <motion.p style={{ y: heroSubtitleY }} className="font-body-lg text-body-lg max-w-xl text-on-surface-variant mb-12 px-4 leading-relaxed">
            Multidisciplinary Senior Engineer crafting the nexus between AI pipelines and high-velocity web architectures.
          </motion.p>
          <motion.div style={{ y: heroCtaY }}>
            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent("initialize-core"));
                handleScrollTo("reveal-start");
              }}
              className="theme-container-bg theme-container-text font-label-caps text-label-caps px-10 py-5 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all uppercase font-bold"
            >
              Initialize_Core
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* Spacing trigger for scroll reveal */}
      <div className="h-screen w-full pointer-events-none" id="reveal-start"></div>

      {/* Main Consolidated Scrollable Content */}
      <main className="relative z-20 bg-background/95 w-full border-t-4 border-black shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <div className="max-w-[1400px] mx-auto px-margin-mobile md:px-margin-desktop py-12 space-y-24">

          {/* Section: Origin Story & Bio */}
          <ScrollReveal offset={80} parallaxSpeed={0.3}>
            <section className="grid grid-cols-1 md:grid-cols-12 gap-gutter pt-12">
              <div className="md:col-span-8 comic-panel theme-surface-bg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 md:p-12 panel-shake">
                <div className="absolute top-0 right-0 theme-container-bg theme-container-text px-6 py-2 border-l-4 border-b-4 border-black font-label-caps text-label-caps font-bold">
                  ISSUE #001 // VARAD_BARVE.TECH
                </div>
                <div className="mb-4 theme-accent-text font-label-caps text-label-caps tracking-widest text-xs uppercase font-bold">
                  Origin Story // Full-Stack Architect
                </div>
                <h2 className="font-headline-lg text-headline-lg md:text-display-xl uppercase mb-6 leading-none text-on-surface">
                  DECODING THE <br />
                  <span className="theme-accent-text bg-black px-2 inline-block mt-2">MULTIVERSE</span>
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-8 leading-relaxed">
                  Senior Software Engineer specializing in the synthesis of AI pipelines and high-performance web systems. Forging scalable architectures from the void of complex data streams, bridging intelligent neural nets with rapid, responsive user interfaces.
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleScrollTo("contact-section")}
                    className="bg-surface-bright text-on-surface hover:theme-accent-border hover:theme-accent-text font-label-caps text-label-caps px-8 py-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all uppercase font-bold"
                  >
                    DOWNLOAD_DOSSIER
                  </button>
                </div>
              </div>
              <div className="md:col-span-4 flex flex-col gap-gutter">
                <div className="comic-panel theme-accent-bg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] aspect-square p-4 panel-shake overflow-hidden">
                  <img
                    className="w-full h-full object-cover border-2 border-black grayscale hover:grayscale-0 transition-all duration-500"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuChHsRyhYhoJcLRVz6FzaQSIHTMP1W_LQw6CR4XzilaoH0iktmaOjKta1fKtV6aOy1uEDVjFpb_qWVlMUaekSyLbyyjr2LjYUVGR8WnNHkZdmg_dOm8mC9psujbpt8RyT59tEsYkkFXv_JkmROQ-RUTKm3SGnfMxi9LMrMI9KbgMrWs7ZD6fMHJUwj23FkY4QtrUaj-MOekkBECdpuTdqze0NYliIPFdF1Py3fuN--jLwEw7JR66LA7lvxIOo22f4q7QFY4Ga7tpwA"
                    alt="Varad Barve Avatar"
                  />
                </div>
                <div className="bg-surface-container-high border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
                  <div className="font-label-caps text-label-caps theme-accent-text mb-2 uppercase tracking-tighter text-xs font-bold">
                    Current Status
                  </div>
                  <div className="font-headline-md text-headline-md leading-none text-on-surface">
                    STABLE_BRANCH: V2.0.4
                  </div>
                </div>
              </div>
            </section>
          </ScrollReveal>

          {/* Section: The Arsenal / Projects */}
          <ScrollReveal id="projects-section" className="scroll-mt-[100px]" offset={60} delay={100}>
            <section className="space-y-12">
              <div className="flex items-end gap-4">
                <h2 className="font-headline-lg text-headline-lg uppercase leading-none text-on-surface">
                  The Arsenal
                </h2>
                <div className="h-1 flex-grow bg-black mb-2 dark:bg-white/20"></div>
              </div>

              {/* Brutalist Search filter */}
              <div className="flex flex-col md:flex-row gap-sm items-start md:items-center">
                <div className="flex-grow w-full md:w-auto border-4 border-black bg-surface-container shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center px-4 py-3 focus-within:shadow-none focus-within:translate-x-[2px] focus-within:translate-y-[2px] transition-all">
                  <span className="material-symbols-outlined text-on-surface-variant mr-3">search</span>
                  <div className="flex items-center flex-grow min-w-0">
                    <span className="hidden sm:inline font-code-sm theme-accent-text mr-2 opacity-70 whitespace-nowrap">grep -i "</span>
                    <input
                      className="bg-transparent border-none outline-none text-on-surface font-code-sm flex-grow min-w-0 focus:ring-0 p-0 placeholder-on-surface-variant/40"
                      placeholder="Search stack, language, or concept..."
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <span className="hidden sm:inline font-code-sm theme-accent-text ml-2 opacity-70 whitespace-nowrap">" ./projects</span>
                  </div>
                </div>
              </div>

              {/* Projects Grid */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((proj) => (
                    <motion.div
                      layout
                      key={proj.title}
                      variants={itemVariants}
                      className="comic-panel group theme-surface-bg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] panel-shake flex flex-col h-full"
                    >
                      {/* Header Image/Background */}
                      <div className="h-44 bg-black overflow-hidden relative border-b-4 border-black flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-emerald-950/20 opacity-30 z-0"></div>
                        <span className="material-symbols-outlined text-[72px] theme-accent-text opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 z-10" style={{ fontVariationSettings: "'FILL' 1" }}>
                          {proj.icon}
                        </span>
                        <div className="absolute bottom-2 left-2 theme-container-bg theme-container-text px-3 py-1 font-label-caps text-[10px] border-2 border-black uppercase font-bold">
                          {proj.tags[0]}
                        </div>
                        <a
                          href={proj.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute top-2 right-2 w-8 h-8 rounded-full border-2 border-black bg-white flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors z-20 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                          title="View Source on GitHub"
                        >
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                        </a>
                      </div>

                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="font-headline-md text-headline-md uppercase mb-2 text-on-surface">
                          {highlightText(proj.title, searchQuery)}
                        </h3>
                        <p className="text-on-surface-variant font-body-md mb-6 leading-relaxed flex-grow">
                          {highlightText(proj.desc, searchQuery)}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {proj.tags.map((tag) => (
                            <span
                              key={tag}
                              className="bg-surface-container-high border border-black/20 text-on-surface px-2 py-0.5 rounded font-code-sm text-xs cursor-pointer hover:theme-accent-border hover:theme-accent-text transition-colors"
                              onClick={() => setSearchQuery(tag)}
                            >
                              {highlightText(tag, searchQuery)}
                            </span>
                          ))}
                        </div>

                        <div className="pt-4 border-t border-black/10 flex justify-between items-center mt-auto">
                          {proj.deployLink ? (
                            <a
                              href={proj.deployLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-code-sm text-xs theme-accent-text hover:underline flex items-center gap-1 font-bold group"
                            >
                              Live Deployment <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_outward</span>
                            </a>
                          ) : (
                            <div />
                          )}
                          <span className="material-symbols-outlined text-on-surface-variant text-lg">
                            {proj.actionIcon}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </section>
          </ScrollReveal>

          {/* Section: Technical Proficiency / Skills */}
          <ScrollReveal id="skills-section" className="scroll-mt-[100px]" offset={60} delay={100}>
            <section className="space-y-12">
              <div className="flex items-end gap-4">
                <h2 className="font-headline-lg text-headline-lg uppercase leading-none text-on-surface">
                  Technical Proficiency
                </h2>
                <div className="h-1 flex-grow bg-black mb-2 dark:bg-white/20"></div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Left Column: Skill Categories */}
                <div className="lg:col-span-8 space-y-8">

                  {/* AI & Intelligent Systems */}
                  <div className="comic-panel theme-surface-bg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8 panel-shake">
                    <div className="absolute top-0 right-0 theme-container-bg theme-container-text px-4 py-1 border-l-2 border-b-2 border-black font-label-caps text-xs font-bold">
                      MATRIX: AI_INTEL
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                      <div>
                        <h3 className="font-headline-md text-headline-md uppercase text-on-surface flex flex-wrap items-center gap-2">
                          AI & Intelligent Systems
                          <span className="bg-black/10 text-on-surface border border-black/20 px-2 py-0.5 rounded font-label-caps text-xs">ADVANCED</span>
                        </h3>
                        <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
                          Architecting neural networks, object detection architectures, and semantic web pipelines.
                        </p>
                      </div>
                      <div className="text-left sm:text-right flex-shrink-0">
                        <AnimatedCounter target={96} className="font-headline-md text-headline-md theme-accent-text block leading-none" />
                        <span className="font-label-caps text-[9px] text-on-surface-variant uppercase tracking-wider">Execution Index</span>
                      </div>
                    </div>
                    <div className="w-full bg-surface-container-highest border border-black/20 h-3 mb-6 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "96%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="theme-accent-bg h-full shadow-[0_0_10px_var(--c-primary)]"
                      />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-black/10 pt-4">
                      {['TensorFlow', 'YOLOv8', 'Scikit-Learn', 'Mako AI'].map((skill) => (
                        <div key={skill} className="space-y-1">
                          <span className="block font-label-caps text-xs text-on-surface-variant font-bold">{skill}</span>
                          <span className="block font-code-sm text-[11px] theme-accent-text">Expert</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Automation & Full-Stack */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Automation */}
                    <div className="comic-panel theme-surface-bg border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 panel-shake">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-headline-md text-headline-md uppercase text-on-surface">Automation</h3>
                        <AnimatedCounter target={94} className="font-headline-md text-headline-md theme-accent-text" />
                      </div>
                      <p className="font-body-md text-on-surface-variant mb-6 h-12 leading-relaxed">
                        Resilient web scraping engines, E2E browser automation pipelines using Playwright.
                      </p>
                      <div className="w-full bg-surface-container-highest border border-black/20 h-3 mb-6 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "94%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1 }}
                          className="theme-accent-bg h-full"
                        />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {['Playwright', 'Puppeteer', 'FastAPI', 'Node.js'].map(t => (
                          <span key={t} className="bg-surface-container-high border border-black/10 font-label-caps text-[10px] px-2 py-0.5 rounded font-bold">{t}</span>
                        ))}
                      </div>
                    </div>

                    {/* Full-Stack */}
                    <div className="comic-panel theme-surface-bg border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 panel-shake">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-headline-md text-headline-md uppercase text-on-surface">Full-Stack</h3>
                        <AnimatedCounter target={91} className="font-headline-md text-headline-md theme-accent-text" />
                      </div>
                      <p className="font-body-md text-on-surface-variant mb-6 h-12 leading-relaxed">
                        Fluid, high-velocity user interfaces and RESTful server microarchitectures.
                      </p>
                      <div className="w-full bg-surface-container-highest border border-black/20 h-3 mb-6 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "91%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1 }}
                          className="theme-accent-bg h-full"
                        />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {['React', 'Next.js', 'TypeScript', 'Tailwind'].map(t => (
                          <span key={t} className="bg-surface-container-high border border-black/10 font-label-caps text-[10px] px-2 py-0.5 rounded font-bold">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Visualization & Tools */}
                <div className="lg:col-span-4 space-y-8">
                  {/* Competency radar visual */}
                  <div className="comic-panel theme-surface-bg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 h-[280px] flex flex-col justify-center items-center relative panel-shake">
                    <span className="font-label-caps text-xs text-on-surface-variant absolute top-4 left-4 uppercase font-bold">
                      Competency Radar
                    </span>
                    <div className="relative w-[160px] h-[160px] border-2 border-black rounded-full flex items-center justify-center">
                      <div className="absolute w-[120px] h-[120px] border border-black/30 rounded-full"></div>
                      <div className="absolute w-[80px] h-[80px] border border-black/25 rounded-full"></div>
                      <div className="absolute w-full h-[1px] bg-black/40 rotate-0"></div>
                      <div className="absolute w-full h-[1px] bg-black/40 rotate-60"></div>
                      <div className="absolute w-full h-[1px] bg-black/40 rotate-120"></div>

                      {/* Polygon visual matching selected theme color */}
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="absolute w-[120px] h-[130px] theme-accent-bg opacity-30 backdrop-blur-[1px] border-2 theme-accent-border"
                        style={{ clipPath: "polygon(50% 0%, 90% 25%, 80% 75%, 20% 90%, 5% 40%)" }}
                      />
                    </div>
                    <div className="absolute w-full h-full pointer-events-none">
                      <span className="absolute top-[42px] left-1/2 -translate-x-1/2 font-label-caps text-[9px] text-on-surface font-bold">AI/ML</span>
                      <span className="absolute bottom-[42px] left-1/2 -translate-x-1/2 font-label-caps text-[9px] text-on-surface font-bold">Web UI</span>
                      <span className="absolute top-1/2 -translate-y-1/2 right-[18px] font-label-caps text-[9px] text-on-surface font-bold">Backend</span>
                      <span className="absolute top-1/2 -translate-y-1/2 left-[18px] font-label-caps text-[9px] text-on-surface font-bold">DevOps</span>
                    </div>
                  </div>

                  {/* Infrastructure Tools card */}
                  <div className="comic-panel theme-surface-bg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 panel-shake">
                    <h3 className="font-label-caps text-xs text-on-surface-variant uppercase tracking-wider mb-4 border-b-2 border-black pb-2 font-bold">
                      Infrastructure & Tools
                    </h3>
                    <div className="space-y-4">
                      {[
                        { icon: "terminal", title: "GitHub / Git", level: "Expert" },
                        { icon: "api", title: "Postman API", level: "Expert" },
                        { icon: "cloud_upload", title: "Netlify / Vercel", level: "Advanced" },
                        { icon: "code", title: "VS Code", level: "Expert" },
                      ].map(t => (
                        <div key={t.title} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="material-symbols-outlined theme-accent-text mr-3 text-[18px]">{t.icon}</span>
                            <span className="font-body-md text-xs text-on-surface leading-none">{t.title}</span>
                          </div>
                          <span className="theme-container-bg theme-container-text font-label-caps text-[9px] px-2 py-0.5 rounded border border-black uppercase font-bold">
                            {t.level}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </ScrollReveal>

          {/* Section: Timeline / Experience / Education */}
          <ScrollReveal id="resume-section" className="scroll-mt-[100px]" offset={60} delay={100}>
            <section className="space-y-12">
              <div className="flex items-end gap-4">
                <h2 className="font-headline-lg text-headline-lg uppercase leading-none text-on-surface">
                  Dossier Timeline
                </h2>
                <div className="h-1 flex-grow bg-black mb-2 dark:bg-white/20"></div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left timeline section */}
                <div className="lg:col-span-2 space-y-8">

                  {/* Experience Card */}
                  <div className="comic-panel theme-surface-bg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8 panel-shake">
                    <h3 className="font-headline-md text-headline-md uppercase text-on-surface mb-6 border-b-2 border-black pb-2 flex items-center gap-2">
                      <span className="material-symbols-outlined theme-accent-text">work</span> Experience
                    </h3>

                    <div className="relative pl-6 border-l-4 border-black">
                      <div className="absolute w-4 h-4 theme-accent-bg border-2 border-black rounded-full -left-[10px] top-1 shadow-[0_0_8px_var(--c-primary)]"></div>
                      <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                        <h4 className="font-headline-md text-lg text-on-surface">AI Developer Intern</h4>
                        <span className="font-label-caps text-xs theme-accent-text font-bold">May 2025 – June 2025</span>
                      </div>
                      <div className="font-label-caps text-xs text-on-surface-variant uppercase mb-4 font-bold">
                        1Stop AI (Personifwy)
                      </div>
                      <ul className="list-disc list-inside space-y-2 font-body-md text-on-surface-variant ml-2 marker:text-primary leading-relaxed">
                        <li>Developed and optimized 3 machine learning models using TensorFlow for classification and detection tasks.</li>
                        <li>Performed data preprocessing, feature engineering, and model evaluation on large datasets.</li>
                        <li>Improved model accuracy through hyperparameter tuning and experimentation.</li>
                        <li>Applied modular coding practices and collaborative development workflows.</li>
                        <li>Worked with scalable project structures and reusable code components.</li>
                      </ul>
                    </div>
                  </div>

                  {/* Additional Projects dossier summary */}
                  <div className="comic-panel theme-surface-bg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8 panel-shake">
                    <h3 className="font-headline-md text-headline-md uppercase text-on-surface mb-6 border-b-2 border-black pb-2 flex items-center gap-2">
                      <span className="material-symbols-outlined theme-accent-text">folder_special</span> System Specifications
                    </h3>
                    <div className="space-y-6">
                      <div className="relative pl-6 border-l-2 border-black">
                        <div className="absolute w-3 h-3 theme-accent-bg border-2 border-black rounded-full -left-[8px] top-1"></div>
                        <h4 className="font-headline-md text-md text-on-surface">Text Classification System</h4>
                        <p className="font-body-md text-on-surface-variant mt-2 leading-relaxed">
                          Built a sentiment analysis model using Deep Learning. Achieved 93% accuracy across an 18K reviews dataset, expanding to support multi-category text classification.
                        </p>
                      </div>
                      <div className="relative pl-6 border-l-2 border-black">
                        <div className="absolute w-3 h-3 theme-accent-bg border-2 border-black rounded-full -left-[8px] top-1"></div>
                        <h4 className="font-headline-md text-md text-on-surface">Traffic Object Detection</h4>
                        <p className="font-body-md text-on-surface-variant mt-2 leading-relaxed">
                          Computer vision pipeline utilizing YOLOv8 for vehicle tracking and density estimation. Tested over 10K dataset instances with average accuracy improvements of 7%.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right sidebar section */}
                <div className="space-y-8">

                  {/* Core Education */}
                  <div className="comic-panel theme-surface-bg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 panel-shake">
                    <h3 className="font-headline-md text-headline-md uppercase text-on-surface mb-4 border-b-2 border-black pb-2 flex items-center gap-2">
                      <span className="material-symbols-outlined theme-accent-text">school</span> Education
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-headline-md text-md text-on-surface leading-tight">B.Tech in CSE</h4>
                        <p className="font-label-caps text-xs text-on-surface-variant uppercase my-1 font-bold">
                          SRM Institute of Science and Technology
                        </p>
                        <p className="font-code-sm text-[11px] theme-accent-text font-bold">
                          2023 – 2027 | CGPA: 8.28
                        </p>
                      </div>
                      <div className="pt-4 border-t border-black/10">
                        <h5 className="font-label-caps text-xs text-on-surface-variant uppercase mb-2 font-bold">
                          Select Certs
                        </h5>
                        <ul className="space-y-2 font-code-sm text-[11px] text-on-surface-variant font-bold leading-normal">
                          <li className="flex items-start gap-1">
                            <span className="material-symbols-outlined text-sm theme-accent-text">verified</span>
                            Java Foundations – Oracle
                          </li>
                          <li className="flex items-start gap-1">
                            <span className="material-symbols-outlined text-sm theme-accent-text">verified</span>
                            API Fundamentals – Postman
                          </li>
                          <li className="flex items-start gap-1">
                            <span className="material-symbols-outlined text-sm theme-accent-text">verified</span>
                            AWS Essentials – Amazon
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="comic-panel theme-surface-bg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 panel-shake">
                    <h3 className="font-headline-md text-headline-md uppercase text-on-surface mb-4 border-b-2 border-black pb-2 flex items-center gap-2">
                      <span className="material-symbols-outlined theme-accent-text">translate</span> Languages
                    </h3>
                    <ul className="space-y-2 font-code-sm text-xs text-on-surface-variant font-bold">
                      <li className="flex justify-between border-b border-black/5 pb-1">
                        <span>English</span>
                        <span className="theme-accent-text">Fluent</span>
                      </li>
                      <li className="flex justify-between border-b border-black/5 pb-1">
                        <span>Hindi</span>
                        <span className="theme-accent-text">Native</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Japanese</span>
                        <span className="theme-accent-text">Elementary</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </ScrollReveal>

          {/* Section: Commit Logs (GitHub Contribution Graph) */}
          <ScrollReveal offset={60} delay={100}>
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
              <div className="lg:col-span-4">
                <div className="bg-black text-white p-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] speech-bubble-tail mb-8 panel-shake">
                  <h3 className="font-headline-md text-headline-md uppercase mb-2 leading-none theme-accent-text">
                    COMMIT_LOGS
                  </h3>
                  <p className="font-code-sm text-xs leading-relaxed text-gray-300">
                    Ongoing stream of cognitive artifacts and system iterations. Tracking velocity in the GitHub dimension.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-8 theme-surface-bg border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center">
                <div className="w-full flex justify-between items-center mb-6">
                  <span className="font-label-caps text-xs text-on-surface-variant font-bold">DEVELOPER PROFILE: @varadbarve</span>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-surface-container-highest border border-black/25"></div>
                    <div className="w-3 h-3 theme-accent-bg opacity-30 border border-black/25"></div>
                    <div className="w-3 h-3 theme-accent-bg opacity-60 border border-black/25"></div>
                    <div className="w-3 h-3 theme-accent-bg opacity-80 border border-black/25"></div>
                    <div className="w-3 h-3 theme-accent-bg border border-black/25"></div>
                  </div>
                </div>
                <div className="w-full overflow-x-auto relative">
                  {/* Skeleton placeholder while chart loads */}
                  {!ghChartLoaded && (
                    <div className="w-full min-w-[680px] h-[120px] rounded bg-surface-container-high/60 animate-pulse flex items-center justify-center">
                      <span className="font-code-sm text-xs text-on-surface-variant/50 uppercase tracking-wider">Loading contribution data...</span>
                    </div>
                  )}
                  <img
                    className={`w-full min-w-[680px] h-auto rounded grayscale hover:grayscale-0 transition-all duration-500 ${ghChartLoaded ? "opacity-100" : "opacity-0 absolute inset-0"
                      }`}
                    src={`https://ghchart.rshah.org/${themeColor}/varadbarve`}
                    alt="Varad Barve GitHub Contributions Chart"
                    onLoad={() => setGhChartLoaded(true)}
                    onError={() => setGhChartLoaded(true)}
                  />
                </div>
                <div className="mt-4 flex justify-between w-full font-code-sm text-xs text-on-surface-variant font-bold">
                  <span>JAN</span>
                  <span>MAR</span>
                  <span>MAY</span>
                  <span>JUL</span>
                  <span>SEP</span>
                  <span>NOV</span>
                </div>
              </div>
            </section>
          </ScrollReveal>

          {/* Section: Contact Form */}
          <ScrollReveal id="contact-section" className="scroll-mt-[100px]" offset={60} delay={100}>
            <section className="pb-16">
              <div className="bg-surface-container-low border-4 border-black p-8 md:p-16 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden panel-shake">
                <div className="absolute top-0 left-0 w-full h-4 halftone-header theme-accent-bg border-b-2 border-black"></div>
                <div className="max-w-2xl mx-auto mt-4">
                  <h2 className="font-headline-lg text-headline-lg uppercase text-center mb-4 text-on-surface">
                    Mission Debrief
                  </h2>
                  <p className="text-center font-body-lg text-body-lg mb-12 text-on-surface-variant leading-relaxed">
                    Requesting secure channel for collaboration or system consultation. Transmission encrypted.
                  </p>
                  <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block font-label-caps text-xs theme-accent-text mb-2 font-bold uppercase">
                          Identifier
                        </label>
                        <input
                          className="w-full theme-surface-bg border-4 border-black p-4 font-code-sm text-sm focus:outline-none focus:theme-accent-border focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all text-on-surface"
                          placeholder="Full Name / Handle"
                          type="text"
                        />
                      </div>
                      <div>
                        <label className="block font-label-caps text-xs theme-accent-text mb-2 font-bold uppercase">
                          Comms_Link
                        </label>
                        <input
                          className="w-full theme-surface-bg border-4 border-black p-4 font-code-sm text-sm focus:outline-none focus:theme-accent-border focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all text-on-surface"
                          placeholder="email@multiverse.com"
                          type="email"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-label-caps text-xs theme-accent-text mb-2 font-bold uppercase">
                        Intel_Report
                      </label>
                      <textarea
                        className="w-full theme-surface-bg border-4 border-black p-4 font-code-sm text-sm focus:outline-none focus:theme-accent-border focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all text-on-surface resize-none"
                        placeholder="Your message details here..."
                        rows={4}
                      />
                    </div>
                    <button
                      type="submit"
                      onClick={() => {
                        window.location.href = "mailto:varadvbarve@gmail.com?subject=Portfolio Contact";
                      }}
                      className="w-full theme-container-bg theme-container-text font-headline-md text-headline-md py-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all uppercase font-bold"
                    >
                      Send_Signal
                    </button>
                  </form>
                </div>
              </div>
            </section>
          </ScrollReveal>

        </div>
      </main>
    </div>
  );
}
