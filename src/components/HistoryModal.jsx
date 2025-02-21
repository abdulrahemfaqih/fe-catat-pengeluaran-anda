import React, { useState, useEffect } from "react";
import api from "../utils/api";

const HistoryModal = ({ onClose }) => {
   const [history, setHistory] = useState([]);

   useEffect(() => {
      const fetchHistory = async () => {
         try {
            const res = await api.get("/history");
            setHistory(res.data);
         } catch (error) {
            console.error("Error fetching history", error);
         }
      };
      fetchHistory();
   }, []);

   return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
         {/* Modal Box */}
         <div className="bg-white p-6 rounded-md w-96 max-h-[80vh] overflow-auto border-2 border-black">
            <h2 className="text-xl font-bold mb-4">
               History Pengeluaran Bulanan
            </h2>
            {history.length ? (
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
                  </div>
               ))
            ) : (
               <p>Tidak ada history</p>
            )}
            <div className="flex justify-end mt-4">
               <button
                  onClick={onClose}
                  className="px-4 py-2 border-2 border-black bg-white text-black font-medium rounded-md hover:bg-black hover:text-white transition"
               >
                  Tutup
               </button>
            </div>
         </div>
      </div>
   );
};

export default HistoryModal;
