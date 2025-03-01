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
         setLoadingDelete(id); // Mulai loading hapus untuk item tertentu
         await api.delete(`/history/${id}`);
         // Setelah hapus sukses, update state history
         setHistory(history.filter((item) => item._id !== id));
      } catch (error) {
         console.error("Error deleting history", error);
      } finally {
         setLoadingDelete(null);
      }
   };

   return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
         <div className="bg-white p-6 rounded-md w-96 max-h-[80vh] overflow-auto border-3 border-black">
            <h2 className="text-xl font-bold mb-4">
               History Pengeluaran Bulanan
            </h2>
            {isLoading ? (
               <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto"></div>
                  <p className="mt-2">Loading...</p>
               </div>
            ) : history.length ? (
               history.map((item) => (
                  <div
                     key={item._id}
                     className="mb-3 border-b border-black pb-2"
                  >
                     <div className="flex justify-between">
                        <span>
                           {item.month}/{item.year}
                        </span>
                        <span>Makanan: {item.totals.Makanan}</span>
                     </div>
                     <div className="flex justify-between">
                        <span>Transportasi: {item.totals.Transportasi}</span>
                        <span>Darurat: {item.totals.Darurat}</span>
                     </div>
                     <div className="flex justify-between">
                        <span>Tabungan: {item.totals.Tabungan}</span>
                     </div>
                     {/* Tombol Hapus */}
                     <div className="text-right mt-2">
                        <button
                           onClick={() => handleDelete(item._id)}
                           disabled={loadingDelete === item._id}
                           className={`px-3 py-1 border-3 border-black bg-white text-black rounded-md font-medium hover:bg-black hover:text-white transition ${loadingDelete === item._id
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                              }`}
                        >
                           {loadingDelete === item._id
                              ? "Menghapus..."
                              : "Hapus"}
                        </button>
                     </div>
                  </div>
               ))
            ) : (
               <p>Tidak ada history</p>
            )}
            <div className="flex justify-end mt-4">
               <button
                  onClick={onClose}
                  className="px-4 py-2 border-3 border-black bg-white text-black font-medium rounded-md hover:bg-black hover:text-white transition"
               >
                  Tutup
               </button>
            </div>
         </div>
      </div>
   );
};

export default HistoryModal;
