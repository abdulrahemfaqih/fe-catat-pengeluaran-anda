import React from "react";

const WishlistStatsCard = ({ number, title, value, isPrice = false }) => {
   return (
      <div className="bg-[var(--color-surface)] border-[3px] border-[var(--color-ink)] p-5 shadow-[4px_4px_0_var(--color-ink)] flex-1 flex flex-col justify-between">
         <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs font-bold border-2 border-[var(--color-ink)] bg-[var(--color-surface)] px-2 py-0.5 text-[var(--color-ink)]">
               #{number}
            </span>
         </div>

         <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-muted)] font-semibold mb-2">
            {title}
         </h3>

         <p className="font-mono font-bold text-2xl sm:text-3xl text-[var(--color-ink)] tabular-nums tracking-tight">
            {isPrice ? `Rp ${Number(value || 0).toLocaleString("id-ID")}` : value}
         </p>
      </div>
   );
};

export default WishlistStatsCard;