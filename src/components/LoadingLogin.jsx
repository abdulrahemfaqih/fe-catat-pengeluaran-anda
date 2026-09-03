import React from "react";

export default function LoadingLogin() {
   return (
      <div className="mb-4 p-3 bg-[var(--color-surface)] border-2 border-[var(--color-ink)] font-mono text-xs text-[var(--color-ink)] flex items-center justify-center gap-2 shadow-[2px_2px_0_var(--color-ink)]">
         <span className="w-2 h-2 bg-[var(--color-accent)] animate-ping" />
         <span className="uppercase font-bold tracking-wider">
            MEMPROSES AUTENTIKASI...
         </span>
      </div>
   );
}