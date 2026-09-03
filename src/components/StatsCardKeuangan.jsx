import React from "react";

const StatsCard = ({
   number,
   title,
   value,
   isLoading = false,
   additionalInfo = null,
}) => {
   return (
      <div className="bg-[var(--color-surface)] border-[3px] border-[var(--color-ink)] p-5 shadow-[4px_4px_0_var(--color-ink)] flex flex-col justify-between">
         <div>
            <div className="flex items-center justify-between mb-2">
               <span className="font-mono text-xs font-bold border-2 border-[var(--color-ink)] bg-[var(--color-surface)] px-2 py-0.5 text-[var(--color-ink)]">
                  #{number}
               </span>
            </div>

            <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-muted)] font-semibold mb-2">
               {title}
            </h3>

            {isLoading ? (
               <div className="h-8 bg-[var(--color-ink)]/10 animate-pulse w-3/4 my-2" />
            ) : (
               <p className="font-mono font-bold text-2xl sm:text-3xl text-[var(--color-ink)] tabular-nums tracking-tight">
                  Rp {Number(value || 0).toLocaleString("id-ID")}
               </p>
            )}
         </div>

         {additionalInfo && (
            <div className="mt-4 pt-3 border-t-2 border-[var(--color-ink)] flex items-center justify-between font-mono text-xs">
               <span className="text-[var(--color-ink-muted)] uppercase tracking-wide">
                  {additionalInfo.label}:
               </span>
               <span
                  className={`font-bold tabular-nums text-sm ${
                     additionalInfo.value >= 0
                        ? "text-[var(--color-positive)]"
                        : "text-[var(--color-negative)]"
                  }`}
               >
                  Rp {Number(additionalInfo.value || 0).toLocaleString("id-ID")}
               </span>
            </div>
         )}
      </div>
   );
};

const StatsCardKeuangan = ({
   budgets,
   actualSpending,
   monthlyIncome,
   isLoading = false,
}) => {
   const totalBudget = (budgets || []).reduce((sum, item) => sum + (item.budget || 0), 0);

   const totalSpending = Object.values(actualSpending || {}).reduce(
      (sum, val) => sum + (val || 0),
      0
   );

   const incomeAmount = monthlyIncome?.amount || 0;
   const remainingBalance = incomeAmount - totalSpending;

   return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
         <StatsCard
            number="1"
            title="TOTAL BUDGET"
            value={totalBudget}
            isLoading={isLoading}
         />
         <StatsCard
            number="2"
            title="TOTAL PENGELUARAN"
            value={totalSpending}
            isLoading={isLoading}
            additionalInfo={{
               label: "SISA UANG",
               value: remainingBalance,
            }}
         />
         <StatsCard
            number="3"
            title="PEMASUKAN BULANAN"
            value={incomeAmount}
            isLoading={isLoading}
         />
      </div>
   );
};

export default StatsCardKeuangan;
