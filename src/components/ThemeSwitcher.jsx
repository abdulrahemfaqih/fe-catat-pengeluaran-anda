import React from "react";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

const ThemeSwitcher = () => {
   const { isDarkMode, toggleTheme } = useTheme();

   return (
      <button
         onClick={toggleTheme}
         className="inline-flex items-center gap-2 px-3 py-1.5 border-2 border-[var(--color-ink)] bg-[var(--color-surface)] text-[var(--color-ink)] font-mono text-xs uppercase font-bold tracking-wider shadow-[3px_3px_0_var(--color-ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_var(--color-ink)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-100"
         aria-label={isDarkMode ? "Ganti ke mode light" : "Ganti ke mode dark"}
      >
         {isDarkMode ? (
            <>
               <Sun size={14} className="stroke-[2]" />
               <span>LIGHT</span>
            </>
         ) : (
            <>
               <Moon size={14} className="stroke-[2]" />
               <span>DARK</span>
            </>
         )}
      </button>
   );
};

export default ThemeSwitcher;
