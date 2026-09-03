import React from "react";

const TransactionTableHeader = () => {
   return (
      <thead>
         <tr className="bg-[var(--color-ink)] text-[var(--color-bg)] font-mono uppercase text-xs tracking-wider border-b-2 border-[var(--color-ink)]">
            <th className="py-2.5 px-3 border-r border-[var(--color-bg)]/20 text-center w-12 font-bold">
               NO
            </th>
            <th className="py-2.5 px-4 border-r border-[var(--color-bg)]/20 text-left font-bold">
               TANGGAL
            </th>
            <th className="py-2.5 px-4 border-r border-[var(--color-bg)]/20 text-left font-bold">
               NAMA TRANSAKSI
            </th>
            <th className="py-2.5 px-4 border-r border-[var(--color-bg)]/20 text-left font-bold">
               KATEGORI
            </th>
            <th className="py-2.5 px-4 border-r border-[var(--color-bg)]/20 text-right font-bold">
               NOMINAL
            </th>
            <th className="py-2.5 px-4 text-center w-24 font-bold">
               AKSI
            </th>
         </tr>
      </thead>
   );
};

export default TransactionTableHeader;
