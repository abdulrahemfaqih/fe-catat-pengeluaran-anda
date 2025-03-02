import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import TransactionTable from "../components/TransactionTable";
import BudgetEditor from "../components/BudgetEditor";
import HistoryModal from "../components/HistoryModal";
import api from "../utils/api";
import Header from "../components/Header";
import WelcomeMessage from "../components/WelcomeMessage";
import toast, { Toaster } from "react-hot-toast";

const Dashboard = () => {
   const { user, logout } = useContext(AuthContext);
   const [transactions, setTransactions] = useState([]);
   const [budgets, setBudgets] = useState([]);
   const [monthlyIncome, setMonthlyIncome] = useState(null);
   const [isSavingIncome, setIsSavingIncome] = useState(false);
   const [isLoadingPengeluaran, setIsLoadingPengeluaran] = useState(false);
   const [showHistoryModal, setShowHistoryModal] = useState(false);
   const [isLoasding, setIsLoading] = useState(true)

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
            setIsLoading(true)
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
            setIsLoading(false)
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
         toast.success("Pemasukan bulanan berhasil disimpan", { duration: 3000 });
      } catch (error) {
         console.error("Error updating income", error);
         toast.error("Gagal menyimpan pemasukan bulanan", { duration: 3000 });
      } finally {
         setIsSavingIncome(false);
      }
   };

   const handleSaveHistory = async () => {
      // Simpan pengeluaran bulanan ke history
      setIsLoadingPengeluaran(true);
      try {
         const month = new Date().getMonth() + 1;
         const year = new Date().getFullYear();
         await api.post("/history", { month, year });
         toast.success("Pengeluaran bulan ini berhasil disimpan ke history", { duration: 3000 });
      } catch (error) {
         console.error("Error saving history", error);
         toast.error("Gagal menyimpan pengeluaran bulan ini", { duration: 3000 });
      } finally {
         setIsLoadingPengeluaran(false);
      }
   };

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

            {/* Stats Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
               {/* Card 1: Total Budget */}
               <div className="relative overflow-hidden rounded-xl border-4 border-black bg-green-100 p-6 shadow-[8px_8px_0px_rgba(0,0,0,1)]">
                  <div className="absolute -top-2 -left-2 rounded-full bg-white border-4 border-black h-10 w-10 flex items-center justify-center font-bold">
                     #1
                  </div>
                  <h3 className="mt-4 text-lg font-bold">Total Budget</h3>
                  <p className="text-3xl font-bold mt-2">
                     Rp {budgets.reduce((sum, item) => sum + item.budget, 0).toLocaleString()}
                  </p>
               </div>

               {/* Card 2: Total Spending */}
               <div className="relative overflow-hidden rounded-xl border-4 border-black bg-red-100 p-6 shadow-[8px_8px_0px_rgba(0,0,0,1)]">
                  <div className="absolute -top-2 -left-2 rounded-full bg-white border-4 border-black h-10 w-10 flex items-center justify-center font-bold">
                     #2
                  </div>
                  <h3 className="mt-4 text-lg font-bold">Total Pengeluaran</h3>
                  <p className="text-3xl font-bold mt-2">
                     Rp {Object.values(actualSpending).reduce((sum, val) => sum + val, 0).toLocaleString()}
                  </p>
               </div>

               {/* Card 3: Monthly Income */}
               <div className="relative overflow-hidden rounded-xl border-4 border-black bg-blue-100 p-6 shadow-[8px_8px_0px_rgba(0,0,0,1)]">
                  <div className="absolute -top-2 -left-2 rounded-full bg-white border-4 border-black h-10 w-10 flex items-center justify-center font-bold">
                     #3
                  </div>
                  <h3 className="mt-4 text-lg font-bold">Pemasukan Bulanan</h3>
                  <p className="text-3xl font-bold mt-2">
                     Rp {monthlyIncome?.amount?.toLocaleString() || "0"}
                  </p>
               </div>
            </div>

            {/* Income and Budget Section */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
               {/* Monthly Income Card */}
               <section className="rounded-xl border-4 border-black bg-white p-6 shadow-[8px_8px_0px_rgba(0,0,0,1)] relative overflow-hidden">
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
                              defaultValue={80000}
                              className="w-full border-3 border-black p-3 pl-10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 bg-blue-50 text-lg font-medium shadow-[4px_4px_0px_rgba(0,0,0,0.1)]"
                              id="monthlyIncome"
                           />
                        </div>

                        <button
                           onClick={handleSaveIncome}
                           disabled={isSavingIncome}
                           className="px-6 py-3 border-3 border-black bg-green-100 text-black font-bold rounded-lg hover:bg-green-400 hover:text-white transition-all transform hover:-translate-y-1 shadow-[4px_4px_0px_rgba(0,0,0,1)] disabled:opacity-70"
                        >
                           {isSavingIncome ?
                              <span className="flex items-center gap-2">
                                 <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                 </svg>
                                 Menyimpan...
                              </span> :
                              <span className="flex items-center gap-2">
                                 <span>💾</span> Simpan
                              </span>
                           }
                        </button>
                     </div>

                     <div className="mt-6 bg-yellow-50 p-4 rounded-lg border-3 border-black relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-200 rounded-bl-full -mr-6 -mt-6 border-b-3 border-l-3 border-black"></div>

                        <h3 className="font-bold text-black mb-3 flex items-center gap-2 relative z-10">
                           <span className="text-xl">💡</span> Tips Penggunaan
                        </h3>

                        <ul className="text-sm text-gray-800 pl-2 flex flex-col gap-3 relative z-10">
                           <li className="flex items-start gap-2">
                              <div className="inline-block w-5 h-5 min-w-5 bg-green-200 rounded-full border-2 border-black">
                                 <div className="w-full h-full flex items-center justify-center">
                                    <span className="text-xs font-bold leading-none">1</span>
                                 </div>
                              </div>
                              <p>Set up pemasukan dan budget anda, pastikan budget harus sama dengan pemasukan, bisa di edit kapan saja</p>
                           </li>
                           <li className="flex items-start gap-2">
                              <div className="inline-block w-5 h-5 min-w-5 bg-blue-200 rounded-full border-2 border-black">
                                 <div className="w-full h-full flex items-center justify-center">
                                    <span className="text-xs font-bold leading-none">2</span>
                                 </div>
                              </div>
                              <p>Simpan pengeluaran anda pada sehari hari</p>
                           </li>
                           <li className="flex items-start gap-2">
                              <div className="inline-block w-5 h-5 min-w-5 bg-purple-200 rounded-full border-2 border-black">
                                 <div className="w-full h-full flex items-center justify-center">
                                    <span className="text-xs font-bold leading-none">3</span>
                                 </div>
                              </div>
                              <p>Gunakan fitur simpan history pengeluaran, gunakan fitur ini perbulan agar dapat melihat pengeluaran anda pada setiap bulannya</p>
                           </li>
                           <li className="flex items-start gap-2">
                              <div className="inline-block w-5 h-5 min-w-5 bg-cyan-100 rounded-full border-2 border-black">
                                 <div className="w-full h-full flex items-center justify-center">
                                    <span className="text-xs font-bold leading-none">✨</span>
                                 </div>
                              </div>
                              <p><span className="font-bold">Fitur baru:</span> Managemen Wishlist, untuk menyimpan wishlist barang yang ingin di beli, buka menu diatas dan akses 🚀</p>
                           </li>
                        </ul>
                     </div>
                  </div>
               </section>

               {/* Budget Editor Card */}
               <BudgetEditor
                  budgets={budgets}
                  setBudgets={setBudgets}
                  actualSpending={actualSpending}
                  monthlyIncome={monthlyIncome}
                  isLoadingEditor={isLoasding}
               />
            </div>

            {/* History Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
               <button
                  onClick={() => setShowHistoryModal(true)}
                  className="px-6 py-3 border-3 border-black bg-blue-100 text-black rounded-xl font-bold hover:bg-blue-400 hover:text-white transition-all transform hover:-translate-y-1 shadow-[5px_5px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2"
               >
                  <span className="text-xl">📊</span>
                  <span>History Pengeluaran Bulanan</span>
               </button>

               <button
                  onClick={handleSaveHistory}
                  className="px-6 py-3 border-3 border-black bg-green-100 text-black rounded-xl font-bold hover:bg-green-400 hover:text-white transition-all transform hover:-translate-y-1 shadow-[5px_5px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2"
               >
                  {isLoadingPengeluaran ? (
                     <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Menyimpan...</span>
                     </span>
                  ) : (
                     <span className="flex items-center gap-2">
                        <span>💾</span>
                        <span>Simpan Pengeluaran Bulan Ini</span>
                     </span>
                  )}
               </button>
            </div>

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