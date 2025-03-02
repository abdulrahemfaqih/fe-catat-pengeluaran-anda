import { useState, useEffect } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";

const HistoryModal = ({ onClose }) => {
   const [history, setHistory] = useState([]);
   const [loadingDelete, setLoadingDelete] = useState(null);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      const fetchHistory = async () => {
         try {
            setIsLoading(true);
            const res = await api.get("/history");
            setHistory(res.data);
         } catch (error) {
            console.error("Error fetching history", error);
            toast.error("Gagal memuat history", { duration: 3000 });
         } finally {
            setIsLoading(false);
         }
      };
      fetchHistory();
   }, []);

   const handleDelete = async (id) => {
      try {
         setLoadingDelete(id);
         await api.delete(`/history/${id}`);
         setHistory(history.filter((item) => item._id !== id));
         toast.success("History berhasil dihapus", { duration: 3000 });
      } catch (error) {
         console.error("Error deleting history", error);
         toast.error("Gagal menghapus history", { duration: 3000 });
      } finally {
         setLoadingDelete(null);
      }
   };

   const calculateTotal = (totals) => {
      return Object.values(totals).reduce((acc, curr) => acc + curr, 0);
   };

   const getMonthName = (month) => {
      const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
      return months[month - 1];
   };

   const getBgColor = (index) => {
      const colors = ["bg-yellow-100", "bg-blue-100", "bg-green-100", "bg-red-100", "bg-purple-100", "bg-pink-100"];
      return colors[index % colors.length];
   };

   return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
         {/* Modal Box */}
         <div className="bg-white p-4 sm:p-6 rounded-xl w-full max-w-4xl max-h-[85vh] overflow-auto border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform transition-all animate-fadeIn relative">
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-yellow-200 rounded-full border-4 border-black z-0"></div>

            <div className="relative z-10">
               <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                     <span className="inline-block p-1 bg-blue-200 rounded-md border-2 border-black">📊</span>
                     <span className="hidden sm:inline">History Pengeluaran Bulanan</span>
                     <span className="inline sm:hidden">History</span>
                  </h2>
                  <button
                     onClick={onClose}
                     className="w-8 h-8 rounded-full border-3 border-black flex items-center justify-center font-bold text-lg hover:bg-black hover:text-white transition-colors"
                  >
                     ×
                  </button>
               </div>

               <div className="border-t-3 border-b-3 border-black my-4"></div>

               {isLoading ? (
                  <div className="text-center py-8">
                     <div className="animate-spin rounded-full h-12 w-12 border-b-3 border-black mx-auto"></div>
                     <p className="mt-4 font-bold">Memuat history...</p>
                  </div>
               ) : history.length ? (
                  <div className="grid gap-6">
                     {history.map((item, index) => (
                        <div
                           key={item._id}
                           className={`p-4 rounded-lg border-3 border-black ${getBgColor(index)} shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-1`}
                        >
                           <div className="flex justify-between items-center mb-3 pb-2 border-b-2 border-black">
                              <span className="font-bold text-base sm:text-xl flex items-center gap-2">
                                 {/* Fixed number alignment with flex and text centering */}
                                 <span className="inline-flex items-center justify-center w-6 h-6 bg-white rounded-full border-2 border-black text-xs leading-none">
                                    {index + 1}
                                 </span>
                                 {getMonthName(item.month)} {item.year}
                              </span>
                           </div>

                           {/* Improved responsive grid for mobile */}
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                              <div className="bg-white px-3 py-2 rounded-lg border-2 border-black">
                                 <div className="flex justify-between">
                                    <span className="font-semibold">Makanan:</span>
                                    <span>Rp {item.totals.Makanan.toLocaleString('id-ID')}</span>
                                 </div>
                              </div>
                              <div className="bg-white px-3 py-2 rounded-lg border-2 border-black">
                                 <div className="flex justify-between">
                                    <span className="font-semibold">Transportasi:</span>
                                    <span>Rp {item.totals.Transportasi.toLocaleString('id-ID')}</span>
                                 </div>
                              </div>
                              <div className="bg-white px-3 py-2 rounded-lg border-2 border-black">
                                 <div className="flex justify-between">
                                    <span className="font-semibold">Tabungan:</span>
                                    <span>Rp {item.totals.Tabungan.toLocaleString('id-ID')}</span>
                                 </div>
                              </div>
                              <div className="bg-white px-3 py-2 rounded-lg border-2 border-black">
                                 <div className="flex justify-between">
                                    <span className="font-semibold">Darurat:</span>
                                    <span>Rp {item.totals.Darurat.toLocaleString('id-ID')}</span>
                                 </div>
                              </div>
                           </div>

                           <div className="bg-white px-4 py-3 rounded-lg border-2 border-black mb-4">
                              <div className="flex justify-between items-center flex-wrap">
                                 <span className="font-bold text-base sm:text-lg">Total Pengeluaran:</span>
                                 <span className="font-bold text-base sm:text-lg">
                                    Rp {calculateTotal(item.totals).toLocaleString('id-ID')}
                                 </span>
                              </div>
                           </div>

                           <div className="text-right">
                              <button
                                 onClick={() => handleDelete(item._id)}
                                 disabled={loadingDelete === item._id}
                                 className={`px-4 py-2 border-3 border-black text-black rounded-xl bg-white font-bold hover:bg-black hover:text-white transition-all duration-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${loadingDelete === item._id
                                       ? "opacity-50 cursor-not-allowed"
                                       : ""
                                    }`}
                              >
                                 {loadingDelete === item._id ? (
                                    <span className="flex items-center gap-2">
                                       <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                       </svg>
                                       <span className="hidden sm:inline">Menghapus...</span>
                                       <span className="inline sm:hidden">...</span>
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
                  <div className="text-center py-8 border-3 border-black rounded-lg bg-yellow-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                     <p className="text-xl font-bold mb-2">Tidak ada history pengeluaran</p>
                     <p className="text-gray-700 px-2">Mulai simpan history pengeluaran bulanan Anda dengan tombol "Simpan Pengeluaran Bulan Ini"</p>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default HistoryModal;