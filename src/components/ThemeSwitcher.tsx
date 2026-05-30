import { useState, useEffect } from "react";

type Theme = "default" | "batman" | "spiderman" | "invincible";

export default function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("superhero-theme");
    return (saved as Theme) || "default";
  });

  const setTheme = (theme: Theme) => {
    setActiveTheme(theme);
    localStorage.setItem("superhero-theme", theme);

    // Remove other theme classes
    document.body.classList.remove("theme-batman", "theme-spiderman", "theme-invincible");

    // Add selected theme class
    if (theme !== "default") {
      document.body.classList.add(`theme-${theme}`);
    }

    // Set theme custom property for secondary integrations
    let themeColor = "#00ffc2";
    if (theme === "batman") themeColor = "#FDE047";
    else if (theme === "spiderman") themeColor = "#E60000";
    else if (theme === "invincible") themeColor = "#3b82f6";
    
    document.documentElement.style.setProperty("--hologram-color", themeColor);

    // Fire custom event so other components (like GitHub Contribution Heatmap URL) can update
    window.dispatchEvent(new CustomEvent("themechange", { detail: { theme, color: themeColor } }));
  };

  // Sync state on load
  useEffect(() => {
    setTheme(activeTheme);
  }, []);

  return (
    <div className="fixed bottom-24 right-4 md:bottom-8 md:right-8 z-[100] flex flex-row-reverse md:flex-col items-center">
      {/* Floating Options */}
      <div
        className={`flex flex-row md:flex-col items-center gap-3 pr-3 pb-0 md:pr-0 md:pb-6 transition-all duration-300 ease-out origin-right md:origin-bottom ${
          isOpen
            ? "opacity-100 scale-100 translate-x-0 md:translate-y-0 pointer-events-auto"
            : "opacity-0 scale-75 translate-x-8 md:translate-y-8 pointer-events-none"
        }`}
      >
        <button
          className="w-11 h-11 md:w-14 md:h-14 rounded-full bg-[#0c0d18] border-2 border-[#FDE047] flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer"
          onClick={() => {
            setTheme("batman");
            setIsOpen(false);
          }}
          title="Batman Mode"
        >
          <span className="material-symbols-outlined text-[#FDE047] text-xl md:text-2xl font-normal">mask</span>
        </button>
        <button
          className="w-11 h-11 md:w-14 md:h-14 rounded-full bg-[#001f3f] border-2 border-[#E60000] flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer"
          onClick={() => {
            setTheme("spiderman");
            setIsOpen(false);
          }}
          title="Spiderman Mode"
        >
          <span className="material-symbols-outlined text-[#E60000] text-xl md:text-2xl font-normal">grain</span>
        </button>
        <button
          className="w-11 h-11 md:w-14 md:h-14 rounded-full bg-[#facc15] border-2 border-[#3b82f6] flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer"
          onClick={() => {
            setTheme("invincible");
            setIsOpen(false);
          }}
          title="Invincible Mode"
        >
          <span className="material-symbols-outlined text-[#3b82f6] text-xl md:text-2xl font-normal">rocket_launch</span>
        </button>
        <button
          className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-white border-2 border-black flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer"
          onClick={() => {
            setTheme("default");
            setIsOpen(false);
          }}
          title="Reset Theme"
        >
          <span className="material-symbols-outlined text-black text-lg md:text-xl font-normal">refresh</span>
        </button>
      </div>

      {/* Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-13 h-13 md:w-16 md:h-16 glass-panel rounded-full border flex items-center justify-center cursor-pointer transition-all active:scale-90 shadow-2xl"
        style={{
          borderColor: activeTheme === "default"
            ? "var(--c-primary)"
            : activeTheme === "batman"
              ? "#FDE047"
              : activeTheme === "spiderman"
                ? "#E60000"
                : "#3b82f6"
        }}
        title="Choose Theme"
      >
        <span
          className={`material-symbols-outlined text-2xl md:text-3xl transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}
          style={{
            color: activeTheme === "default"
              ? "var(--c-primary)"
              : activeTheme === "batman"
                ? "#FDE047"
                : activeTheme === "spiderman"
                  ? "#E60000"
                  : "#3b82f6"
          }}
        >
          palette
        </span>
      </button>
    </div>
  );
}
