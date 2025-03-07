import React, { useState, useEffect } from "react";
import WishlistCard from "./WishlistCard";
import WishlistFilter from "./WishlistFilter";
import WishlistPagination from "./WishlistPagination";
import ShowResultWishlist from "./ShowResultWishlist";

const Wishlists = ({
   items,
   onUpdate,
   onDelete,
   isLoadingWishlists = { isLoadingWishlists },
}) => {
   const [showFilters, setShowFilters] = useState(false);
   const [filteredItems, setFilteredItems] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [itemsPerPage, setItemsPerPage] = useState(6);
   const [paginatedItems, setPaginatedItems] = useState([]);
   const [activeFilters, setActiveFilters] = useState({
      searchTerm: "",
      priceOperator: "lessEqual",
      priceValue: "",
      minPrice: "",
      maxPrice: "",
   });

   // Initialize filtered items
   useEffect(() => {
      if (items && Array.isArray(items)) {
         setFilteredItems(items);
      }
   }, [items]);

   // Handle responsive behavior for filters
   useEffect(() => {
      const handleResize = () => {
         if (window.innerWidth >= 768) {
            setShowFilters(true);
         } else {
            setShowFilters(false);
         }
      };

      handleResize(); // Set initial state
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
   }, []);

   // Apply filters when they change
   useEffect(() => {
      if (!Array.isArray(items)) return;

      let filtered = [...items];
      const { searchTerm, priceOperator, priceValue, minPrice, maxPrice } =
         activeFilters;

      // Apply search filter
      if (searchTerm) {
         filtered = filtered.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
         );
      }

      // Apply price filter
      if (priceOperator === "between" && minPrice && maxPrice) {
         const min = parseFloat(minPrice);
         const max = parseFloat(maxPrice);

         if (!isNaN(min) && !isNaN(max)) {
            filtered = filtered.filter((item) => {
               const price = parseFloat(item.price);
               return price >= min && price <= max;
            });
         }
      } else if (priceValue) {
         const price = parseFloat(priceValue);

         if (!isNaN(price)) {
            switch (priceOperator) {
               case "equals":
                  filtered = filtered.filter(
                     (item) => parseFloat(item.price) === price
                  );
                  break;
               case "greater":
                  filtered = filtered.filter(
                     (item) => parseFloat(item.price) > price
                  );
                  break;
               case "less":
                  filtered = filtered.filter(
                     (item) => parseFloat(item.price) < price
                  );
                  break;
               case "greaterEqual":
                  filtered = filtered.filter(
                     (item) => parseFloat(item.price) >= price
                  );
                  break;
               case "lessEqual":
                  filtered = filtered.filter(
                     (item) => parseFloat(item.price) <= price
                  );
                  break;
               default:
                  break;
            }
         }
      }

      setFilteredItems(filtered);
      setCurrentPage(1); // Reset to first page when filters change
   }, [items, activeFilters]);

   // Handle pagination
   useEffect(() => {
      if (!Array.isArray(filteredItems)) return;

      if (itemsPerPage === filteredItems.length) {
         setPaginatedItems(filteredItems);
         return;
      }

      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = filteredItems.slice(
         indexOfFirstItem,
         indexOfLastItem
      );

      setPaginatedItems(currentItems);
   }, [filteredItems, currentPage, itemsPerPage]);

   // Handle filter changes
   const handleApplyFilters = (filters) => {
      setActiveFilters(filters);
   };

   // Items per page change handler
   const handleItemsPerPageChange = (e) => {
      setItemsPerPage(parseInt(e.target.value));
      setCurrentPage(1); // Reset to first page when changing items per page
   };

   // Check if any filters are active
   const hasActiveFilters = () => {
      return (
         activeFilters.searchTerm !== "" ||
         (activeFilters.priceValue !== "" &&
            activeFilters.priceOperator !== "between") ||
         (activeFilters.minPrice !== "" &&
            activeFilters.maxPrice !== "" &&
            activeFilters.priceOperator === "between")
      );
   };

   // Format price operator for display
   const formatPriceOperator = (operator) => {
      switch (operator) {
         case "equals":
            return "=";
         case "greater":
            return ">";
         case "less":
            return "<";
         case "greaterEqual":
            return "≥";
         case "lessEqual":
            return "≤";
         case "between":
            return "antara";
         default:
            return operator;
      }
   };

   return (
      <div>
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h2 className="text-2xl font-bold mb-4 md:mb-0 inline-flex flex-col md:flex-row md:items-center bg-purple-100 dark:bg-purple-800 dark:text-white px-4 py-2 border-3 border-black rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-colors duration-300">
               <span>My Wishlist Items</span>
               <span className="md:ml-2 px-2 py-1 mt-2 md:mt-0 bg-yellow-200 dark:bg-yellow-600 text-black dark:text-white rounded-md text-sm border-2 border-black">
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
               {hasActiveFilters() && (
                  <span className="inline-flex items-center justify-center h-5 w-5 bg-red-500 text-white text-xs rounded-full border-2 border-black">
                     !
                  </span>
               )}
            </button>
         </div>

         {/* Filter Component */}
         <WishlistFilter
            onApplyFilters={handleApplyFilters}
            initialFilters={activeFilters}
            isVisible={showFilters}
            onToggleVisibility={() => setShowFilters(!showFilters)}
         />

         {/* Filter Status Indicator */}
         {hasActiveFilters() && (
            <div className="mt-4 mb-6 px-4 py-3 bg-gradient-to-r from-yellow-100 to-yellow-50 dark:from-yellow-800 dark:to-yellow-900 dark:text-white border-2 border-yellow-500 dark:border-yellow-600 rounded-lg text-sm flex items-center transition-colors duration-300">
               <span className="font-bold mr-2 bg-white dark:bg-gray-700 p-1 border-2 border-yellow-500 dark:border-yellow-600 rounded-md transition-colors duration-300">
                  📋
               </span>
               <span>
                  <span className="font-bold">
                     {filteredItems.length} dari {items.length}
                  </span>{" "}
                  item wishlist sesuai filter yang diterapkan
                  {activeFilters.searchTerm && (
                     <span className="ml-2 inline-block px-2 py-0.5 bg-blue-100 dark:bg-blue-800 rounded-md text-xs border border-blue-300 dark:border-blue-600">
                        Kata kunci: "{activeFilters.searchTerm}"
                     </span>
                  )}
                  {activeFilters.priceOperator === "between" &&
                  activeFilters.minPrice &&
                  activeFilters.maxPrice ? (
                     <span className="ml-2 inline-block px-2 py-0.5 bg-green-100 dark:bg-green-800 rounded-md text-xs border border-green-300 dark:border-green-600">
                        Harga: Rp{" "}
                        {parseInt(activeFilters.minPrice).toLocaleString()} - Rp{" "}
                        {parseInt(activeFilters.maxPrice).toLocaleString()}
                     </span>
                  ) : (
                     activeFilters.priceValue && (
                        <span className="ml-2 inline-block px-2 py-0.5 bg-green-100 dark:bg-green-800 rounded-md text-xs border border-green-300 dark:border-green-600">
                           Harga{" "}
                           {formatPriceOperator(activeFilters.priceOperator)} Rp{" "}
                           {parseInt(activeFilters.priceValue).toLocaleString()}
                        </span>
                     )
                  )}
               </span>
            </div>
         )}

         {filteredItems.length === 0 && items.length > 0 && (
            <div className="mb-6 p-3 bg-orange-100 dark:bg-orange-900/50 border-2 border-black rounded-lg flex items-center gap-2 text-sm dark:text-white">
               <span className="text-xl">🔔</span>
               <span>
                  Tidak ada hasil yang cocok dengan filter. Coba ubah kriteria
                  pencarian.
               </span>
            </div>
         )}

         {/* Items per page selector */}
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

         {/* Wishlist Cards Grid */}
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

         {/* Pagination Component - Now using the new component */}
         <WishlistPagination
            currentPage={currentPage}
            totalItems={filteredItems.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
         />

         {/* Showing results info */}
         <ShowResultWishlist
            paginatedItems={paginatedItems}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            filteredItems={filteredItems}
            items={items}
            hasActiveFilters={hasActiveFilters()}
         />
      </div>
   );
};

export default Wishlists;
