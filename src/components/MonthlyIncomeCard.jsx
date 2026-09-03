import React, { useState, useEffect } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";
import TipsPenggunaanAtDashboard from "./TipsPenggunaanAtDashboard";
import { Check } from "lucide-react";

const MonthlyIncomeCard = ({ monthlyIncome, setMonthlyIncome }) => {
   const [incomeValue, setIncomeValue] = useState("0");
   const [isSavingIncome, setIsSavingIncome] = useState(false);

   useEffect(() => {
      if (monthlyIncome?.amount !== undefined && monthlyIncome?.amount !== null) {
         setIncomeValue(String(monthlyIncome.amount));
      } else {
         setIncomeValue("0");
      }
   }, [monthlyIncome]);

   const handleSaveIncome = async () => {
      try {
         setIsSavingIncome(true);
         const res = await api.post("/pemasukan", {
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
            amount: parseFloat(incomeValue) || 0,
         });
         setMonthlyIncome(res.data.pemasukan);
         toast.success("Pemasukan bulanan berhasil disimpan");
      } catch (error) {
         console.error("Error updating income", error);
         toast.error("Gagal menyimpan pemasukan bulanan");
      } finally {
         setIsSavingIncome(false);
      }
   };

   return (
      <section className="bg-[var(--color-surface)] border-[3px] border-[var(--color-ink)] p-6 shadow-[4px_4px_0_var(--color-ink)] flex flex-col justify-between">
         <div>
            <div className="border-b-2 border-[var(--color-ink)] pb-3 mb-5">
               <h2 className="font-macro uppercase text-lg sm:text-xl text-[var(--color-ink)] tracking-tight">
                  PEMASUKAN BULANAN
               </h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-stretch">
               <div className="relative flex-1">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono font-bold text-xs text-[var(--color-ink-muted)]">
                     RP
                  </span>
                  <input
                     type="number"
                     placeholder="0"
                     value={incomeValue}
                     onChange={(e) => setIncomeValue(e.target.value)}
                     className="w-full border-2 border-[var(--color-ink)] bg-[var(--color-surface)] text-[var(--color-ink)] p-2.5 pl-11 font-mono text-base tabular-nums focus:outline-2 focus:outline-[var(--color-accent)] focus:outline-offset-2"
                  />
               </div>

               <button
                  onClick={handleSaveIncome}
                  disabled={isSavingIncome}
                  className="font-mono uppercase text-xs tracking-wider font-bold bg-[var(--color-accent)] text-[var(--color-accent-ink)] border-2 border-[var(--color-ink)] px-5 py-2.5 shadow-[4px_4px_0_var(--color-ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--color-ink)] active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-40 disabled:pointer-events-none transition-all duration-100 flex items-center justify-center gap-2"
               >
                  {isSavingIncome ? (
                     <span>MENYIMPAN...</span>
                  ) : (
                     <>
                        <Check size={16} className="stroke-[3]" />
                        <span>SIMPAN</span>
                     </>
                  )}
               </button>
            </div>
         </div>

         <div className="mt-6 pt-4 border-t-2 border-[var(--color-ink)]/20">
            <TipsPenggunaanAtDashboard />
         </div>
      </section>
   );
};

export default MonthlyIncomeCard;
