import React, { useState, useEffect } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";
import HistoryDeleteConfirmation from "./HistoryDeleteConfirmation";
import ExportHistoryPDF from "./ExportHistoryPDFS";
import { X, Trash2 } from "lucide-react";

const HistoryModal = ({ onClose, onDelete }) => {
   const [history, setHistory] = useState([]);
   const [loadingDelete, setLoadingDelete] = useState(null);
   const [isLoading, setIsLoading] = useState(true);
   const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
   const [historyToDelete, setHistoryToDelete] = useState(null);

   useEffect(() => {
      const fetchData = async () => {
         try {
            setIsLoading(true);
            const historyRes = await api.get("/history");
            setHistory(historyRes.data || []);
         } catch (error) {
            console.error("Error fetching history", error);
            toast.error("GAGAL MEMUAT ARSIP HISTORI");
         } finally {
            setIsLoading(false);
         }
      };

      fetchData();
   }, []);

   const confirmDelete = (item) => {
      setHistoryToDelete(item);
      setShowDeleteConfirmation(true);
   };

   const handleDelete = async () => {
      if (!historyToDelete) return;

      try {
         setLoadingDelete(historyToDelete._id);
         await api.delete(`/history/${historyToDelete._id}`);
         setHistory(history.filter((item) => item._id !== historyToDelete._id));
         toast.success("ARSIP HISTORI BERHASIL DIHAPUS");
         if (onDelete) {
            onDelete();
         }
      } catch (error) {
         console.error("Error deleting history", error);
         toast.error("GAGAL MENGHAPUS ARSIP HISTORI");
      } finally {
         setLoadingDelete(null);
         setShowDeleteConfirmation(false);
         setHistoryToDelete(null);
      }
   };

   const calculateTotal = (totals) => {
      return Object.values(totals || {}).reduce((acc, curr) => acc + (curr || 0), 0);
   };

   const getMonthName = (month) => {
      const months = [
         "JANUARI", "FEBRUARI", "MARET", "APRIL", "MEI", "JUNI",
         "JULI", "AGUSTUS", "SEPTEMBER", "OKTOBER", "NOVEMBER", "DESEMBER"
      ];
      return months[month - 1] || "";
   };

   return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fadeIn">
         <div className="bg-[var(--color-surface)] border-[3px] border-[var(--color-ink)] shadow-[8px_8px_0_var(--color-ink)] w-full max-w-3xl max-h-[85vh] flex flex-col">
            {/* Header Modal */}
            <div className="p-4 sm:p-5 border-b-[3px] border-[var(--color-ink)] flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-[var(--color-accent)] border border-[var(--color-ink)]" />
                  <h2 className="font-macro uppercase text-base sm:text-lg tracking-tight text-[var(--color-ink)]">
                     ARSIP HISTORI PENGELUARAN BULANAN
                  </h2>
               </div>

               <div className="flex items-center gap-3">
                  {!isLoading && history.length > 0 && (
                     <ExportHistoryPDF history={history} />
                  )}
                  <button
                     onClick={onClose}
                     className="w-8 h-8 border-2 border-[var(--color-ink)] bg-[var(--color-surface)] text-[var(--color-ink)] flex items-center justify-center hover:bg-[var(--color-ink)] hover:text-[var(--color-bg)] transition-colors"
                     aria-label="Tutup"
                  >
                     <X size={18} className="stroke-[2.5]" />
                  </button>
               </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
               {isLoading ? (
                  <div className="py-12 text-center font-mono text-xs uppercase tracking-widest text-[var(--color-ink-muted)]">
                     MEMUAT ARSIP HISTORI...
                  </div>
               ) : history.length ? (
                  history.map((item, index) => {
                     const total = calculateTotal(item.totals);

                     return (
                        <div
                           key={item._id}
                           className="border-2 border-[var(--color-ink)] bg-[var(--color-surface)] p-4"
                        >
                           {/* Period & Delete */}
                           <div className="flex items-center justify-between pb-3 border-b border-[var(--color-ink)]/20 mb-3">
                              <div className="flex items-center gap-2">
                                 <span className="font-mono text-xs font-bold border border-[var(--color-ink)] px-1.5 py-0.5 bg-[var(--color-accent)] text-[var(--color-accent-ink)]">
                                    #{index + 1}
                                 </span>
                                 <span className="font-mono font-bold text-sm tracking-wider uppercase text-[var(--color-ink)]">
                                    {getMonthName(item.month)} {item.year}
                                 </span>
                              </div>

                              <button
                                 onClick={() => confirmDelete(item)}
                                 disabled={loadingDelete === item._id}
                                 className="p-1.5 border border-[var(--color-negative)] text-[var(--color-negative)] hover:bg-[var(--color-negative)] hover:text-white transition-colors"
                                 title="Hapus Arsip Periode Ini"
                              >
                                 <Trash2 size={14} />
                              </button>
                           </div>

                           {/* Categories Breakdown */}
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                              {Object.entries(item.totals || {}).map(([category, amount]) => (
                                 <div
                                    key={category}
                                    className="border border-[var(--color-ink)]/30 bg-[var(--color-bg)] px-3 py-1.5 flex justify-between font-mono text-xs"
                                 >
                                    <span className="text-[var(--color-ink-muted)] uppercase">
                                       {category}
                                    </span>
                                    <span className="font-bold tabular-nums text-[var(--color-ink)]">
                                       Rp {Number(amount).toLocaleString("id-ID")}
                                    </span>
                                 </div>
                              ))}
                           </div>

                           {/* Total row */}
                           <div className="pt-2 border-t border-[var(--color-ink)] flex items-center justify-between font-mono text-xs">
                              <span className="uppercase tracking-wider font-bold text-[var(--color-ink-muted)]">
                                 TOTAL PENGELUARAN PERIODE:
                              </span>
                              <span className="font-bold text-sm tabular-nums text-[var(--color-ink)]">
                                 Rp {Number(total).toLocaleString("id-ID")}
                              </span>
                           </div>
                        </div>
                     );
                  })
               ) : (
                  <div className="py-12 text-center border-2 border-dashed border-[var(--color-ink)] p-8">
                     <p className="font-mono uppercase text-xs font-bold text-[var(--color-ink)] tracking-wider">
                        BELUM ADA ARSIP PENGELUARAN TERSIMPAN
                     </p>
                     <p className="font-body text-xs text-[var(--color-ink-muted)] mt-1">
                        Tekan tombol "ARSIPKAN PENGELUARAN BULAN INI" di dashboard untuk menyimpan ringkasan periode berjalan.
                     </p>
                  </div>
               )}
            </div>
         </div>

         {/* Delete confirmation modal */}
         <HistoryDeleteConfirmation
            isOpen={showDeleteConfirmation}
            onClose={() => setShowDeleteConfirmation(false)}
            onConfirm={handleDelete}
            historyData={historyToDelete}
            isLoading={loadingDelete === historyToDelete?._id}
         />
      </div>
   );
};

export default HistoryModal;
