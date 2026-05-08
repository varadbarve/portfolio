import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="flex-grow pt-[100px] px-gutter max-w-[1440px] mx-auto w-full">
      {/* Hero Section */}
      <section className="py-xl lg:py-[120px] grid grid-cols-1 lg:grid-cols-2 gap-xl items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-lg relative z-10"
        >
          <div className="data-chip inline-flex items-center rounded-full px-sm py-xs font-mono-label text-mono-label text-primary-fixed mb-md">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse mr-sm"></span>
            SYS_STATUS: ONLINE
          </div>
          <h1 className="font-h1 text-h1 text-on-surface leading-tight">
            AI Developer <br/>
            <span className="text-surface-variant">&amp;</span> Full-Stack Engineer
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
            Engineering intelligent systems and modern web applications. Specialized in machine learning models and scalable full-stack architectures.
          </p>
          <div className="flex gap-md pt-sm">
            <Link to="/projects">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary hover:bg-surface-tint text-on-primary-container font-mono-label text-mono-label px-lg py-md rounded-DEFAULT transition-all"
              >
                Deploy Protocol
              </motion.button>
            </Link>
            <Link to="/resume">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass-panel text-on-surface font-mono-label text-mono-label px-lg py-md rounded-DEFAULT hover:bg-white/5 transition-all flex items-center gap-sm"
              >
                <span className="material-symbols-outlined text-[18px]">terminal</span>
                View Logs
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Glassmorphism Bento Grid */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 gap-sm relative"
        >
          <div className="absolute inset-0 blur-[100px] rounded-full z-0 pointer-events-none bg-primary/10"></div>
          
          <motion.div 
            whileHover={{ y: -5 }}
            className="glass-panel rounded-lg p-lg col-span-2 relative z-10 flex flex-col justify-between group cursor-pointer relative"
          >
            <a 
              href="https://github.com/varadbarve/MediAssist" 
              target="_blank" 
              rel="noopener noreferrer"
              className="absolute top-4 right-4 text-on-surface-variant hover:text-primary transition-colors"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <div className="flex justify-between items-start mb-lg">
              <div className="font-mono-label text-mono-label text-on-surface-variant uppercase tracking-widest">Featured.Production</div>
              <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">medical_services</span>
            </div>
            <div>
              <h3 className="font-h3 text-h3 text-on-surface mb-xs pr-10">MediAssist AI</h3>
              <p className="font-caption text-caption text-on-surface-variant">Intelligent patient communication bridge. Transforming clinical data into human-centric voice interactions.</p>
            </div>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="glass-panel rounded-lg p-md relative z-10 hover:border-primary/50 transition-colors cursor-pointer group">
            <a 
              href="https://github.com/varadbarve/autoscroller" 
              target="_blank" 
              rel="noopener noreferrer"
              className="absolute top-3 right-3 text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <span className="material-symbols-outlined text-secondary-fixed mb-md">smart_display</span>
            <div className="font-mono-label text-mono-label text-on-surface">autoscroller</div>
            <div className="text-xs text-on-surface-variant mt-xs opacity-70">Playwright.Automation</div>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="glass-panel rounded-lg p-md relative z-10 hover:border-primary/50 transition-colors cursor-pointer group">
            <a 
              href="https://github.com/varadbarve/whatsapp_direct" 
              target="_blank" 
              rel="noopener noreferrer"
              className="absolute top-3 right-3 text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <span className="material-symbols-outlined text-tertiary-fixed mb-md">chat</span>
            <div className="font-mono-label text-mono-label text-on-surface">WA Direct</div>
            <div className="text-xs text-on-surface-variant mt-xs opacity-70">React.Tooling</div>
          </motion.div>
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
          System Capabilities
        </div>
      </motion.div>

      {/* Contact Section */}
      <section className="py-xl mb-xl" id="contact">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel rounded-xl p-lg lg:p-[48px] max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-xl"
        >
          <div className="md:col-span-2 space-y-lg">
            <div>
              <h2 className="font-h2 text-h2 text-on-surface mb-sm">Initialize Contact</h2>
              <p className="font-caption text-caption text-on-surface-variant">
                Open a secure channel for project inquiries, technical collaborations, or system architectural consulting.
              </p>
            </div>
            <div className="space-y-md">
              <div className="flex items-center gap-md">
                <div className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">mail</span>
                </div>
                <div>
                  <div className="font-mono-label text-[11px] text-outline uppercase">Protocol</div>
                  <div className="font-mono-label text-mono-label text-on-surface">varadvbarve@gmail.com</div>
                </div>
              </div>
              <div className="flex items-center gap-md">
                <div className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">location_on</span>
                </div>
                <div>
                  <div className="font-mono-label text-[11px] text-outline uppercase">Node</div>
                  <div className="font-mono-label text-mono-label text-on-surface">Chennai, India (UTC+5:30)</div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-3">
            <form className="space-y-md">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
                <div className="space-y-xs">
                  <label className="font-mono-label text-mono-label text-on-surface-variant block">ID_String (Name)</label>
                  <input className="w-full bg-surface-container-low border border-surface-container-highest rounded-DEFAULT px-md py-sm text-on-surface font-mono-label text-mono-label focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-surface-bright" placeholder="Enter your designation" type="text"/>
                </div>
                <div className="space-y-xs">
                  <label className="font-mono-label text-mono-label text-on-surface-variant block">Endpoint (Email)</label>
                  <input className="w-full bg-surface-container-low border border-surface-container-highest rounded-DEFAULT px-md py-sm text-on-surface font-mono-label text-mono-label focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-surface-bright" placeholder="name@domain.com" type="email"/>
                </div>
              </div>
              <div className="space-y-xs">
                <label className="font-mono-label text-mono-label text-on-surface-variant block">Payload (Message)</label>
                <textarea className="w-full bg-surface-container-low border border-surface-container-highest rounded-DEFAULT px-md py-sm text-on-surface font-mono-label text-mono-label focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-surface-bright resize-none" placeholder="Transmit your query..." rows={4}></textarea>
              </div>
              <div className="pt-sm flex justify-end">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.location.href = 'mailto:varadvbarve@gmail.com'}
                  className="bg-primary hover:bg-surface-tint text-on-primary-container font-mono-label text-mono-label px-lg py-md rounded-DEFAULT transition-all flex items-center gap-sm" type="button"
                >
                  Transmit Data <span className="material-symbols-outlined text-[18px]">send</span>
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
