import React from "react";

const TransactionTableBody = ({
   isLoadingTransactions,
   filteredTransactions,
   paginatedTransactions,
   itemsPerPage,
   currentPage,
   getCategoryProps,
   openModalForEdit,
   confirmDelete,
   transactions,
}) => {
   return (
      <tbody>
         {isLoadingTransactions ? (
            // Loading skeleton rows
            Array(5)
               .fill(0)
               .map((_, index) => (
                  <tr
                     key={`skeleton-${index}`}
                     className="dark:bg-gray-800 transition-colors duration-300"
                  >
                     <td className="py-3 px-2 border-b-3 border-r-3 border-black text-center">
                        <div className="animate-pulse h-5 bg-gray-200 dark:bg-gray-600 rounded w-6 mx-auto"></div>
                     </td>
                     <td className="py-3 px-4 border-b-3 border-r-3 border-black">
                        <div className="animate-pulse flex flex-col items-center">
                           <div className="h-5 bg-gray-200 dark:bg-gray-600 rounded w-12 mb-1"></div>
                           <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-8"></div>
                        </div>
                     </td>
                     <td className="py-3 px-4 border-b-3 border-r-3 border-black">
                        <div className="animate-pulse h-5 bg-gray-200 dark:bg-gray-600 rounded w-32"></div>
                     </td>
                     <td className="py-3 px-4 border-b-3 border-r-3 border-black">
                        <div className="animate-pulse mx-auto h-8 bg-gray-200 dark:bg-gray-600 rounded-lg w-28"></div>
                     </td>
                     <td className="py-3 px-4 border-b-3 border-r-3 border-black">
                        <div className="animate-pulse h-5 bg-gray-200 dark:bg-gray-600 rounded w-24"></div>
                     </td>
                     <td className="py-3 px-4 border-b-3 border-black">
                        <div className="flex gap-2 justify-center">
                           <div className="animate-pulse h-8 bg-gray-200 dark:bg-gray-600 rounded-lg w-14"></div>
                           <div className="animate-pulse h-8 bg-gray-200 dark:bg-gray-600 rounded-lg w-14"></div>
                        </div>
                     </td>
                  </tr>
               ))
         ) : filteredTransactions.length > 0 ? (
            paginatedTransactions.map((tx, index) => {
               const { bg, icon } = getCategoryProps(tx.category);
               // Calculate real index based on pagination
               const realIndex =
                  itemsPerPage === "all"
                     ? index + 1
                     : (currentPage - 1) * itemsPerPage + index + 1;

               return (
                  <tr
                     key={tx._id}
                     className="hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white dark:bg-gray-800 transition-colors duration-300"
                  >
                     <td className="py-3 px-2 border-b-3 border-r-3 border-black text-center font-medium">
                        {realIndex}
                     </td>
                     <td className="py-3 px-4 border-b-3 border-r-3 border-black text-center text-sm sm:text-base">
                        <div className="font-medium">
                           {new Date(tx.date).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "short",
                           })}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-300 transition-colors duration-300">
                           {new Date(tx.date).getFullYear()}
                        </div>
                     </td>
                     <td className="py-3 px-4 border-b-3 border-r-3 border-black text-sm sm:text-base">
                        {tx.name}
                     </td>
                     <td className="py-3 px-4 border-b-3 border-r-3 border-black text-sm sm:text-base">
                        <span
                           className={`px-3 py-1.5 rounded-lg inline-flex items-center gap-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] ${bg} transition-colors duration-300`}
                        >
                           <span>{icon}</span>
                           <span className="font-bold">{tx.category}</span>
                        </span>
                     </td>
                     <td className="py-3 px-4 border-b-3 border-r-3 border-black text-sm sm:text-base font-bold">
                        Rp {Number(tx.amount).toLocaleString("id-ID")}
                     </td>
                     <td className="py-3 px-4 border-b-3 border-black">
                        <div className="flex gap-2 justify-center">
                           <button
                              onClick={() => openModalForEdit(tx)}
                              className="px-3 py-1 border-2 border-black bg-blue-200 dark:bg-blue-700 text-black dark:text-white font-medium rounded-lg hover:bg-black hover:text-blue-200 dark:hover:bg-black dark:hover:text-blue-400 transition-all duration-300 shadow-sm"
                           >
                              Edit
                           </button>
                           <button
                              onClick={() => confirmDelete(tx)}
                              className="px-3 py-1 border-2 border-black bg-red-200 dark:bg-red-700 text-black dark:text-white font-medium rounded-lg hover:bg-black hover:text-red-200 dark:hover:bg-black dark:hover:text-red-400 transition-all duration-300 shadow-sm"
                           >
                              Hapus
                           </button>
                        </div>
                     </td>
                  </tr>
               );
            })
         ) : (
            <tr className="dark:bg-gray-800 dark:text-white transition-colors duration-300">
               <td
                  colSpan="6"
                  className="py-6 px-4 border-b-3 border-black text-center text-gray-500 dark:text-gray-300 transition-colors duration-300"
               >
                  {transactions.length === 0
                     ? 'Belum ada transaksi. Klik "Tambah Transaksi" untuk memulai.'
                     : "Tidak ada transaksi yang sesuai dengan kriteria pencarian."}
               </td>
            </tr>
         )}
      </tbody>
   );
};

export default TransactionTableBody;
