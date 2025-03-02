import { useState, useEffect } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";

const TransactionModal = ({ onClose, editData, refreshTransactions }) => {
   const [formData, setFormData] = useState({
      name: "",
      category: "Makanan",
      amount: "",
      date: new Date().toISOString().slice(0, 10),
   });
   const [loading, setLoading] = useState(false);

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
      setLoading(true);
      try {
         if (editData) {
            await api.put(`/transactions/${editData._id}`, formData);
            toast.success("Transaksi berhasil diupdate", { duration: 3000 });
         } else {
            await api.post("/transactions", formData);
            toast.success("Transaksi berhasil disimpan", { duration: 3000 });
         }
         refreshTransactions();
         onClose();
      } catch (error) {
         console.error("Transaction submit error", error);
         toast.error("Gagal menyimpan transaksi", { duration: 3000 });
      } finally {
         setLoading(false);
      }
   };

   const categoryColors = {
      Makanan: 'bg-red-200',
      Transportasi: 'bg-blue-200',
      Darurat: 'bg-red-300',
      Tabungan: 'bg-green-200'
   };

   return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
         {/* Modal Box */}
         <div className="bg-white p-6 rounded-xl w-96 border-3 border-black shadow-xl transform transition-all animate-fadeIn">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
               <span className={`w-4 h-4 rounded-full mr-2 ${categoryColors[formData.category] || 'bg-gray-300'}`}></span>
               {editData ? "Edit" : "Tambah"} Transaksi
            </h2>
            <form onSubmit={handleSubmit}>
               <div className="mb-4">
                  <label className="block mb-1 font-medium">Nama</label>
                  <input
                     type="text"
                     value={formData.name}
                     onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                     }
                     className="w-full border-3 border-black p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
                     placeholder="Contoh: Makan Siang"
                     required
                  />
               </div>
               <div className="mb-4">
                  <label className="block mb-1 font-medium">Kategori</label>
                  <div className="relative">
                     <select
                        value={formData.category}
                        onChange={(e) =>
                           setFormData({ ...formData, category: e.target.value })
                        }
                        className="w-full border-3 border-black p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 appearance-none"
                        required
                     >
                        <option value="Makanan">Makanan</option>
                        <option value="Transportasi">Transportasi</option>
                        <option value="Darurat">Darurat</option>
                        <option value="Tabungan">Tabungan</option>
                     </select>
                     <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <div className="w-4 h-4 border-l-2 border-b-2 border-black transform rotate-45 translate-y-1"></div>
                     </div>
                  </div>
               </div>
               <div className="mb-4">
                  <label className="block mb-1 font-medium">Nominal</label>
                  <div className="relative">
                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">Rp</span>
                     </div>
                     <input
                        type="number"
                        value={formData.amount}
                        onChange={(e) =>
                           setFormData({ ...formData, amount: e.target.value })
                        }
                        className="w-full border-3 border-black p-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
                        placeholder="0"
                        required
                     />
                  </div>
               </div>
               <div className="mb-6">
                  <label className="block mb-1 font-medium">Tanggal</label>
                  <input
                     type="date"
                     value={formData.date}
                     onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                     }
                     className="w-full border-3 border-black p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
                     required
                  />
               </div>
               <div className="flex justify-end gap-3 mt-6">
                  <button
                     type="button"
                     onClick={onClose}
                     className="px-4 py-2 border-3 border-black bg-gray-100 text-black font-bold rounded-xl hover:bg-black hover:text-white transition-all duration-300"
                  >
                     Batal
                  </button>
                  <button
                     type="submit"
                     className="px-4 py-2 border-3 border-black bg-yellow-200 text-black font-bold rounded-xl hover:bg-black hover:text-yellow-200 transition-all duration-300 shadow-md"
                     disabled={loading}
                  >
                     {loading ? "Menyimpan..." : "Simpan"}
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default TransactionModal;