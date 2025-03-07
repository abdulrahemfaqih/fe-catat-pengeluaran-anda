import React, { useState, useEffect, useCallback } from "react";

const WishlistFilter = ({
   onApplyFilters,
   initialFilters = {},
   isVisible,
   onToggleVisibility,
}) => {
   const [searchTerm, setSearchTerm] = useState(
      initialFilters.searchTerm || ""
   );
   const [priceValue, setPriceValue] = useState(
      initialFilters.priceValue || ""
   );
   const [priceOperator, setPriceOperator] = useState(
      initialFilters.priceOperator || "lessEqual"
   );
   const [minPrice, setMinPrice] = useState(initialFilters.minPrice || "");
   const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice || "");

   // Add debounce delay for live filtering
   const [debounceTimeout, setDebounceTimeout] = useState(null);

   // Update local state when initial filters change
   useEffect(() => {
      setSearchTerm(initialFilters.searchTerm || "");
      setPriceValue(initialFilters.priceValue || "");
      setPriceOperator(initialFilters.priceOperator || "lessEqual");
      setMinPrice(initialFilters.minPrice || "");
      setMaxPrice(initialFilters.maxPrice || "");
   }, [initialFilters]);

   // Create a debounced apply filter function to avoid excessive updates
   const debouncedApplyFilter = useCallback(() => {
      const filters = {
         searchTerm,
         priceOperator,
         priceValue: priceOperator === "between" ? "" : priceValue,
         minPrice: priceOperator === "between" ? minPrice : "",
         maxPrice: priceOperator === "between" ? maxPrice : "",
      };

      // Apply filters immediately
      onApplyFilters(filters);
   }, [
      searchTerm,
      priceOperator,
      priceValue,
      minPrice,
      maxPrice,
      onApplyFilters,
   ]);

   // Apply filters with debouncing when any filter value changes
   useEffect(() => {
      // Clear any existing timeout
      if (debounceTimeout) {
         clearTimeout(debounceTimeout);
      }

      // Set a new timeout (300ms delay before applying filters)
      const timeoutId = setTimeout(() => {
         debouncedApplyFilter();
      }, 300);

      setDebounceTimeout(timeoutId);

      // Cleanup timeout on unmount or when dependencies change
      return () => {
         if (timeoutId) clearTimeout(timeoutId);
      };
   }, [
      searchTerm,
      priceOperator,
      priceValue,
      minPrice,
      maxPrice,
      debouncedApplyFilter,
   ]);

   const handleOperatorChange = (e) => {
      const newOperator = e.target.value;
      setPriceOperator(newOperator);

      // Reset values when switching between single value and between
      if (newOperator === "between") {
         setPriceValue("");
      } else {
         setMinPrice("");
         setMaxPrice("");
      }
   };

   const handleReset = () => {
      setSearchTerm("");
      setPriceValue("");
      setPriceOperator("lessEqual");
      setMinPrice("");
      setMaxPrice("");

      // Apply reset immediately
      onApplyFilters({
         searchTerm: "",
         priceOperator: "lessEqual",
         priceValue: "",
         minPrice: "",
         maxPrice: "",
      });
   };

   return (
      <div
         className={`mb-6 border-3 border-black rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900 dark:to-indigo-900 dark:text-white shadow-[6px_6px_0px_rgba(0,0,0,1)] overflow-hidden transition-all duration-300 transform ${
            !isVisible ? "hidden sm:block" : "block"
         }`}
      >
         <div className="bg-purple-200 dark:bg-purple-800 px-4 py-3 border-b-3 border-black flex items-center justify-between transition-colors duration-300">
            <h3 className="font-bold text-lg flex items-center">
               <span className="bg-white dark:bg-gray-700 p-1 rounded-lg border-2 border-black mr-2 shadow-[2px_2px_0px_rgba(0,0,0,0.3)] transition-colors duration-300">
                  🔍
               </span>
               Filter Wishlist (Live)
            </h3>
            <button
               type="button"
               onClick={onToggleVisibility}
               className="sm:hidden px-2 py-1 border-2 border-black bg-white dark:bg-gray-700 dark:text-white rounded-lg hover:bg-black hover:text-white dark:hover:bg-gray-900 transition-colors duration-300"
            >
               {isVisible ? "❌ Tutup" : "🔍 Buka"}
            </button>
         </div>

         <div className="p-5">
            <div className="space-y-5">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Text Search */}
                  <div className="bg-white dark:bg-gray-800 border-3 border-black rounded-xl p-4 shadow-[4px_4px_0px_rgba(0,0,0,0.2)] transition-colors duration-300">
                     <h4 className="font-bold text-sm uppercase mb-3 flex items-center">
                        <span className="bg-yellow-100 dark:bg-yellow-800 p-1 rounded-lg border-2 border-black mr-2 transition-colors duration-300">
                           📝
                        </span>
                        Cari Wishlist
                     </h4>
                     <div>
                        <label
                           htmlFor="searchTerm"
                           className="block mb-1 font-medium text-sm dark:text-gray-200 transition-colors duration-300"
                        >
                           Kata Kunci
                        </label>
                        <div className="relative">
                           <input
                              type="text"
                              id="searchTerm"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              className="w-full border-2 border-black rounded-lg p-2 pl-9 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 shadow-[2px_2px_0px_rgba(0,0,0,1)] h-10 bg-white dark:bg-gray-700 text-black dark:text-white transition-colors duration-300"
                              placeholder="Cari barang wishlist..."
                           />
                           <span className="absolute left-3 top-1/2 -translate-y-1/2">
                              🔍
                           </span>
                        </div>
                     </div>
                  </div>

                  {/* Price Filter */}
                  <div className="bg-white dark:bg-gray-800 border-3 border-black rounded-xl p-4 shadow-[4px_4px_0px_rgba(0,0,0,0.2)] transition-colors duration-300">
                     <h4 className="font-bold text-sm uppercase mb-3 flex items-center">
                        <span className="bg-green-100 dark:bg-green-800 p-1 rounded-lg border-2 border-black mr-2 transition-colors duration-300">
                           💰
                        </span>
                        Filter Harga
                     </h4>
                     <div className="flex flex-col gap-3">
                        <div>
                           <label
                              htmlFor="priceOperator"
                              className="block mb-1 font-medium text-sm dark:text-gray-200 transition-colors duration-300"
                           >
                              Operator
                           </label>
                           <div className="relative">
                              <select
                                 id="priceOperator"
                                 value={priceOperator}
                                 onChange={handleOperatorChange}
                                 className="w-full border-2 appearance-none border-black rounded-lg p-2 pl-8 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 shadow-[2px_2px_0px_rgba(0,0,0,1)] bg-white dark:bg-gray-700 text-black dark:text-white h-10 transition-colors duration-300"
                              >
                                 <option value="equals">Sama dengan (=)</option>
                                 <option value="greater">
                                    Lebih dari (&gt;)
                                 </option>
                                 <option value="less">
                                    Kurang dari (&lt;)
                                 </option>
                                 <option value="greaterEqual">
                                    Minimal (≥)
                                 </option>
                                 <option value="lessEqual">Maksimal (≤)</option>
                                 <option value="between">Antara</option>
                              </select>
                              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                                 ⚙️
                              </span>
                              <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none dark:text-white transition-colors duration-300">
                                 ▼
                              </span>
                           </div>
                        </div>

                        <div>
                           <label
                              htmlFor="priceValue"
                              className="block mb-1 font-medium text-sm dark:text-gray-200 transition-colors duration-300"
                           >
                              {priceOperator === "between"
                                 ? "Rentang Harga"
                                 : "Nilai Harga"}
                           </label>

                           {priceOperator === "between" ? (
                              <div className="flex gap-2 items-center">
                                 <div className="relative flex-1">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-300 font-medium transition-colors duration-300">
                                       Rp
                                    </span>
                                    <input
                                       type="number"
                                       value={minPrice}
                                       onChange={(e) =>
                                          setMinPrice(e.target.value)
                                       }
                                       placeholder="Min"
                                       className="w-full border-2 border-black rounded-lg p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 shadow-[2px_2px_0px_rgba(0,0,0,1)] h-10 bg-white dark:bg-gray-700 text-black dark:text-white transition-colors duration-300"
                                    />
                                 </div>
                                 <span className="dark:text-white">-</span>
                                 <div className="relative flex-1">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-300 font-medium transition-colors duration-300">
                                       Rp
                                    </span>
                                    <input
                                       type="number"
                                       value={maxPrice}
                                       onChange={(e) =>
                                          setMaxPrice(e.target.value)
                                       }
                                       placeholder="Max"
                                       className="w-full border-2 border-black rounded-lg p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 shadow-[2px_2px_0px_rgba(0,0,0,1)] h-10 bg-white dark:bg-gray-700 text-black dark:text-white transition-colors duration-300"
                                    />
                                 </div>
                              </div>
                           ) : (
                              <div className="relative">
                                 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-300 font-medium transition-colors duration-300">
                                    Rp
                                 </span>
                                 <input
                                    type="number"
                                    id="priceValue"
                                    value={priceValue}
                                    onChange={(e) =>
                                       setPriceValue(e.target.value)
                                    }
                                    className="w-full border-2 border-black rounded-lg p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 shadow-[2px_2px_0px_rgba(0,0,0,1)] h-10 bg-white dark:bg-gray-700 text-black dark:text-white transition-colors duration-300"
                                    placeholder={
                                       priceOperator === "equals"
                                          ? "Harga tepat sama dengan..."
                                          : priceOperator === "lessEqual" ||
                                            priceOperator === "less"
                                          ? "Maksimal harga..."
                                          : "Minimal harga..."
                                    }
                                 />
                              </div>
                           )}
                        </div>
                     </div>
                  </div>
               </div>

               {/* Reset Button */}
               <div className="flex flex-wrap gap-3 justify-end mt-2">
                  <button
                     type="button"
                     onClick={handleReset}
                     className="px-5 py-2 border-3 border-black bg-white dark:bg-gray-700 text-black dark:text-white font-bold rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] flex items-center gap-2"
                  >
                     <span>🔄</span>
                     Reset Filter
                  </button>

              
               </div>
            </div>
         </div>
      </div>
   );
};

export default WishlistFilter;
