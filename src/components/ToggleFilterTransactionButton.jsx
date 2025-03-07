import React from 'react'

export default function ToggleFilterTransactionButton({showSearchFilters, setShowSearchFilters}) {
  return (
     <button
        onClick={() => setShowSearchFilters(!showSearchFilters)}
        className="sm:hidden px-3 py-2.5 border-3 border-black bg-blue-200 text-black font-bold rounded-xl hover:bg-black hover:text-blue-200 transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2"
     >
        <span className="text-lg">🔍</span>
        <span>
           {showSearchFilters ? "Sembunyikan Filter" : "Tampilkan Filter"}
        </span>
     </button>
  );
}
