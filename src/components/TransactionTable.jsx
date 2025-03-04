import React, { useState } from "react";
import TransactionModal from "./TransactionModal";
import api from "../utils/api";
import toast from "react-hot-toast";
import TransactionDeleteConfirmation from "./TransactionDeleteConfirmation";

const TransactionTable = ({
   transactions,
   setTransactions,
   isLoadingTransactions = false,
}) => {
   const [showModal, setShowModal] = useState(false);
   const [editData, setEditData] = useState(null);
   const [isLoading, setIsLoading] = useState(false);
   // Add these new states for the delete confirmation
   const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
   const [transactionToDelete, setTransactionToDelete] = useState(null);

   // Static category properties
   const defaultCategoryProps = {
      Makanan: { bg: "bg-yellow-100", icon: "🍔" },
      Transportasi: { bg: "bg-blue-100", icon: "🚗" },
      Hiburan: { bg: "bg-pink-100", icon: "🎬" },
      Kesehatan: { bg: "bg-red-100", icon: "💊" },
      Pendidikan: { bg: "bg-indigo-100", icon: "📚" },
      "Kebutuhan Pribadi": { bg: "bg-green-100", icon: "👤" },
      default: { bg: "bg-gray-100", icon: "📊" },
   };

   // New function to open delete confirmation
   const confirmDelete = (transaction) => {
      setTransactionToDelete(transaction);
      setShowDeleteConfirmation(true);
   };

   const handleDelete = async () => {
      if (!transactionToDelete) return;

      setIsLoading(true);
      try {
         await api.delete(`/transactions/${transactionToDelete._id}`);
         setTransactions(
            transactions.filter((tx) => tx._id !== transactionToDelete._id)
         );
         toast.success("Transaksi berhasil dihapus", { duration: 3000 });
      } catch (error) {
         console.error("Delete transaction error", error);
         toast.error("Gagal menghapus transaksi", { duration: 3000 });
      } finally {
         setIsLoading(false);
         setShowDeleteConfirmation(false);
         setTransactionToDelete(null);
      }
   };

   const openModalForEdit = (transaction) => {
      setEditData(transaction);
      setShowModal(true);
   };

   const getCategoryProps = (categoryName) => {
      // Simply use the static mapping or default
      return defaultCategoryProps[categoryName] || defaultCategoryProps.default;
   };

   return (
      <>
         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 relative">
            {/* Decorative elements */}
            <div className="absolute -top-10 -left-10 w-20 h-20 bg-yellow-100 rounded-full border-3 border-black -z-10"></div>

            <h2 className="text-2xl font-bold flex items-center gap-2">
               <span className="inline-block p-1 bg-purple-100 rounded-md border-2 border-black">
                  📊
               </span>
               Transaksi Harian
            </h2>

            <button
               onClick={() => {
                  setEditData(null);
                  setShowModal(true);
               }}
               disabled={isLoadingTransactions}
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
                  {isLoadingTransactions ? (
                     // Loading skeleton rows
                     Array(5)
                        .fill(0)
                        .map((_, index) => (
                           <tr key={`skeleton-${index}`}>
                              <td className="py-3 px-4 border-b-3 border-r-3 border-black">
                                 <div className="animate-pulse flex flex-col items-center">
                                    <div className="h-5 bg-gray-200 rounded w-12 mb-1"></div>
                                    <div className="h-3 bg-gray-200 rounded w-8"></div>
                                 </div>
                              </td>
                              <td className="py-3 px-4 border-b-3 border-r-3 border-black">
                                 <div className="animate-pulse h-5 bg-gray-200 rounded w-32"></div>
                              </td>
                              <td className="py-3 px-4 border-b-3 border-r-3 border-black">
                                 <div className="animate-pulse mx-auto h-8 bg-gray-200 rounded-lg w-28"></div>
                              </td>
                              <td className="py-3 px-4 border-b-3 border-r-3 border-black">
                                 <div className="animate-pulse h-5 bg-gray-200 rounded w-24"></div>
                              </td>
                              <td className="py-3 px-4 border-b-3 border-black">
                                 <div className="flex gap-2 justify-center">
                                    <div className="animate-pulse h-8 bg-gray-200 rounded-lg w-14"></div>
                                    <div className="animate-pulse h-8 bg-gray-200 rounded-lg w-14"></div>
                                 </div>
                              </td>
                           </tr>
                        ))
                  ) : transactions.length > 0 ? (
                     transactions.map((tx) => {
                        const { bg, icon } = getCategoryProps(tx.category);
                        return (
                           <tr key={tx._id} className="hover:bg-gray-50">
                              <td className="py-3 px-4 border-b-3 border-r-3 border-black text-center text-sm sm:text-base">
                                 <div className="font-medium">
                                    {new Date(tx.date).toLocaleDateString(
                                       "id-ID",
                                       { day: "numeric", month: "short" }
                                    )}
                                 </div>
                                 <div className="text-xs text-gray-600">
                                    {new Date(tx.date).getFullYear()}
                                 </div>
                              </td>
                              <td className="py-3 px-4 border-b-3 border-r-3 border-black text-sm sm:text-base">
                                 {tx.name}
                              </td>
                              <td className="py-3 px-4 border-b-3 border-r-3 border-black text-sm sm:text-base">
                                 <span
                                    className={`px-3 py-1.5 rounded-lg inline-flex items-center gap-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] ${bg}`}
                                 >
                                    <span>{icon}</span>
                                    <span className="font-bold">
                                       {tx.category}
                                    </span>
                                 </span>
                              </td>
                              <td className="py-3 px-4 border-b-3 border-r-3 border-black text-sm sm:text-base font-bold">
                                 Rp {Number(tx.amount).toLocaleString("id-ID")}
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
                                       onClick={() => confirmDelete(tx)}
                                       className="px-3 py-1 border-2 border-black bg-red-200 text-black font-medium rounded-lg hover:bg-black hover:text-red-200 transition-all duration-300 shadow-sm"
                                    >
                                       Hapus
                                    </button>
                                 </div>
                              </td>
                           </tr>
                        );
                     })
                  ) : (
                     <tr>
                        <td
                           colSpan="5"
                           className="py-6 px-4 border-b-3 border-black text-center text-gray-500"
                        >
                           Belum ada transaksi. Klik "Tambah Transaksi" untuk
                           memulai.
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

         {/* Add the delete confirmation modal */}
         <TransactionDeleteConfirmation
            isOpen={showDeleteConfirmation}
            onClose={() => setShowDeleteConfirmation(false)}
            onConfirm={handleDelete}
            transactionName={transactionToDelete?.name}
            transactionAmount={transactionToDelete?.amount}
            isLoading={isLoading}
         />
      </>
   );
};

export default TransactionTable;
