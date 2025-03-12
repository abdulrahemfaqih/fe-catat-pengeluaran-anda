import React from "react";

export default function TransactionPagination({ currentPage, totalPages, goToPage, pageNumbers }) {
    return (
        <div className="flex justify-center items-center mt-6 gap-1 sm:gap-2 flex-wrap">
            {/* First page button */}
            <button
                onClick={() => goToPage(1)}
                disabled={currentPage === 1}
                className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg border-2 border-black font-bold transition-colors duration-300
                    ${currentPage === 1
                        ? "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                        : "dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-700 dark:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    }`}
                aria-label="First Page"
            >
                «
            </button>

            {/* Previous page button */}
            <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg border-2 border-black font-bold transition-colors duration-300
                    ${currentPage === 1
                        ? "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                        : "bg-white dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-700 dark:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    }`}
                aria-label="Previous Page"
            >
                ‹
            </button>

            {/* Page numbers - limited on mobile */}
            <div className="flex gap-1 sm:gap-2 overflow-x-auto px-1 max-w-[calc(100%-120px)] sm:max-w-full">
                {pageNumbers.map((page, index) =>
                    page === "..." ? (
                        <span
                            key={`ellipsis-${index}`}
                            className="w-8 h-9 sm:w-10 sm:h-10 flex items-center justify-center dark:text-white transition-colors duration-300"
                            aria-hidden="true"
                        >
                            ...
                        </span>
                    ) : (
                        <button
                            key={page}
                            onClick={() => goToPage(page)}
                            className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg border-2 border-black font-bold transition-colors duration-300
                                ${currentPage === page
                                    ? "bg-blue-400 dark:bg-blue-600 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform -rotate-2"
                                    : "bg-white dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-700 dark:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                }`}
                            aria-label={`Page ${page}`}
                            aria-current={currentPage === page ? "page" : undefined}
                        >
                            {page}
                        </button>
                    )
                )}
            </div>

            {/* Next page button */}
            <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg border-2 border-black font-bold transition-colors duration-300
                    ${currentPage === totalPages
                        ? "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                        : "bg-white dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-700 dark:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    }`}
                aria-label="Next Page"
            >
                ›
            </button>

            {/* Last page button */}
            <button
                onClick={() => goToPage(totalPages)}
                disabled={currentPage === totalPages}
                className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg border-2 border-black font-bold transition-colors duration-300
                    ${currentPage === totalPages
                        ? "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                        : "bg-white dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-700 dark:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    }`}
                aria-label="Last Page"
            >
                »
            </button>
        </div>
    );
}