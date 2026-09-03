import React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

export default function TransactionPagination({
   currentPage,
   totalPages,
   goToPage,
   pageNumbers,
}) {
   return (
      <div className="flex justify-center items-center mt-6 gap-1.5 flex-wrap font-mono text-xs select-none">
         {/* First Page */}
         <button
            onClick={() => goToPage(1)}
            disabled={currentPage === 1}
            className="w-9 h-9 flex items-center justify-center border-2 border-[var(--color-ink)] bg-[var(--color-surface)] text-[var(--color-ink)] shadow-[2px_2px_0_var(--color-ink)] hover:bg-[var(--color-bg)] disabled:opacity-30 disabled:pointer-events-none transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            aria-label="First page"
         >
            <ChevronsLeft size={14} className="stroke-[2]" />
         </button>

         {/* Prev Page */}
         <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-9 h-9 flex items-center justify-center border-2 border-[var(--color-ink)] bg-[var(--color-surface)] text-[var(--color-ink)] shadow-[2px_2px_0_var(--color-ink)] hover:bg-[var(--color-bg)] disabled:opacity-30 disabled:pointer-events-none transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            aria-label="Previous page"
         >
            <ChevronLeft size={14} className="stroke-[2]" />
         </button>

         {/* Page Numbers */}
         <div className="flex gap-1.5 overflow-x-auto px-1 max-w-[calc(100%-130px)] sm:max-w-full">
            {pageNumbers.map((page, index) =>
               page === "..." ? (
                  <span
                     key={`ellipsis-${index}`}
                     className="w-9 h-9 flex items-center justify-center text-[var(--color-ink-muted)] font-bold"
                  >
                     ...
                  </span>
               ) : (
                  <button
                     key={page}
                     onClick={() => goToPage(page)}
                     className={`w-9 h-9 flex items-center justify-center border-2 border-[var(--color-ink)] font-bold transition-all ${
                        currentPage === page
                           ? "bg-[var(--color-accent)] text-[var(--color-accent-ink)] shadow-[2px_2px_0_var(--color-ink)] -translate-x-0.5 -translate-y-0.5"
                           : "bg-[var(--color-surface)] text-[var(--color-ink)] shadow-[2px_2px_0_var(--color-ink)] hover:bg-[var(--color-bg)] active:translate-x-0 active:translate-y-0 active:shadow-none"
                     }`}
                     aria-current={currentPage === page ? "page" : undefined}
                  >
                     {page}
                  </button>
               )
            )}
         </div>

         {/* Next Page */}
         <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-9 h-9 flex items-center justify-center border-2 border-[var(--color-ink)] bg-[var(--color-surface)] text-[var(--color-ink)] shadow-[2px_2px_0_var(--color-ink)] hover:bg-[var(--color-bg)] disabled:opacity-30 disabled:pointer-events-none transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            aria-label="Next page"
         >
            <ChevronRight size={14} className="stroke-[2]" />
         </button>

         {/* Last Page */}
         <button
            onClick={() => goToPage(totalPages)}
            disabled={currentPage === totalPages}
            className="w-9 h-9 flex items-center justify-center border-2 border-[var(--color-ink)] bg-[var(--color-surface)] text-[var(--color-ink)] shadow-[2px_2px_0_var(--color-ink)] hover:bg-[var(--color-bg)] disabled:opacity-30 disabled:pointer-events-none transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            aria-label="Last page"
         >
            <ChevronsRight size={14} className="stroke-[2]" />
         </button>
      </div>
   );
}