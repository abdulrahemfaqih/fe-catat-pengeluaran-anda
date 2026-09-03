import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, AlertOctagon } from "lucide-react";

const NotFound = () => {
   return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--color-bg)] text-[var(--color-ink)]">
         <div className="border-[3px] border-[var(--color-ink)] bg-[var(--color-surface)] shadow-[6px_6px_0_var(--color-ink)] p-8 sm:p-12 max-w-lg w-full text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 border-2 border-[var(--color-negative)] text-[var(--color-negative)] mb-4">
               <AlertOctagon size={28} className="stroke-[2]" />
            </div>

            <h1 className="font-macro uppercase text-5xl sm:text-6xl tracking-tight leading-none mb-2">
               404
            </h1>

            <p className="font-mono uppercase text-xs tracking-widest text-[var(--color-negative)] font-bold mb-4">
               ERROR // HALAMAN TIDAK DITEMUKAN
            </p>

            <p className="font-body text-xs sm:text-sm text-[var(--color-ink-muted)] mb-8 border-y border-[var(--color-ink)]/15 py-3">
               Alamat URL yang Anda tuju tidak terdaftar dalam routing sistem KEUANGAN atau telah dipindahkan.
            </p>

            <Link
               to="/"
               className="inline-flex items-center gap-2 font-mono uppercase text-xs tracking-wider font-bold bg-[var(--color-accent)] text-[var(--color-accent-ink)] border-2 border-[var(--color-ink)] px-6 py-3 shadow-[4px_4px_0_var(--color-ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--color-ink)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
            >
               <ArrowLeft size={14} className="stroke-[3]" />
               <span>KEMBALI KE DASHBOARD</span>
            </Link>
         </div>
      </div>
   );
};

export default NotFound;