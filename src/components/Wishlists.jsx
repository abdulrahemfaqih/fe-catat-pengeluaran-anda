import React, { useState, useEffect } from "react";
import WishlistCard from "./WishlistCard";

const Wishlists = ({
   items,
   onUpdate,
   onDelete,
   isLoadingWishlists = { isLoadingWishlists },
}) => {
   const [searchTerm, setSearchTerm] = useState("");
   const [priceFilter, setPriceFilter] = useState("");
   const [showFilters, setShowFilters] = useState(window.innerWidth >= 768); // Initially show on desktop
   const [filteredItems, setFilteredItems] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [itemsPerPage, setItemsPerPage] = useState(6);
   const [paginatedItems, setPaginatedItems] = useState([]);

   // Handle responsive behavior
   useEffect(() => {
      const handleResize = () => {
         setShowFilters(window.innerWidth >= 768);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
   }, []);

   // Filter items based on search term and price
   useEffect(() => {
      if (!Array.isArray(items)) return;

      let filtered = [...items];

      if (searchTerm) {
         filtered = filtered.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
         );
      }

      if (priceFilter) {
         const price = parseFloat(priceFilter);
         if (!isNaN(price)) {
            filtered = filtered.filter(
               (item) => parseFloat(item.price) <= price
            );
         }
      }

      setFilteredItems(filtered);
      setCurrentPage(1); // Reset to first page when filters change
   }, [items, searchTerm, priceFilter]);

   // Handle pagination
   useEffect(() => {
      if (!Array.isArray(filteredItems)) return;

      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = filteredItems.slice(
         indexOfFirstItem,
         indexOfLastItem
      );

      setPaginatedItems(currentItems);
   }, [filteredItems, currentPage, itemsPerPage]);

   // Page change handler
   const paginate = (pageNumber) => setCurrentPage(pageNumber);

   // Items per page change handler
   const handleItemsPerPageChange = (e) => {
      setItemsPerPage(parseInt(e.target.value));
      setCurrentPage(1); // Reset to first page when changing items per page
   };

   if (isLoadingWishlists) {
      return (
         <div className="border-4 border-black rounded-xl p-8 bg-yellow-50 dark:bg-yellow-900/50 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-1 relative overflow-hidden transition-colors duration-300">
            {/* Decorative elements */}
            <div className="absolute -top-5 -left-5 w-20 h-20 bg-purple-100 dark:bg-purple-800 rounded-full border-3 border-black -z-10 transition-colors duration-300"></div>
            <div className="absolute -bottom-5 -right-5 w-16 h-16 bg-blue-100 dark:bg-blue-800 rounded-full border-2 border-black -z-10 transition-colors duration-300"></div>

            <div className="inline-flex items-center justify-center w-20 h-20 bg-white dark:bg-gray-800 rounded-full border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-5 transition-colors duration-300">
               <div className="w-10 h-10 border-4 border-black border-t-yellow-300 dark:border-t-yellow-500 rounded-full animate-spin transition-colors duration-300"></div>
            </div>

            <h3 className="text-2xl font-bold mb-4 relative inline-block dark:text-white transition-colors duration-300">
               Memuat Wishlist...
               <span className="absolute -bottom-1 left-0 w-full h-3 bg-yellow-200 dark:bg-yellow-700 -z-10 transition-colors duration-300"></span>
            </h3>

            <div className="flex justify-center space-x-2 my-4">
               <div
                  className="w-3 h-3 bg-black dark:bg-white rounded-full animate-bounce transition-colors duration-300"
                  style={{ animationDelay: "0s" }}
               ></div>
               <div
                  className="w-3 h-3 bg-black dark:bg-white rounded-full animate-bounce transition-colors duration-300"
                  style={{ animationDelay: "0.2s" }}
               ></div>
               <div
                  className="w-3 h-3 bg-black dark:bg-white rounded-full animate-bounce transition-colors duration-300"
                  style={{ animationDelay: "0.4s" }}
               ></div>
            </div>

            <div className="bg-white dark:bg-gray-800 border-3 border-black rounded-lg p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-w-sm mx-auto transition-colors duration-300">
               <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded-full w-3/4 mb-4 transition-colors duration-300"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded-full w-full mb-2 transition-colors duration-300"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded-full w-5/6 mb-2 transition-colors duration-300"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded-full w-4/5 transition-colors duration-300"></div>
               </div>
            </div>
         </div>
      );
   }

   if (!Array.isArray(items) || items.length === 0) {
      return (
         <div className="border-4 border-black rounded-xl p-8 bg-yellow-100 dark:bg-yellow-900/40 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden transition-colors duration-300">
            {/* Decorative elements */}
            <div className="absolute -top-5 -left-5 w-20 h-20 bg-purple-100 dark:bg-purple-800 rounded-full border-3 border-black -z-10 transition-colors duration-300"></div>
            <div className="absolute -bottom-5 -right-5 w-16 h-16 bg-blue-100 dark:bg-blue-800 rounded-full border-2 border-black -z-10 transition-colors duration-300"></div>

            <div className="inline-flex items-center justify-center w-20 h-20 bg-white dark:bg-gray-800 rounded-full border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-5 transition-colors duration-300">
               <span className="text-4xl">✨</span>
            </div>

            <h3 className="text-2xl font-bold mb-4 relative inline-block dark:text-white transition-colors duration-300">
               Wishlist Kosong!
               <span className="absolute -bottom-1 left-0 w-full h-3 bg-yellow-200 dark:bg-yellow-700 -z-10 transition-colors duration-300"></span>
            </h3>

            <p className="text-lg mb-6 max-w-md mx-auto dark:text-gray-200 transition-colors duration-300">
               Tambahkan barang-barang yang ingin Anda beli ke dalam wishlist
               untuk membantu merencanakan keuangan Anda.
            </p>

            <div className="bg-white dark:bg-gray-800 border-3 border-black rounded-lg p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-w-sm mx-auto transition-colors duration-300">
               <h4 className="font-bold text-lg mb-2 flex items-center gap-2 dark:text-white transition-colors duration-300">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-green-200 dark:bg-green-700 rounded-full border-2 border-black text-xs font-bold transition-colors duration-300">
                     💡
                  </span>
                  Tips
               </h4>
               <ul className="text-sm space-y-2 text-left dark:text-gray-200 transition-colors duration-300">
                  <li className="flex items-start gap-2">
                     <span className="text-green-600 dark:text-green-400 font-bold mt-0.5 transition-colors duration-300">
                        •
                     </span>
                     <span>
                        Klik tombol "Tambah Item Wishlist" untuk menambahkan
                        barang
                     </span>
                  </li>
                  <li className="flex items-start gap-2">
                     <span className="text-green-600 dark:text-green-400 font-bold mt-0.5 transition-colors duration-300">
                        •
                     </span>
                     <span>
                        Prioritaskan barang yang benar-benar Anda butuhkan
                     </span>
                  </li>
                  <li className="flex items-start gap-2">
                     <span className="text-green-600 dark:text-green-400 font-bold mt-0.5 transition-colors duration-300">
                        •
                     </span>
                     <span>
                        Sisihkan uang secara berkala untuk membeli barang dalam
                        wishlist
                     </span>
                  </li>
               </ul>
            </div>
         </div>
      );
   }

   return (
      <div>
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h2 className="text-2xl font-bold mb-4 md:mb-0 inline-block bg-purple-100 dark:bg-purple-800 dark:text-white px-4 py-2 border-3 border-black rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-colors duration-300">
               My Wishlist Items
               <span className="ml-2 px-2 py-1 bg-yellow-200 dark:bg-yellow-600 text-black dark:text-white rounded-md text-sm border-2 border-black">
                  {paginatedItems.length} dari {filteredItems.length}{" "}
                  ditampilkan
               </span>
            </h2>

            {/* Mobile Filter Toggle Button */}
            <button
               className="md:hidden flex items-center gap-2 px-4 py-2 bg-yellow-200 hover:bg-yellow-300 dark:bg-yellow-700 dark:hover:bg-yellow-600 rounded-lg border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] font-bold transition-all duration-300 dark:text-white mb-4"
               onClick={() => setShowFilters(!showFilters)}
            >
               {showFilters ? "Sembunyikan Filter" : "Tampilkan Filter"}
               {showFilters ? "🔼" : "🔽"}
            </button>
         </div>

         {/* Search & Filter Section */}
         {showFilters && (
            <div className="mb-8 bg-yellow-50 dark:bg-yellow-900/30 p-4 border-3 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-colors duration-300 animate-fadeIn">
               <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                     <label className="block mb-2 font-bold dark:text-white">
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-200 dark:bg-blue-700 rounded-full mr-2 border-2 border-black text-sm">
                           🔍
                        </span>
                        Cari Barang
                     </label>
                     <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Masukkan nama barang..."
                        className="w-full px-4 py-2 rounded-lg border-3 border-black focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-800 dark:text-white transition-colors duration-300"
                     />
                  </div>
                  <div className="flex-1">
                     <label className="block mb-2 font-bold dark:text-white">
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-green-200 dark:bg-green-700 rounded-full mr-2 border-2 border-black text-sm">
                           💰
                        </span>
                        Maksimum Harga
                     </label>
                     <input
                        type="number"
                        value={priceFilter}
                        onChange={(e) => setPriceFilter(e.target.value)}
                        placeholder="Maksimal harga..."
                        className="w-full px-4 py-2 rounded-lg border-3 border-black focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-800 dark:text-white transition-colors duration-300"
                     />
                  </div>
               </div>

               {filteredItems.length === 0 && items.length > 0 && (
                  <div className="mt-4 p-3 bg-orange-100 dark:bg-orange-900/50 border-2 border-black rounded-lg flex items-center gap-2 text-sm dark:text-white">
                     <span className="text-xl">🔔</span>
                     <span>
                        Tidak ada hasil yang cocok dengan filter. Coba ubah
                        kriteria pencarian.
                     </span>
                  </div>
               )}
            </div>
         )}

         {/* Items per page selector */}
         <div className="mb-6 flex flex-wrap justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
               <label className="font-bold dark:text-white flex items-center">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-purple-200 dark:bg-purple-700 rounded-full mr-2 border-2 border-black text-sm">
                     📋
                  </span>
                  Tampilkan:
               </label>
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
               <span className="dark:text-white">item per halaman</span>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paginatedItems.map((item, index) => (
               <WishlistCard
                  key={item._id}
                  item={item}
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                  index={index}
               />
            ))}
         </div>

         {/* Pagination */}
         {filteredItems.length > itemsPerPage && (
            <div className="mt-8 flex justify-center">
               <div className="flex flex-wrap gap-2 items-center">
                  <button
                     onClick={() => paginate(1)}
                     disabled={currentPage === 1}
                     className={`w-10 h-10 flex items-center justify-center rounded-lg border-3 border-black font-bold transition-colors duration-300
                        ${
                           currentPage === 1
                              ? "bg-gray-200 dark:bg-gray-700 cursor-not-allowed opacity-60"
                              : "bg-white dark:bg-gray-800 hover:bg-yellow-100 dark:hover:bg-gray-700 dark:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        }`}
                  >
                     «
                  </button>

                  <button
                     onClick={() =>
                        currentPage > 1 && paginate(currentPage - 1)
                     }
                     disabled={currentPage === 1}
                     className={`w-10 h-10 flex items-center justify-center rounded-lg border-3 border-black font-bold transition-colors duration-300
                        ${
                           currentPage === 1
                              ? "bg-gray-200 dark:bg-gray-700 cursor-not-allowed opacity-60"
                              : "bg-white dark:bg-gray-800 hover:bg-yellow-100 dark:hover:bg-gray-700 dark:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        }`}
                  >
                     ‹
                  </button>

                  {/* Page numbers */}
                  {[
                     ...Array(Math.ceil(filteredItems.length / itemsPerPage)),
                  ].map((_, index) => {
                     const pageNumber = index + 1;
                     // Show current page, 2 before and 2 after when possible
                     if (
                        pageNumber === 1 ||
                        pageNumber ===
                           Math.ceil(filteredItems.length / itemsPerPage) ||
                        (pageNumber >= currentPage - 1 &&
                           pageNumber <= currentPage + 1)
                     ) {
                        return (
                           <button
                              key={pageNumber}
                              onClick={() => paginate(pageNumber)}
                              className={`w-10 h-10 flex items-center justify-center rounded-lg border-3 border-black font-bold transition-colors duration-300
                                 ${
                                    currentPage === pageNumber
                                       ? "bg-yellow-300 dark:bg-yellow-600 dark:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform -rotate-2"
                                       : "bg-white dark:bg-gray-800 hover:bg-yellow-100 dark:hover:bg-gray-700 dark:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                 }`}
                           >
                              {pageNumber}
                           </button>
                        );
                     } else if (
                        pageNumber === currentPage - 2 ||
                        pageNumber === currentPage + 2
                     ) {
                        // Show ellipsis for page gaps
                        return (
                           <span
                              key={pageNumber}
                              className="px-2 dark:text-white"
                           >
                              ...
                           </span>
                        );
                     }
                     return null;
                  })}

                  <button
                     onClick={() =>
                        currentPage <
                           Math.ceil(filteredItems.length / itemsPerPage) &&
                        paginate(currentPage + 1)
                     }
                     disabled={
                        currentPage ===
                        Math.ceil(filteredItems.length / itemsPerPage)
                     }
                     className={`w-10 h-10 flex items-center justify-center rounded-lg border-3 border-black font-bold transition-colors duration-300
                        ${
                           currentPage ===
                           Math.ceil(filteredItems.length / itemsPerPage)
                              ? "bg-gray-200 dark:bg-gray-700 cursor-not-allowed opacity-60"
                              : "bg-white dark:bg-gray-800 hover:bg-yellow-100 dark:hover:bg-gray-700 dark:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        }`}
                  >
                     ›
                  </button>

                  <button
                     onClick={() =>
                        paginate(Math.ceil(filteredItems.length / itemsPerPage))
                     }
                     disabled={
                        currentPage ===
                        Math.ceil(filteredItems.length / itemsPerPage)
                     }
                     className={`w-10 h-10 flex items-center justify-center rounded-lg border-3 border-black font-bold transition-colors duration-300
                        ${
                           currentPage ===
                           Math.ceil(filteredItems.length / itemsPerPage)
                              ? "bg-gray-200 dark:bg-gray-700 cursor-not-allowed opacity-60"
                              : "bg-white dark:bg-gray-800 hover:bg-yellow-100 dark:hover:bg-gray-700 dark:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        }`}
                  >
                     »
                  </button>
               </div>
            </div>
         )}

         {/* Showing results info */}
         <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            Menampilkan {paginatedItems.length} dari {filteredItems.length} item
            (Halaman {currentPage} dari{" "}
            {Math.max(1, Math.ceil(filteredItems.length / itemsPerPage))})
         </div>
      </div>
   );
};

export default Wishlists;
