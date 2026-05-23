import { motion } from "framer-motion";
import TiltCard from "../components/TiltCard";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export default function Resume() {
  return (
    <main className="flex-grow w-full max-w-7xl mx-auto px-gutter py-xl flex flex-col space-y-xl pt-[100px]">
      {/* Header / Summary */}
      <section className="flex flex-col md:flex-row gap-md md:gap-xl items-start justify-between">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex-1 space-y-md">
          <h1 className="font-h1 text-h1 text-primary">AI Developer</h1>
          <div className="flex flex-wrap gap-sm">
            <span className="data-chip font-mono-label text-mono-label text-primary px-sm py-xs rounded-DEFAULT">B.Tech CSE</span>
            <span className="data-chip font-mono-label text-mono-label text-secondary px-sm py-xs rounded-DEFAULT">Location: Chennai</span>
            <span className="data-chip font-mono-label text-mono-label text-secondary px-sm py-xs rounded-DEFAULT">Status: Open to Opportunities</span>
          </div>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mt-md">
            Passionate AI Developer and Computer Science student at SRM IST. Specialized in machine learning, computer vision, and full-stack development. Dedicated to building intelligent solutions that solve real-world problems through data-driven approaches.
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full md:w-64">
          <TiltCard className="h-full">
            <div className="glass-panel p-md rounded-lg flex flex-col space-y-sm h-full w-full">
              <h3 className="font-mono-label text-mono-label text-primary uppercase mb-xs border-b border-outline-variant pb-xs">Quick Contact</h3>
              <a className="font-caption text-caption text-secondary hover:text-primary flex items-center gap-xs" href="mailto:varadvbarve@gmail.com">
                <span className="material-symbols-outlined text-[16px]">mail</span> varadvbarve@gmail.com
              </a>
              <a className="font-caption text-caption text-secondary hover:text-primary flex items-center gap-xs" href="tel:+918320952448">
                <span className="material-symbols-outlined text-[16px]">phone</span> +91 8320952448
              </a>
              <a className="font-caption text-caption text-secondary hover:text-primary flex items-center gap-xs" href="https://github.com/varadbarve" target="_blank" rel="noopener noreferrer">
                <span className="material-symbols-outlined text-[16px]">link</span> github.com/varadbarve
              </a>
              <a className="font-caption text-caption text-secondary hover:text-primary flex items-center gap-xs" href="https://linkedin.com/in/varad-barve-143761280" target="_blank" rel="noopener noreferrer">
                <span className="material-symbols-outlined text-[16px]">link</span> linkedin.com/in/varad-barve
              </a>
            </div>
          </TiltCard>
        </motion.div>
      </section>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-lg"
      >
        {/* Main Content Area: Experience + Projects */}
        <div className="lg:col-span-2 space-y-lg">

          {/* Experience */}
          <motion.div variants={itemVariants}>
            <TiltCard className="h-full">
              <div className="glass-panel p-lg rounded-xl h-full w-full">
                <h2 className="font-h2 text-h2 text-primary mb-lg border-b border-outline-variant pb-sm flex items-center gap-sm">
                  <span className="material-symbols-outlined text-primary">work</span> Experience
                </h2>

                <div className="relative pl-sm sm:pl-md md:pl-lg border-l border-outline-variant">
                  <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6px] top-1 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-sm">
                    <h3 className="font-h3 text-h3 text-on-surface">AI Developer Intern</h3>
                    <span className="font-mono-label text-mono-label text-primary mt-xs md:mt-0">May 2025 – June 2025</span>
                  </div>
                  <h4 className="font-mono-label text-mono-label text-secondary uppercase mb-md">1Stop AI (Personifwy)</h4>
                  <ul className="list-disc list-inside space-y-sm font-body-md text-body-md text-on-surface-variant ml-xs marker:text-primary">
                    <li>Developed and optimized 3 machine learning models using TensorFlow for classification and detection tasks.</li>
                    <li>Performed data preprocessing, feature engineering, and model evaluation on large datasets.</li>
                    <li>Improved model accuracy through hyperparameter tuning and experimentation.</li>
                    <li>Applied modular coding practices and collaborative development workflows.</li>
                    <li>Worked with scalable project structures and reusable code components.</li>
                  </ul>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Projects */}
          <motion.div variants={itemVariants}>
            <TiltCard className="h-full">
              <div className="glass-panel p-lg rounded-xl h-full w-full">
                <h2 className="font-h2 text-h2 text-primary mb-lg border-b border-outline-variant pb-sm flex items-center gap-sm">
                  <span className="material-symbols-outlined text-primary">folder_code</span> Projects
                </h2>
                <div className="space-y-lg">
                  <div className="relative pl-sm sm:pl-md md:pl-lg border-l border-outline-variant">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6px] top-1 shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-sm">
                      <h3 className="font-h3 text-h3 text-on-surface">MediAssist AI</h3>
                      <span className="font-mono-label text-[11px] text-primary/70 mt-xs md:mt-0">React.js · FastAPI · PostgreSQL · JavaScript · Git</span>
                    </div>
                    <ul className="list-disc list-inside space-y-xs font-body-md text-body-md text-on-surface-variant ml-xs marker:text-primary">
                      <li>Designed and developed an AI-assisted healthcare platform for automated patient follow-up workflows.</li>
                      <li>Built functionality to process medical reports and generate simplified patient-friendly summaries.</li>
                      <li>Designed relational database structures for patient, report, and prescription management.</li>
                      <li>Developed responsive user interfaces using HTML5, CSS3, and JavaScript.</li>
                      <li>Implemented modular architecture for report processing, AI interaction, and communication workflows.</li>
                      <li>Applied object-oriented design principles and Git-based version control practices.</li>
                      <li>Focused on scalability, maintainability, and healthcare safety constraints.</li>
                    </ul>
                  </div>
                  <div className="relative pl-sm sm:pl-md md:pl-lg border-l border-outline-variant">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6px] top-1 shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-sm">
                      <h3 className="font-h3 text-h3 text-on-surface">WhatsApp Direct Messaging App</h3>
                      <span className="font-mono-label text-[11px] text-primary/70 mt-xs md:mt-0">JavaScript · HTML5 · CSS3 · Netlify · Git</span>
                    </div>
                    <ul className="list-disc list-inside space-y-xs font-body-md text-body-md text-on-surface-variant ml-xs marker:text-primary">
                      <li>Developed a responsive web application that enables users to initiate WhatsApp conversations without saving contacts.</li>
                      <li>Implemented phone number validation and dynamic URL generation for seamless messaging workflows.</li>
                      <li>Designed reusable UI components and optimized cross-device responsiveness.</li>
                      <li>Applied modular development practices and structured code organization.</li>
                    </ul>
                  </div>
                  <div className="relative pl-sm sm:pl-md md:pl-lg border-l border-outline-variant">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6px] top-1 shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-sm">
                      <h3 className="font-h3 text-h3 text-on-surface">Text Classification System</h3>
                      <span className="font-mono-label text-[11px] text-primary/70 mt-xs md:mt-0">Python · TensorFlow</span>
                    </div>
                    <ul className="list-disc list-inside space-y-xs font-body-md text-body-md text-on-surface-variant ml-xs marker:text-primary">
                      <li>Built a sentiment analysis model for text data using deep learning.</li>
                      <li>Achieved 93% accuracy across 18K review dataset.</li>
                      <li>Extended the architecture to support multi-category text classification.</li>
                    </ul>
                  </div>
                  <div className="relative pl-sm sm:pl-md md:pl-lg border-l border-outline-variant">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6px] top-1 shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-sm">
                      <h3 className="font-h3 text-h3 text-on-surface">Traffic Object Detection System</h3>
                      <span className="font-mono-label text-[11px] text-primary/70 mt-xs md:mt-0">Python · TensorFlow</span>
                    </div>
                    <ul className="list-disc list-inside space-y-xs font-body-md text-body-md text-on-surface-variant ml-xs marker:text-primary">
                      <li>Improved detection efficiency tested over 10K different datasets with an average accuracy improvement of 7%.</li>
                      <li>Working on real-time data integration.</li>
                    </ul>
                  </div>
                  <div className="relative pl-sm sm:pl-md md:pl-lg border-l border-outline-variant">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6px] top-1 shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-sm">
                      <h3 className="font-h3 text-h3 text-on-surface">Galga Lite</h3>
                      <span className="font-mono-label text-[11px] text-primary/70 mt-xs md:mt-0">Python · JavaScript · Vercel</span>
                    </div>
                    <ul className="list-disc list-inside space-y-xs font-body-md text-body-md text-on-surface-variant ml-xs marker:text-primary">
                      <li>Built and deployed an interactive web application.</li>
                      <li>Structured modular and scalable codebase.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>

        {/* Sidebar: Skills, Education, Languages */}
        <div className="space-y-lg">
          <motion.div variants={itemVariants}>
            <TiltCard className="h-full">
              <div className="glass-panel p-lg rounded-xl h-full w-full">
                <h2 className="font-h2 text-h2 text-primary mb-md border-b border-outline-variant pb-sm flex items-center gap-sm">
                  <span className="material-symbols-outlined text-primary">terminal</span> Core Skills
                </h2>
                <div className="space-y-md">
                  <div>
                    <h4 className="font-mono-label text-mono-label text-primary uppercase mb-sm">Languages</h4>
                    <div className="flex flex-wrap gap-xs">
                      {['Python', 'C++', 'Java', 'JavaScript', 'TypeScript', 'SQL'].map(t => (
                        <span key={t} className="data-chip font-mono-label text-mono-label text-on-surface px-sm py-xs rounded-DEFAULT">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-mono-label text-mono-label text-primary uppercase mb-sm">Frontend</h4>
                    <div className="flex flex-wrap gap-xs">
                      {['HTML', 'CSS', 'React.js', 'Next.js', 'Bootstrap'].map(t => (
                        <span key={t} className="data-chip font-mono-label text-mono-label text-on-surface px-sm py-xs rounded-DEFAULT">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-mono-label text-mono-label text-primary uppercase mb-sm">Backend & DB</h4>
                    <div className="flex flex-wrap gap-xs">
                      {['Node.js', 'MongoDB', 'MySQL', 'Firebase', 'Spring Boot', 'Spring MVC', 'REST APIs', 'FastAPI', 'PostgreSQL'].map(t => (
                        <span key={t} className="data-chip font-mono-label text-mono-label text-on-surface px-sm py-xs rounded-DEFAULT">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-mono-label text-mono-label text-primary uppercase mb-sm">AI / ML & Tools</h4>
                    <div className="flex flex-wrap gap-xs">
                      {['TensorFlow', 'Git', 'Vercel', 'Docker', 'GitHub', 'Netlify'].map(t => (
                        <span key={t} className="data-chip font-mono-label text-mono-label text-on-surface px-sm py-xs rounded-DEFAULT">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-mono-label text-mono-label text-primary uppercase mb-sm">Core Concepts</h4>
                    <div className="flex flex-wrap gap-xs">
                      {['OOP', 'DSA', 'MVC', 'CRUD', 'Database Design', 'Responsive UI', 'RESTful Services', 'SDLC', 'Agile', 'Microservices'].map(t => (
                        <span key={t} className="data-chip font-mono-label text-mono-label text-on-surface px-sm py-xs rounded-DEFAULT">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          <motion.div variants={itemVariants}>
            <TiltCard className="h-full">
              <div className="glass-panel p-lg rounded-xl h-full w-full">
                <h2 className="font-h2 text-h2 text-primary mb-md border-b border-outline-variant pb-sm flex items-center gap-sm">
                  <span className="material-symbols-outlined text-primary">school</span> Education
                </h2>
                <div className="space-y-md">
                  <div>
                    <h3 className="font-h3 text-h3 text-on-surface">B.Tech in CSE</h3>
                    <p className="font-mono-label text-mono-label text-secondary uppercase my-xs">SRM Institute of Science and Technology</p>
                    <p className="font-mono-label text-mono-label text-on-surface-variant">2023 – 2027 | CGPA: 8.28</p>
                  </div>
                  <div className="pt-sm border-t border-outline-variant">
                    <h4 className="font-mono-label text-mono-label text-primary uppercase mb-sm">Certifications</h4>
                    <ul className="space-y-xs font-caption text-caption text-on-surface-variant">
                      <li className="flex items-start gap-xs"><span className="material-symbols-outlined text-[14px] text-primary mt-[2px] flex-shrink-0">verified</span> Oracle Java Foundations – Oracle Learning</li>
                      <li className="flex items-start gap-xs"><span className="material-symbols-outlined text-[14px] text-primary mt-[2px] flex-shrink-0">verified</span> Postman API Fundamentals Student Expert – Postman Academy</li>
                      <li className="flex items-start gap-xs"><span className="material-symbols-outlined text-[14px] text-primary mt-[2px] flex-shrink-0">verified</span> AWS Cloud Practitioner Essentials – AWS Skill Builder</li>
                      <li className="flex items-start gap-xs"><span className="material-symbols-outlined text-[14px] text-primary mt-[2px] flex-shrink-0">verified</span> Artificial Intelligence – IIT Guwahati (Alcheringa)</li>
                      <li className="flex items-start gap-xs"><span className="material-symbols-outlined text-[14px] text-primary mt-[2px] flex-shrink-0">verified</span> 30 Days DSA Bootcamp – Unstop</li>
                      <li className="flex items-start gap-xs"><span className="material-symbols-outlined text-[14px] text-primary mt-[2px] flex-shrink-0">verified</span> Basic Statistical Data Analysis Using SPSS – SRM College</li>
                      <li className="flex items-start gap-xs"><span className="material-symbols-outlined text-[14px] text-primary mt-[2px] flex-shrink-0">verified</span> Python Programming – Udemy</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          <motion.div variants={itemVariants}>
            <TiltCard className="h-full">
              <div className="glass-panel p-lg rounded-xl h-full w-full">
                <h2 className="font-h2 text-h2 text-primary mb-md border-b border-outline-variant pb-sm flex items-center gap-sm">
                  <span className="material-symbols-outlined text-primary">translate</span> Languages
                </h2>
                <ul className="space-y-xs font-caption text-caption text-on-surface-variant">
                  <li className="flex justify-between"><span>English</span><span className="text-primary/70">Professional Proficiency</span></li>
                  <li className="flex justify-between"><span>Hindi</span><span className="text-primary/70">Native</span></li>
                  <li className="flex justify-between"><span>Japanese</span><span className="text-primary/70">Elementary</span></li>
                </ul>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}
