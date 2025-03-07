import React from 'react'

export default function ItemsPerPageWishlist({itemsPerPage, handleItemsPerPageChange, filteredItems}) {
  return (
     <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2">
           <label className="font-bold dark:text-white flex items-center whitespace-nowrap">
              <span className="inline-flex items-center justify-center w-6 h-6 bg-purple-200 dark:bg-purple-700 rounded-full mr-2 border-2 border-black text-sm">
                 📋
              </span>
              Tampilkan:
           </label>
           <div className="flex flex-wrap items-center gap-2">
              <select
                 value={itemsPerPage}
                 onChange={handleItemsPerPageChange}
                 className="px-3 py-1 rounded-lg border-3 border-black bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors duration-300"
              >
                 <option value={3}>3</option>
                 <option value={6}>6</option>
                 <option value={12}>12</option>
                 <option value={24}>24</option>
                 <option value={filteredItems.length}>Semua</option>
              </select>
              <span className="dark:text-white whitespace-nowrap">
                 item per halaman
              </span>
           </div>
        </div>
     </div>
  );
}
