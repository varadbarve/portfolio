import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypewriterTextProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

export default function TypewriterText({
  phrases,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2000,
  className = "",
}: TypewriterTextProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIndex];

    if (!isDeleting && charIndex === current.length) {
      const t = setTimeout(() => setIsDeleting(true), pauseDuration);
      return () => clearTimeout(t);
    }

    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setPhraseIndex((p) => (p + 1) % phrases.length);
      return;
    }

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const t = setTimeout(
      () => setCharIndex((p) => p + (isDeleting ? -1 : 1)),
      speed
    );
    return () => clearTimeout(t);
  }, [charIndex, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className={className}>
      {phrases[phraseIndex].slice(0, charIndex)}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.53, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-[3px] h-[0.85em] bg-primary ml-[2px] align-middle rounded-sm"
      />
    </span>
  );
}
