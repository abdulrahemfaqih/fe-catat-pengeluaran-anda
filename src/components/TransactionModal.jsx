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
   const [displayAmount, setDisplayAmount] = useState(""); // For formatted display
   const [loading, setLoading] = useState(false);

   // Define the updated category icons and colors with dark mode support
   const categoryIcons = {
      Makanan: "🍔",
      Transportasi: "🚗",
      Hiburan: "🎬",
      Kesehatan: "💊",
      Pendidikan: "📚",
      "Kebutuhan Pribadi": "👤",
      default: "📊",
   };

   const categoryColors = {
      Makanan: "bg-yellow-100 dark:bg-yellow-800",
      Transportasi: "bg-blue-100 dark:bg-blue-800",
      Hiburan: "bg-pink-100 dark:bg-pink-800",
      Kesehatan: "bg-red-100 dark:bg-red-800",
      Pendidikan: "bg-indigo-100 dark:bg-indigo-800",
      "Kebutuhan Pribadi": "bg-green-100 dark:bg-green-800",
      default: "bg-gray-100 dark:bg-gray-700",
   };

   const categoryOptions = [
      { value: "Makanan", label: "🍔 Makanan" },
      { value: "Transportasi", label: "🚗 Transportasi" },
      { value: "Hiburan", label: "🎬 Hiburan" },
      { value: "Kesehatan", label: "💊 Kesehatan" },
      { value: "Pendidikan", label: "📚 Pendidikan" },
      { value: "Kebutuhan Pribadi", label: "👤 Kebutuhan Pribadi" },
   ];

   useEffect(() => {
      if (editData) {
         setFormData({
            name: editData.name,
            category: editData.category,
            amount: editData.amount,
            date: new Date(editData.date).toISOString().slice(0, 10),
         });
         // Set formatted display amount
         setDisplayAmount(editData.amount.toLocaleString("id-ID"));
      }
   }, [editData]);

   const handleAmountChange = (e) => {
      // Remove non-numeric characters for the actual value
      const numericValue = e.target.value.replace(/\D/g, "");

      // Update the actual value in formData
      setFormData({
         ...formData,
         amount: numericValue ? parseInt(numericValue, 10) : "",
      });

      // Update the displayed value with formatting
      setDisplayAmount(
         numericValue ? parseInt(numericValue, 10).toLocaleString("id-ID") : ""
      );
   };

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

   // Get the icon for a category
   const getCategoryIcon = (categoryName) => {
      return categoryIcons[categoryName] || categoryIcons.default;
   };

   // Get the color for a category
   const getCategoryColor = (categoryName) => {
      return categoryColors[categoryName] || categoryColors.default;
   };

   return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
         {/* Modal Box */}
         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-96 border-3 border-black shadow-xl transform transition-all animate-fadeIn dark:text-white">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
               <span
                  className={`inline-flex items-center justify-center w-8 h-8 rounded-full mr-2 ${getCategoryColor(
                     formData.category
                  )} border-2 border-black`}
               >
                  {getCategoryIcon(formData.category)}
               </span>
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
                     className="w-full border-3 border-black p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 shadow-[2px_2px_0px_rgba(0,0,0,1)] bg-white dark:bg-gray-700 text-black dark:text-white transition-colors duration-300"
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
                           setFormData({
                              ...formData,
                              category: e.target.value,
                           })
                        }
                        className="w-full border-3 border-black p-2 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 appearance-none bg-white dark:bg-gray-700 text-black dark:text-white shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-colors duration-300"
                        required
                     >
                        {categoryOptions.map((option) => (
                           <option key={option.value} value={option.value}>
                              {option.label}
                           </option>
                        ))}
                     </select>
                     <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <div className="border-2 border-black rounded-md p-1 bg-yellow-100 dark:bg-yellow-700 transition-colors duration-300">
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                           >
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth={2}
                                 d="M19 9l-7 7-7-7"
                              />
                           </svg>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="mb-4">
                  <label className="block mb-1 font-medium">Nominal</label>
                  <div className="relative">
                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-700 dark:text-gray-200 font-medium">Rp</span>
                     </div>
                     <input
                        type="text"
                        value={displayAmount}
                        onChange={handleAmountChange}
                        className="w-full border-3 border-black p-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 shadow-[2px_2px_0px_rgba(0,0,0,1)] bg-white dark:bg-gray-700 text-black dark:text-white transition-colors duration-300"
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
                     className="w-full border-3 border-black p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 shadow-[2px_2px_0px_rgba(0,0,0,1)] bg-white dark:bg-gray-700 text-black dark:text-white transition-colors duration-300"
                     required
                  />
               </div>
               <div className="flex justify-end gap-3 mt-6">
                  <button
                     type="button"
                     onClick={onClose}
                     className="px-4 py-2 border-3 border-black bg-gray-100 dark:bg-gray-600 text-black dark:text-white font-bold rounded-xl hover:bg-black hover:text-white dark:hover:bg-gray-900 transition-all duration-300 shadow-[3px_3px_0px_rgba(0,0,0,1)]"
                  >
                     Batal
                  </button>
                  <button
                     type="submit"
                     className="px-4 py-2 border-3 border-black bg-yellow-200 dark:bg-yellow-600 text-black dark:text-white font-bold rounded-xl hover:bg-black hover:text-yellow-200 dark:hover:bg-black dark:hover:text-yellow-400 transition-all duration-300 shadow-[3px_3px_0px_rgba(0,0,0,1)]"
                     disabled={loading}
                  >
                     {loading ? (
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
                           Menyimpan...
                        </span>
                     ) : (
                        "Simpan"
                     )}
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default TransactionModal;