import React, { useState, useEffect } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";
import TipsPenggunaanAtDashboard from "./TipsPenggunaanAtDashboard";

const MonthlyIncomeCard = ({ monthlyIncome, setMonthlyIncome }) => {
    const [incomeValue, setIncomeValue] = useState('0');
    const [isSavingIncome, setIsSavingIncome] = useState(false);

    useEffect(() => {
        if (monthlyIncome?.amount) {
            setIncomeValue(monthlyIncome.amount);
        } else {
            setIncomeValue('0'); // Default value
        }
    }, [monthlyIncome]);

    const handleSaveIncome = async () => {
        try {
            setIsSavingIncome(true);
            const res = await api.post("/pemasukan", {
                month: new Date().getMonth() + 1,
                year: new Date().getFullYear(),
                amount: parseFloat(incomeValue),
            });
            setMonthlyIncome(res.data.pemasukan);
            toast.success("Pemasukan bulanan berhasil disimpan", { duration: 3000 });
        } catch (error) {
            console.error("Error updating income", error);
            toast.error("Gagal menyimpan pemasukan bulanan", { duration: 3000 });
        } finally {
            setIsSavingIncome(false);
        }
    };

    return (
        <section className="rounded-xl border-4 border-black bg-white p-6 shadow-[4px_4px_0px_rgba(0,0,0,1)] relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute -top-2 -left-2 w-12 h-12 bg-blue-100 rounded-full border-3 border-black z-0"></div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-yellow-100 rounded-full border-3 border-black z-0"></div>

            <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <span className="inline-block p-1 bg-blue-200 rounded-md border-2 border-black">💰</span>
                    Pemasukan Bulanan
                </h2>

                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative w-full">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-gray-700">Rp</span>
                        <input
                            type="number"
                            placeholder="Masukkan pemasukan"
                            value={incomeValue}
                            onChange={(e) => setIncomeValue(e.target.value)}
                            className="w-full border-3 border-black p-3 pl-10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 bg-blue-50 text-lg font-medium shadow-[4px_4px_0px_rgba(0,0,0,0.1)]"
                        />
                    </div>

                    <button
                        onClick={handleSaveIncome}
                        disabled={isSavingIncome}
                        className="px-6 py-3 border-3 border-black bg-green-100 text-black font-bold rounded-lg hover:bg-green-400 hover:text-white transition-all transform hover:-translate-y-1 shadow-[4px_4px_0px_rgba(0,0,0,1)] disabled:opacity-70"
                    >
                        {isSavingIncome ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Menyimpan...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <span>💾</span> Simpan
                            </span>
                        )}
                    </button>
                </div>

              <TipsPenggunaanAtDashboard/>
            </div>
        </section>
    );
};

export default MonthlyIncomeCard;