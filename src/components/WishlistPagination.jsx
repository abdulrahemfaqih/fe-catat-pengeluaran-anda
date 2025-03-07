import React, { useRef, useEffect } from "react";

const WishlistPagination = ({
   currentPage,
   totalItems,
   itemsPerPage,
   onPageChange,
}) => {
   // Create a ref for the pagination container
   const paginationRef = useRef(null);

   // Calculate total pages
   const totalPages = Math.ceil(totalItems / itemsPerPage);

   // Don't show pagination if there's only one page or no items
   if (totalPages <= 1 || totalItems === 0) {
      return null;
   }

   // Function to handle page navigation
   const paginate = (pageNumber) => {
      // Make sure the page number is valid
      if (pageNumber >= 1 && pageNumber <= totalPages && pageNumber !== currentPage) {
         // Store the current scroll position before changing the page
         const scrollPosition = window.scrollY;

         // Change the page
         onPageChange(pageNumber);

         // Use setTimeout to handle the scroll position after the component re-renders
         setTimeout(() => {
            // Restore the scroll position
            window.scrollTo(0, scrollPosition);

            // Focus the pagination container to maintain keyboard accessibility
            if (paginationRef.current) {
               paginationRef.current.focus();
            }
         }, 0);
      }
   };

   // Generate page numbers with ellipsis
   const getPageNumbers = () => {
      const pageNumbers = [];

      // Logic for page numbers display with ellipsis
      for (let i = 1; i <= totalPages; i++) {
         // Always show first page, last page, and pages around current page
         if (
            i === 1 ||
            i === totalPages ||
            (i >= currentPage - 1 && i <= currentPage + 1)
         ) {
            pageNumbers.push({
               number: i,
               type: "page"
            });
         } else if (
            i === currentPage - 2 ||
            i === currentPage + 2
         ) {
            // Show ellipsis for gaps
            pageNumbers.push({
               type: "ellipsis"
            });
         }
      }

      // Remove duplicate ellipsis
      return pageNumbers.filter((item, index, array) => {
         if (item.type === "ellipsis") {
            return array[index - 1]?.type !== "ellipsis";
         }
         return true;
      });
   };

   const pageNumbers = getPageNumbers();

   return (
      <div
         className="mt-8 flex justify-center"
         ref={paginationRef}
         tabIndex="-1" // Makes element focusable but not in tab order
      >
         <div className="flex flex-wrap gap-2 items-center">
            {/* First page button */}
            <button
               onClick={() => paginate(1)}
               disabled={currentPage === 1}
               className={`w-10 h-10 flex items-center justify-center rounded-lg border-3 border-black font-bold transition-colors duration-300
                  ${
                     currentPage === 1
                        ? "bg-gray-200 dark:bg-gray-700 cursor-not-allowed opacity-60"
                        : "bg-white dark:bg-gray-800 hover:bg-yellow-100 dark:hover:bg-gray-700 dark:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  }`}
               aria-label="First page"
            >
               «
            </button>

            {/* Previous page button */}
            <button
               onClick={() => paginate(currentPage - 1)}
               disabled={currentPage === 1}
               className={`w-10 h-10 flex items-center justify-center rounded-lg border-3 border-black font-bold transition-colors duration-300
                  ${
                     currentPage === 1
                        ? "bg-gray-200 dark:bg-gray-700 cursor-not-allowed opacity-60"
                        : "bg-white dark:bg-gray-800 hover:bg-yellow-100 dark:hover:bg-gray-700 dark:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  }`}
               aria-label="Previous page"
            >
               ‹
            </button>

            {/* Page numbers and ellipsis */}
            {pageNumbers.map((item, index) => (
               item.type === "ellipsis" ? (
                  <span
                     key={`ellipsis-${index}`}
                     className="px-2 dark:text-white"
                     aria-hidden="true"
                  >
                     ...
                  </span>
               ) : (
                  <button
                     key={`page-${item.number}`}
                     onClick={() => paginate(item.number)}
                     className={`w-10 h-10 flex items-center justify-center rounded-lg border-3 border-black font-bold transition-colors duration-300
                        ${
                           currentPage === item.number
                              ? "bg-yellow-300 dark:bg-yellow-600 dark:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform -rotate-2"
                              : "bg-white dark:bg-gray-800 hover:bg-yellow-100 dark:hover:bg-gray-700 dark:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        }`}
                     aria-label={`Page ${item.number}`}
                     aria-current={currentPage === item.number ? "page" : undefined}
                  >
                     {item.number}
                  </button>
               )
            ))}

            {/* Next page button */}
            <button
               onClick={() => paginate(currentPage + 1)}
               disabled={currentPage === totalPages}
               className={`w-10 h-10 flex items-center justify-center rounded-lg border-3 border-black font-bold transition-colors duration-300
                  ${
                     currentPage === totalPages
                        ? "bg-gray-200 dark:bg-gray-700 cursor-not-allowed opacity-60"
                        : "bg-white dark:bg-gray-800 hover:bg-yellow-100 dark:hover:bg-gray-700 dark:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  }`}
               aria-label="Next page"
            >
               ›
            </button>

            {/* Last page button */}
            <button
               onClick={() => paginate(totalPages)}
               disabled={currentPage === totalPages}
               className={`w-10 h-10 flex items-center justify-center rounded-lg border-3 border-black font-bold transition-colors duration-300
                  ${
                     currentPage === totalPages
                        ? "bg-gray-200 dark:bg-gray-700 cursor-not-allowed opacity-60"
                        : "bg-white dark:bg-gray-800 hover:bg-yellow-100 dark:hover:bg-gray-700 dark:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  }`}
               aria-label="Last page"
            >
               »
            </button>
         </div>
      </div>
   );
};

export default WishlistPagination;