import React, { useState, useEffect } from "react";
import api from "../utils/api";

const TransactionModal = ({ onClose, editData, refreshTransactions }) => {
   const [formData, setFormData] = useState({
      name: "",
      category: "Makanan",
      amount: "",
      date: new Date().toISOString().slice(0, 10),
   });

   useEffect(() => {
      if (editData) {
         setFormData({
            name: editData.name,
            category: editData.category,
            amount: editData.amount,
            date: new Date(editData.date).toISOString().slice(0, 10),
         });
      }
   }, [editData]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         if (editData) {
            await api.put(`/transactions/${editData._id}`, formData);
         } else {
            await api.post("/transactions", formData);
         }
         refreshTransactions();
         onClose();
      } catch (error) {
         console.error("Transaction submit error", error);
      }
   };

   return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
         <div className="bg-white p-6 rounded-md w-96">
            <h2 className="text-xl font-semibold mb-4">
               {editData ? "Edit" : "Tambah"} Transaksi
            </h2>
            <form onSubmit={handleSubmit}>
               <div className="mb-3">
                  <label className="block mb-1">Nama</label>
                  <input
                     type="text"
                     value={formData.name}
                     onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                     }
                     className="w-full border p-2 rounded"
                     required
                  />
               </div>
               <div className="mb-3">
                  <label className="block mb-1">Kategori</label>
                  <select
                     value={formData.category}
                     onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                     }
                     className="w-full border p-2 rounded"
                     required
                  >
                     <option value="Makanan">Makanan</option>
                     <option value="Transportasi">Transportasi</option>
                     <option value="Darurat">Darurat</option>
                     <option value="Tabungan">Tabungan</option>
                  </select>
               </div>
               <div className="mb-3">
                  <label className="block mb-1">Nominal</label>
                  <input
                     type="number"
                     value={formData.amount}
                     onChange={(e) =>
                        setFormData({ ...formData, amount: e.target.value })
                     }
                     className="w-full border p-2 rounded"
                     required
                  />
               </div>
               <div className="mb-3">
                  <label className="block mb-1">Tanggal</label>
                  <input
                     type="date"
                     value={formData.date}
                     onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                     }
                     className="w-full border p-2 rounded"
                     required
                  />
               </div>
               <div className="flex justify-end">
                  <button
                     type="button"
                     onClick={onClose}
                     className="px-4 py-2 mr-2 bg-gray-300 rounded"
                  >
                     Batal
                  </button>
                  <button
                     type="submit"
                     className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                     Simpan
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default TransactionModal;
