import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltDegree?: number;
}

export default function TiltCard({ children, className = "", tiltDegree = 8 }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({ rotateX: (0.5 - y) * tiltDegree, rotateY: (x - 0.5) * tiltDegree });
    setGlare({ x: x * 100, y: y * 100, opacity: 0.12 });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={tilt}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ perspective: 800, transformStyle: "preserve-3d" }}
      className={`relative ${className}`}
    >
      {children}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), transparent 60%)`,
        }}
      />
    </motion.div>
  );
}
