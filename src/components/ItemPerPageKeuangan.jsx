import React from "react";

export default function ItemPerPageKeuangan({
   itemsPerPage,
   setItemsPerPage,
   filteredTransactions = [],
   setCurrentPage,
   currentPage,
}) {
   const totalCount = filteredTransactions.length;
   const startItem = itemsPerPage === "all" ? 1 : Math.min((currentPage - 1) * itemsPerPage + 1, totalCount);
   const endItem = itemsPerPage === "all" ? totalCount : Math.min(currentPage * itemsPerPage, totalCount);

   return (
      <div className="mb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3 font-mono text-xs">
         <div className="flex items-center gap-2">
            <span className="uppercase text-[var(--color-ink-muted)] font-bold tracking-wider">
               BARIS PER HALAMAN:
            </span>
            <select
               value={itemsPerPage}
               onChange={(e) => {
                  setItemsPerPage(
                     e.target.value === "all" ? "all" : parseInt(e.target.value, 10)
                  );
                  setCurrentPage(1);
               }}
               className="border-2 border-[var(--color-ink)] bg-[var(--color-surface)] text-[var(--color-ink)] font-bold px-2 py-1 focus:outline-2 focus:outline-[var(--color-accent)] uppercase"
            >
               <option value={5}>5</option>
               <option value={10}>10</option>
               <option value={20}>20</option>
               <option value={50}>50</option>
               <option value={100}>100</option>
               <option value="all">SEMUA</option>
            </select>
         </div>

         {totalCount > 0 && (
            <div className="text-[var(--color-ink-muted)] uppercase tracking-wide">
               MENAMPILKAN {startItem} – {endItem} DARI {totalCount} TRANSAKSI
            </div>
         )}
      </div>
   );
}
