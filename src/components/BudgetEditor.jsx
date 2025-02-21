import React, { useState, useEffect } from "react";
import api from "../utils/api";

const BudgetEditor = ({
   budgets,
   setBudgets,
   actualSpending,
   monthlyIncome,
}) => {
   const [editBudgets, setEditBudgets] = useState([]);

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

   // Hitung total budget
   const totalBudget = editBudgets.reduce((sum, item) => sum + item.budget, 0);

   const handleSave = async () => {
      // Opsional: validasi totalBudget == monthlyIncome?.amount
      if (monthlyIncome?.amount && totalBudget !== monthlyIncome.amount) {
         alert("Total budget harus sama dengan pemasukan bulanan!");
         return;
      }

      try {
         await Promise.all(
            editBudgets.map((budget) =>
               api.put(`/budgets/${budget._id}`, { budget: budget.budget })
            )
         );
         setBudgets(editBudgets);
         alert("Budget berhasil diupdate");
      } catch (error) {
         console.error("Error updating budget", error);
      }
   };

   return (
      <div className="mb-6">
         <h2 className="text-xl font-semibold mb-2">Budget Per Kategori</h2>
         <div className="grid grid-cols-2 gap-4">
            {editBudgets.map((item) => (
               <div key={item._id} className="flex flex-col border p-2 rounded">
                  <span className="font-medium mb-1">{item.category}</span>
                  <div className="flex items-center gap-2 mb-2">
                     <label>Budget:</label>
                     <input
                        type="number"
                        value={item.budget}
                        onChange={(e) =>
                           handleChange(
                              item.category,
                              parseFloat(e.target.value)
                           )
                        }
                        className="border p-1 rounded w-24"
                     />
                  </div>
                  <div>
                     <span className="text-sm text-gray-700">
                        Pengeluaran Aktual: {actualSpending[item.category] || 0}
                     </span>
                  </div>
               </div>
            ))}
         </div>

         <div className="mt-2">
            <strong>Total Budget: {totalBudget}</strong>
         </div>

         <button
            onClick={handleSave}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
         >
            Simpan Budget
         </button>
      </div>
   );
};

export default BudgetEditor;
