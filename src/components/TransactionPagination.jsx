import React from "react";

export default function TransactionPagination({currentPage, totalPages, goToPage, pageNumbers}) {
    return (
        <div className="flex justify-center items-center mt-6 gap-2">
            <button
                onClick={() => goToPage(1)}
                disabled={currentPage === 1}
                className={`px-3 py-2 border-2 border-black rounded-lg font-bold ${currentPage === 1
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
                className={`px-3 py-2 border-2 border-black rounded-lg font-bold ${currentPage === 1
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
                            className={`w-10 h-10 flex items-center justify-center border-2 border-black rounded-lg font-bold ${currentPage === page
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
                className={`px-3 py-2 border-2 border-black rounded-lg font-bold ${currentPage === totalPages
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
                className={`px-3 py-2 border-2 border-black rounded-lg font-bold ${currentPage === totalPages
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-white hover:bg-blue-100 transition"
                    }`}
                aria-label="Last Page"
            >
                »
            </button>
        </div>
    );
}
