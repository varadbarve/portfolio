import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ParticleGrid from "../components/ParticleGrid";
import TypewriterText from "../components/TypewriterText";
import MagneticButton from "../components/MagneticButton";
import TiltCard from "../components/TiltCard";

const techStack = [
  { name: "Python", icon: "code", color: "#3776AB" },
  { name: "React", icon: "web", color: "#61DAFB" },
  { name: "TensorFlow", icon: "neurology", color: "#FF6F00" },
  { name: "TypeScript", icon: "code_blocks", color: "#3178C6" },
  { name: "Node.js", icon: "terminal", color: "#339933" },
  { name: "Next.js", icon: "layers", color: "#ffffff" },
  { name: "Playwright", icon: "precision_manufacturing", color: "#2EAD33" },
  { name: "YOLOv8", icon: "visibility", color: "#FF4081" },
];

export default function Home() {
  return (
    <main className="flex-grow pt-[100px] w-full bg-background">
      {/* Content Wrapper to handle centering without "black margins" */}
      <div className="max-w-[1440px] mx-auto px-gutter w-full">
        {/* Hero Section */}
        <section className="py-xl lg:py-[120px] grid grid-cols-1 lg:grid-cols-2 gap-xl items-center relative overflow-hidden">
          {/* Particle Background */}
          <ParticleGrid />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-lg relative z-10"
          >
            {/* Profile Avatar (#1) */}
            <div className="flex items-center gap-md">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-primary via-primary/70 to-emerald-700 flex items-center justify-center ring-2 ring-primary/30 ring-offset-2 ring-offset-background shadow-[0_0_30px_rgba(16,185,129,0.25)]"
              >
                <span className="text-2xl font-bold text-[#0f172a] select-none">VB</span>
              </motion.div>
              <div className="data-chip inline-flex items-center rounded-full px-sm py-xs font-mono-label text-mono-label text-primary">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse mr-sm"></span>
                SYS_STATUS: ONLINE
              </div>
            </div>

            <h1 className="font-h1 text-h1 text-on-surface leading-tight">
              Engineering <br />
              <TypewriterText
                phrases={["Intelligent Systems", "AI Pipelines", "Web Architectures", "Smart Solutions"]}
                className="text-primary"
              />
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
              AI Developer &amp; Full-Stack Engineer specializing in high-performance machine learning models and fluid, modern web architectures.
            </p>
            <div className="flex gap-md pt-sm">
              <MagneticButton>
                <Link to="/projects">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-primary hover:bg-surface-tint text-on-primary-container font-mono-label text-mono-label px-lg py-md rounded-DEFAULT transition-all"
                  >
                    View Projects
                  </motion.button>
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link to="/resume">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="glass-panel text-on-surface font-mono-label text-mono-label px-lg py-md rounded-DEFAULT hover:bg-primary/10 transition-all flex items-center gap-sm"
                  >
                    <span className="material-symbols-outlined text-[18px]">description</span>
                    View Resume
                  </motion.button>
                </Link>
              </MagneticButton>
            </div>
          </motion.div>

          {/* Glassmorphism Bento Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 gap-sm relative z-10"
          >
            <div className="absolute inset-0 blur-[100px] rounded-full z-0 pointer-events-none bg-primary/10"></div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="col-span-2"
            >
              <TiltCard className="h-full">
                <div
                  className="glass-panel glass-glow rounded-lg p-lg relative z-10 flex flex-col justify-between group cursor-pointer h-full"
                  onClick={() => window.open('https://github.com/varadbarve/MediAssist', '_blank')}
                >
                  <a
                    href="https://github.com/varadbarve/MediAssist"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 text-on-surface-variant hover:text-primary transition-colors z-20"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                  <div className="flex justify-between items-start mb-lg">
                    <div className="font-mono-label text-mono-label text-on-surface-variant uppercase tracking-widest text-[11px]">Featured System</div>
                    <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">medical_services</span>
                  </div>
                  <div>
                    <h3 className="font-h3 text-h3 text-on-surface mb-xs pr-10">MediAssist AI</h3>
                    <p className="font-caption text-caption text-on-surface-variant">Intelligent patient communication bridge. Transforming clinical data into human-centric voice interactions via autonomous AI agents.</p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <TiltCard className="h-full">
                <div
                  className="glass-panel glass-glow rounded-lg p-md relative z-10 hover:border-primary/50 transition-colors cursor-pointer group h-full"
                  onClick={() => window.open('https://github.com/varadbarve/autoscroller', '_blank')}
                >
                  <a
                    href="https://github.com/varadbarve/autoscroller"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-3 right-3 text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity z-20"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                  <span className="material-symbols-outlined text-secondary-fixed mb-md">smart_display</span>
                  <div className="font-mono-label text-mono-label text-on-surface">autoscroller</div>
                  <div className="text-[10px] text-on-surface-variant mt-xs opacity-60 uppercase tracking-wider">Automation</div>
                </div>
              </TiltCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <TiltCard className="h-full">
                <div
                  className="glass-panel glass-glow rounded-lg p-md relative z-10 hover:border-primary/50 transition-colors cursor-pointer group h-full"
                  onClick={() => window.open('https://github.com/varadbarve/whatsapp_direct', '_blank')}
                >
                  <a
                    href="https://github.com/varadbarve/whatsapp_direct"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-3 right-3 text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity z-20"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                  <span className="material-symbols-outlined text-tertiary-fixed mb-md">chat</span>
                  <div className="font-mono-label text-mono-label text-on-surface">WA Direct</div>
                  <div className="text-[10px] text-on-surface-variant mt-xs opacity-60 uppercase tracking-wider">Web Utility</div>
                </div>
              </TiltCard>
            </motion.div>
          </motion.div>
        </section>

        {/* Tech Stack Orbital (#9) — scroll-triggered */}
        <section className="py-xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-lg"
          >
            <h2 className="font-mono-label text-mono-label text-outline uppercase tracking-widest mb-sm">Technology Stack</h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-md max-w-3xl mx-auto">
            {techStack.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1, transition: { delay: i * 0.06, type: "spring", stiffness: 120 } }}
                viewport={{ once: true }}
                whileHover={{ y: -8, boxShadow: `0 8px 30px ${tech.color}50` }}
                className="glass-panel rounded-lg px-md py-sm flex items-center gap-sm cursor-default hover:border-primary/50 transition-colors duration-200"
              >
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{ color: tech.color }}
                >
                  {tech.icon}
                </span>
                <span className="font-mono-label text-mono-label text-on-surface">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* GitHub Activity Widget (#12) — scroll-triggered */}
        <section className="py-xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-panel rounded-xl p-lg max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-between mb-md">
              <div className="flex items-center gap-sm">
                <svg className="w-5 h-5 fill-on-surface-variant" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <h3 className="font-mono-label text-mono-label text-on-surface uppercase tracking-wider">Contribution Activity</h3>
              </div>
              <a
                href="https://github.com/varadbarve"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono-label text-[11px] text-primary hover:text-primary-fixed flex items-center gap-xs"
              >
                @varadbarve <span className="material-symbols-outlined text-[14px]">open_in_new</span>
              </a>
            </div>
            <div className="w-full overflow-x-auto">
              <img
                src="https://ghchart.rshah.org/10b981/varadbarve"
                alt="Varad Barve's GitHub Contribution Chart"
                className="w-full min-w-[680px] h-auto rounded opacity-90 hover:opacity-100 transition-opacity"
                loading="lazy"
              />
            </div>
          </motion.div>
        </section>

        {/* Technical Capabilities Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          className="w-full h-px bg-surface-container-highest my-xl relative origin-left"
        >
          <div className="absolute left-1/2 -translate-x-1/2 -top-[10px] bg-background px-md font-mono-label text-mono-label text-outline uppercase">
            Initialize Contact
          </div>
        </motion.div>

        {/* Contact Section — scroll-triggered */}
        <section className="py-xl mb-xl" id="contact">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-panel rounded-xl p-lg lg:p-[48px] max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-xl"
          >
            <div className="md:col-span-2 space-y-lg">
              <div>
                <h2 className="font-h2 text-h2 text-on-surface mb-sm">Get in Touch</h2>
                <p className="font-caption text-caption text-on-surface-variant">
                  Open a channel for project inquiries, technical collaborations, or consulting opportunities.
                </p>
              </div>
              <div className="space-y-md">
                <a href="mailto:varadvbarve@gmail.com" className="flex items-center gap-md group">
                  <div className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
                    <span className="material-symbols-outlined text-[20px]">mail</span>
                  </div>
                  <div>
                    <div className="font-mono-label text-[11px] text-outline uppercase">Email</div>
                    <div className="font-mono-label text-mono-label text-on-surface group-hover:text-primary transition-colors">varadvbarve@gmail.com</div>
                  </div>
                </a>
                <a href="https://github.com/varadbarve" target="_blank" rel="noopener noreferrer" className="flex items-center gap-md group">
                  <div className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-mono-label text-[11px] text-outline uppercase">GitHub</div>
                    <div className="font-mono-label text-mono-label text-on-surface group-hover:text-primary transition-colors">github.com/varadbarve</div>
                  </div>
                </a>
                <div className="flex items-center gap-md">
                  <div className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[20px]">location_on</span>
                  </div>
                  <div>
                    <div className="font-mono-label text-[11px] text-outline uppercase">Location</div>
                    <div className="font-mono-label text-mono-label text-on-surface">Chennai, India (UTC+5:30)</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-3">
              <form className="space-y-md">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
                  <div className="space-y-xs">
                    <label className="font-mono-label text-mono-label text-on-surface-variant block">Name</label>
                    <input className="w-full bg-surface-container-low border border-surface-container-highest rounded-DEFAULT px-md py-sm text-on-surface font-mono-label text-mono-label focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-surface-bright" placeholder="Your name" type="text" />
                  </div>
                  <div className="space-y-xs">
                    <label className="font-mono-label text-mono-label text-on-surface-variant block">Email</label>
                    <input className="w-full bg-surface-container-low border border-surface-container-highest rounded-DEFAULT px-md py-sm text-on-surface font-mono-label text-mono-label focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-surface-bright" placeholder="name@domain.com" type="email" />
                  </div>
                </div>
                <div className="space-y-xs">
                  <label className="font-mono-label text-mono-label text-on-surface-variant block">Message</label>
                  <textarea className="w-full bg-surface-container-low border border-surface-container-highest rounded-DEFAULT px-md py-sm text-on-surface font-mono-label text-mono-label focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-surface-bright resize-none" placeholder="Tell me about your project..." rows={4}></textarea>
                </div>
                <div className="pt-sm flex justify-end">
                  <MagneticButton>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => window.location.href = 'mailto:varadvbarve@gmail.com'}
                      className="bg-primary hover:bg-surface-tint text-on-primary-container font-mono-label text-mono-label px-lg py-md rounded-DEFAULT transition-all flex items-center gap-sm" type="button"
                    >
                      Send Message <span className="material-symbols-outlined text-[18px]">send</span>
                    </motion.button>
                  </MagneticButton>
                </div>
              </form>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
