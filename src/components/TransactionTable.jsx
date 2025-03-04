import React, { useState, useEffect, useMemo } from "react";
import TransactionModal from "./TransactionModal";
import api from "../utils/api";
import toast from "react-hot-toast";
import TransactionDeleteConfirmation from "./TransactionDeleteConfirmation";
import ExportTransactionsPDF from "./ExportTransactionsPDF";

const TransactionTable = ({
   transactions,
   setTransactions,
   isLoadingTransactions = false,
}) => {
   const [showModal, setShowModal] = useState(false);
   const [editData, setEditData] = useState(null);
   const [isLoading, setIsLoading] = useState(false);
   const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
   const [transactionToDelete, setTransactionToDelete] = useState(null);

   // Pagination states
   const [currentPage, setCurrentPage] = useState(1);
   const [itemsPerPage, setItemsPerPage] = useState(10);
   const [paginatedTransactions, setPaginatedTransactions] = useState([]);
   const [totalPages, setTotalPages] = useState(1);
   const [showSearchFilters, setShowSearchFilters] = useState(false);

   // Search and filter states
   const [searchTerm, setSearchTerm] = useState("");
   const [searchColumn, setSearchColumn] = useState("all");
   const [searchAmountOperator, setSearchAmountOperator] = useState("equals");
   const [searchAmountValue, setSearchAmountValue] = useState("");
   const [filteredTransactions, setFilteredTransactions] = useState([]);

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

   // Filter transactions based on search criteria
   useEffect(() => {
      if (!transactions || isLoadingTransactions) return;

      let results = [...transactions];

      if (searchTerm) {
         results = transactions.filter((tx) => {
            if (searchColumn === "all") {
               // Search in all text columns
               return (
                  tx.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  tx.category
                     .toLowerCase()
                     .includes(searchTerm.toLowerCase()) ||
                  new Date(tx.date)
                     .toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                     })
                     .toLowerCase()
                     .includes(searchTerm.toLowerCase())
               );
            } else if (searchColumn === "date") {
               return new Date(tx.date)
                  .toLocaleDateString("id-ID", {
                     day: "numeric",
                     month: "short",
                     year: "numeric",
                  })
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase());
            } else if (searchColumn === "name") {
               return tx.name.toLowerCase().includes(searchTerm.toLowerCase());
            } else if (searchColumn === "category") {
               return tx.category
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase());
            }
            return true;
         });
      }

      // Apply amount filter if specified
      if (searchAmountValue && searchAmountValue !== "") {
         const amountValue = parseFloat(searchAmountValue);
         if (!isNaN(amountValue)) {
            results = results.filter((tx) => {
               const txAmount = parseFloat(tx.amount);

               switch (searchAmountOperator) {
                  case "equals":
                     return txAmount === amountValue;
                  case "greater":
                     return txAmount > amountValue;
                  case "less":
                     return txAmount < amountValue;
                  case "greaterEqual":
                     return txAmount >= amountValue;
                  case "lessEqual":
                     return txAmount <= amountValue;
                  default:
                     return true;
               }
            });
         }
      }

      setFilteredTransactions(results);
      setCurrentPage(1); // Reset to first page when search/filter changes
   }, [
      transactions,
      searchTerm,
      searchColumn,
      searchAmountOperator,
      searchAmountValue,
      isLoadingTransactions,
   ]);

   // Update paginated data when filtered transactions change or page/size changes
   useEffect(() => {
      if (filteredTransactions.length === 0) {
         setPaginatedTransactions([]);
         setTotalPages(0);
         return;
      }

      // If displaying all items
      if (itemsPerPage === "all") {
         setPaginatedTransactions(filteredTransactions);
         setTotalPages(1);
         return;
      }

      // Calculate total pages
      const calculatedTotalPages = Math.ceil(
         filteredTransactions.length / itemsPerPage
      );
      setTotalPages(calculatedTotalPages);

      // If current page is now invalid (e.g. after filtering), adjust it
      if (currentPage > calculatedTotalPages) {
         setCurrentPage(1);
         return;
      }

      // Get current transactions for display
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentTransactions = filteredTransactions.slice(
         indexOfFirstItem,
         indexOfLastItem
      );

      setPaginatedTransactions(currentTransactions);
   }, [filteredTransactions, currentPage, itemsPerPage]);

   // Initialize filtered transactions when component loads
   useEffect(() => {
      if (transactions) {
         setFilteredTransactions(transactions);
      }
   }, [transactions]);

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
      return defaultCategoryProps[categoryName] || defaultCategoryProps.default;
   };

   const goToPage = (page) => {
      if (page < 1 || page > totalPages) return;
      setCurrentPage(page);
   };

   const handleSearchSubmit = (e) => {
      e.preventDefault(); // Prevent form submission from refreshing the page
   };

   const resetFilters = () => {
      setSearchTerm("");
      setSearchColumn("all");
      setSearchAmountOperator("equals");
      setSearchAmountValue("");
   };

   // Calculate page numbers for display, show limited pages with ellipsis
   const pageNumbers = useMemo(() => {
      if (totalPages <= 7) {
         return Array.from({ length: totalPages }, (_, i) => i + 1);
      }

      // Always show first and last page
      // Show 2 pages before and after current page
      const pages = [1];

      if (currentPage > 3) {
         pages.push("...");
      }

      // Add pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
         pages.push(i);
      }

      if (currentPage < totalPages - 2) {
         pages.push("...");
      }

      if (totalPages > 1) {
         pages.push(totalPages);
      }

      return pages;
   }, [currentPage, totalPages]);

   return (
      <>
         <div className="flex flex-col gap-4 mb-6 relative">
            {/* Decorative elements */}
            <div className="absolute -top-10 -left-10 w-20 h-20 bg-yellow-100 rounded-full border-3 border-black -z-10"></div>

            {/* Title and buttons section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
               {/* Title - full width on mobile */}
               <h2 className="text-2xl font-bold flex items-center gap-2">
                  <span className="inline-block p-1 bg-purple-100 rounded-md border-2 border-black">
                     📊
                  </span>
                  Transaksi Harian
               </h2>

               {/* Buttons - vertical on mobile, horizontal on larger screens */}
               <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  {/* Toggle search button */}
                  <button
                     onClick={() => setShowSearchFilters(!showSearchFilters)}
                     className="sm:hidden px-3 py-2.5 border-3 border-black bg-blue-200 text-black font-bold rounded-xl hover:bg-black hover:text-blue-200 transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2"
                  >
                     <span className="text-lg">🔍</span>
                     <span>{showSearchFilters ? "Sembunyikan Filter" : "Tampilkan Filter"}</span>
                  </button>

                  {/* Export PDF button */}
                  <div className="w-full sm:w-auto">
                     <ExportTransactionsPDF
                        transactions={transactions}
                        filteredTransactions={filteredTransactions}
                     />
                  </div>

                  {/* Add Transaction button */}
                  <button
                     onClick={() => {
                        setEditData(null);
                        setShowModal(true);
                     }}
                     disabled={isLoadingTransactions}
                     className="w-full sm:w-auto px-5 py-2.5 border-3 border-black bg-yellow-200 text-black font-bold rounded-xl hover:bg-black hover:text-yellow-200 transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transform flex items-center justify-center gap-2"
                  >
                     <span className="text-lg">➕</span>
                     <span>Tambah Transaksi</span>
                  </button>
               </div>
            </div>
         </div>

         {/* Search and Filter Controls */}
         {/* Search and Filter Controls - Enhanced Theme */}
         <div
            className={`mb-6 border-3 border-black rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 shadow-[6px_6px_0px_rgba(0,0,0,1)] overflow-hidden transition-all duration-300 transform ${!showSearchFilters ? "hidden sm:block" : "block"
               }`}
         >
            <div className="bg-blue-200 px-4 py-3 border-b-3 border-black flex items-center justify-between">
               <h3 className="font-bold text-lg flex items-center">
                  <span className="bg-white p-1 rounded-lg border-2 border-black mr-2 shadow-[2px_2px_0px_rgba(0,0,0,0.3)]">
                     🔍
                  </span>
                  Filter Transaksi
               </h3>
               <button
                  onClick={() => setShowSearchFilters(!showSearchFilters)}
                  className="sm:hidden px-2 py-1 border-2 border-black bg-white rounded-lg hover:bg-black hover:text-white transition-colors"
               >
                  {showSearchFilters ? "❌ Tutup" : "🔍 Buka"}
               </button>
            </div>

            <div className="p-5">
               <form onSubmit={handleSearchSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                     {/* Text Search - Enhanced */}
                     <div className="bg-white border-3 border-black rounded-xl p-4 shadow-[4px_4px_0px_rgba(0,0,0,0.2)]">
                        <h4 className="font-bold text-sm uppercase mb-3 flex items-center">
                           <span className="bg-yellow-100 p-1 rounded-lg border-2 border-black mr-2">
                              📝
                           </span>
                           Cari Transaksi
                        </h4>
                        <div className="flex flex-col md:flex-row gap-3">
                           <div className="flex-1">
                              <label
                                 htmlFor="searchTerm"
                                 className="block mb-1 font-medium text-sm"
                              >
                                 Kata Kunci
                              </label>
                              <div className="relative">
                                 <input
                                    type="text"
                                    id="searchTerm"
                                    value={searchTerm}
                                    onChange={(e) =>
                                       setSearchTerm(e.target.value)
                                    }
                                    className="w-full border-2 border-black rounded-lg p-2 pl-9 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-[2px_2px_0px_rgba(0,0,0,1)] h-10"
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
                                 className="block mb-1 font-medium text-sm"
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
                                    className="w-full border-2 appearance-none border-black rounded-lg p-2 pl-8 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-[2px_2px_0px_rgba(0,0,0,1)] bg-white h-10"
                                 >
                                    <option value="all">Semua Kolom</option>
                                    <option value="date">Tanggal</option>
                                    <option value="name">Nama</option>
                                    <option value="category">Kategori</option>
                                 </select>
                                 <span className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                                    📋
                                 </span>
                                 <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                    ▼
                                 </span>
                              </div>
                           </div>
                        </div>
                     </div>
                     {/* Amount Filter - Enhanced */}
                     <div className="bg-white border-3 border-black rounded-xl p-4 shadow-[4px_4px_0px_rgba(0,0,0,0.2)]">
                        <h4 className="font-bold text-sm uppercase mb-3 flex items-center">
                           <span className="bg-green-100 p-1 rounded-lg border-2 border-black mr-2">
                              💰
                           </span>
                           Filter Nominal
                        </h4>
                        <div className="flex flex-col md:flex-row gap-3">
                           <div className="md:w-1/3">
                              <label
                                 htmlFor="amountOperator"
                                 className="block mb-1 font-medium text-sm"
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
                                    className="w-full border-2 appearance-none border-black rounded-lg p-2 pl-8 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-[2px_2px_0px_rgba(0,0,0,1)] bg-white h-10"
                                 >
                                    <option value="equals">
                                       Sama dengan (=)
                                    </option>
                                    <option value="greater">
                                       Lebih dari (&gt;)
                                    </option>
                                    <option value="less">
                                       Kurang dari (&lt;)
                                    </option>
                                    <option value="greaterEqual">
                                       Minimal (≥)
                                    </option>
                                    <option value="lessEqual">
                                       Maksimal (≤)
                                    </option>
                                 </select>
                                 <span className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                                    ⚙️
                                 </span>
                                 <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                    ▼
                                 </span>
                              </div>
                           </div>
                           <div className="flex-1">
                              <label
                                 htmlFor="amountValue"
                                 className="block mb-1 font-medium text-sm"
                              >
                                 Nilai Nominal
                              </label>
                              <div className="relative">
                                 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 font-medium">
                                    Rp
                                 </span>
                                 <input
                                    type="number"
                                    id="amountValue"
                                    value={searchAmountValue}
                                    onChange={(e) =>
                                       setSearchAmountValue(e.target.value)
                                    }
                                    className="w-full border-2 border-black rounded-lg p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-[2px_2px_0px_rgba(0,0,0,1)] h-10"
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
                        className="px-5 py-2 border-3 border-black bg-white text-black font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] flex items-center gap-2"
                     >
                        <span>🔄</span>
                        Reset Filter
                     </button>

                     <button
                        type="submit"
                        className="px-5 py-2 border-3 border-black bg-blue-200 text-black font-bold rounded-xl hover:bg-blue-300 transition-colors shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] flex items-center gap-2"
                     >
                        <span>🔎</span>
                        Terapkan Filter
                     </button>
                  </div>
               </form>

               {filteredTransactions.length !== transactions.length && (
                  <div className="mt-4 px-4 py-3 bg-gradient-to-r from-yellow-100 to-yellow-50 border-2 border-yellow-500 rounded-lg text-sm flex items-center">
                     <span className="font-bold mr-2 bg-white p-1 border-2 border-yellow-500 rounded-md">
                        📋
                     </span>
                     <span>
                        <span className="font-bold">
                           {filteredTransactions.length} dari{" "}
                           {transactions.length}
                        </span>{" "}
                        transaksi sesuai filter yang diterapkan
                     </span>
                  </div>
               )}
            </div>
         </div>
         {/* Row controls with page size */}

         {/* Row controls with page size */}
         <div className="mb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
            <div className="flex items-center space-x-2">
               <span className="text-sm font-medium">Tampilkan:</span>
               <select
                  value={itemsPerPage}
                  onChange={(e) => {
                     setItemsPerPage(
                        e.target.value === "all"
                           ? "all"
                           : parseInt(e.target.value)
                     );
                     setCurrentPage(1);
                  }}
                  className="border-2 border-black rounded-lg px-2 py-1 focus:outline-none shadow-[2px_2px_0px_rgba(0,0,0,1)] bg-white text-sm"
               >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                  <option value="all">Semua</option>
               </select>
            </div>

            {/* Showing info */}
            {filteredTransactions.length > 0 && (
               <div className="text-sm text-gray-600">
                  {itemsPerPage === "all"
                     ? `Menampilkan semua ${filteredTransactions.length} transaksi`
                     : `Menampilkan ${Math.min(
                          (currentPage - 1) * itemsPerPage + 1,
                          filteredTransactions.length
                       )} - ${Math.min(
                          currentPage * itemsPerPage,
                          filteredTransactions.length
                       )} dari ${filteredTransactions.length} transaksi`}
               </div>
            )}
         </div>
         {/* TABEL RESPONSIF */}
         <div className="overflow-x-auto rounded-xl border-3 border-black">
            <table className="min-w-full">
               <thead>
                  <tr className="bg-blue-100">
                     <th className="py-3 px-2 border-b-3 border-r-3 border-black text-sm sm:text-base font-bold w-12">
                        No
                     </th>
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
                              <td className="py-3 px-2 border-b-3 border-r-3 border-black text-center">
                                 <div className="animate-pulse h-5 bg-gray-200 rounded w-6 mx-auto"></div>
                              </td>
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
                  ) : filteredTransactions.length > 0 ? (
                     paginatedTransactions.map((tx, index) => {
                        const { bg, icon } = getCategoryProps(tx.category);
                        // Calculate real index based on pagination
                        const realIndex =
                           itemsPerPage === "all"
                              ? index + 1
                              : (currentPage - 1) * itemsPerPage + index + 1;

                        return (
                           <tr key={tx._id} className="hover:bg-gray-50">
                              <td className="py-3 px-2 border-b-3 border-r-3 border-black text-center font-medium">
                                 {realIndex}
                              </td>
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
                           colSpan="6"
                           className="py-6 px-4 border-b-3 border-black text-center text-gray-500"
                        >
                           {transactions.length === 0
                              ? 'Belum ada transaksi. Klik "Tambah Transaksi" untuk memulai.'
                              : "Tidak ada transaksi yang sesuai dengan kriteria pencarian."}
                        </td>
                     </tr>
                  )}
               </tbody>
            </table>
         </div>
         {/* Enhanced Pagination Controls */}
         {totalPages > 1 && (
            <div className="flex justify-center items-center mt-6 gap-2">
               <button
                  onClick={() => goToPage(1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-2 border-2 border-black rounded-lg font-bold ${
                     currentPage === 1
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-white hover:bg-blue-100 transition"
                  }`}
                  aria-label="First Page"
               >
                  «
               </button>
               <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-2 border-2 border-black rounded-lg font-bold ${
                     currentPage === 1
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-white hover:bg-blue-100 transition"
                  }`}
                  aria-label="Previous Page"
               >
                  ◀
               </button>

               <div className="flex gap-2 overflow-x-auto max-w-[300px] px-2">
                  {pageNumbers.map((page, index) =>
                     page === "..." ? (
                        <span
                           key={`ellipsis-${index}`}
                           className="w-10 h-10 flex items-center justify-center"
                        >
                           ...
                        </span>
                     ) : (
                        <button
                           key={page}
                           onClick={() => goToPage(page)}
                           className={`w-10 h-10 flex items-center justify-center border-2 border-black rounded-lg font-bold ${
                              currentPage === page
                                 ? "bg-blue-400 text-white"
                                 : "bg-white hover:bg-blue-100 transition"
                           }`}
                        >
                           {page}
                        </button>
                     )
                  )}
               </div>

               <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-2 border-2 border-black rounded-lg font-bold ${
                     currentPage === totalPages
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-white hover:bg-blue-100 transition"
                  }`}
                  aria-label="Next Page"
               >
                  ▶
               </button>
               <button
                  onClick={() => goToPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-2 border-2 border-black rounded-lg font-bold ${
                     currentPage === totalPages
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-white hover:bg-blue-100 transition"
                  }`}
                  aria-label="Last Page"
               >
                  »
               </button>
            </div>
         )}
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
