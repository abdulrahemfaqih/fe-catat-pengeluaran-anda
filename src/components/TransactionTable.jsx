import React, { useState, useEffect, useMemo } from "react";
import TransactionModal from "./TransactionModal";
import api from "../utils/api";
import toast from "react-hot-toast";
import TransactionDeleteConfirmation from "./TransactionDeleteConfirmation";
import ExportTransactionsPDF from "./ExportTransactionsPDF";
import ItemPerPageKeuangan from "./ItemPerPageKeuangan";
import TransactionFilter from "./TransactionFilter";
import TransactionTableHeader from "./TransactionTableHeader";
import TransactionTableBody from "./TransactionTableBody";
import ToggleFilterTransactionButton from "./ToggleFilterTransactionButton";
import TransactionPagination from "./TransactionPagination";

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

   // Update the category properties with dark mode support
   const defaultCategoryProps = {
      Makanan: {
         bg: "bg-yellow-100 dark:bg-yellow-800 dark:text-white",
         icon: "🍔",
      },
      Transportasi: {
         bg: "bg-blue-100 dark:bg-blue-800 dark:text-white",
         icon: "🚗",
      },
      Hiburan: {
         bg: "bg-pink-100 dark:bg-pink-800 dark:text-white",
         icon: "🎬",
      },
      Kesehatan: {
         bg: "bg-red-100 dark:bg-red-800 dark:text-white",
         icon: "💊",
      },
      Pendidikan: {
         bg: "bg-indigo-100 dark:bg-indigo-800 dark:text-white",
         icon: "📚",
      },
      "Kebutuhan Pribadi": {
         bg: "bg-green-100 dark:bg-green-800 dark:text-white",
         icon: "👤",
      },
      default: {
         bg: "bg-gray-100 dark:bg-gray-700 dark:text-white",
         icon: "📊",
      },
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
               <h2 className="text-2xl font-bold flex items-center gap-2 dark:text-white transition-colors duration-300">
                  <span className="inline-block p-1 bg-purple-100 rounded-md border-2 border-black">
                     📊
                  </span>
                  Transaksi Harian
               </h2>

               {/* Buttons - vertical on mobile, horizontal on larger screens */}
               <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  {/* Toggle search button */}
                <ToggleFilterTransactionButton
                     showSearchFilters={showSearchFilters}
                     setShowSearchFilters={setShowSearchFilters}

                />

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
                     className="w-full sm:w-auto px-5 py-2.5 border-3 border-black bg-yellow-200 dark:bg-yellow-600 text-black dark:text-white font-bold rounded-xl hover:bg-black hover:text-yellow-200 dark:hover:bg-black dark:hover:text-yellow-400 transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transform flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                     <span className="text-lg">➕</span>
                     <span>Tambah Transaksi</span>
                  </button>
               </div>
            </div>
         </div>

         {/* Search and Filter Controls - Enhanced Theme */}
         <TransactionFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            searchColumn={searchColumn}
            setSearchColumn={setSearchColumn}
            searchAmountOperator={searchAmountOperator}
            setSearchAmountOperator={setSearchAmountOperator}
            searchAmountValue={searchAmountValue}
            setSearchAmountValue={setSearchAmountValue}
            resetFilters={resetFilters}
            showSearchFilters={showSearchFilters}
            setShowSearchFilters={setShowSearchFilters}
            filteredTransactions={filteredTransactions}
            transactions={transactions}
            handleSearchSubmit={handleSearchSubmit}
         />

         {/* Row controls with page size */}
         <ItemPerPageKeuangan
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            filteredTransactions={filteredTransactions}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
         />
         {/* TABEL RESPONSIF */}
         <div className="overflow-x-auto rounded-xl border-3 border-black">
            <table className="min-w-full">
               <TransactionTableHeader />
               <TransactionTableBody
                  isLoadingTransactions={isLoadingTransactions}
                  filteredTransactions={filteredTransactions}
                  paginatedTransactions={paginatedTransactions}
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
                  getCategoryProps={getCategoryProps}
                  openModalForEdit={openModalForEdit}
                  confirmDelete={confirmDelete}
                  transactions={transactions}
               />
            </table>
         </div>

         {/* Enhanced Pagination Controls */}
         {totalPages > 1 && (
            <TransactionPagination
               currentPage={currentPage}
               totalPages={totalPages}
               pageNumbers={pageNumbers}
               goToPage={goToPage}
               

            />
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
