import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import TransactionTable from "../components/TransactionTable";
import BudgetEditor from "../components/BudgetEditor";
import HistoryModal from "../components/HistoryModal";
import MonthlyIncomeCard from "../components/MonthlyIncomeCard";
import HistoryButtons from "../components/HistoryButtons"; // Import the new component
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
   const [showHistoryModal, setShowHistoryModal] = useState(false);
   const [isLoasding, setIsLoading] = useState(true);

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

   if (!user) return null;

   return (
      <div className="min-h-screen bg-gray-50">
         <Header logout={logout} />
         <Toaster />

         <main className="container mx-auto px-4 py-8">
            {/* Welcome Message with Card Style */}
            <div className="mb-8">
               <WelcomeMessage user={user} />
            </div>

            <DataLoadingIndicator isLoading={isLoasding}/>

            {/* Stats Cards Row */}
            <StatsCardKeuangan
               budgets={budgets}
               actualSpending={actualSpending}
               monthlyIncome={monthlyIncome}
               isLoading={isLoasding}
            />

            {/* Income and Budget Section */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
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
                  isLoadingEditor={isLoasding}
               />
            </div>

            {/* History Buttons - Now a separate component */}
            <HistoryButtons
               onOpenHistoryModal={() => setShowHistoryModal(true)}
               isLoadingPengeluaran={isLoadingPengeluaran}
               setIsLoadingPengeluaran={setIsLoadingPengeluaran}
            />

            {/* Transaction Table Card */}
            <div className="rounded-xl border-4 border-black bg-white p-6 shadow-[8px_8px_0px_rgba(0,0,0,1)]">
               <TransactionTable
                  isLoadingTransactions={isLoasding}
                  transactions={transactions}
                  setTransactions={setTransactions}
               />
            </div>
         </main>

         {/* History Modal */}
         {showHistoryModal && (
            <HistoryModal onClose={() => setShowHistoryModal(false)} />
         )}

         <footer className="border-t-4 border-black py-6 mt-8 text-center">
            <p className="text-sm font-bold">
               © {new Date().getFullYear()} Abdul Rahem Faqih
            </p>
         </footer>
      </div>
   );
};

export default Dashboard;