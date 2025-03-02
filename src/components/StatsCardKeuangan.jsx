import React from "react";

const StatsCard = ({ number, title, value, bgColor }) => {
    return (
        <div className={`relative overflow-hidden rounded-xl border-4 border-black ${bgColor} p-6 shadow-[8px_8px_0px_rgba(0,0,0,1)]`}>
            <div className="absolute -top-2 -left-2 rounded-full bg-white border-4 border-black h-10 w-10 flex items-center justify-center font-bold">
                #{number}
            </div>
            <h3 className="mt-4 text-lg font-bold">{title}</h3>
            <p className="text-3xl font-bold mt-2">
                Rp {value.toLocaleString()}
            </p>
        </div>
    );
};

const StatsCardKeuangan = ({ budgets, actualSpending, monthlyIncome }) => {
    // Calculate total budget
    const totalBudget = budgets.reduce((sum, item) => sum + item.budget, 0);

    // Calculate total spending
    const totalSpending = Object.values(actualSpending).reduce((sum, val) => sum + val, 0);

    // Get monthly income amount or default to 0
    const incomeAmount = monthlyIncome?.amount || 0;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatsCard
                number="1"
                title="Total Budget"
                value={totalBudget}
                bgColor="bg-green-100"
            />

            <StatsCard
                number="2"
                title="Total Pengeluaran"
                value={totalSpending}
                bgColor="bg-red-100"
            />

            <StatsCard
                number="3"
                title="Pemasukan Bulanan"
                value={incomeAmount}
                bgColor="bg-blue-100"
            />
        </div>
    );
};

export default StatsCardKeuangan;