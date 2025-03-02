import React, { useState } from "react";
import TransactionModal from "./TransactionModal";
import api from "../utils/api";
import toast from "react-hot-toast";

const TransactionTable = ({ transactions, setTransactions }) => {
   const [showModal, setShowModal] = useState(false);
   const [editData, setEditData] = useState(null);
   const [isLoading, setIsLoading] = useState(false);

   const handleDelete = async (id) => {
      setIsLoading(true);
      try {
         await api.delete(`/transactions/${id}`);
         setTransactions(transactions.filter((tx) => tx._id !== id));
         toast.success("Transaksi berhasil dihapus", { duration: 3000 });
      } catch (error) {
         console.error("Delete transaction error", error);
         toast.error("Gagal menghapus transaksi", { duration: 3000 });
      } finally {
         setIsLoading(false);
      }
   };

   const openModalForEdit = (transaction) => {
      setEditData(transaction);
      setShowModal(true);
   };

   const getCategoryProps = (category) => {
      switch (category) {
         case 'Makanan':
            return { bg: 'bg-red-200', icon: '🍔' };
         case 'Transportasi':
            return { bg: 'bg-blue-200', icon: '🚗' };
         case 'Darurat':
            return { bg: 'bg-red-300', icon: '🚨' };
         case 'Tabungan':
            return { bg: 'bg-green-200', icon: '💰' };
         default:
            return { bg: 'bg-gray-200', icon: '📝' };
      }
   };

   return (
      <>
         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 relative">
            {/* Decorative elements */}
            <div className="absolute -top-10 -left-10 w-20 h-20 bg-yellow-100 rounded-full border-3 border-black -z-10"></div>

            <h2 className="text-2xl font-bold flex items-center gap-2">
               <span className="inline-block p-1 bg-purple-100 rounded-md border-2 border-black">📊</span>
               Transaksi Harian
            </h2>

            <button
               onClick={() => {
                  setEditData(null);
                  setShowModal(true);
               }}
               className="px-5 py-2.5 border-3 border-black bg-yellow-200 text-black font-bold rounded-xl hover:bg-black hover:text-yellow-200 transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transform flex items-center gap-2"
            >
               <span className="text-lg">➕</span>
               <span>Tambah Transaksi</span>
            </button>
         </div>

         {/* TABEL RESPONSIF */}
         <div className="overflow-x-auto rounded-xl border-3 border-black">
            <table className="min-w-full">
               <thead>
                  <tr className="bg-blue-100">
                     <th className="py-3 px-4 border-b-3 border-r-3 border-black text-sm sm:text-base font-bold">
                        Tanggal
                     </th>
                     <th className="py-3 px-4 border-b-3 border-r-3 border-black text-sm sm:text-base font-bold">
                        Nama
                     </th>
                     <th className="py-3 px-4 border-b-3 border-r-3 border-black text-sm sm:text-base font-bold">
                        Kategori
                     </th>
                     <th className="py-3 px-4 border-b-3 border-r-3 border-black text-sm sm:text-base font-bold">
                        Nominal
                     </th>
                     <th className="py-3 px-4 border-b-3 border-black text-sm sm:text-base font-bold">
                        Aksi
                     </th>
                  </tr>
               </thead>
               <tbody>
                  {transactions.length > 0 ? (
                     transactions.map((tx) => {
                        const { bg, icon } = getCategoryProps(tx.category);
                        return (
                        <tr key={tx._id} className="hover:bg-gray-50">
                           <td className="py-3 px-4 border-b-3 border-r-3 border-black text-center text-sm sm:text-base">
                                 <div className="font-medium">
                                    {new Date(tx.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                 </div>
                                 <div className="text-xs text-gray-600">
                                    {new Date(tx.date).getFullYear()}
                                 </div>
                           </td>
                           <td className="py-3 px-4 border-b-3 border-r-3 border-black text-sm sm:text-base">
                              {tx.name}
                           </td>
                              <td className="py-3 px-4 border-b-3 border-r-3 border-black text-sm sm:text-base">
                                 <span className={`px-3 py-1.5 rounded-lg inline-flex items-center gap-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] ${bg}`}>
                                    <span>{icon}</span>
                                    <span className="font-bold">{tx.category}</span>
                                 </span>
                              </td>
                           <td className="py-3 px-4 border-b-3 border-r-3 border-black text-sm sm:text-base font-bold">
                              Rp {Number(tx.amount).toLocaleString('id-ID')}
                           </td>
                           <td className="py-3 px-4 border-b-3 border-black">
                              <div className="flex gap-2 justify-center">
                                 <button
                                    onClick={() => openModalForEdit(tx)}
                                    className="px-3 py-1 border-2 border-black bg-blue-200 text-black font-medium rounded-lg hover:bg-black hover:text-blue-200 transition-all duration-300 shadow-sm"
                                 >
                                    Edit
                                 </button>
                                 <button
                                    onClick={() => handleDelete(tx._id)}
                                    disabled={isLoading}
                                    className="px-3 py-1 border-2 border-black bg-red-200 text-black font-medium rounded-lg hover:bg-black hover:text-red-200 transition-all duration-300 shadow-sm"
                                 >
                                    {isLoading ? "..." : "Hapus"}
                                 </button>
                              </div>
                           </td>
                           </tr>
                        )
                     })
                  ) : (
                     <tr>
                        <td colSpan="5" className="py-6 px-4 border-b-3 border-black text-center text-gray-500">
                           Belum ada transaksi. Klik "Tambah Transaksi" untuk memulai.
                        </td>
                     </tr>
                  )}
               </tbody>
            </table>
         </div>

         {showModal && (
            <TransactionModal
               onClose={() => setShowModal(false)}
               editData={editData}
               refreshTransactions={async () => {
                  const res = await api.get("/transactions");
                  setTransactions(res.data);
               }}
            />
         )}
      </>
   );
};

export default TransactionTable;