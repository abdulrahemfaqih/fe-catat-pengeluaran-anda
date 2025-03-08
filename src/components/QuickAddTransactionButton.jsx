import React from 'react';

const QuickAddTransactionButton = ({ onClick, isScrolled }) => {
    return (
        <button
            onClick={onClick}
            className={`fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-blue-500 dark:bg-blue-600 rounded-full text-white shadow-lg
        hover:bg-blue-600 dark:hover:bg-blue-700 transform hover:scale-105 active:scale-95
        border-4 border-black focus:outline-none focus:ring-4 focus:ring-blue-300
        transition-all duration-300 group ${isScrolled ? 'opacity-60 hover:opacity-100' : 'opacity-100'}`}
            aria-label="Add new transaction"
            title="Tambah Transaksi Baru"
        >
            <span className="text-3xl font-bold">+</span>

            {/* Tooltip that shows on hover */}
            <span className="absolute right-full mr-3 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap
        opacity-0 group-hover:opacity-100 pointer-events-none hidden sm:block">
                Tambah Transaksi
            </span>
        </button>
    );
};

export default QuickAddTransactionButton;