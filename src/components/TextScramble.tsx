import { useState, useEffect, useCallback, useRef } from "react";

const GLYPHS = "!@#$%^&*()_+~{|}[];:?><,./-=";

interface TextScrambleProps {
  text: string;
  className?: string;
  as?: React.ElementType;
  speed?: number;
}

export default function TextScramble({
  text,
  className = "",
  as: Component = "span",
  speed = 30,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<number | null>(null);
  const frameRef = useRef(0);

  const startScramble = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
    frameRef.current = 0;

    intervalRef.current = window.setInterval(() => {
      setDisplayText(() => {
        return text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            // If the current letter's index is less than our frame step, reveal the true character
            if (index < frameRef.current) {
              return text[index];
            }
            // Otherwise show a random character
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("");
      });

      if (frameRef.current >= text.length) {
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setDisplayText(text);
      }
      frameRef.current += 1 / 3; // speed of revealing correct letters
    }, speed);
  }, [text, speed]);

  useEffect(() => {
    startScramble();
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [text, startScramble]);

  return (
    <Component className={className} onMouseEnter={startScramble}>
      {displayText}
    </Component>
  );
}
