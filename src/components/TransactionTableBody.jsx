import React from "react";
import { Pencil, Trash2 } from "lucide-react";

const TransactionTableBody = ({
   isLoadingTransactions,
   filteredTransactions,
   paginatedTransactions,
   itemsPerPage,
   currentPage,
   openModalForEdit,
   confirmDelete,
   transactions,
}) => {
   return (
      <tbody className="divide-y divide-[var(--color-ink)]/20 bg-[var(--color-surface)] text-[var(--color-ink)]">
         {isLoadingTransactions ? (
            Array(5)
               .fill(0)
               .map((_, index) => (
                  <tr key={`skeleton-${index}`} className="animate-pulse">
                     <td className="py-3 px-3 text-center border-r border-[var(--color-ink)]/10">
                        <div className="h-4 bg-[var(--color-ink)]/10 w-4 mx-auto" />
                     </td>
                     <td className="py-3 px-4 border-r border-[var(--color-ink)]/10">
                        <div className="h-4 bg-[var(--color-ink)]/10 w-20" />
                     </td>
                     <td className="py-3 px-4 border-r border-[var(--color-ink)]/10">
                        <div className="h-4 bg-[var(--color-ink)]/10 w-36" />
                     </td>
                     <td className="py-3 px-4 border-r border-[var(--color-ink)]/10">
                        <div className="h-5 bg-[var(--color-ink)]/10 w-24" />
                     </td>
                     <td className="py-3 px-4 border-r border-[var(--color-ink)]/10 text-right">
                        <div className="h-4 bg-[var(--color-ink)]/10 w-20 ml-auto" />
                     </td>
                     <td className="py-3 px-4 text-center">
                        <div className="h-6 bg-[var(--color-ink)]/10 w-14 mx-auto" />
                     </td>
                  </tr>
               ))
         ) : filteredTransactions.length > 0 ? (
            paginatedTransactions.map((tx, index) => {
               const realIndex =
                  itemsPerPage === "all"
                     ? index + 1
                     : (currentPage - 1) * itemsPerPage + index + 1;

               return (
                  <tr
                     key={tx._id}
                     className="hover:bg-[var(--color-bg)] transition-colors duration-100 font-mono text-xs"
                  >
                     {/* Index */}
                     <td className="py-2.5 px-3 text-center border-r border-[var(--color-ink)]/10 text-[var(--color-ink-muted)]">
                        {realIndex}
                     </td>

                     {/* Date */}
                     <td className="py-2.5 px-4 border-r border-[var(--color-ink)]/10 whitespace-nowrap text-[var(--color-ink-muted)]">
                        {new Date(tx.date).toLocaleDateString("id-ID", {
                           day: "2-digit",
                           month: "short",
                           year: "numeric",
                        }).toUpperCase()}
                     </td>

                     {/* Name */}
                     <td className="py-2.5 px-4 border-r border-[var(--color-ink)]/10 font-body font-medium text-[var(--color-ink)]">
                        {tx.name}
                     </td>

                     {/* Category badge (outline mono, no emoji) */}
                     <td className="py-2.5 px-4 border-r border-[var(--color-ink)]/10">
                        <span className="inline-block border border-[var(--color-ink)] px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-[var(--color-surface)] text-[var(--color-ink)]">
                           {tx.category}
                        </span>
                     </td>

                     {/* Nominal (monospace, right-aligned, tabular-nums) */}
                     <td className="py-2.5 px-4 border-r border-[var(--color-ink)]/10 text-right font-mono font-bold text-sm tabular-nums text-[var(--color-ink)] whitespace-nowrap">
                        Rp {Number(tx.amount).toLocaleString("id-ID")}
                     </td>

                     {/* Actions (monochrome line icon buttons) */}
                     <td className="py-2.5 px-4 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1.5">
                           <button
                              onClick={() => openModalForEdit(tx)}
                              className="p-1.5 border border-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-bg)] transition-colors text-[var(--color-ink)]"
                              title="Edit Transaksi"
                           >
                              <Pencil size={13} className="stroke-[2]" />
                           </button>
                           <button
                              onClick={() => confirmDelete(tx)}
                              className="p-1.5 border border-[var(--color-negative)] text-[var(--color-negative)] hover:bg-[var(--color-negative)] hover:text-white transition-colors"
                              title="Hapus Transaksi"
                           >
                              <Trash2 size={13} className="stroke-[2]" />
                           </button>
                        </div>
                     </td>
                  </tr>
               );
            })
         ) : (
            <tr>
               <td
                  colSpan="6"
                  className="py-12 px-4 text-center font-mono text-xs uppercase tracking-wider text-[var(--color-ink-muted)]"
               >
                  {transactions.length === 0
                     ? "[ BELUM ADA TRANSAKSI TERCATAT ]"
                     : "[ TIDAK ADA TRANSAKSI SESUAI FILTER ]"}
               </td>
            </tr>
         )}
      </tbody>
   );
};

export default TransactionTableBody;
