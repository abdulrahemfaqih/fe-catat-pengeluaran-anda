import React from "react";

export default function ItemPerPageKeuangan({itemsPerPage, setItemsPerPage, filteredTransactions, setCurrentPage, currentPage}) {
    return (
        <div className="mb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
            <div className="flex items-center space-x-2">
                <span className="text-sm font-medium dark:text-gray-200 transition-colors duration-300">
                    Tampilkan:
                </span>
                <select
                    value={itemsPerPage}
                    onChange={(e) => {
                        setItemsPerPage(
                            e.target.value === "all" ? "all" : parseInt(e.target.value)
                        );
                        setCurrentPage(1);
                    }}
                    className="border-2 border-black rounded-lg px-2 py-1 focus:outline-none shadow-[2px_2px_0px_rgba(0,0,0,1)] bg-white dark:bg-gray-700 text-black dark:text-white text-sm transition-colors duration-300"
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
                <div className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">
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
    );
}
