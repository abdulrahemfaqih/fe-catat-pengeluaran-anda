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
   const [isSavingIncome, setIsSavingIncome] = useState(false);


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
         setIsSavingIncome(true);
         const amount = document.getElementById("monthlyIncome").value;
         const res = await api.post("/pemasukan", {
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
            amount: parseFloat(amount),
         });
         setMonthlyIncome(res.data.pemasukan);
      } catch (error) {
         console.error("Error updating income", error);
      } finally {
         setIsSavingIncome(false);
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
      <div className="min-h-screen bg-white text-black">
         {/* Header */}
         <header className="border-b-4 border-black p-4 mb-4">
            <div className="container mx-auto flex justify-between items-center">
               <h1 className="text-2xl md:text-3xl font-bold">
                  Dashboard Keuangan Pribadi
               </h1>
               <button
                  onClick={logout}
                  className="px-4 py-2 border-2 border-black bg-white text-black rounded-md font-medium hover:bg-black hover:text-white transition"
               >
                  Logout
               </button>
            </div>
         </header>

         {/* Main Content */}
         <main className="container mx-auto px-4">
            {/* Pemasukan Bulanan */}
            <section className="mb-6 border-2 border-black p-4 rounded-md">
               <h2 className="text-xl font-bold mb-2">Pemasukan Bulanan</h2>
               <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                  <input
                     type="number"
                     placeholder="Masukkan pemasukan"
                     defaultValue={monthlyIncome?.amount || ""}
                     className="border-2 border-black p-2 rounded w-full sm:w-auto focus:outline-none"
                     id="monthlyIncome"
                  />
                  <button
                     onClick={handleSaveIncome}
                     disabled={isSavingIncome}
                     className={`px-4 py-2 border-2 border-black bg-white text-black rounded-md font-medium hover:bg-black hover:text-white transition ${
                        isSavingIncome ? "opacity-50 cursor-not-allowed" : ""
                     }`}
                  >
                     {isSavingIncome ? "Menyimpan..." : "Simpan"}
                  </button>
               </div>
            </section>

            {/* Editor Budget */}
            <section className="mb-6">
               <BudgetEditor
                  budgets={budgets}
                  setBudgets={setBudgets}
                  actualSpending={actualSpending}
                  monthlyIncome={monthlyIncome}
               />
            </section>

            {/* Tombol History Pengeluaran Bulanan */}
            <section className="flex flex-col md:flex-row gap-4">
               <button
                  onClick={() => setShowHistoryModal(true)}
                  className="px-4 py-2 border-2 border-black bg-white text-black rounded-md font-medium hover:bg-black hover:text-white transition"
               >
                  History Pengeluaran Bulanan
               </button>
               <button
                  onClick={handleSaveHistory}
                  className="px-4 py-2 border-2 border-black bg-white text-black rounded-md font-medium hover:bg-black hover:text-white transition"
               >
                  Simpan Pengeluaran Bulan Ini
               </button>
            </section>

            {/* Tabel Transaksi */}
            <section className="mb-6">
               <TransactionTable
                  transactions={transactions}
                  setTransactions={setTransactions}
               />
            </section>
         </main>

         {/* History Modal */}
         {showHistoryModal && (
            <HistoryModal onClose={() => setShowHistoryModal(false)} />
         )}

         {/* Footer (opsional) */}
         <footer className="border-t-2 border-black p-4 mt-6 text-center">
            <p className="text-sm">
               © {new Date().getFullYear()} Abdul Rahem Faqih
            </p>
         </footer>
      </div>
   );
};

export default Dashboard;
