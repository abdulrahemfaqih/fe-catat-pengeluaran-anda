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
import { Plus } from "lucide-react";

const TransactionTable = ({
   transactions = [],
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

   // Filter transactions based on search criteria
   useEffect(() => {
      if (!transactions || isLoadingTransactions) return;

      let results = [...transactions];

      if (searchTerm) {
         results = results.filter((tx) => {
            if (searchColumn === "all") {
               return (
                  (tx.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
                  (tx.category || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
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
               return (tx.name || "").toLowerCase().includes(searchTerm.toLowerCase());
            } else if (searchColumn === "category") {
               return (tx.category || "")
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase());
            }
            return true;
         });
      }

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
      setCurrentPage(1);
   }, [
      transactions,
      searchTerm,
      searchColumn,
      searchAmountOperator,
      searchAmountValue,
      isLoadingTransactions,
   ]);

   // Paginate
   useEffect(() => {
      if (filteredTransactions.length === 0) {
         setPaginatedTransactions([]);
         setTotalPages(0);
         return;
      }

      if (itemsPerPage === "all") {
         setPaginatedTransactions(filteredTransactions);
         setTotalPages(1);
         return;
      }

      const calculatedTotalPages = Math.ceil(
         filteredTransactions.length / itemsPerPage
      );
      setTotalPages(calculatedTotalPages);

      if (currentPage > calculatedTotalPages) {
         setCurrentPage(1);
         return;
      }

      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentTransactions = filteredTransactions.slice(
         indexOfFirstItem,
         indexOfLastItem
      );

      setPaginatedTransactions(currentTransactions);
   }, [filteredTransactions, currentPage, itemsPerPage]);

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
         toast.success("TRANSAKSI BERHASIL DIHAPUS");
      } catch (error) {
         console.error("Delete transaction error", error);
         toast.error("GAGAL MENGHAPUS TRANSAKSI");
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

   const goToPage = (page) => {
      if (page < 1 || page > totalPages) return;
      setCurrentPage(page);
   };

   const handleSearchSubmit = (e) => {
      e.preventDefault();
   };

   const resetFilters = () => {
      setSearchTerm("");
      setSearchColumn("all");
      setSearchAmountOperator("equals");
      setSearchAmountValue("");
   };

   const pageNumbers = useMemo(() => {
      if (totalPages <= 7) {
         return Array.from({ length: totalPages }, (_, i) => i + 1);
      }

      const pages = [1];
      if (currentPage > 3) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
         pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push("...");
      if (totalPages > 1) pages.push(totalPages);

      return pages;
   }, [currentPage, totalPages]);

   return (
      <div className="bg-[var(--color-surface)] border-[3px] border-[var(--color-ink)] p-5 sm:p-6 shadow-[4px_4px_0_var(--color-ink)]">
         {/* Top Section */}
         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b-2 border-[var(--color-ink)] pb-4">
            <div>
               <h2 className="font-macro uppercase text-xl sm:text-2xl tracking-tight text-[var(--color-ink)]">
                  TRANSAKSI HARIAN
               </h2>
            </div>

            {/* Action Buttons Toolbar */}
            <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
               <ToggleFilterTransactionButton
                  showSearchFilters={showSearchFilters}
                  setShowSearchFilters={setShowSearchFilters}
               />

               <ExportTransactionsPDF
                  transactions={transactions}
                  filteredTransactions={filteredTransactions}
               />

               <button
                  onClick={() => {
                     setEditData(null);
                     setShowModal(true);
                  }}
                  disabled={isLoadingTransactions}
                  className="font-mono uppercase text-xs tracking-wider font-bold bg-[var(--color-accent)] text-[var(--color-accent-ink)] border-2 border-[var(--color-ink)] px-4 py-2.5 shadow-[3px_3px_0_var(--color-ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_var(--color-ink)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-100 flex items-center justify-center gap-1.5 flex-1 sm:flex-initial"
               >
                  <Plus size={15} className="stroke-[3]" />
                  <span>TAMBAH TRANSAKSI</span>
               </button>
            </div>
         </div>

         {/* Filter Panel */}
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

         {/* Row Selector & Range Info */}
         <ItemPerPageKeuangan
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            filteredTransactions={filteredTransactions}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
         />

         {/* Responsive Table Container */}
         <div className="overflow-x-auto border-2 border-[var(--color-ink)]">
            <table className="w-full border-collapse">
               <TransactionTableHeader />
               <TransactionTableBody
                  isLoadingTransactions={isLoadingTransactions}
                  filteredTransactions={filteredTransactions}
                  paginatedTransactions={paginatedTransactions}
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
                  openModalForEdit={openModalForEdit}
                  confirmDelete={confirmDelete}
                  transactions={transactions}
               />
            </table>
         </div>

         {/* Pagination */}
         {totalPages > 1 && (
            <TransactionPagination
               currentPage={currentPage}
               totalPages={totalPages}
               pageNumbers={pageNumbers}
               goToPage={goToPage}
            />
         )}

         {/* Modals */}
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

         <TransactionDeleteConfirmation
            isOpen={showDeleteConfirmation}
            onClose={() => setShowDeleteConfirmation(false)}
            onConfirm={handleDelete}
            transactionName={transactionToDelete?.name}
            transactionAmount={transactionToDelete?.amount}
            isLoading={isLoading}
         />
      </div>
   );
};

export default TransactionTable;
