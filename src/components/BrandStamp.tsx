import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TextScramble from "./TextScramble";

const ROLES = ["DEVELOPER", "ENGINEER", "GAMER", "CODER", "PROGRAMMER"];

export default function BrandStamp() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prevIndex) => (prevIndex + 1) % ROLES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-6 left-6 z-50 pointer-events-auto">
      <Link
        to="/"
        className="glass-panel glass-glow rounded-full px-md py-xs flex items-center justify-center font-mono-label text-mono-label uppercase tracking-widest text-on-surface hover:text-primary transition-colors cursor-pointer select-none"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-primary mr-xs animate-pulse" />
        <TextScramble text="VB" className="font-bold mr-base text-primary" />
        <span className="opacity-50 text-[10px] sm:inline hidden mr-xs">//</span>
        <TextScramble
          text={ROLES[roleIndex]}
          className="opacity-50 text-[10px] sm:inline hidden"
          speed={40}
        />
      </Link>
    </div>
  );
}
