import React from "react";
import { AlertTriangle } from "lucide-react";

const HistoryDeleteConfirmation = ({
   isOpen,
   onClose,
   onConfirm,
   historyData,
   isLoading = false,
}) => {
   if (!isOpen) return null;

   const getMonthName = (month) => {
      const months = [
         "JANUARI", "FEBRUARI", "MARET", "APRIL", "MEI", "JUNI",
         "JULI", "AGUSTUS", "SEPTEMBER", "OKTOBER", "NOVEMBER", "DESEMBER"
      ];
      return months[month - 1] || "";
   };

   return (
      <div
         className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4 animate-fadeIn"
         onClick={onClose}
      >
         <div
            className="bg-[var(--color-surface)] border-[3px] border-[var(--color-ink)] shadow-[8px_8px_0_var(--color-ink)] p-5 sm:p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
         >
            <div className="flex items-center gap-2 text-[var(--color-negative)] mb-3 pb-2 border-b-2 border-[var(--color-ink)]">
               <AlertTriangle size={20} className="stroke-[2.5]" />
               <h3 className="font-mono uppercase text-sm font-bold tracking-wider">
                  KONFIRMASI HAPUS ARSIP
               </h3>
            </div>

            <p className="font-body text-xs text-[var(--color-ink)] mb-3">
               Apakah Anda yakin ingin menghapus data arsip pengeluaran periode ini? Tindakan ini tidak dapat dibatalkan.
            </p>

            {historyData && (
               <div className="border-2 border-[var(--color-ink)] bg-[var(--color-bg)] p-3 mb-5 font-mono text-center">
                  <span className="font-bold text-sm uppercase text-[var(--color-ink)]">
                     {getMonthName(historyData.month)} {historyData.year}
                  </span>
               </div>
            )}

            <div className="flex gap-3 justify-end">
               <button
                  onClick={onClose}
                  className="font-mono uppercase text-xs tracking-wider font-bold bg-[var(--color-surface)] text-[var(--color-ink)] border-2 border-[var(--color-ink)] px-4 py-2 hover:bg-[var(--color-bg)] transition-colors"
               >
                  BATAL
               </button>
               <button
                  onClick={onConfirm}
                  disabled={isLoading}
                  className="font-mono uppercase text-xs tracking-wider font-bold bg-[var(--color-surface)] text-[var(--color-negative)] border-2 border-[var(--color-negative)] px-4 py-2 shadow-[3px_3px_0_var(--color-negative)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_var(--color-negative)] active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-40 transition-all"
               >
                  {isLoading ? "MENGHAPUS..." : "HAPUS PERMANEN"}
               </button>
            </div>
         </div>
      </div>
   );
};

export default HistoryDeleteConfirmation;