import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";
import { Menu, X, LogOut, ArrowUpRight } from "lucide-react";

export default function Header({ logout }) {
   const navigate = useNavigate();
   const location = useLocation();
   const [isMenuOpen, setIsMenuOpen] = useState(false);

   const isDashboard = location.pathname === "/";
   const isWishlist = location.pathname === "/wishlist";

   return (
      <header className="sticky top-0 z-50 bg-[var(--color-surface)] border-b-[3px] border-[var(--color-ink)] px-4 sm:px-8 py-3">
         <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo / Brand */}
            <div
               onClick={() => navigate("/")}
               className="cursor-pointer flex items-center gap-2 select-none group"
            >
               <span className="w-4 h-4 bg-[var(--color-accent)] border-2 border-[var(--color-ink)] inline-block group-hover:rotate-45 transition-transform duration-100" />
               <span className="font-macro uppercase text-lg sm:text-2xl tracking-tighter text-[var(--color-ink)]">
                  KEUANGAN
               </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-3">
               {/* Nav Tab: Keuangan / Dashboard */}
               <button
                  onClick={() => navigate("/")}
                  className={`font-mono uppercase text-xs tracking-wider font-bold px-4 py-2 border-2 border-[var(--color-ink)] transition-all duration-100 ${
                     isDashboard
                        ? "bg-[var(--color-accent)] text-[var(--color-accent-ink)] shadow-[3px_3px_0_var(--color-ink)] -translate-x-0.5 -translate-y-0.5"
                        : "bg-[var(--color-surface)] text-[var(--color-ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_var(--color-ink)] active:translate-x-0 active:translate-y-0 active:shadow-none"
                  }`}
               >
                  [ KEUANGAN ]
               </button>

               {/* Nav Tab: Wishlist */}
               <button
                  onClick={() => navigate("/wishlist")}
                  className={`font-mono uppercase text-xs tracking-wider font-bold px-4 py-2 border-2 border-[var(--color-ink)] transition-all duration-100 ${
                     isWishlist
                        ? "bg-[var(--color-accent)] text-[var(--color-accent-ink)] shadow-[3px_3px_0_var(--color-ink)] -translate-x-0.5 -translate-y-0.5"
                        : "bg-[var(--color-surface)] text-[var(--color-ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_var(--color-ink)] active:translate-x-0 active:translate-y-0 active:shadow-none"
                  }`}
               >
                  [ WISHLIST ]
               </button>

               {/* Theme Switcher */}
               <ThemeSwitcher />

               {/* Logout */}
               <button
                  onClick={logout}
                  className="font-mono uppercase text-xs tracking-wider font-bold px-3 py-2 border-2 border-[var(--color-negative)] bg-[var(--color-surface)] text-[var(--color-negative)] shadow-[3px_3px_0_var(--color-negative)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_var(--color-negative)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-100 flex items-center gap-1.5"
               >
                  <LogOut size={14} className="stroke-[2]" />
                  <span>LOGOUT</span>
               </button>
            </nav>

            {/* Mobile Controls */}
            <div className="flex items-center gap-2 md:hidden">
               <ThemeSwitcher />

               <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-1.5 border-2 border-[var(--color-ink)] bg-[var(--color-surface)] text-[var(--color-ink)] shadow-[2px_2px_0_var(--color-ink)]"
                  aria-label="Toggle navigation menu"
               >
                  {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
               </button>
            </div>
         </div>

         {/* Mobile Menu Drawer */}
         {isMenuOpen && (
            <div className="md:hidden mt-3 pt-3 border-t-2 border-[var(--color-ink)] flex flex-col gap-2">
               <button
                  onClick={() => {
                     navigate("/");
                     setIsMenuOpen(false);
                  }}
                  className={`font-mono uppercase text-xs tracking-wider font-bold px-4 py-2.5 border-2 border-[var(--color-ink)] text-left flex justify-between items-center ${
                     isDashboard
                        ? "bg-[var(--color-accent)] text-[var(--color-accent-ink)]"
                        : "bg-[var(--color-surface)] text-[var(--color-ink)]"
                  }`}
               >
                  <span>[ KEUANGAN ]</span>
                  {isDashboard && <ArrowUpRight size={16} />}
               </button>

               <button
                  onClick={() => {
                     navigate("/wishlist");
                     setIsMenuOpen(false);
                  }}
                  className={`font-mono uppercase text-xs tracking-wider font-bold px-4 py-2.5 border-2 border-[var(--color-ink)] text-left flex justify-between items-center ${
                     isWishlist
                        ? "bg-[var(--color-accent)] text-[var(--color-accent-ink)]"
                        : "bg-[var(--color-surface)] text-[var(--color-ink)]"
                  }`}
               >
                  <span>[ WISHLIST ]</span>
                  {isWishlist && <ArrowUpRight size={16} />}
               </button>

               <button
                  onClick={() => {
                     logout();
                     setIsMenuOpen(false);
                  }}
                  className="font-mono uppercase text-xs tracking-wider font-bold px-4 py-2.5 border-2 border-[var(--color-negative)] bg-[var(--color-surface)] text-[var(--color-negative)] text-left flex items-center justify-between mt-1"
               >
                  <span>LOGOUT</span>
                  <LogOut size={16} />
               </button>
            </div>
         )}
      </header>
   );
}
