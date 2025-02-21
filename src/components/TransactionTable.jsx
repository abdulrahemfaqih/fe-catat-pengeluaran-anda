import React, { useState } from "react";
import TransactionModal from "./TransactionModal";
import api from "../utils/api";

const TransactionTable = ({ transactions, setTransactions }) => {
   const [showModal, setShowModal] = useState(false);
   const [editData, setEditData] = useState(null);

   const handleDelete = async (id) => {
      try {
         await api.delete(`/transactions/${id}`);
         setTransactions(transactions.filter((tx) => tx._id !== id));
      } catch (error) {
         console.error("Delete transaction error", error);
      }
   };

   const openModalForEdit = (transaction) => {
      setEditData(transaction);
      setShowModal(true);
   };

   return (
      <div className="mt-6 border-2 border-black p-4 rounded-md">
         <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold">Transaksi Harian</h2>
            <button
               onClick={() => {
                  setEditData(null);
                  setShowModal(true);
               }}
               className="px-4 py-2 border-2 border-black bg-white text-black font-medium rounded-md hover:bg-black hover:text-white transition"
            >
               Tambah Transaksi
            </button>
         </div>

         {/* TABEL RESPONSIF */}
         <div className="overflow-x-auto">
            <table className="min-w-full border-2 border-black">
               <thead>
                  <tr className="bg-gray-100">
                     <th className="py-2 px-2 border-2 border-black text-sm sm:text-base">
                        Tanggal
                     </th>
                     <th className="py-2 px-2 border-2 border-black text-sm sm:text-base">
                        Nama
                     </th>
                     <th className="py-2 px-2 border-2 border-black text-sm sm:text-base">
                        Kategori
                     </th>
                     <th className="py-2 px-2 border-2 border-black text-sm sm:text-base">
                        Nominal
                     </th>
                     <th className="py-2 px-2 border-2 border-black text-sm sm:text-base">
                        Aksi
                     </th>
                  </tr>
               </thead>
               <tbody>
                  {transactions.map((tx) => (
                     <tr key={tx._id} className="hover:bg-gray-50">
                        <td className="py-2 px-2 border-2 border-black text-center text-sm sm:text-base">
                           {new Date(tx.date).toLocaleDateString()}
                        </td>
                        <td className="py-2 px-2 border-2 border-black text-sm sm:text-base">
                           {tx.name}
                        </td>
                        <td className="py-2 px-2 border-2 border-black text-sm sm:text-base">
                           {tx.category}
                        </td>
                        <td className="py-2 px-2 border-2 border-black text-sm sm:text-base">
                           {tx.amount}
                        </td>
                        <td className="py-2 px-2 border-2 border-black">
                           {/* TOMBOL ACTION DIBUAT LEBIH RESPONSIF */}
                           <div className="flex  gap-2 justify-center">
                              <button
                                 onClick={() => openModalForEdit(tx)}
                                 className="px-2 py-1 border-2 border-black bg-white text-black font-medium rounded-md hover:bg-black hover:text-white transition"
                              >
                                 Edit
                              </button>
                              <button
                                 onClick={() => handleDelete(tx._id)}
                                 className="px-2 py-1 border-2 border-black bg-white text-black font-medium rounded-md hover:bg-black hover:text-white transition"
                              >
                                 Hapus
                              </button>
                           </div>
                        </td>
                     </tr>
                  ))}
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
      </div>
   );
};

export default TransactionTable;
