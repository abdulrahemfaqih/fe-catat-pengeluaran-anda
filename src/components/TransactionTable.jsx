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
      <div className="mt-6">
         <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">Transaksi Harian</h2>
            <button
               onClick={() => {
                  setEditData(null);
                  setShowModal(true);
               }}
               className="px-4 py-2 bg-blue-500 text-white rounded"
            >
               Tambah Transaksi
            </button>
         </div>
         <table className="min-w-full bg-white">
            <thead>
               <tr>
                  <th className="py-2 border">Tanggal</th>
                  <th className="py-2 border">Nama</th>
                  <th className="py-2 border">Kategori</th>
                  <th className="py-2 border">Nominal</th>
                  <th className="py-2 border">Aksi</th>
               </tr>
            </thead>
            <tbody>
               {transactions.map((tx) => (
                  <tr key={tx._id}>
                     <td className="py-2 border">
                        {new Date(tx.date).toLocaleDateString()}
                     </td>
                     <td className="py-2 border">{tx.name}</td>
                     <td className="py-2 border">{tx.category}</td>
                     <td className="py-2 border">{tx.amount}</td>
                     <td className="py-2 border">
                        <button
                           onClick={() => openModalForEdit(tx)}
                           className="px-2 py-1 bg-yellow-500 text-white rounded mr-2"
                        >
                           Edit
                        </button>
                        <button
                           onClick={() => handleDelete(tx._id)}
                           className="px-2 py-1 bg-red-500 text-white rounded"
                        >
                           Hapus
                        </button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>

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
