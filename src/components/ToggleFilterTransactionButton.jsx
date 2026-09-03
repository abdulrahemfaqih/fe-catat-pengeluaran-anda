import React from "react";
import { Filter } from "lucide-react";

export default function ToggleFilterTransactionButton({
   showSearchFilters,
   setShowSearchFilters,
}) {
   return (
      <button
         onClick={() => setShowSearchFilters(!showSearchFilters)}
         className="sm:hidden font-mono uppercase text-xs tracking-wider font-bold bg-[var(--color-surface)] text-[var(--color-ink)] border-2 border-[var(--color-ink)] px-4 py-2.5 shadow-[3px_3px_0_var(--color-ink)] hover:bg-[var(--color-bg)] flex items-center justify-center gap-1.5"
      >
         <Filter size={14} className="stroke-[2.5]" />
         <span>{showSearchFilters ? "TUTUP FILTER" : "FILTER DATA"}</span>
      </button>
   );
}
