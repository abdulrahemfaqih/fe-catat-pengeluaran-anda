import React, { useState, useEffect } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";
import { History, Archive, AlertTriangle, Check } from "lucide-react";

const HistoryButtons = ({
   onOpenHistoryModal,
   isLoadingPengeluaran,
   setIsLoadingPengeluaran,
   historyUpdated = 0,
}) => {
   const [isEndOfMonth, setIsEndOfMonth] = useState(false);
   const [alreadySaved, setAlreadySaved] = useState(false);
   const [checking, setChecking] = useState(true);

   useEffect(() => {
      const checkExistingHistory = async () => {
         try {
            setChecking(true);
            const month = new Date().getMonth() + 1;
            const year = new Date().getFullYear();

            const response = await api.get("/history");
            const historyExists = response.data.some(
               (item) => item.month === month && item.year === year
            );

            setAlreadySaved(historyExists);

            const today = new Date();
            const lastDay = new Date(
               today.getFullYear(),
               today.getMonth() + 1,
               0
            ).getDate();
            const currentDay = today.getDate();

            setIsEndOfMonth(lastDay - currentDay <= 3);
         } catch (error) {
            console.error("Error checking history status:", error);
         } finally {
            setChecking(false);
         }
      };

      checkExistingHistory();
   }, [historyUpdated]);

   const handleSaveHistory = async () => {
      if (alreadySaved) {
         toast.error("PENGELUARAN BULAN INI SUDAH DISIMPAN SEBELUMNYA");
         return;
      }

      setIsLoadingPengeluaran(true);
      try {
         const month = new Date().getMonth() + 1;
         const year = new Date().getFullYear();
         await api.post("/history", { month, year });
         toast.success("PENGELUARAN BULAN INI BERHASIL DIARSIPKAN");
         setAlreadySaved(true);
      } catch (error) {
         console.error("Error saving history", error);
         if (error.response && error.response.status === 409) {
            toast.error("PENGELUARAN BULAN INI SUDAH DISIMPAN SEBELUMNYA");
            setAlreadySaved(true);
         } else {
            toast.error("GAGAL MENYIMPAN PENGELUARAN BULAN INI");
         }
      } finally {
         setIsLoadingPengeluaran(false);
      }
   };

   return (
      <div className="flex flex-col gap-4 mb-8">
         {/* End of Month Alert */}
         {isEndOfMonth && !alreadySaved && (
            <div className="border-[3px] border-[var(--color-warning)] bg-[var(--color-surface)] p-4 shadow-[4px_4px_0_var(--color-warning)] flex items-center gap-3">
               <AlertTriangle size={20} className="text-[var(--color-warning)] stroke-[2] shrink-0" />
               <div>
                  <h3 className="font-mono uppercase text-xs font-bold text-[var(--color-warning)] tracking-wider">
                     PERINGATAN: BATAS AKHIR BULAN
                  </h3>
                  <p className="font-mono text-xs text-[var(--color-ink)] mt-0.5">
                     Bulan berjalan segera berakhir. Segera arsipkan laporan pengeluaran sebelum periode baru dibuka.
                  </p>
               </div>
            </div>
         )}

         {/* Action Buttons */}
         <div className="flex flex-col sm:flex-row justify-end gap-3">
            {/* View History Button (Secondary) */}
            <button
               onClick={onOpenHistoryModal}
               className="font-mono uppercase text-xs tracking-wider font-bold bg-[var(--color-surface)] text-[var(--color-ink)] border-2 border-[var(--color-ink)] px-5 py-2.5 shadow-[4px_4px_0_var(--color-ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--color-ink)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-100 flex items-center justify-center gap-2"
            >
               <History size={16} className="stroke-[2]" />
               <span>ARSIP HISTORI BULANAN</span>
            </button>

            {/* Save History Button (Primary / Disabled) */}
            <button
               onClick={handleSaveHistory}
               disabled={isLoadingPengeluaran || alreadySaved || checking}
               className={`font-mono uppercase text-xs tracking-wider font-bold border-2 border-[var(--color-ink)] px-5 py-2.5 shadow-[4px_4px_0_var(--color-ink)] transition-all duration-100 flex items-center justify-center gap-2 ${
                  alreadySaved
                     ? "bg-[var(--color-bg)] text-[var(--color-ink-muted)] opacity-70 cursor-not-allowed shadow-none"
                     : "bg-[var(--color-accent)] text-[var(--color-accent-ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--color-ink)] active:translate-x-1 active:translate-y-1 active:shadow-none"
               }`}
            >
               {isLoadingPengeluaran ? (
                  <span>MENYIMPAN ARSIP...</span>
               ) : checking ? (
                  <span>MEMERIKSA STATUS...</span>
               ) : alreadySaved ? (
                  <>
                     <Check size={16} className="text-[var(--color-positive)] stroke-[3]" />
                     <span>PERIODE INI SUDAH DIARSIP</span>
                  </>
               ) : (
                  <>
                     <Archive size={16} className="stroke-[2]" />
                     <span>ARSIPKAN PENGELUARAN BULAN INI</span>
                  </>
               )}
            </button>
         </div>
      </div>
   );
};

export default HistoryButtons;