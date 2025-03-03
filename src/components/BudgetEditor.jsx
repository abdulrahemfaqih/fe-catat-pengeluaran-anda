import { useState, useEffect } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";

const BudgetEditor = ({
   budgets,
   setBudgets,
   actualSpending,
   monthlyIncome,
   isLoadingEditor = false
}) => {
   const [editBudgets, setEditBudgets] = useState([]);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      setEditBudgets(budgets);
   }, [budgets]);

   const handleChange = (category, value) => {
      setEditBudgets((prev) =>
         prev.map((budget) =>
            budget.category === category ? { ...budget, budget: value } : budget
         )
      );
   };

   const categoryColors = {
      "Makanan": "bg-red-100",
      "Transportasi": "bg-blue-100",
      "Hiburan": "bg-yellow-100",
      "Kebutuhan Pribadi": "bg-green-100",
      "Pendidikan": "bg-purple-100",
      "Kesehatan": "bg-pink-100",
   };

   const categoryIcons = {
      "Makanan": "🍔",
      "Transportasi": "🚗",
      "Hiburan": "🎉",
      "Kebutuhan Pribadi": "🧴",
      "Pendidikan": "📚",
      "Kesehatan": "🏥",
   };

   // Hitung total budget
   const totalBudget = editBudgets.reduce((sum, item) => sum + item.budget, 0);

   const handleSave = async () => {
      // Opsional: validasi totalBudget == monthlyIncome?.amount
      if (monthlyIncome?.amount && totalBudget !== monthlyIncome.amount) {
         toast.error("Total budget harus sama dengan pemasukan bulanan", { duration: 4000 });
         return;
      }
      setLoading(true);
      try {
         await Promise.all(
            editBudgets.map((budget) =>
               api.put(`/budgets/${budget._id}`, { budget: budget.budget })
            )
         );
         setBudgets(editBudgets);
         toast.success("Budget berhasil disimpan", { duration: 3000 });
      } catch (error) {
         console.error("Error updating budget", error);
         toast.error("Gagal menyimpan budget", { duration: 3000 });
      } finally {
         setLoading(false);
      }
   };

   if (isLoadingEditor) {
      return (
         <div className="rounded-xl border-4 border-black bg-white p-6 shadow-[8px_8px_0px_rgba(0,0,0,1)]">
            <div className="animate-pulse">
               <div className="h-8 bg-gray-200 rounded-lg w-64 mb-6"></div>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((item) => (
                     <div
                        key={item}
                        className="relative overflow-hidden rounded-lg border-3 border-black bg-gray-100 p-4 shadow-[4px_4px_0px_rgba(0,0,0,1)]"
                     >
                        <div className="absolute -top-1 -right-1 rounded-bl-lg bg-white border-b-3 border-l-3 border-black px-2 py-1">
                           <div className="h-7 w-7 rounded-full bg-gray-200"></div>
                        </div>
                        <div className="h-6 bg-gray-200 rounded-lg w-24 mb-3"></div>
                        <div className="flex items-center gap-3 mb-3">
                           <div className="h-5 bg-gray-200 rounded-lg w-16"></div>
                           <div className="h-10 bg-gray-200 rounded-md w-32"></div>
                        </div>
                        <div className="bg-white border-2 border-black rounded-md p-2">
                           <div className="h-5 bg-gray-200 rounded-lg w-full"></div>
                        </div>
                     </div>
                  ))}
               </div>
               <div className="mt-4 p-3 border-3 border-black rounded-lg bg-gray-50">
                  <div className="h-6 bg-gray-200 rounded-lg w-44"></div>
               </div>
               <div className="mt-4 h-10 bg-gray-200 rounded-lg w-40"></div>
            </div>
         </div>
      );
   }

   return (
      <div className="rounded-xl border-4 border-black bg-white p-6 shadow-[8px_8px_0px_rgba(0,0,0,1)]">
         <h2 className="text-2xl font-bold mb-4">Budget Per Kategori</h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {editBudgets.map((item) => (
               <div
                  key={item._id}
                  className={`relative overflow-hidden rounded-lg border-3 border-black ${categoryColors[item.category] || "bg-gray-100"} p-4 shadow-[4px_4px_0px_rgba(0,0,0,1)]`}
               >
                  <div className="absolute -top-1 -right-1 rounded-bl-lg bg-white border-b-3 border-l-3 border-black px-2 py-1">
                     <span className="text-xl">{categoryIcons[item.category] || "📊"}</span>
                  </div>
                  <span className="font-bold text-lg mb-3 block pt-1">{item.category}</span>
                  <div className="flex items-center gap-3 mb-3">
                     <label className="font-medium text-black">Budget:</label>
                     <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-gray-700">Rp</span>
                        <input
                           type="number"
                           value={item.budget}
                           onChange={(e) => handleChange(item.category, parseFloat(e.target.value))}
                           className="border-3 border-black p-2 pl-10 rounded-md w-32 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-blue-50 text-base font-medium shadow-[3px_3px_0px_rgba(0,0,0,0.1)]"
                        />
                     </div>
                  </div>
                  <div className="bg-white border-2 border-black rounded-md p-2">
                     <span className="font-medium text-gray-800">
                        Pengeluaran Aktual:
                        <span className="font-bold ml-1">Rp {(actualSpending[item.category] || 0).toLocaleString()}</span>
                     </span>
                  </div>
               </div>
            ))}
         </div>

         <div className="mt-4 p-3 border-3 border-black rounded-lg bg-gray-50">
            <span className="font-medium">Total Budget: </span>
            <span className="font-bold text-lg">Rp {totalBudget.toLocaleString()}</span>
         </div>

         <button
            onClick={handleSave}
            disabled={loading}
            className="mt-4 px-6 py-2 border-3 border-black bg-white text-black font-bold rounded-lg hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_rgba(0,0,0,1)]"
         >
            {loading ? "Menyimpan..." : "Simpan Budget"}
         </button>
      </div>
   );
};

export default BudgetEditor;