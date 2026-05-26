import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { lazy, Suspense, useEffect } from "react";
import Footer from "./components/Footer";
import Dock from "./components/Dock";
import BrandStamp from "./components/BrandStamp";

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

function SkillsSkeleton() {
  return (
    <main className="flex-grow pt-[100px] pb-xl px-gutter max-w-[1440px] mx-auto w-full">
      <header className="mb-xl">
        <SkeletonBlock className="h-9 w-56 mb-md rounded-DEFAULT" />
        <SkeletonBlock className="h-12 w-full max-w-[520px] mb-sm" />
        <SkeletonBlock className="h-7 w-full max-w-2xl" />
        <SkeletonBlock className="h-7 w-full max-w-xl mt-xs" />
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
        <div className="lg:col-span-8 space-y-lg">
          <div className="glass-panel rounded-lg p-lg min-h-[300px]">
            <div className="flex justify-between gap-md mb-lg">
              <div className="flex-1 space-y-sm">
                <SkeletonBlock className="h-9 w-full max-w-[420px]" />
                <SkeletonBlock className="h-5 w-full max-w-xl" />
                <SkeletonBlock className="h-5 w-10/12" />
              </div>
              <SkeletonBlock className="h-12 w-20 flex-shrink-0" />
            </div>
            <SkeletonBlock className="h-2 w-full rounded-full mb-md" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-md border-t border-surface-container-highest pt-md">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="space-y-xs">
                  <SkeletonBlock className="h-4 w-24" />
                  <SkeletonBlock className="h-5 w-20" />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="glass-panel rounded-lg p-lg min-h-[240px]">
                <div className="flex justify-between gap-md mb-lg">
                  <SkeletonBlock className="h-8 w-3/4" />
                  <SkeletonBlock className="h-8 w-14" />
                </div>
                <SkeletonBlock className="h-5 w-full mb-xs" />
                <SkeletonBlock className="h-5 w-5/6 mb-lg" />
                <SkeletonBlock className="h-2 w-full rounded-full mb-md" />
                <div className="flex flex-wrap gap-xs">
                  <SkeletonBlock className="h-6 w-20 rounded" />
                  <SkeletonBlock className="h-6 w-24 rounded" />
                  <SkeletonBlock className="h-6 w-16 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-lg">
          <div className="glass-panel rounded-lg p-lg h-[300px] flex flex-col items-center justify-center gap-md">
            <SkeletonBlock className="h-4 w-48 self-start" />
            <SkeletonBlock className="h-[180px] w-[180px] rounded-full" />
          </div>
          <div className="glass-panel rounded-lg p-lg">
            <SkeletonBlock className="h-5 w-56 mb-md" />
            <div className="space-y-md">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex items-center justify-between gap-md">
                  <SkeletonBlock className="h-5 w-40" />
                  <SkeletonBlock className="h-6 w-20 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function ResumeSkeleton() {
  return (
    <main className="flex-grow w-full max-w-7xl mx-auto px-gutter py-xl flex flex-col space-y-xl pt-[100px]">
      <section className="flex flex-col md:flex-row gap-xl items-start justify-between">
        <div className="flex-1 space-y-md w-full">
          <SkeletonBlock className="h-12 w-full max-w-[360px]" />
          <div className="flex flex-wrap gap-sm">
            <SkeletonBlock className="h-8 w-28 rounded-DEFAULT" />
            <SkeletonBlock className="h-8 w-40 rounded-DEFAULT" />
            <SkeletonBlock className="h-8 w-52 rounded-DEFAULT" />
          </div>
          <SkeletonBlock className="h-7 w-full max-w-3xl" />
          <SkeletonBlock className="h-7 w-full max-w-2xl" />
          <SkeletonBlock className="h-7 w-full max-w-xl" />
        </div>
        <div className="w-full md:w-64 glass-panel p-md rounded-lg space-y-sm">
          <SkeletonBlock className="h-5 w-36 mb-xs" />
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonBlock key={index} className="h-5 w-full" />
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        <div className="lg:col-span-2 space-y-lg">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="glass-panel p-lg rounded-xl">
              <SkeletonBlock className="h-9 w-48 mb-lg" />
              <div className="space-y-sm pl-lg border-l border-outline-variant">
                <SkeletonBlock className="h-8 w-full max-w-sm" />
                <SkeletonBlock className="h-5 w-64" />
                {Array.from({ length: index === 0 ? 5 : 8 }).map((_, row) => (
                  <SkeletonBlock key={row} className={`h-5 ${row % 3 === 2 ? "w-4/5" : "w-full"}`} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-lg">
          {Array.from({ length: 3 }).map((_, cardIndex) => (
            <div key={cardIndex} className="glass-panel p-lg rounded-xl">
              <SkeletonBlock className="h-8 w-44 mb-md" />
              <div className="space-y-sm">
                {Array.from({ length: cardIndex === 0 ? 10 : 5 }).map((_, index) => (
                  <SkeletonBlock
                    key={index}
                    className={`h-7 rounded-DEFAULT ${index % 2 === 0 ? "w-full" : "w-4/5"}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

function NotFoundSkeleton() {
  return (
    <main className="flex-grow pt-[100px] px-gutter max-w-[1440px] mx-auto w-full flex items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-xl space-y-lg">
        <SkeletonBlock className="h-36 md:h-48 w-64 mx-auto" />
        <div className="space-y-sm">
          <SkeletonBlock className="h-9 w-72 mx-auto" />
          <SkeletonBlock className="h-5 w-full max-w-md mx-auto" />
          <SkeletonBlock className="h-5 w-11/12 max-w-md mx-auto" />
        </div>
        <div className="glass-panel rounded-lg p-md space-y-sm">
          <SkeletonBlock className="h-4 w-32 ml-auto" />
          <SkeletonBlock className="h-4 w-3/4" />
          <SkeletonBlock className="h-4 w-1/2" />
          <SkeletonBlock className="h-4 w-5/6" />
        </div>
        <div className="flex gap-md justify-center pt-md">
          <SkeletonBlock className="h-12 w-40 rounded-DEFAULT" />
          <SkeletonBlock className="h-12 w-40 rounded-DEFAULT" />
        </div>
      </div>
    </main>
  );
}

function PageLoader({ pathname }: { pathname: string }) {
  if (pathname === "/projects") return <ProjectsSkeleton />;
  if (pathname === "/skills") return <SkillsSkeleton />;
  if (pathname === "/resume") return <ResumeSkeleton />;
  if (pathname !== "/") return <NotFoundSkeleton />;

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
        <BrandStamp />
        <AnimatedRoutes />
        <Footer />
        <Dock />
      </div>
    </Router>
  );
}
