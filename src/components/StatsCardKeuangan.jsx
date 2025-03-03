import React from "react";

const StatsCard = ({
   number,
   title,
   value,
   bgColor,
   isLoading = false,
   additionalInfo = null,
}) => {
   return (
      <div
         className={`relative overflow-hidden rounded-xl border-4 border-black ${bgColor} p-6 shadow-[8px_8px_0px_rgba(0,0,0,1)]`}
      >
         <div className="absolute -top-2 -left-2 rounded-full bg-white border-4 border-black h-10 w-10 flex items-center justify-center font-bold">
            #{number}
         </div>
         <h3 className="mt-4 text-lg font-bold">{title}</h3>

         {isLoading ? (
            <div className="animate-pulse mt-2">
               <div className="h-10 bg-black/10 rounded-lg w-3/4 mx-auto"></div>
            </div>
         ) : (
            <>
               <p className="text-3xl font-bold mt-2">
                  Rp {value.toLocaleString()}
               </p>
               {additionalInfo && (
                  <div className="mt-3 border-t-2 border-black/10 pt-2">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center">
                           <span className="font-bold mr-2">💰</span>
                           <p className="font-medium">
                              {additionalInfo.label}:
                           </p>
                        </div>
                        <div
                           className={`px-3 py-1 rounded-lg border-2 border-black font-bold ${
                              additionalInfo.value >= 0
                                 ? "bg-green-200 text-green-800"
                                 : "bg-red-200 text-red-800"
                           }`}
                        >
                           Rp {additionalInfo.value.toLocaleString()}
                        </div>
                     </div>
                  </div>
               )}
            </>
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
   // Calculate total budget
   const totalBudget = budgets.reduce((sum, item) => sum + item.budget, 0);

   // Calculate total spending
   const totalSpending = Object.values(actualSpending).reduce(
      (sum, val) => sum + val,
      0
   );

   // Get monthly income amount or default to 0
   const incomeAmount = monthlyIncome?.amount || 0;

   const remainingBalance = incomeAmount - totalSpending;

   return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
         <StatsCard
            number="3"
            title="Pemasukan Bulanan"
            value={incomeAmount}
            bgColor="bg-blue-100"
            isLoading={isLoading}
         />
         <StatsCard
            number="2"
            title="Total Pengeluaran"
            value={totalSpending}
            bgColor="bg-red-100"
            isLoading={isLoading}
            additionalInfo={{
               label: "Sisa Uang",
               value: remainingBalance,
            }}
         />
         <StatsCard
            number="1"
            title="Total Budget"
            value={totalBudget}
            bgColor="bg-green-100"
            isLoading={isLoading}
         />
      </div>
   );
};

export default StatsCardKeuangan;
