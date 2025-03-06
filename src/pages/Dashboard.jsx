import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import TransactionTable from "../components/TransactionTable";
import BudgetEditor from "../components/BudgetEditor";
import HistoryModal from "../components/HistoryModal";
import MonthlyIncomeCard from "../components/MonthlyIncomeCard";
import HistoryButtons from "../components/HistoryButtons";
import api from "../utils/api";
import Header from "../components/Header";
import WelcomeMessage from "../components/WelcomeMessage";
import toast, { Toaster } from "react-hot-toast";
import StatsCardKeuangan from "../components/StatsCardKeuangan";
import DataLoadingIndicator from "../components/DataLoadingIndicator";

const Dashboard = () => {
   const { user, logout } = useContext(AuthContext);
   const [transactions, setTransactions] = useState([]);
   const [budgets, setBudgets] = useState([]);
   const [monthlyIncome, setMonthlyIncome] = useState(null);
   const [isLoadingPengeluaran, setIsLoadingPengeluaran] = useState(false);
   const [isLoading, setIsLoading] = useState(true);

   // Add history update counter to track changes
   const [historyUpdateCounter, setHistoryUpdateCounter] = useState(0);
   const [showHistoryModal, setShowHistoryModal] = useState(false);

   // State untuk menampung total pengeluaran aktual per kategori
   // Updated with new categories
   const [actualSpending, setActualSpending] = useState({
      Makanan: 0,
      Transportasi: 0,
      Hiburan: 0,
      Kesehatan: 0,
      Pendidikan: 0,
      "Kebutuhan Pribadi": 0,
   });

   // Handler for when history is deleted
   const handleHistoryDeleted = () => {
      console.log("History deleted, updating counter");
      // Force immediate update with async function
      setTimeout(() => {
         setHistoryUpdateCounter((prev) => prev + 1);
      }, 0);
   };

   // Fetch data saat user login
   useEffect(() => {
      const fetchData = async () => {
         try {
            setIsLoading(true);
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
            toast.error("Gagal mengambil data", { duration: 3000 });
         } finally {
            setIsLoading(false);
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
            Hiburan: 0,
            Kesehatan: 0,
            Pendidikan: 0,
            "Kebutuhan Pribadi": 0,
         };

         transactions.forEach((tx) => {
            if (spending[tx.category] !== undefined) {
               spending[tx.category] += tx.amount;
            } else {
               // Handle any categories not in our predefined list
               spending[tx.category] = spending[tx.category] || 0;
               spending[tx.category] += tx.amount;
            }
         });

         setActualSpending(spending);
      } else {
         // Jika belum ada transaksi, reset ke 0
         setActualSpending({
            Makanan: 0,
            Transportasi: 0,
            Hiburan: 0,
            Kesehatan: 0,
            Pendidikan: 0,
            "Kebutuhan Pribadi": 0,
         });
      }
   }, [transactions]);

   if (!user) return null;

   return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
         <Header logout={logout} />
         <Toaster />

         <main className="container mx-auto px-4 py-8">
            {/* Welcome Message with Card Style */}
            <div className="mb-8">
               <WelcomeMessage user={user} />
            </div>

            {/* Stats Cards Row */}
            <StatsCardKeuangan
               budgets={budgets}
               actualSpending={actualSpending}
               monthlyIncome={monthlyIncome}
               isLoading={isLoading}
            />

            {/* Income and Budget Section */}
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
               {/* Monthly Income Card */}
               <MonthlyIncomeCard
                  monthlyIncome={monthlyIncome}
                  setMonthlyIncome={setMonthlyIncome}
               />

               {/* Budget Editor Card */}
               <BudgetEditor
                  budgets={budgets}
                  setBudgets={setBudgets}
                  actualSpending={actualSpending}
                  monthlyIncome={monthlyIncome}
                  isLoadingEditor={isLoading}
               />
            </div>

            {/* History Buttons - Pass historyUpdateCounter */}
            <HistoryButtons
               onOpenHistoryModal={() => setShowHistoryModal(true)}
               isLoadingPengeluaran={isLoadingPengeluaran}
               setIsLoadingPengeluaran={setIsLoadingPengeluaran}
               historyUpdated={historyUpdateCounter}
            />

            {/* Transaction Table Card */}
            <div className="rounded-xl border-4 border-black bg-white dark:bg-gray-800 p-6 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
               <TransactionTable
                  isLoadingTransactions={isLoading}
                  transactions={transactions}
                  setTransactions={setTransactions}
               />
            </div>
         </main>

         {/* History Modal - Add onDelete callback */}
         {showHistoryModal && (
            <HistoryModal
               onClose={() => setShowHistoryModal(false)}
               onDelete={handleHistoryDeleted}
            />
         )}

         <footer className="border-t-3 sm:border-t-4 border-black py-4 mt-8 bg-white dark:bg-gray-800 dark:text-white transition-colors duration-300">
            <div className="container mx-auto px-4">
               <div className="flex items-center justify-center gap-2">
                  {/* Copyright with highlight */}
                  <p className="text-sm font-bold relative inline-block">
                     <span className="relative z-10">
                        © {new Date().getFullYear()} Abdul Rahem Faqih
                     </span>
                     <span className="absolute -bottom-1 left-0 w-full h-2 bg-yellow-200 dark:bg-yellow-600 -z-0"></span>
                  </p>
               </div>
            </div>
         </footer>
      </div>
   );
};

export default Dashboard;
