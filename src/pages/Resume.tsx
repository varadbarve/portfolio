import { motion } from "framer-motion";

export default function Resume() {
  return (
    <main className="flex-grow w-full max-w-7xl mx-auto px-gutter py-xl flex flex-col space-y-xl pt-[100px]">
      {/* Header / Summary */}
      <section className="flex flex-col md:flex-row gap-xl items-start justify-between">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex-1 space-y-md">
          <h1 className="font-h1 text-h1 text-primary">AI Developer</h1>
          <div className="flex flex-wrap gap-sm">
            <span className="data-chip font-mono-label text-mono-label text-primary px-sm py-xs rounded-DEFAULT">B.Tech CSE</span>
            <span className="data-chip font-mono-label text-mono-label text-secondary px-sm py-xs rounded-DEFAULT">Location: Chennai</span>
            <span className="data-chip font-mono-label text-mono-label text-secondary px-sm py-xs rounded-DEFAULT">Status: Seeking Internships</span>
          </div>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mt-md">
            Passionate AI Developer and Computer Science student at SRM IST. Specialized in machine learning, computer vision, and full-stack development. Dedicated to building intelligent solutions that solve real-world problems through data-driven approaches.
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full md:w-64 glass-panel p-md rounded-lg flex flex-col space-y-sm">
          <h3 className="font-mono-label text-mono-label text-surface-tint uppercase mb-xs border-b border-[#334155] pb-xs">Quick Contact</h3>
          <a className="font-caption text-caption text-secondary hover:text-primary flex items-center gap-xs" href="mailto:varadvbarve@gmail.com">
            <span className="material-symbols-outlined text-[16px]">mail</span> varadvbarve@gmail.com
          </a>
          <a className="font-caption text-caption text-secondary hover:text-primary flex items-center gap-xs" href="#">
            <span className="material-symbols-outlined text-[16px]">link</span> github.com/sys-arch
          </a>
        </motion.div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        {/* Main Content Area: Experience */}
        <div className="lg:col-span-2 space-y-lg">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-lg rounded-xl">
            <h2 className="font-h2 text-h2 text-primary mb-lg border-b border-[#334155] pb-sm flex items-center gap-sm">
              <span className="material-symbols-outlined text-primary">work</span> Experience
            </h2>
            
            <div className="relative pl-lg border-l border-[#334155] pb-lg mb-md">
              <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6px] top-1 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-sm">
                <h3 className="font-h3 text-h3 text-on-surface">AI/ML Internship</h3>
                <span className="font-mono-label text-mono-label text-primary mt-xs md:mt-0">Jan 2024 - Feb 2024</span>
              </div>
              <h4 className="font-mono-label text-mono-label text-secondary uppercase mb-md">1Stop AI</h4>
              <ul className="list-disc list-inside space-y-sm font-body-md text-body-md text-on-surface-variant ml-xs marker:text-primary">
                <li>Developed a high-accuracy text classification system using SVM and CountVectorizer.</li>
                <li>Conducted extensive data preprocessing and feature engineering on complex text datasets.</li>
                <li>Achieved a final model accuracy of 98% through rigorous hyperparameter tuning and validation.</li>
              </ul>
            </div>

            <div className="relative pl-lg border-l border-[#334155] pb-lg">
              <div className="absolute w-3 h-3 bg-surface-variant border border-primary rounded-full -left-[6px] top-1"></div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-sm">
                <h3 className="font-h3 text-h3 text-on-surface">Senior Backend Engineer</h3>
                <span className="font-mono-label text-mono-label text-secondary mt-xs md:mt-0">2018 - 2021</span>
              </div>
              <h4 className="font-mono-label text-mono-label text-secondary uppercase mb-md">DataStream Inc.</h4>
              <ul className="list-disc list-inside space-y-sm font-body-md text-body-md text-on-surface-variant ml-xs marker:text-primary">
                <li>Developed high-throughput data ingestion pipelines using Apache Kafka and Go.</li>
                <li>Optimized PostgreSQL query performance, reducing average latency by 40%.</li>
                <li>Implemented comprehensive CI/CD pipelines reducing deployment times from hours to minutes.</li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Sidebar: Skills & Education */}
        <div className="space-y-lg">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="glass-panel p-lg rounded-xl">
            <h2 className="font-h2 text-h2 text-primary mb-md border-b border-[#334155] pb-sm flex items-center gap-sm">
              <span className="material-symbols-outlined text-primary">terminal</span> Core Skills
            </h2>
            <div className="space-y-md">
              <div>
                <h4 className="font-mono-label text-mono-label text-surface-tint uppercase mb-sm">Languages</h4>
                <div className="flex flex-wrap gap-xs">
                  {['Go', 'Python', 'Rust', 'TypeScript'].map(t => (
                    <span key={t} className="data-chip font-mono-label text-mono-label text-on-surface px-sm py-xs rounded-DEFAULT">{t}</span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-mono-label text-mono-label text-surface-tint uppercase mb-sm">Infrastructure</h4>
                <div className="flex flex-wrap gap-xs">
                  {['Kubernetes', 'Docker', 'Terraform', 'AWS'].map(t => (
                    <span key={t} className="data-chip font-mono-label text-mono-label text-on-surface px-sm py-xs rounded-DEFAULT">{t}</span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-mono-label text-mono-label text-surface-tint uppercase mb-sm">Databases</h4>
                <div className="flex flex-wrap gap-xs">
                  {['PostgreSQL', 'Redis', 'Cassandra'].map(t => (
                    <span key={t} className="data-chip font-mono-label text-mono-label text-on-surface px-sm py-xs rounded-DEFAULT">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="glass-panel p-lg rounded-xl">
            <h2 className="font-h2 text-h2 text-primary mb-md border-b border-[#334155] pb-sm flex items-center gap-sm">
              <span className="material-symbols-outlined text-primary">school</span> Education
            </h2>
            <div className="space-y-md">
              <div>
                <h3 className="font-h3 text-h3 text-on-surface">B.Tech in CSE</h3>
                <p className="font-mono-label text-mono-label text-secondary uppercase my-xs">SRM Institute of Science and Technology</p>
                <p className="font-mono-label text-mono-label text-on-surface-variant">2022 - 2026 | CGPA: 9.24</p>
              </div>
              <div className="pt-sm border-t border-[#334155]">
                <h4 className="font-mono-label text-mono-label text-surface-tint uppercase mb-sm">Certifications</h4>
                <ul className="space-y-xs font-caption text-caption text-on-surface-variant">
                  <li className="flex items-center gap-xs"><span className="material-symbols-outlined text-[14px] text-primary">verified</span> AI-ML Certification (SRM IST)</li>
                  <li className="flex items-center gap-xs"><span className="material-symbols-outlined text-[14px] text-primary">verified</span> Python Programming (Udemy)</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
