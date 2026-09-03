import React from "react";
import { Search, RotateCcw, X } from "lucide-react";

const TransactionFilter = ({
   searchTerm,
   setSearchTerm,
   searchColumn,
   setSearchColumn,
   searchAmountOperator,
   setSearchAmountOperator,
   searchAmountValue,
   setSearchAmountValue,
   resetFilters,
   showSearchFilters,
   setShowSearchFilters,
   filteredTransactions,
   transactions,
   handleSearchSubmit,
}) => {
   return (
      <div
         className={`mb-6 border-2 border-[var(--color-ink)] bg-[var(--color-surface)] shadow-[4px_4px_0_var(--color-ink)] ${
            !showSearchFilters ? "hidden sm:block" : "block"
         }`}
      >
         {/* Filter Header Inverted (§6.8) */}
         <div className="bg-[var(--color-ink)] text-[var(--color-bg)] px-4 py-2.5 flex items-center justify-between">
            <h3 className="font-mono uppercase text-xs font-bold tracking-wider flex items-center gap-2">
               <Search size={14} className="stroke-[2.5]" />
               <span>FILTER & PENCARIAN TRANSAKSI</span>
            </h3>
            <button
               onClick={() => setShowSearchFilters(false)}
               className="sm:hidden text-[var(--color-bg)] p-1 hover:opacity-75"
               aria-label="Tutup filter"
            >
               <X size={16} />
            </button>
         </div>

         <div className="p-4 sm:p-5">
            <form onSubmit={handleSearchSubmit} className="space-y-4">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Text Search */}
                  <div>
                     <label
                        htmlFor="searchTerm"
                        className="block mb-1 font-mono uppercase text-[11px] font-bold text-[var(--color-ink-muted)] tracking-wider"
                     >
                        KATA KUNCI PENCARIAN
                     </label>
                     <div className="flex gap-2">
                        <input
                           type="text"
                           id="searchTerm"
                           value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}
                           className="flex-1 border-2 border-[var(--color-ink)] bg-[var(--color-surface)] text-[var(--color-ink)] px-3 py-2 font-mono text-xs focus:outline-2 focus:outline-[var(--color-accent)] focus:outline-offset-2"
                           placeholder="Ketik kata kunci..."
                        />
                        <select
                           id="searchColumn"
                           value={searchColumn}
                           onChange={(e) => setSearchColumn(e.target.value)}
                           className="border-2 border-[var(--color-ink)] bg-[var(--color-surface)] text-[var(--color-ink)] px-3 py-2 font-mono text-xs uppercase focus:outline-2 focus:outline-[var(--color-accent)] focus:outline-offset-2"
                        >
                           <option value="all">SEMUA KOLOM</option>
                           <option value="date">TANGGAL</option>
                           <option value="name">NAMA</option>
                           <option value="category">KATEGORI</option>
                        </select>
                     </div>
                  </div>

                  {/* Amount Filter */}
                  <div>
                     <label
                        htmlFor="amountValue"
                        className="block mb-1 font-mono uppercase text-[11px] font-bold text-[var(--color-ink-muted)] tracking-wider"
                     >
                        FILTER NOMINAL RUPIAH
                     </label>
                     <div className="flex gap-2">
                        <select
                           id="amountOperator"
                           value={searchAmountOperator}
                           onChange={(e) => setSearchAmountOperator(e.target.value)}
                           className="border-2 border-[var(--color-ink)] bg-[var(--color-surface)] text-[var(--color-ink)] px-3 py-2 font-mono text-xs uppercase focus:outline-2 focus:outline-[var(--color-accent)] focus:outline-offset-2"
                        >
                           <option value="equals">SAMA DENGAN (=)</option>
                           <option value="greater">LEBIH DARI (&gt;)</option>
                           <option value="less">KURANG DARI (&lt;)</option>
                           <option value="greaterEqual">MINIMAL (≥)</option>
                           <option value="lessEqual">MAKSIMAL (≤)</option>
                        </select>
                        <div className="relative flex-1">
                           <span className="absolute left-2.5 top-1/2 -translate-y-1/2 font-mono text-xs font-bold text-[var(--color-ink-muted)]">
                              RP
                           </span>
                           <input
                              type="number"
                              id="amountValue"
                              value={searchAmountValue}
                              onChange={(e) => setSearchAmountValue(e.target.value)}
                              className="w-full border-2 border-[var(--color-ink)] bg-[var(--color-surface)] text-[var(--color-ink)] px-3 py-2 pl-9 font-mono text-xs tabular-nums focus:outline-2 focus:outline-[var(--color-accent)] focus:outline-offset-2"
                              placeholder="0"
                           />
                        </div>
                     </div>
                  </div>
               </div>

               {/* Footer filter status & Reset */}
               <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[var(--color-ink)]/15">
                  <div className="font-mono text-xs text-[var(--color-ink-muted)]">
                     {filteredTransactions.length !== (transactions || []).length && (
                        <span>
                           FILTER AKTIF:{" "}
                           <strong className="text-[var(--color-ink)]">
                              {filteredTransactions.length}
                           </strong>{" "}
                           DARI {(transactions || []).length} TRANSAKSI DITEMUKAN
                        </span>
                     )}
                  </div>

                  <button
                     type="button"
                     onClick={resetFilters}
                     className="font-mono uppercase text-xs tracking-wider font-bold bg-[var(--color-surface)] text-[var(--color-ink)] border-2 border-[var(--color-ink)] px-4 py-1.5 shadow-[2px_2px_0_var(--color-ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_var(--color-ink)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all duration-100 flex items-center gap-1.5"
                  >
                     <RotateCcw size={13} className="stroke-[2.5]" />
                     <span>RESET FILTER</span>
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default TransactionFilter;
