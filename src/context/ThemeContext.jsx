import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
   // Check if user has a saved theme preference, otherwise default to light
   const [isDarkMode, setIsDarkMode] = useState(() => {
      const savedTheme = localStorage.getItem("theme");
      return savedTheme === "dark";
   });

   // Toggle between light and dark modes
   const toggleTheme = () => {
      setIsDarkMode((prevMode) => {
         const newMode = !prevMode;
         localStorage.setItem("theme", newMode ? "dark" : "light");
         return newMode;
      });
   };

   // Apply theme to document when it changes
   useEffect(() => {
      if (isDarkMode) {
         document.documentElement.classList.add("dark");
      } else {
         document.documentElement.classList.remove("dark");
      }
   }, [isDarkMode]);

   return (
      <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
         {children}
      </ThemeContext.Provider>
   );
};

// Custom hook to use the theme context
export const useTheme = () => {
   const context = useContext(ThemeContext);
   if (context === undefined) {
      throw new Error("useTheme must be used within a ThemeProvider");
   }
   return context;
};
