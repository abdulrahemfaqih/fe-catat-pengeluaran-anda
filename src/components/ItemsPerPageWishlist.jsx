import React from "react";

export default function ItemsPerPageWishlist({
   itemsPerPage,
   handleItemsPerPageChange,
   filteredItems = [],
}) {
   return (
      <div className="mb-4 font-mono text-xs flex items-center gap-2">
         <span className="uppercase font-bold text-[var(--color-ink-muted)] tracking-wider">
            TAMPILKAN:
         </span>
         <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="border-2 border-[var(--color-ink)] bg-[var(--color-surface)] text-[var(--color-ink)] px-2 py-1 uppercase font-bold focus:outline-2 focus:outline-[var(--color-accent)]"
         >
            <option value={3}>3</option>
            <option value={6}>6</option>
            <option value={12}>12</option>
            <option value={24}>24</option>
            <option value={filteredItems.length}>SEMUA</option>
         </select>
         <span className="text-[var(--color-ink-muted)] uppercase">
            ITEM PER HALAMAN
         </span>
      </div>
   );
}
