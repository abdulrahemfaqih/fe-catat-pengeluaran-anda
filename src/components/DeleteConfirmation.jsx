import React from "react";
import { AlertTriangle } from "lucide-react";

const DeleteConfirmation = ({
   isOpen,
   onClose,
   onConfirm,
   title = "KONFIRMASI HAPUS",
   message = "Apakah Anda yakin ingin menghapus item ini?",
   itemName = "",
   isLoading = false,
}) => {
   if (!isOpen) return null;

   return (
      <div
         className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fadeIn"
         onClick={onClose}
      >
         <div
            className="bg-[var(--color-surface)] border-[3px] border-[var(--color-ink)] shadow-[8px_8px_0_var(--color-ink)] p-5 sm:p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
         >
            <div className="flex items-center gap-2 text-[var(--color-negative)] mb-3 pb-2 border-b-2 border-[var(--color-ink)]">
               <AlertTriangle size={20} className="stroke-[2.5]" />
               <h3 className="font-mono uppercase text-sm font-bold tracking-wider">
                  {title.toUpperCase()}
               </h3>
            </div>

            <p className="font-body text-xs text-[var(--color-ink)] mb-3">
               {message}
            </p>

            {itemName && (
               <div className="border-2 border-[var(--color-ink)] bg-[var(--color-bg)] p-3 mb-5 font-mono text-center">
                  <span className="font-bold text-sm text-[var(--color-ink)]">
                     "{itemName}"
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
                  {isLoading ? "MENGHAPUS..." : "HAPUS"}
               </button>
            </div>
         </div>
      </div>
   );
};

export default DeleteConfirmation;