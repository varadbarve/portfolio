import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { lazy, Suspense, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Lazy load pages for performance (#15)
const Home = lazy(() => import("./pages/Home"));
const Projects = lazy(() => import("./pages/Projects"));
const Skills = lazy(() => import("./pages/Skills"));
const Resume = lazy(() => import("./pages/Resume"));
const NotFound = lazy(() => import("./pages/NotFound"));

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

function SkeletonBlock({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded bg-surface-container-high/60 animate-pulse ${className}`}
      aria-hidden="true"
    />
  );
}

function ProjectsSkeleton() {
  return (
    <main className="flex-grow pt-[100px] pb-xl w-full bg-background">
      <div className="max-w-[1280px] mx-auto px-gutter w-full">
        <div className="space-y-lg mt-lg">
          <div className="space-y-sm">
            <SkeletonBlock className="h-12 w-full max-w-[420px]" />
            <SkeletonBlock className="h-7 w-full max-w-2xl" />
            <SkeletonBlock className="h-7 w-full max-w-xl" />
            <div className="glass-panel rounded-lg px-sm py-md h-[74px] flex items-center gap-sm">
              <SkeletonBlock className="h-6 w-6 rounded-full flex-shrink-0" />
              <SkeletonBlock className="h-5 flex-1" />
              <SkeletonBlock className="h-5 w-24 hidden sm:block" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="glass-panel rounded-xl p-sm min-h-[340px] flex flex-col"
              >
                <div className="flex items-start justify-between mb-sm">
                  <SkeletonBlock className="h-10 w-10 rounded" />
                  <SkeletonBlock className="h-8 w-8 rounded-full" />
                </div>
                <SkeletonBlock className="h-8 w-3/4 mb-xs" />
                <div className="space-y-xs mb-md">
                  <SkeletonBlock className="h-5 w-full" />
                  <SkeletonBlock className="h-5 w-11/12" />
                  <SkeletonBlock className="h-5 w-4/5" />
                </div>
                <div className="flex gap-xs mb-sm mt-auto">
                  <SkeletonBlock className="h-7 w-16 rounded-DEFAULT" />
                  <SkeletonBlock className="h-7 w-20 rounded-DEFAULT" />
                  <SkeletonBlock className="h-7 w-14 rounded-DEFAULT" />
                </div>
                <div className="pt-sm border-t border-outline-variant/30 flex items-center justify-between">
                  <SkeletonBlock className="h-4 w-32" />
                  <SkeletonBlock className="h-5 w-5 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

function PageLoader({ pathname }: { pathname: string }) {
  if (pathname === "/projects") return <ProjectsSkeleton />;

  return (
    <div className="flex-grow flex items-center justify-center min-h-[60vh]">
      <div className="flex items-center gap-sm font-mono-label text-mono-label text-primary">
        <span className="animate-spin material-symbols-outlined text-[20px]">progress_activity</span>
        Loading module...
      </div>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <Suspense fallback={<PageLoader pathname={location.pathname} />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <div className="bg-background text-on-background font-body-md text-body-md antialiased min-h-screen flex flex-col selection:bg-primary/30 selection:text-primary-fixed">
        <Navbar />
        <AnimatedRoutes />
        <Footer />
      </div>
    </Router>
  );
}
