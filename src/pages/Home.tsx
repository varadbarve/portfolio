import { motion } from "framer-motion";

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
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary hover:bg-surface-tint text-on-primary-container font-mono-label text-mono-label px-lg py-md rounded-DEFAULT transition-all"
            >
              Deploy Protocol
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-panel text-on-surface font-mono-label text-mono-label px-lg py-md rounded-DEFAULT hover:bg-white/5 transition-all flex items-center gap-sm"
            >
              <span className="material-symbols-outlined text-[18px]">terminal</span>
              View Logs
            </motion.button>
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
            className="glass-panel rounded-lg p-lg col-span-2 relative z-10 flex flex-col justify-between group cursor-pointer"
          >
            <div className="flex justify-between items-start mb-lg">
              <div className="font-mono-label text-mono-label text-on-surface-variant uppercase tracking-widest">Core.Architecture</div>
              <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">schema</span>
            </div>
            <div>
              <h3 className="font-h3 text-h3 text-on-surface mb-xs">Distributed Systems</h3>
              <p className="font-caption text-caption text-on-surface-variant">Designing resilient microservices with event-driven architectures and high-availability patterns.</p>
            </div>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="glass-panel rounded-lg p-md relative z-10 hover:border-primary/50 transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-secondary-fixed mb-md">code_blocks</span>
            <div className="font-mono-label text-mono-label text-on-surface">Frontend.Dev</div>
            <div className="text-xs text-on-surface-variant mt-xs opacity-70">React, Vue, WebGL</div>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="glass-panel rounded-lg p-md relative z-10 hover:border-primary/50 transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-tertiary-fixed mb-md">database</span>
            <div className="font-mono-label text-mono-label text-on-surface">Data.Ops</div>
            <div className="text-xs text-on-surface-variant mt-xs opacity-70">PostgreSQL, Redis, Kafka</div>
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
