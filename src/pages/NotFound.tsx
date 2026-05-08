import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="flex-grow pt-[100px] px-gutter max-w-[1440px] mx-auto w-full flex items-center justify-center min-h-[70vh]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-lg"
      >
        {/* Glitch-style 404 */}
        <div className="relative">
          <h1 className="text-[150px] md:text-[200px] font-bold leading-none text-transparent bg-clip-text bg-gradient-to-b from-primary/80 to-primary/10 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-primary/5 blur-[60px]"></div>
          </div>
        </div>

        <div className="space-y-sm">
          <h2 className="font-h2 text-h2 text-on-surface">
            <span className="text-primary">$</span> route not found
          </h2>
          <p className="font-mono-label text-mono-label text-on-surface-variant max-w-md mx-auto">
            The requested endpoint does not exist in the current system architecture.
            The process has been terminated with exit code 404.
          </p>
        </div>

        {/* Terminal-style error log */}
        <div className="glass-panel rounded-lg p-md max-w-lg mx-auto text-left">
          <div className="flex items-center gap-xs mb-sm">
            <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
            <span className="font-mono-label text-[11px] text-outline ml-auto">system.log</span>
          </div>
          <div className="font-mono-label text-[12px] space-y-xs">
            <p className="text-red-400">[ERROR] RouteResolver: No match found</p>
            <p className="text-on-surface-variant">[INFO]  Suggested routes:</p>
            <p className="text-primary">        /  /projects  /skills  /resume</p>
            <p className="text-on-surface-variant">[INFO]  Redirecting to home...</p>
          </div>
        </div>

        <div className="flex gap-md justify-center pt-md">
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary hover:bg-surface-tint text-on-primary-container font-mono-label text-mono-label px-lg py-md rounded-DEFAULT transition-all"
            >
              Return to Home
            </motion.button>
          </Link>
          <Link to="/projects">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-panel text-on-surface font-mono-label text-mono-label px-lg py-md rounded-DEFAULT hover:bg-white/5 transition-all"
            >
              View Projects
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
