import React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

const WishlistPagination = ({
   currentPage,
   totalItems,
   itemsPerPage,
   onPageChange,
}) => {
   const totalPages = Math.ceil(totalItems / itemsPerPage);

   if (totalPages <= 1 || totalItems === 0) {
      return null;
   }

   const handleClick = (pageNumber) => {
      if (pageNumber === currentPage || pageNumber < 1 || pageNumber > totalPages) {
         return;
      }
      onPageChange(pageNumber);
   };

   const getPageNumbers = () => {
      const pageNumbers = [];

      for (let i = 1; i <= totalPages; i++) {
         if (
            i === 1 ||
            i === totalPages ||
            (i >= currentPage - 1 && i <= currentPage + 1)
         ) {
            pageNumbers.push({ number: i, type: "page" });
         } else if (i === currentPage - 2 || i === currentPage + 2) {
            pageNumbers.push({ type: "ellipsis" });
         }
      }

      return pageNumbers.filter((item, index, array) => {
         if (item.type === "ellipsis") {
            return array[index - 1]?.type !== "ellipsis";
         }
         return true;
      });
   };

   const pageNumbers = getPageNumbers();

   return (
      <div className="mt-8 flex justify-center font-mono text-xs select-none">
         <div className="flex flex-wrap gap-1.5 items-center">
            {/* First page */}
            <button
               onClick={() => handleClick(1)}
               disabled={currentPage === 1}
               className="w-9 h-9 flex items-center justify-center border-2 border-[var(--color-ink)] bg-[var(--color-surface)] text-[var(--color-ink)] shadow-[2px_2px_0_var(--color-ink)] hover:bg-[var(--color-bg)] disabled:opacity-30 disabled:pointer-events-none transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
               aria-label="First page"
               type="button"
            >
               <ChevronsLeft size={14} className="stroke-[2]" />
            </button>

            {/* Prev page */}
            <button
               onClick={() => handleClick(currentPage - 1)}
               disabled={currentPage === 1}
               className="w-9 h-9 flex items-center justify-center border-2 border-[var(--color-ink)] bg-[var(--color-surface)] text-[var(--color-ink)] shadow-[2px_2px_0_var(--color-ink)] hover:bg-[var(--color-bg)] disabled:opacity-30 disabled:pointer-events-none transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
               aria-label="Previous page"
               type="button"
            >
               <ChevronLeft size={14} className="stroke-[2]" />
            </button>

            {/* Numbers */}
            {pageNumbers.map((item, index) =>
               item.type === "ellipsis" ? (
                  <span
                     key={`ellipsis-${index}`}
                     className="w-9 h-9 flex items-center justify-center text-[var(--color-ink-muted)] font-bold"
                  >
                     ...
                  </span>
               ) : (
                  <button
                     key={`page-${item.number}`}
                     onClick={() => handleClick(item.number)}
                     className={`w-9 h-9 flex items-center justify-center border-2 border-[var(--color-ink)] font-bold transition-all ${
                        currentPage === item.number
                           ? "bg-[var(--color-accent)] text-[var(--color-accent-ink)] shadow-[2px_2px_0_var(--color-ink)] -translate-x-0.5 -translate-y-0.5"
                           : "bg-[var(--color-surface)] text-[var(--color-ink)] shadow-[2px_2px_0_var(--color-ink)] hover:bg-[var(--color-bg)] active:translate-x-0 active:translate-y-0 active:shadow-none"
                     }`}
                     aria-label={`Page ${item.number}`}
                     aria-current={currentPage === item.number ? "page" : undefined}
                     type="button"
                  >
                     {item.number}
                  </button>
               )
            )}

            {/* Next page */}
            <button
               onClick={() => handleClick(currentPage + 1)}
               disabled={currentPage === totalPages}
               className="w-9 h-9 flex items-center justify-center border-2 border-[var(--color-ink)] bg-[var(--color-surface)] text-[var(--color-ink)] shadow-[2px_2px_0_var(--color-ink)] hover:bg-[var(--color-bg)] disabled:opacity-30 disabled:pointer-events-none transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
               aria-label="Next page"
               type="button"
            >
               <ChevronRight size={14} className="stroke-[2]" />
            </button>

            {/* Last page */}
            <button
               onClick={() => handleClick(totalPages)}
               disabled={currentPage === totalPages}
               className="w-9 h-9 flex items-center justify-center border-2 border-[var(--color-ink)] bg-[var(--color-surface)] text-[var(--color-ink)] shadow-[2px_2px_0_var(--color-ink)] hover:bg-[var(--color-bg)] disabled:opacity-30 disabled:pointer-events-none transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
               aria-label="Last page"
               type="button"
            >
               <ChevronsRight size={14} className="stroke-[2]" />
            </button>
         </div>
      </div>
   );
};

export default WishlistPagination;