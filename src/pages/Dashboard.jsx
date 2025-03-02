import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import TransactionTable from "../components/TransactionTable";
import BudgetEditor from "../components/BudgetEditor";
import HistoryModal from "../components/HistoryModal";
import api from "../utils/api";
import Header from "../components/Header";
import WelcomeMessage from "../components/WelcomeMessage";
import toast, {Toaster} from "react-hot-toast";

const Dashboard = () => {
   const { user, logout } = useContext(AuthContext);
   const [transactions, setTransactions] = useState([]);
   const [budgets, setBudgets] = useState([]);
   const [monthlyIncome, setMonthlyIncome] = useState(null);
   const [isSavingIncome, setIsSavingIncome] = useState(false);
   const [isLoadingPengeluaran, setIsLoadingPengeluaran] = useState(false);


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
            toast.error("Gagal mengambil data", {duration: 3000});
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
         toast.error("Gagal menyimpan pemasukan bulanan", {duration: 3000});
      } finally {
         setIsSavingIncome(false);
         toast.success("Pemasukan bulanan berhasil disimpan", {duration: 3000});
      }
   };

   const handleSaveHistory = async () => {
      // Simpan pengeluaran bulanan ke history
      setIsLoadingPengeluaran(true);
      try {
         const month = new Date().getMonth() + 1;
         const year = new Date().getFullYear();
         await api.post("/history", { month, year });
         toast.success("Pengeluaran bulan ini berhasil disimpan ke history", {duration: 3000});
      } catch (error) {
         console.error("Error saving history", error);
         toast.error("Gagal menyimpan pengeluaran bulan ini", {duration: 3000});
      } finally {
         setIsLoadingPengeluaran(false);
      }
   };

   if (!user) return null;



   return (
      <div className="min-h-screen bg-white text-black">
         <Header logout={logout} />
         <Toaster />

         <main className="container mx-auto px-4 py-8">
            {/* Welcome Message */}
            <div className="mb-8">
               <WelcomeMessage user={user} />
            </div>

            {/* Income and Budget Section */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
               {/* Monthly Income */}
               <section className="bg-white border-3 border-black p-6 rounded-lg shadow-sm hover:shadow-md transition-all">
                  <h2 className="text-2xl font-bold mb-4">Pemasukan Bulanan</h2>
                  <div className="flex flex-col sm:flex-row gap-4">
                     <input
                        type="number"
                        placeholder="Masukkan pemasukan"
                        defaultValue={monthlyIncome?.amount || ""}
                        className="flex-1 border-3 border-black p-2 rounded-md focus:outline-none"
                        id="monthlyIncome"
                     />
                     <button
                        onClick={handleSaveIncome}
                        disabled={isSavingIncome}
                        className="px-6 py-2 border-3 border-black bg-white text-black rounded-md font-medium hover:bg-black hover:text-white transition-all"
                     >
                        {isSavingIncome ? "Menyimpan..." : "Simpan"}
                     </button>


                  </div>

                     <div className="mt-4 bg-yellow-50 p-4 rounded-lg border-2 border-yellow-400">
                        <h3 className="font-bold text-yellow-800 mb-2">💡 Tips Penggunaan </h3>
                        <ul className="text-sm text-yellow-700 list-disc pl-4 flex flex-col gap-2">
                           <li>Set up pemasukan dan budget anda, pastikan budget harus sama dengan pemasukan, bisa di edit kapan saja</li>
                           <li>simpan pengeluaran anda pada sehari hari</li>
                           <li>gunakan fitur simpan history pengeluaran, gunakna fitur ini perbulan agar dapat melihat pengeluaran anda pada setiap bulannya</li>
                           <li>✨ Fitur baru: Managemen Wishlist, untuk menyimpan wishlist barang yang ingin di beli, buka menu diatas dan akses 🚀 </li>
                        </ul>
                     </div>

               </section>

               {/* Budget Editor */}
               <BudgetEditor
                  budgets={budgets}
                  setBudgets={setBudgets}
                  actualSpending={actualSpending}
                  monthlyIncome={monthlyIncome}
               />
            </div>

            {/* History Buttons */}
            <div className="flex justify-center gap-4 mb-8">
               <button
                  onClick={() => setShowHistoryModal(true)}
                  className="px-6 py-3 border-3 border-black bg-white text-black rounded-md font-medium hover:bg-black hover:text-white transition-all"
               >
                  History Pengeluaran Bulanan
               </button>
               <button
                  onClick={handleSaveHistory}
                  className="px-6 py-3 border-3 border-black bg-white text-black rounded-md font-medium hover:bg-black hover:text-white transition-all"
               >
                  {isLoadingPengeluaran ? "Menyimpan..." : "Simpan Pengeluaran Bulan Ini"}
               </button>
            </div>

            {/* Transaction Table */}

            <TransactionTable
               transactions={transactions}
               setTransactions={setTransactions}
            />

         </main>

         {/* History Modal */}
         {showHistoryModal && (
            <HistoryModal onClose={() => setShowHistoryModal(false)} />
         )}

         <footer className="border-t-3 border-black py-6 mt-8 text-center">
            <p className="text-sm font-bold">
               © {new Date().getFullYear()} Abdul Rahem Faqih
            </p>
         </footer>
      </div>
   );
};

export default Dashboard;
