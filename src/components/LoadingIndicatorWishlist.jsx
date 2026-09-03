import React from "react";

const LoadingIndicatorWishlist = ({
   message = "MEMPROSES...",
}) => {
   return (
      <div className="py-2.5 px-4 bg-[var(--color-surface)] text-[var(--color-ink)] font-mono text-xs uppercase font-bold border-2 border-[var(--color-ink)] inline-flex items-center gap-2 shadow-[3px_3px_0_var(--color-ink)]">
         <span className="w-2 h-2 bg-[var(--color-accent)] animate-ping" />
         <span>{message}</span>
      </div>
   );
};

export default LoadingIndicatorWishlist;