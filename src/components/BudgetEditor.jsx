import { useState, useEffect } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";


const BudgetEditor = ({
   budgets,
   setBudgets,
   actualSpending,
   monthlyIncome,
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
      "Darurat": "bg-yellow-100",
      "Tabungan": "bg-green-100",
   }

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
      } catch (error) {
         console.error("Error updating budget", error);
      } finally {
         setLoading(false);
         toast.success("Budget berhasil disimpan", { duration: 3000 });
      }
   };

   return (
      <div className="border-3 border-black p-4 rounded-md">
         <h2 className="text-xl font-bold mb-2">Budget Per Kategori</h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {editBudgets.map((item) => (
               <div
                  key={item._id}
                  className={`flex flex-col border-3 border-black p-2 rounded-md ${categoryColors[item.category] || "bg-gray-100"
                     }`}
               >
                  <span className="font-semibold mb-1">{item.category}</span>
                  <div className="flex items-center gap-2 mb-2">
                     <label className="font-medium">Budget:</label>
                     <input
                        type="number"
                        value={item.budget}
                        onChange={(e) =>
                           handleChange(
                              item.category,
                              parseFloat(e.target.value)
                           )
                        }
                        className="border-3 border-black p-1 rounded w-24 focus:outline-none bg-white"
                     />
                  </div>
                  <div>
                     <span className="text-sm text-gray-800">
                        Pengeluaran Aktual: {actualSpending[item.category] || 0}
                     </span>
                  </div>
               </div>
            ))}
         </div>

         <div className="mt-2 font-medium">
            Total Budget: <span className="font-bold">{totalBudget}</span>
         </div>

         <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 border-3 border-black bg-white text-black font-medium rounded-md hover:bg-black hover:text-white transition mt-4"
         >
            {loading ? "menyimpan.." : "simpan"}
         </button>
      </div>
   );
};



export default BudgetEditor;
