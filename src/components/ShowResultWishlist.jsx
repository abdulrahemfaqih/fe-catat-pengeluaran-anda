import React from "react";

export default function ShowResultWishlist({
   paginatedItems = [],
   itemsPerPage = 10,
   currentPage = 1,
   filteredItems = [],
   items = [],
   hasActiveFilters = false, // Changed to expect a boolean directly
}) {

   const paginatedCount = Array.isArray(paginatedItems)
      ? paginatedItems.length
      : 0;
   const filteredCount = Array.isArray(filteredItems)
      ? filteredItems.length
      : 0;
   const totalCount = Array.isArray(items) ? items.length : 0;
   const totalPages = Math.max(1, Math.ceil(filteredCount / itemsPerPage));

   return (
      <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
         Menampilkan {paginatedCount} dari {filteredCount} item
         {hasActiveFilters && ` (dari total ${totalCount} item)`}
         (Halaman {currentPage} dari {totalPages})
      </div>
   );
}
