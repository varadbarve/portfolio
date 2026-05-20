import { motion } from "framer-motion";
import AnimatedCounter from "../components/AnimatedCounter";
import TiltCard from "../components/TiltCard";

export default function Skills() {
  return (
    <main className="flex-grow pt-[100px] pb-xl px-gutter max-w-[1440px] mx-auto w-full">
      <header className="mb-xl">
        <div className="data-chip font-mono-label text-mono-label text-primary inline-flex items-center px-sm py-xs rounded-DEFAULT mb-md">
          <span className="material-symbols-outlined text-[16px] mr-xs">terminal</span>
          SYS.SKILLS_MATRIX.INIT()
        </div>
        <h1 className="font-h1 text-h1 text-on-surface mb-sm">Technical Proficiency</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Quantitative analysis of core competencies across backend engineering, systems programming, and modern web development architectures.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-lg">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <TiltCard className="h-full">
              <div className="glass-panel glass-glow rounded-lg p-lg relative overflow-hidden group h-full">
                <div className="absolute top-0 right-0 p-md opacity-20 group-hover:opacity-40 transition-opacity">
                  <span className="material-symbols-outlined text-[120px] text-surface-bright">neurology</span>
                </div>
                <div className="relative z-10 flex justify-between items-start mb-lg">
                  <div>
                    <h2 className="font-h2 text-h2 text-on-surface flex items-center">
                      AI & Intelligent Systems
                      <span className="ml-sm data-chip font-mono-label text-mono-label text-secondary px-sm py-xs rounded-DEFAULT text-[12px]">Advanced</span>
                    </h2>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-xs">Architecting neural architectures and computer vision pipelines for production-grade automation.</p>
                  </div>
                  <div className="text-right">
                    <AnimatedCounter target={96} className="font-h3 text-h3 text-primary block" />
                    <span className="font-mono-label text-mono-label text-on-surface-variant uppercase tracking-wider text-[10px]">Execution Index</span>
                  </div>
                </div>
                <div className="relative z-10">
                  <div className="w-full bg-surface-container-highest rounded-full h-2 mb-md overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: "96%" }} transition={{ duration: 1, delay: 0.2 }} className="bg-primary h-2 rounded-full shadow-[0_0_10px_rgba(78,222,163,0.4)]"></motion.div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-md border-t border-surface-container-highest pt-md">
                    {['TensorFlow', 'YOLOv8', 'Scikit-Learn', 'Mako AI'].map((skill) => (
                      <div key={skill}>
                        <span className="block font-mono-label text-mono-label text-on-surface-variant mb-xs">{skill}</span>
                        <span className="font-caption text-caption text-on-surface">Precision</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <TiltCard className="h-full">
                <div className="glass-panel glass-glow rounded-lg p-lg relative overflow-hidden group h-full">
                  <div className="absolute top-0 right-0 p-md opacity-20 group-hover:opacity-40 transition-opacity">
                    <span className="material-symbols-outlined text-[80px] text-surface-bright">precision_manufacturing</span>
                  </div>
                  <div className="relative z-10 mb-lg">
                    <div className="flex justify-between items-center mb-sm">
                      <h2 className="font-h3 text-h3 text-on-surface">Automation Engineering</h2>
                      <AnimatedCounter target={94} className="font-h3 text-h3 text-primary" />
                    </div>
                    <p className="font-caption text-caption text-on-surface-variant h-12">Building resilient E2E automation engines and bot architectures using Playwright and Node.js.</p>
                  </div>
                  <div className="relative z-10">
                    <div className="w-full bg-surface-container-highest rounded-full h-2 mb-md overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: "94%" }} transition={{ duration: 1, delay: 0.3 }} className="bg-primary h-2 rounded-full shadow-[0_0_10px_rgba(78,222,163,0.4)]"></motion.div>
                    </div>
                    <div className="flex flex-wrap gap-xs">
                      {['Playwright', 'Puppeteer', 'FastAPI', 'Node.js'].map(t => (
                        <span key={t} className="data-chip font-mono-label text-mono-label text-[11px] px-xs py-[2px] rounded">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <TiltCard className="h-full">
                <div className="glass-panel glass-glow rounded-lg p-lg relative overflow-hidden group h-full">
                  <div className="absolute top-0 right-0 p-md opacity-20 group-hover:opacity-40 transition-opacity">
                    <span className="material-symbols-outlined text-[80px] text-surface-bright">layers</span>
                  </div>
                  <div className="relative z-10 mb-lg">
                    <div className="flex justify-between items-center mb-sm">
                      <h2 className="font-h3 text-h3 text-on-surface">Full-Stack Synthesis</h2>
                      <AnimatedCounter target={91} className="font-h3 text-h3 text-primary" />
                    </div>
                    <p className="font-caption text-caption text-on-surface-variant h-12">Developing high-density data visualizations and reactive interfaces with React and TypeScript.</p>
                  </div>
                  <div className="relative z-10">
                    <div className="w-full bg-surface-container-highest rounded-full h-2 mb-md overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: "91%" }} transition={{ duration: 1, delay: 0.4 }} className="bg-primary h-2 rounded-full shadow-[0_0_10px_rgba(78,222,163,0.4)]"></motion.div>
                    </div>
                    <div className="flex flex-wrap gap-xs">
                      {['React', 'Next.js', 'TypeScript', 'Tailwind'].map(t => (
                        <span key={t} className="data-chip font-mono-label text-mono-label text-[11px] px-xs py-[2px] rounded">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-lg">
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <TiltCard className="h-full">
              <div className="glass-panel rounded-lg p-lg flex flex-col justify-center items-center h-[300px] relative overflow-hidden w-full">
                <span className="font-mono-label text-mono-label text-on-surface-variant absolute top-md left-md uppercase">Competency Distribution</span>
                <div className="relative w-[180px] h-[180px] border border-surface-container-highest rounded-full flex items-center justify-center">
                  <div className="absolute w-[140px] h-[140px] border border-surface-container-highest rounded-full"></div>
                  <div className="absolute w-[100px] h-[100px] border border-surface-container-highest rounded-full"></div>
                  <div className="absolute w-full h-[1px] bg-surface-container-highest rotate-0"></div>
                  <div className="absolute w-full h-[1px] bg-surface-container-highest rotate-60"></div>
                  <div className="absolute w-full h-[1px] bg-surface-container-highest rotate-120"></div>
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.8 }} className="absolute w-[130px] h-[140px] bg-primary/20 backdrop-blur-sm border border-primary/50" style={{ clipPath: "polygon(50% 0%, 90% 25%, 80% 75%, 20% 90%, 5% 40%)" }}></motion.div>
                </div>
                <div className="absolute w-full h-full pointer-events-none">
                  <span className="absolute top-[30px] left-1/2 -translate-x-1/2 font-mono-label text-[10px] text-on-surface">Backend</span>
                  <span className="absolute bottom-[30px] left-1/2 -translate-x-1/2 font-mono-label text-[10px] text-on-surface">Frontend</span>
                  <span className="absolute top-1/2 -translate-y-1/2 right-[10px] font-mono-label text-[10px] text-on-surface">DevOps</span>
                  <span className="absolute top-1/2 -translate-y-1/2 left-[10px] font-mono-label text-[10px] text-on-surface">DBs</span>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <TiltCard className="h-full">
              <div className="glass-panel rounded-lg p-lg h-full">
                <h3 className="font-mono-label text-mono-label text-on-surface-variant uppercase tracking-wider mb-md border-b border-surface-container-highest pb-xs">Infrastructure & Tools</h3>
                <div className="space-y-md">
                  {[
                    { icon: "terminal", title: "GitHub / Git", level: "Expert" },
                    { icon: "api", title: "Postman", level: "Expert" },
                    { icon: "cloud_upload", title: "Netlify", level: "Advanced" },
                    { icon: "code", title: "VS Code", level: "Expert" },
                  ].map(t => (
                    <div key={t.title} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="material-symbols-outlined text-secondary mr-sm text-[20px]">{t.icon}</span>
                        <span className="font-caption text-caption text-on-surface">{t.title}</span>
                      </div>
                      <span className="data-chip font-mono-label text-[11px] text-primary px-xs py-[2px] rounded">{t.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
