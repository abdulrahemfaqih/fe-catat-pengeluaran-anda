import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext"; // Add this import

export default function Header({ logout }) {
   const navigate = useNavigate();
   const location = useLocation();
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const { isDarkMode, toggleTheme } = useTheme(); // Add this

   const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
   };

   const insDashboard = location.pathname === "/";
   const insWishlist = location.pathname === "/wishlist";

   return (
      <header className="sticky top-0 z-50 border-3 sm:border-4 border-black rounded-lg sm:rounded-xl p-3 sm:p-5 mb-4 sm:mb-8 bg-white dark:bg-gray-800 dark:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
         <div className="container mx-auto flex justify-between items-center relative z-10">
            {/* Smaller title and icon on mobile */}
            <h1 className="text-lg sm:text-2xl md:text-3xl font-bold flex items-center gap-1 sm:gap-2">
               <span className="inline-flex items-center justify-center w-7 h-7 sm:w-10 sm:h-10 bg-purple-100 dark:bg-purple-900 rounded-full border-2 sm:border-3 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] sm:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  💰
               </span>
               <span className="relative">
                  <span className="hidden xs:inline">Dashboard Keuangan</span>
                  <span className="inline xs:hidden">Keuangan</span>
                  <span className="absolute -bottom-1 left-0 w-full h-2 sm:h-3 bg-yellow-200 dark:bg-yellow-600 -z-10"></span>
               </span>
            </h1>

            {/* Mobile menu button - smaller on mobile */}
            <div className="md:hidden flex items-center gap-2">
               {/* Theme toggle button - Mobile */}
               <button
                  onClick={toggleTheme}
                  className="text-black dark:text-white focus:outline-none border-2 border-black p-1 rounded-lg bg-blue-100 dark:bg-blue-800 hover:bg-blue-200 dark:hover:bg-blue-700 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  aria-label={
                     isDarkMode ? "Switch to light mode" : "Switch to dark mode"
                  }
               >
                  {isDarkMode ? (
                     <svg
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                     >
                        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                     </svg>
                  ) : (
                     <svg
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                     >
                        <path
                           fillRule="evenodd"
                           d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                           clipRule="evenodd"
                        />
                     </svg>
                  )}
               </button>

               <button
                  onClick={toggleMenu}
                  className="text-black dark:text-white focus:outline-none border-2 sm:border-3 border-black p-1 sm:p-2 rounded-lg bg-purple-100 dark:bg-purple-900 hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
               >
                  {isMenuOpen ? (
                     <svg
                        className="w-5 h-5 sm:w-6 sm:h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth="2"
                           d="M6 18L18 6M6 6l12 12"
                        ></path>
                     </svg>
                  ) : (
                     <svg
                        className="w-5 h-5 sm:w-6 sm:h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth="2"
                           d="M4 6h16M4 12h16m-7 6h7"
                        ></path>
                     </svg>
                  )}
               </button>
            </div>

            {/* Desktop navigation - adjusted for better responsive scaling */}
            <div className="hidden md:flex md:items-center gap-2 lg:gap-4">
               {/* Theme toggle button - Desktop */}
               <button
                  onClick={toggleTheme}
                  className="px-3 lg:px-4 py-2 lg:py-2.5 border-2 lg:border-3 border-black bg-blue-100 dark:bg-blue-800 text-black dark:text-white rounded-lg lg:rounded-xl text-sm lg:text-base font-bold hover:bg-black hover:text-blue-100 dark:hover:text-blue-300 transition-colors duration-300 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transform flex items-center gap-1 lg:gap-2"
                  aria-label={
                     isDarkMode ? "Switch to light mode" : "Switch to dark mode"
                  }
               >
                  <span className="text-base lg:text-lg">
                     {isDarkMode ? "☀️" : "🌙"}
                  </span>
                  <span>{isDarkMode ? "Light" : "Dark"}</span>
               </button>

               {insDashboard && (
                  <button
                     onClick={() => navigate("/wishlist")}
                     className="px-3 lg:px-5 py-2 lg:py-2.5 border-2 lg:border-3 border-black bg-orange-100 dark:bg-orange-800 text-black dark:text-white rounded-lg lg:rounded-xl text-sm lg:text-base font-bold hover:bg-black hover:text-orange-100 dark:hover:text-orange-300 transition-colors duration-300 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transform flex items-center gap-1 lg:gap-2"
                  >
                     <span className="text-base lg:text-lg">✨</span>
                     <span>Wishlist</span>
                  </button>
               )}
               {insWishlist && (
                  <button
                     onClick={() => navigate("/")}
                     className="px-3 lg:px-5 py-2 lg:py-2.5 border-2 lg:border-3 border-black bg-green-100 dark:bg-green-800 text-black dark:text-white rounded-lg lg:rounded-xl text-sm lg:text-base font-bold hover:bg-black hover:text-green-100 dark:hover:text-green-300 transition-colors duration-300 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transform flex items-center gap-1 lg:gap-2"
                  >
                     <span className="text-base lg:text-lg">💰</span>
                     <span>Keuangan</span>
                  </button>
               )}

               <button
                  onClick={logout}
                  className="px-3 lg:px-5 py-2 lg:py-2.5 border-2 lg:border-3 border-black bg-red-100 dark:bg-red-800 text-black dark:text-white rounded-lg lg:rounded-xl text-sm lg:text-base font-bold hover:bg-black hover:text-red-100 dark:hover:text-red-300 transition-colors duration-300 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transform flex items-center gap-1 lg:gap-2"
               >
                  <span className="text-base lg:text-lg">👋</span>
                  <span>Logout</span>
               </button>
            </div>
         </div>

         {/* Mobile menu - more compact for small screens */}
         {isMenuOpen && (
            <div className="md:hidden mt-3 sm:mt-5 flex flex-col gap-2 sm:gap-3 border-t-2 sm:border-t-3 border-black pt-3 sm:pt-4 animate-fadeIn">
               {insDashboard && (
                  <button
                     onClick={() => navigate("/wishlist")}
                     className="px-3 py-2 border-2 sm:border-3 border-black bg-orange-100 dark:bg-orange-800 text-black dark:text-white rounded-lg sm:rounded-xl text-sm font-bold hover:bg-black hover:text-orange-100 dark:hover:text-orange-300 transition-colors shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2 justify-center"
                  >
                     <span className="text-base sm:text-lg">✨</span>
                     <span>Wishlist</span>
                  </button>
               )}
               {insWishlist && (
                  <button
                     onClick={() => navigate("/")}
                     className="px-3 py-2 border-2 sm:border-3 border-black bg-green-100 dark:bg-green-800 text-black dark:text-white rounded-lg sm:rounded-xl text-sm font-bold hover:bg-black hover:text-green-100 dark:hover:text-green-300 transition-colors shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2 justify-center"
                  >
                     <span className="text-base sm:text-lg">💰</span>
                     <span>Keuangan</span>
                  </button>
               )}
               <button
                  onClick={logout}
                  className="px-3 py-2 border-2 sm:border-3 border-black bg-red-100 dark:bg-red-800 text-black dark:text-white rounded-lg sm:rounded-xl text-sm font-bold hover:bg-black hover:text-red-100 dark:hover:text-red-300 transition-colors shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2 justify-center"
               >
                  <span className="text-base sm:text-lg">👋</span>
                  <span>Logout</span>
               </button>
            </div>
         )}
      </header>
   );
}
