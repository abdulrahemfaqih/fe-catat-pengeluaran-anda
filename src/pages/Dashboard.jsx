import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import TransactionTable from "../components/TransactionTable";
import BudgetEditor from "../components/BudgetEditor";
import HistoryModal from "../components/HistoryModal";
import api from "../utils/api";

const Dashboard = () => {
   const { user, logout } = useContext(AuthContext);
   const [transactions, setTransactions] = useState([]);
   const [budgets, setBudgets] = useState([]);
   const [monthlyIncome, setMonthlyIncome] = useState(null);

   const [showHistoryModal, setShowHistoryModal] = useState(false);

   // State untuk menampung total pengeluaran aktual per kategori
   const [actualSpending, setActualSpending] = useState({
      Makanan: 0,
      Transportasi: 0,
      Darurat: 0,
      Tabungan: 0,
   });

   // Fetch data saat user login
   useEffect(() => {
      const fetchData = async () => {
         try {
            const [txRes, budgetRes, incomeRes] = await Promise.all([
               api.get("/transactions"),
               api.get("/budgets"),
               api.get("/pemasukan"),
            ]);
            setTransactions(txRes.data);
            setBudgets(budgetRes.data);
            setMonthlyIncome(incomeRes.data[0]);
         } catch (error) {
            console.error("Error fetching data", error);
         }
      };
      if (user) fetchData();
   }, [user]);

   // Hitung total pengeluaran aktual per kategori
   useEffect(() => {
      if (transactions.length) {
         const spending = {
            Makanan: 0,
            Transportasi: 0,
            Darurat: 0,
            Tabungan: 0,
         };
         transactions.forEach((tx) => {
            if (spending[tx.category] !== undefined) {
               spending[tx.category] += tx.amount;
            }
         });
         setActualSpending(spending);
      } else {
         // Jika belum ada transaksi, reset ke 0
         setActualSpending({
            Makanan: 0,
            Transportasi: 0,
            Darurat: 0,
            Tabungan: 0,
         });
      }
   }, [transactions]);

   const handleSaveIncome = async () => {
      try {
         const amount = document.getElementById("monthlyIncome").value;
         const res = await api.post("/pemasukan", {
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
            amount: parseFloat(amount),
         });
         setMonthlyIncome(res.data.pemasukan);
      } catch (error) {
         console.error("Error updating income", error);
      }
   };

   const handleSaveHistory = async () => {
      // Simpan pengeluaran bulanan ke history
      try {
         const month = new Date().getMonth() + 1;
         const year = new Date().getFullYear();
         await api.post("/history", { month, year });
         alert("Pengeluaran bulan ini berhasil disimpan ke history");
      } catch (error) {
         console.error("Error saving history", error);
      }
   };

   if (!user) return null; // atau redirect

   return (
      <div className="container mx-auto p-4">
         <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Dashboard Keuangan Pribadi</h1>
            <button
               onClick={logout}
               className="px-4 py-2 bg-red-500 text-white rounded"
            >
               Logout
            </button>
         </div>

         {/* Pemasukan Bulanan */}
         <div className="mb-6">
            <h2 className="text-xl font-semibold">Pemasukan Bulanan</h2>
            <div className="mt-2">
               <input
                  type="number"
                  placeholder="Masukkan pemasukan"
                  defaultValue={monthlyIncome?.amount || ""}
                  className="border p-2 rounded mr-2"
                  id="monthlyIncome"
               />
               <button
                  onClick={handleSaveIncome}
                  className="px-4 py-2 bg-green-500 text-white rounded"
               >
                  Simpan
               </button>
            </div>
         </div>

         {/* Editor Budget */}
         <BudgetEditor
            budgets={budgets}
            setBudgets={setBudgets}
            actualSpending={actualSpending}
            monthlyIncome={monthlyIncome}
         />

         {/* Tabel Transaksi */}
         <TransactionTable
            transactions={transactions}
            setTransactions={setTransactions}
         />

         {/* Tombol History Pengeluaran Bulanan */}
         <div className="mt-4 flex items-center gap-4">
            <button
               onClick={() => setShowHistoryModal(true)}
               className="px-4 py-2 bg-blue-500 text-white rounded"
            >
               History Pengeluaran Bulanan
            </button>
            <button
               onClick={handleSaveHistory}
               className="px-4 py-2 bg-purple-500 text-white rounded"
            >
               Simpan Pengeluaran Bulan Ini
            </button>
         </div>

         {showHistoryModal && (
            <HistoryModal onClose={() => setShowHistoryModal(false)} />
         )}
      </div>
   );
};

export default Dashboard;
