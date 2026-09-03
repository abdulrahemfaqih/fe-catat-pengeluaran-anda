import React from "react";

export default function ShowResultWishlist({
   paginatedItems = [],
   itemsPerPage = 10,
   currentPage = 1,
   filteredItems = [],
   items = [],
   hasActiveFilters = false,
}) {
   const paginatedCount = Array.isArray(paginatedItems) ? paginatedItems.length : 0;
   const filteredCount = Array.isArray(filteredItems) ? filteredItems.length : 0;
   const totalCount = Array.isArray(items) ? items.length : 0;
   const totalPages = Math.max(1, Math.ceil(filteredCount / itemsPerPage));

   return (
      <div className="mt-4 text-center font-mono text-xs text-[var(--color-ink-muted)] uppercase tracking-wide">
         MENAMPILKAN {paginatedCount} DARI {filteredCount} ITEM
         {hasActiveFilters && ` (DARI TOTAL ${totalCount} ITEM)`}
         {" // "}HALAMAN {currentPage} DARI {totalPages}
      </div>
   );
}
