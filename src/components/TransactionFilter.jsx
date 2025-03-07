import React from "react";

const TransactionFilter = ({
   searchTerm,
   setSearchTerm,
   searchColumn,
   setSearchColumn,
   searchAmountOperator,
   setSearchAmountOperator,
   searchAmountValue,
   setSearchAmountValue,
   resetFilters,
   showSearchFilters,
   setShowSearchFilters,
   filteredTransactions,
   transactions,
   handleSearchSubmit,
}) => {
   return (
      <div
         className={`mb-6 border-3 border-black rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 dark:text-white shadow-[6px_6px_0px_rgba(0,0,0,1)] overflow-hidden transition-all duration-300 transform ${
            !showSearchFilters ? "hidden sm:block" : "block"
         }`}
      >
         <div className="bg-blue-200 dark:bg-blue-800 px-4 py-3 border-b-3 border-black flex items-center justify-between transition-colors duration-300">
            <h3 className="font-bold text-lg flex items-center">
               <span className="bg-white dark:bg-gray-700 p-1 rounded-lg border-2 border-black mr-2 shadow-[2px_2px_0px_rgba(0,0,0,0.3)] transition-colors duration-300">
                  🔍
               </span>
               Filter Transaksi
            </h3>
            <button
               onClick={() => setShowSearchFilters(!showSearchFilters)}
               className="sm:hidden px-2 py-1 border-2 border-black bg-white dark:bg-gray-700 dark:text-white rounded-lg hover:bg-black hover:text-white dark:hover:bg-gray-900 transition-colors duration-300"
            >
               {showSearchFilters ? "❌ Tutup" : "🔍 Buka"}
            </button>
         </div>

         <div className="p-5">
            <form onSubmit={handleSearchSubmit} className="space-y-5">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Text Search - Enhanced */}
                  <div className="bg-white dark:bg-gray-800 border-3 border-black rounded-xl p-4 shadow-[4px_4px_0px_rgba(0,0,0,0.2)] transition-colors duration-300">
                     <h4 className="font-bold text-sm uppercase mb-3 flex items-center">
                        <span className="bg-yellow-100 dark:bg-yellow-800 p-1 rounded-lg border-2 border-black mr-2 transition-colors duration-300">
                           📝
                        </span>
                        Cari Transaksi
                     </h4>
                     <div className="flex flex-col md:flex-row gap-3">
                        <div className="flex-1">
                           <label
                              htmlFor="searchTerm"
                              className="block mb-1 font-medium text-sm dark:text-gray-200 transition-colors duration-300"
                           >
                              Kata Kunci
                           </label>
                           <div className="relative">
                              <input
                                 type="text"
                                 id="searchTerm"
                                 value={searchTerm}
                                 onChange={(e) => setSearchTerm(e.target.value)}
                                 className="w-full border-2 border-black rounded-lg p-2 pl-9 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-[2px_2px_0px_rgba(0,0,0,1)] h-10 bg-white dark:bg-gray-700 text-black dark:text-white transition-colors duration-300"
                                 placeholder="Cari transaksi..."
                              />
                              <span className="absolute left-3 top-1/2 -translate-y-1/2">
                                 🔍
                              </span>
                           </div>
                        </div>
                        <div className="md:w-1/3">
                           <label
                              htmlFor="searchColumn"
                              className="block mb-1 font-medium text-sm dark:text-gray-200 transition-colors duration-300"
                           >
                              Cari Di
                           </label>
                           <div className="relative">
                              <select
                                 id="searchColumn"
                                 value={searchColumn}
                                 onChange={(e) =>
                                    setSearchColumn(e.target.value)
                                 }
                                 className="w-full border-2 appearance-none border-black rounded-lg p-2 pl-8 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-[2px_2px_0px_rgba(0,0,0,1)] bg-white dark:bg-gray-700 text-black dark:text-white h-10 transition-colors duration-300"
                              >
                                 <option value="all">Semua Kolom</option>
                                 <option value="date">Tanggal</option>
                                 <option value="name">Nama</option>
                                 <option value="category">Kategori</option>
                              </select>
                              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                                 📋
                              </span>
                              <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none dark:text-white transition-colors duration-300">
                                 ▼
                              </span>
                           </div>
                        </div>
                     </div>
                  </div>
                  {/* Amount Filter - Enhanced */}
                  <div className="bg-white dark:bg-gray-800 border-3 border-black rounded-xl p-4 shadow-[4px_4px_0px_rgba(0,0,0,0.2)] transition-colors duration-300">
                     <h4 className="font-bold text-sm uppercase mb-3 flex items-center">
                        <span className="bg-green-100 dark:bg-green-800 p-1 rounded-lg border-2 border-black mr-2 transition-colors duration-300">
                           💰
                        </span>
                        Filter Nominal
                     </h4>
                     <div className="flex flex-col md:flex-row gap-3">
                        <div className="md:w-1/3">
                           <label
                              htmlFor="amountOperator"
                              className="block mb-1 font-medium text-sm dark:text-gray-200 transition-colors duration-300"
                           >
                              Operator
                           </label>
                           <div className="relative">
                              <select
                                 id="amountOperator"
                                 value={searchAmountOperator}
                                 onChange={(e) =>
                                    setSearchAmountOperator(e.target.value)
                                 }
                                 className="w-full border-2 appearance-none border-black rounded-lg p-2 pl-8 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-[2px_2px_0px_rgba(0,0,0,1)] bg-white dark:bg-gray-700 text-black dark:text-white h-10 transition-colors duration-300"
                              >
                                 <option value="equals">Sama dengan (=)</option>
                                 <option value="greater">
                                    Lebih dari (&gt;)
                                 </option>
                                 <option value="less">
                                    Kurang dari (&lt;)
                                 </option>
                                 <option value="greaterEqual">
                                    Minimal (≥)
                                 </option>
                                 <option value="lessEqual">Maksimal (≤)</option>
                              </select>
                              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                                 ⚙️
                              </span>
                              <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none dark:text-white transition-colors duration-300">
                                 ▼
                              </span>
                           </div>
                        </div>
                        <div className="flex-1">
                           <label
                              htmlFor="amountValue"
                              className="block mb-1 font-medium text-sm dark:text-gray-200 transition-colors duration-300"
                           >
                              Nilai Nominal
                           </label>
                           <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-300 font-medium transition-colors duration-300">
                                 Rp
                              </span>
                              <input
                                 type="number"
                                 id="amountValue"
                                 value={searchAmountValue}
                                 onChange={(e) =>
                                    setSearchAmountValue(e.target.value)
                                 }
                                 className="w-full border-2 border-black rounded-lg p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-[2px_2px_0px_rgba(0,0,0,1)] h-10 bg-white dark:bg-gray-700 text-black dark:text-white transition-colors duration-300"
                                 placeholder="Contoh: 50000"
                              />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Action Buttons */}
               <div className="flex flex-wrap gap-3 justify-end mt-2">
                  <button
                     type="button"
                     onClick={resetFilters}
                     className="px-5 py-2 border-3 border-black bg-white dark:bg-gray-700 text-black dark:text-white font-bold rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] flex items-center gap-2"
                  >
                     <span>🔄</span>
                     Reset Filter
                  </button>
               </div>
            </form>

            {filteredTransactions.length !== transactions.length && (
               <div className="mt-4 px-4 py-3 bg-gradient-to-r from-yellow-100 to-yellow-50 dark:from-yellow-800 dark:to-yellow-900 dark:text-white border-2 border-yellow-500 dark:border-yellow-600 rounded-lg text-sm flex items-center transition-colors duration-300">
                  <span className="font-bold mr-2 bg-white dark:bg-gray-700 p-1 border-2 border-yellow-500 dark:border-yellow-600 rounded-md transition-colors duration-300">
                     📋
                  </span>
                  <span>
                     <span className="font-bold">
                        {filteredTransactions.length} dari {transactions.length}
                     </span>{" "}
                     transaksi sesuai filter yang diterapkan
                  </span>
               </div>
            )}
         </div>
      </div>
   );
};

export default TransactionFilter;
