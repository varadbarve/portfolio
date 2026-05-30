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
    <div className="fixed bottom-28 right-6 md:bottom-8 md:right-8 z-[100] flex flex-col items-center">
      {/* Floating Options */}
      <div
        className={`flex flex-col items-center gap-4 pb-6 transition-all duration-300 ease-out origin-bottom ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-75 translate-y-8 pointer-events-none"
        }`}
      >
        <button
          className="w-14 h-14 rounded-full bg-[#0c0d18] border-2 border-[#FDE047] flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer"
          onClick={() => {
            setTheme("batman");
            setIsOpen(false);
          }}
          title="Batman Mode"
        >
          <span className="material-symbols-outlined text-[#FDE047] text-2xl font-normal">mask</span>
        </button>
        <button
          className="w-14 h-14 rounded-full bg-[#001f3f] border-2 border-[#E60000] flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer"
          onClick={() => {
            setTheme("spiderman");
            setIsOpen(false);
          }}
          title="Spiderman Mode"
        >
          <span className="material-symbols-outlined text-[#E60000] text-2xl font-normal">grain</span>
        </button>
        <button
          className="w-14 h-14 rounded-full bg-[#facc15] border-2 border-[#3b82f6] flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer"
          onClick={() => {
            setTheme("invincible");
            setIsOpen(false);
          }}
          title="Invincible Mode"
        >
          <span className="material-symbols-outlined text-[#3b82f6] text-2xl font-normal">rocket_launch</span>
        </button>
        <button
          className="w-12 h-12 rounded-full bg-white border-2 border-black flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer"
          onClick={() => {
            setTheme("default");
            setIsOpen(false);
          }}
          title="Reset Theme"
        >
          <span className="material-symbols-outlined text-black text-xl font-normal">refresh</span>
        </button>
      </div>

      {/* Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-gray-800/80 hover:bg-gray-700/90 backdrop-blur-md rounded-full border border-gray-400/30 flex items-center justify-center cursor-pointer transition-all active:scale-90 shadow-2xl text-white"
        title="Choose Theme"
      >
        <span className={`material-symbols-outlined text-3xl transition-transform duration-300 ${isOpen ? "rotate-90 text-primary" : ""}`}>
          palette
        </span>
      </button>
    </div>
  );
}
