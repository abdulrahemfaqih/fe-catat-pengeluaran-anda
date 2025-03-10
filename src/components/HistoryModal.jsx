import { useState, useEffect } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";
import HistoryDeleteConfirmation from "./HistoryDeleteConfirmation";
import ExportHistoryPDF from "./ExportHistoryPDFS";

// Category icons mapping
const categoryIcons = {
   Makanan: "🍔",
   Transportasi: "🚗",
   Hiburan: "🎬",
   Kesehatan: "💊",
   Pendidikan: "📚",
   "Kebutuhan Pribadi": "👤",
   default: "📊",
};

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
            setHistory(historyRes.data);
         } catch (error) {
            console.error("Error fetching data", error);
            toast.error("Gagal memuat data", { duration: 3000 });
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
         toast.success("History berhasil dihapus", { duration: 3000 });
         if (onDelete) {
            onDelete();
         }
      } catch (error) {
         console.error("Error deleting history", error);
         toast.error("Gagal menghapus history", { duration: 3000 });
      } finally {
         setLoadingDelete(null);
         setShowDeleteConfirmation(false);
         setHistoryToDelete(null);
      }
   };

   const calculateTotal = (totals) => {
      return Object.values(totals).reduce((acc, curr) => acc + curr, 0);
   };

   const getMonthName = (month) => {
      const months = [
         "Januari",
         "Februari",
         "Maret",
         "April",
         "Mei",
         "Juni",
         "Juli",
         "Agustus",
         "September",
         "Oktober",
         "November",
         "Desember",
      ];
      return months[month - 1];
   };

   const getBgColor = (index) => {
      const colors = [
         "bg-yellow-100 dark:bg-yellow-900",
         "bg-blue-100 dark:bg-blue-900",
         "bg-green-100 dark:bg-green-900",
         "bg-red-100 dark:bg-red-900",
         "bg-purple-100 dark:bg-purple-900",
         "bg-pink-100 dark:bg-pink-900",
      ];
      return colors[index % colors.length];
   };

   // Get icon for a category
   const getCategoryIcon = (categoryName) => {
      return categoryIcons[categoryName] || categoryIcons.default;
   };

   return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
         {/* Modal Box */}
         <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl w-full max-w-4xl max-h-[85vh] overflow-auto border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform transition-all animate-fadeIn relative">
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-yellow-200 dark:bg-yellow-700 rounded-full border-4 border-black z-0"></div>

            <div className="relative z-10">
               {/* Header with title, export button, and close button */}
               <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2 dark:text-white">
                     <span className="inline-block p-1 bg-blue-200 dark:bg-blue-700 rounded-md border-2 border-black">
                        📊
                     </span>
                     <span className="hidden sm:inline">
                        History Pengeluaran Bulanan
                     </span>
                     <span className="inline sm:hidden">History</span>
                  </h2>

                  {/* Buttons container */}
                  <div className="flex items-center gap-2 ml-auto">
                     {/* PDF export button */}
                     <div className={`${isLoading ? "invisible" : "visible"}`}>
                        <ExportHistoryPDF history={history} />
                     </div>

                     {/* Close button */}
                     <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full border-3 border-black flex items-center justify-center font-bold text-lg hover:bg-black hover:text-white dark:bg-gray-700 dark:text-white dark:hover:bg-black transition-colors"
                     >
                        ×
                     </button>
                  </div>
               </div>

               <div className="border-t-3 border-b-3 border-black my-4"></div>

               {isLoading ? (
                  <div className="py-12 flex flex-col items-center justify-center">
                     {/* Redesigned Loading Animation */}
                     <div className="relative w-20 h-20">
                        {/* Inner bouncing money emoji */}
                        <div className="absolute inset-0 flex items-center justify-center animate-bounce">
                           <div className="bg-yellow-200 dark:bg-yellow-700 w-10 h-10 rounded-full border-3 border-black flex items-center justify-center text-xl">
                              💰
                           </div>
                        </div>
                     </div>

                     {/* Loading text */}
                     <div className="mt-6 bg-blue-100 dark:bg-blue-900 border-3 border-black rounded-xl px-5 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <p className="font-bold text-center flex items-center gap-2 dark:text-white">
                           <span>⏱️</span>
                           <span>Memuat history pengeluaran...</span>
                        </p>
                     </div>
                  </div>
               ) : history.length ? (
                  <div className="grid gap-6">
                     {history.map((item, index) => (
                        <div
                           key={item._id}
                           className={`p-4 rounded-lg border-3 border-black ${getBgColor(
                              index
                           )} shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-1`}
                        >
                           <div className="flex justify-between items-center mb-3 pb-2 border-b-2 border-black">
                              <span className="font-bold text-base sm:text-xl flex items-center gap-2 dark:text-white">
                                 {/* Fixed number alignment with flex and text centering */}
                                 <span className="inline-flex items-center justify-center w-6 h-6 bg-white dark:bg-gray-700 rounded-full border-2 border-black text-xs leading-none dark:text-white">
                                    {index + 1}
                                 </span>
                                 {getMonthName(item.month)} {item.year}
                              </span>
                           </div>

                           {/* Dynamic Grid for Categories */}
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                              {Object.entries(item.totals).map(
                                 ([category, amount]) => (
                                    <div
                                       key={category}
                                       className="bg-white dark:bg-gray-700 px-3 py-2 rounded-lg border-2 border-black"
                                    >
                                       <div className="flex justify-between items-center">
                                          <span className="font-semibold flex items-center gap-1 dark:text-white">
                                             <span className="text-lg">
                                                {getCategoryIcon(category)}
                                             </span>
                                             {category}:
                                          </span>
                                          <span className="dark:text-white">
                                             Rp {amount.toLocaleString("id-ID")}
                                          </span>
                                       </div>
                                    </div>
                                 )
                              )}
                           </div>

                           <div className="bg-white dark:bg-gray-700 px-4 py-3 rounded-lg border-2 border-black mb-4">
                              <div className="flex justify-between items-center flex-wrap">
                                 <span className="font-bold text-base sm:text-lg dark:text-white">
                                    Total Pengeluaran:
                                 </span>
                                 <span className="font-bold text-base sm:text-lg dark:text-white">
                                    Rp{" "}
                                    {calculateTotal(item.totals).toLocaleString(
                                       "id-ID"
                                    )}
                                 </span>
                              </div>
                           </div>

                           <div className="text-right">
                              <button
                                 onClick={() => confirmDelete(item)}
                                 disabled={loadingDelete === item._id}
                                 className={`px-4 py-2 border-3 border-black text-black dark:text-white rounded-xl bg-white dark:bg-gray-700 font-bold hover:bg-black hover:text-white dark:hover:bg-black dark:hover:text-white transition-all duration-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                                    loadingDelete === item._id
                                       ? "opacity-50 cursor-not-allowed"
                                       : ""
                                 }`}
                              >
                                 {loadingDelete === item._id ? (
                                    <span className="flex items-center gap-2">
                                       <svg
                                          className="animate-spin h-4 w-4"
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                       >
                                          <circle
                                             className="opacity-25"
                                             cx="12"
                                             cy="12"
                                             r="10"
                                             stroke="currentColor"
                                             strokeWidth="4"
                                          ></circle>
                                          <path
                                             className="opacity-75"
                                             fill="currentColor"
                                             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                          ></path>
                                       </svg>
                                       <span className="hidden sm:inline">
                                          Menghapus...
                                       </span>
                                       <span className="inline sm:hidden">
                                          ...
                                       </span>
                                    </span>
                                 ) : (
                                    <span>Hapus</span>
                                 )}
                              </button>
                           </div>
                        </div>
                     ))}
                  </div>
               ) : (
                  <div className="text-center py-8 border-3 border-black rounded-lg bg-yellow-100 dark:bg-yellow-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                     <p className="text-xl font-bold mb-2 dark:text-white">
                        Tidak ada history pengeluaran
                     </p>
                     <p className="text-gray-700 dark:text-gray-300 px-2">
                        Mulai simpan history pengeluaran bulanan Anda dengan
                        tombol "Simpan Pengeluaran Bulan Ini"
                     </p>
                  </div>
               )}
            </div>
         </div>

         {/* Delete Confirmation Modal */}
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
