import React, { useState, useEffect } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";
import { Check } from "lucide-react";

const BudgetEditor = ({
   budgets,
   setBudgets,
   actualSpending = {},
   monthlyIncome,
   isLoadingEditor = false,
}) => {
   const [editBudgets, setEditBudgets] = useState([]);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      setEditBudgets(budgets || []);
   }, [budgets]);

   const handleChange = (category, value) => {
      const parsedVal = isNaN(value) ? 0 : Math.max(0, value);
      setEditBudgets((prev) =>
         prev.map((b) =>
            b.category === category ? { ...b, budget: parsedVal } : b
         )
      );
   };

   // Hitung total budget
   const totalBudget = editBudgets.reduce((sum, item) => sum + (item.budget || 0), 0);

   const handleSave = async () => {
      if (monthlyIncome !== undefined && monthlyIncome !== null) {
         const incomeAmount = monthlyIncome?.amount || 0;
         if (totalBudget !== incomeAmount) {
            toast.error("TOTAL BUDGET HARUS SAMA DENGAN PEMASUKAN BULANAN");
            return;
         }
      }

      setLoading(true);
      try {
         await Promise.all(
            editBudgets.map((budget) =>
               api.put(`/budgets/${budget._id}`, { budget: budget.budget })
            )
         );
         setBudgets(editBudgets);
         toast.success("BUDGET BERHASIL DISIMPAN");
      } catch (error) {
         console.error("Error updating budget", error);
         toast.error("GAGAL MENYIMPAN BUDGET");
      } finally {
         setLoading(false);
      }
   };

   if (isLoadingEditor) {
      return (
         <div className="bg-[var(--color-surface)] border-[3px] border-[var(--color-ink)] p-6 shadow-[4px_4px_0_var(--color-ink)]">
            <div className="animate-pulse space-y-4">
               <div className="h-6 bg-[var(--color-ink)]/10 w-48 mb-6" />
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                     <div key={i} className="h-32 border-2 border-[var(--color-ink)]/20 bg-[var(--color-ink)]/5 p-4" />
                  ))}
               </div>
            </div>
         </div>
      );
   }

   return (
      <div className="bg-[var(--color-surface)] border-[3px] border-[var(--color-ink)] p-6 shadow-[4px_4px_0_var(--color-ink)]">
         <div className="border-b-2 border-[var(--color-ink)] pb-3 mb-5">
            <h2 className="font-macro uppercase text-lg sm:text-xl text-[var(--color-ink)] tracking-tight">
               BUDGET PER KATEGORI
            </h2>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {editBudgets.map((item) => {
               const spending = actualSpending[item.category] || 0;
               const budget = item.budget || 0;
               const ratio = budget > 0 ? (spending / budget) * 100 : 0;
               const filledSegments = Math.min(10, Math.round((spending / (budget || 1)) * 10));

               // Status semantik
               const isOver = spending > budget && budget > 0;
               const isNear = spending >= budget * 0.8 && !isOver && budget > 0;
               const isSafe = !isOver && !isNear;

               const statusColor = isOver
                  ? "bg-[var(--color-negative)]"
                  : isNear
                  ? "bg-[var(--color-warning)]"
                  : "bg-[var(--color-positive)]";

               const statusBorderText = isOver
                  ? "border-[var(--color-negative)] text-[var(--color-negative)]"
                  : isNear
                  ? "border-[var(--color-warning)] text-[var(--color-warning)]"
                  : "border-[var(--color-positive)] text-[var(--color-positive)]";

               return (
                  <div
                     key={item._id}
                     className="bg-[var(--color-surface)] border-2 border-[var(--color-ink)] p-4 flex flex-col justify-between"
                  >
                     <div>
                        {/* Header card per kategori */}
                        <div className="mb-3">
                           <span className="font-mono font-bold text-xs uppercase tracking-wider text-[var(--color-ink)]">
                              {item.category}
                           </span>
                        </div>

                        {/* Input Budget */}
                        <div className="mb-3">
                           <label className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-ink-muted)] block mb-1">
                              ALOKASI BUDGET:
                           </label>
                           <div className="relative">
                              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 font-mono font-bold text-xs text-[var(--color-ink-muted)]">
                                 RP
                              </span>
                              <input
                                 type="number"
                                 value={item.budget}
                                 onChange={(e) =>
                                    handleChange(
                                       item.category,
                                       parseFloat(e.target.value) || 0
                                    )
                                 }
                                 className="w-full border border-[var(--color-ink)] bg-[var(--color-bg)] text-[var(--color-ink)] font-mono text-sm py-1.5 pl-9 pr-2 tabular-nums focus:outline-2 focus:outline-[var(--color-accent)]"
                              />
                           </div>
                        </div>

                        {/* Pengeluaran Aktual Info */}
                        <div className="font-mono text-xs text-[var(--color-ink-muted)] flex items-center justify-between mb-2">
                           <span className="uppercase text-[10px] tracking-wide">AKTUAL:</span>
                           <span className="font-bold tabular-nums text-[var(--color-ink)]">
                              Rp {Number(spending).toLocaleString("id-ID")}
                           </span>
                        </div>

                        {/* Segmented Bar Telemetry Gauge (§6.5) */}
                        <div className="flex gap-[2px] h-3.5 w-full mb-3" title={`${Math.round(ratio)}% terpakai`}>
                           {Array.from({ length: 10 }).map((_, i) => (
                              <div
                                 key={i}
                                 className={`flex-1 border border-[var(--color-ink)] ${
                                    i < filledSegments ? statusColor : "bg-[var(--color-surface)]"
                                 }`}
                              />
                           ))}
                        </div>
                     </div>

                     {/* Status Badge Kotak Outline (§6.5) */}
                     {budget > 0 ? (
                        <div
                           className={`font-mono uppercase text-[11px] font-bold border-2 px-2 py-1 flex items-center justify-between tracking-tight ${statusBorderText}`}
                        >
                           <span>
                              {isOver
                                 ? "▲ MELEBIHI BUDGET"
                                 : isNear
                                 ? "● HAMPIR MELEBIHI"
                                 : "✓ DALAM BATAS"}
                           </span>
                           <span className="tabular-nums font-bold">
                              {Math.round(ratio)}%
                           </span>
                        </div>
                     ) : (
                        <div className="font-mono uppercase text-[11px] border-2 border-[var(--color-ink)] text-[var(--color-ink-muted)] px-2 py-1 text-center">
                           [ BELUM DISET ]
                        </div>
                     )}
                  </div>
               );
            })}
         </div>

         {/* Summary Bar */}
         <div className="mt-5 p-3 border-2 border-[var(--color-ink)] bg-[var(--color-bg)] flex items-center justify-between font-mono text-sm">
            <span className="text-[var(--color-ink-muted)] uppercase tracking-wider font-semibold">
               TOTAL ALOKASI BUDGET:
            </span>
            <span className="font-bold text-base text-[var(--color-ink)] tabular-nums">
               Rp {Number(totalBudget).toLocaleString("id-ID")}
            </span>
         </div>

         {/* Action Button */}
         <button
            onClick={handleSave}
            disabled={loading}
            className="mt-4 font-mono uppercase text-xs tracking-wider font-bold bg-[var(--color-accent)] text-[var(--color-accent-ink)] border-2 border-[var(--color-ink)] px-6 py-2.5 shadow-[4px_4px_0_var(--color-ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--color-ink)] active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-40 disabled:pointer-events-none transition-all duration-100 flex items-center gap-2"
         >
            {loading ? (
               <span>MENYIMPAN...</span>
            ) : (
               <>
                  <Check size={16} className="stroke-[3]" />
                  <span>SIMPAN ALOKASI BUDGET</span>
               </>
            )}
         </button>
      </div>
   );
};

export default BudgetEditor;
