import React, { useState } from "react";
import TransactionModal from "./TransactionModal";
import api from "../utils/api";
import { Plus } from "lucide-react";

const QuickAddTransactionButton = ({ isScrolled, refreshTransactions }) => {
   const [showModal, setShowModal] = useState(false);

   return (
      <>
         <button
            onClick={() => setShowModal(true)}
            className={`fixed bottom-6 right-6 z-40 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-[var(--color-accent)] text-[var(--color-accent-ink)] border-[3px] border-[var(--color-ink)] shadow-[4px_4px_0_var(--color-ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--color-ink)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-100 group ${
               isScrolled ? "opacity-75 hover:opacity-100" : "opacity-100"
            }`}
            aria-label="Tambah Transaksi Baru"
            title="Tambah Transaksi Baru"
         >
            <Plus size={24} className="stroke-[3]" />

            {/* Tooltip brutalist */}
            <span className="absolute right-full mr-3 px-2 py-1 bg-[var(--color-ink)] text-[var(--color-bg)] font-mono text-[10px] uppercase font-bold tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none hidden sm:block border border-[var(--color-ink)]">
               [ + TAMBAH TRANSAKSI ]
            </span>
         </button>

         {showModal && (
            <TransactionModal
               onClose={() => setShowModal(false)}
               editData={null}
               refreshTransactions={async () => {
                  const res = await api.get("/transactions");
                  if (refreshTransactions) {
                     refreshTransactions(res.data);
                  }
               }}
            />
         )}
      </>
   );
};

export default QuickAddTransactionButton;