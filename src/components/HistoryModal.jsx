import { useState, useEffect } from "react";
import api from "../utils/api";

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
      } catch (error) {
         console.error("Error deleting history", error);
      } finally {
         setLoadingDelete(null);
      }
   };

   const calculateTotal = (totals) => {
      return Object.values(totals).reduce((acc, curr) => acc + curr, 0);
   };

   return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
         <div className="bg-white p-6 rounded-md w-96 max-h-[80vh] overflow-auto border-2 border-black">
            <div className="flex items-center justify-between mb-4">
               <h2 className="text-xl font-bold">
                  History Pengeluaran Bulanan
               </h2>
               <button
                  onClick={onClose}
                  className="px-4 py-1 border-2 border-black bg-white text-black font-medium rounded-md hover:bg-black hover:text-white transition"
               >
                  Tutup
               </button>
            </div>

            <div className="border-t border-b border-black my-3"></div>

            {isLoading ? (
               <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto"></div>
                  <p className="mt-2">Loading...</p>
               </div>
            ) : history.length ? (
               <div>
                  {history.map((item) => (
                     <div
                        key={item._id}
                        className="mb-4 pb-4 border-b border-gray-300"
                     >
                        <div className="flex justify-between items-center mb-3">
                           <span className="font-bold text-lg">
                              {item.month}/{item.year}
                           </span>
                        </div>

                        <div className="mb-2">
                           <div className="flex justify-between mb-1">
                              <span>Makanan:</span>
                              <span>Rp {item.totals.Makanan.toLocaleString('id-ID')}</span>
                           </div>
                           <div className="flex justify-between mb-1">
                              <span>Transportasi:</span>
                              <span>Rp {item.totals.Transportasi.toLocaleString('id-ID')}</span>
                           </div>
                           <div className="flex justify-between mb-1">
                              <span>Tabungan:</span>
                              <span>Rp {item.totals.Tabungan.toLocaleString('id-ID')}</span>
                           </div>
                           <div className="flex justify-between mb-1">
                              <span>Darurat:</span>
                              <span>Rp {item.totals.Darurat.toLocaleString('id-ID')}</span>
                           </div>
                        </div>

                        <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                           <span className="font-bold">Total Pengeluaran:</span>
                           <span className="font-bold">
                              Rp {calculateTotal(item.totals).toLocaleString('id-ID')}
                           </span>
                        </div>

                        <div className="text-right mt-2">
                           <button
                              onClick={() => handleDelete(item._id)}
                              disabled={loadingDelete === item._id}
                              className={`px-3 py-1 border-2 border-black bg-white text-black rounded-md font-medium hover:bg-black hover:text-white transition ${loadingDelete === item._id
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                                 }`}
                           >
                              {loadingDelete === item._id ? "Menghapus..." : "Hapus"}
                           </button>
                        </div>
                     </div>
                  ))}
               </div>
            ) : (
               <div className="text-center py-4 border border-2 border-gray-500 rounded-md">
                  <p>Tidak ada history</p>
               </div>
            )}
         </div>
      </div>
   );
};

export default HistoryModal;