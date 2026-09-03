import React, { useState, useEffect, useCallback } from "react";
import { Search, RotateCcw, X } from "lucide-react";

const WishlistFilter = ({
   onApplyFilters,
   initialFilters = {},
   onToggleVisibility,
   isVisible,
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

   const [debounceTimeout, setDebounceTimeout] = useState(null);

   useEffect(() => {
      setSearchTerm(initialFilters.searchTerm || "");
      setPriceValue(initialFilters.priceValue || "");
      setPriceOperator(initialFilters.priceOperator || "lessEqual");
      setMinPrice(initialFilters.minPrice || "");
      setMaxPrice(initialFilters.maxPrice || "");
   }, [initialFilters]);

   const debouncedApplyFilter = useCallback(() => {
      const filters = {
         searchTerm,
         priceOperator,
         priceValue: priceOperator === "between" ? "" : priceValue,
         minPrice: priceOperator === "between" ? minPrice : "",
         maxPrice: priceOperator === "between" ? maxPrice : "",
      };

      onApplyFilters(filters);
   }, [
      searchTerm,
      priceOperator,
      priceValue,
      minPrice,
      maxPrice,
      onApplyFilters,
   ]);

   useEffect(() => {
      if (debounceTimeout) {
         clearTimeout(debounceTimeout);
      }

      const timeoutId = setTimeout(() => {
         debouncedApplyFilter();
      }, 300);

      setDebounceTimeout(timeoutId);

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
         className={`mb-6 border-2 border-[var(--color-ink)] bg-[var(--color-surface)] shadow-[4px_4px_0_var(--color-ink)] ${
            !isVisible ? "hidden md:block" : "block"
         }`}
      >
         {/* Inverted Header */}
         <div className="bg-[var(--color-ink)] text-[var(--color-bg)] px-4 py-2.5 flex items-center justify-between">
            <h3 className="font-mono uppercase text-xs font-bold tracking-wider flex items-center gap-2">
               <Search size={14} className="stroke-[2.5]" />
               <span>FILTER & PENCARIAN WISHLIST</span>
            </h3>
            <button
               onClick={onToggleVisibility}
               className="md:hidden text-[var(--color-bg)] p-1 hover:opacity-75"
               aria-label="Tutup filter"
            >
               <X size={16} />
            </button>
         </div>

         <div className="p-4 sm:p-5">
            <div className="space-y-4">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Search text */}
                  <div>
                     <label
                        htmlFor="wishlistSearch"
                        className="block mb-1 font-mono uppercase text-[11px] font-bold text-[var(--color-ink-muted)] tracking-wider"
                     >
                        KATA KUNCI BARANG
                     </label>
                     <input
                        type="text"
                        id="wishlistSearch"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full border-2 border-[var(--color-ink)] bg-[var(--color-surface)] text-[var(--color-ink)] px-3 py-2 font-mono text-xs focus:outline-2 focus:outline-[var(--color-accent)] focus:outline-offset-2"
                        placeholder="Cari nama barang..."
                     />
                  </div>

                  {/* Price operator and values */}
                  <div>
                     <label
                        htmlFor="priceOperatorSelect"
                        className="block mb-1 font-mono uppercase text-[11px] font-bold text-[var(--color-ink-muted)] tracking-wider"
                     >
                        FILTER RENTANG HARGA
                     </label>
                     <div className="flex gap-2">
                        <select
                           id="priceOperatorSelect"
                           value={priceOperator}
                           onChange={handleOperatorChange}
                           className="border-2 border-[var(--color-ink)] bg-[var(--color-surface)] text-[var(--color-ink)] px-3 py-2 font-mono text-xs uppercase focus:outline-2 focus:outline-[var(--color-accent)] focus:outline-offset-2"
                        >
                           <option value="equals">SAMA DENGAN (=)</option>
                           <option value="greater">LEBIH DARI (&gt;)</option>
                           <option value="less">KURANG DARI (&lt;)</option>
                           <option value="greaterEqual">MINIMAL (≥)</option>
                           <option value="lessEqual">MAKSIMAL (≤)</option>
                           <option value="between">RENTANG (ANTARA)</option>
                        </select>

                        {priceOperator === "between" ? (
                           <div className="flex gap-1.5 items-center flex-1">
                              <input
                                 type="number"
                                 value={minPrice}
                                 onChange={(e) => setMinPrice(e.target.value)}
                                 placeholder="Min"
                                 className="w-full border-2 border-[var(--color-ink)] bg-[var(--color-surface)] text-[var(--color-ink)] p-2 font-mono text-xs tabular-nums focus:outline-2 focus:outline-[var(--color-accent)]"
                              />
                              <span className="font-mono text-xs text-[var(--color-ink-muted)]">–</span>
                              <input
                                 type="number"
                                 value={maxPrice}
                                 onChange={(e) => setMaxPrice(e.target.value)}
                                 placeholder="Max"
                                 className="w-full border-2 border-[var(--color-ink)] bg-[var(--color-surface)] text-[var(--color-ink)] p-2 font-mono text-xs tabular-nums focus:outline-2 focus:outline-[var(--color-accent)]"
                              />
                           </div>
                        ) : (
                           <div className="relative flex-1">
                              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 font-mono text-xs font-bold text-[var(--color-ink-muted)]">
                                 RP
                              </span>
                              <input
                                 type="number"
                                 value={priceValue}
                                 onChange={(e) => setPriceValue(e.target.value)}
                                 className="w-full border-2 border-[var(--color-ink)] bg-[var(--color-surface)] text-[var(--color-ink)] px-3 py-2 pl-9 font-mono text-xs tabular-nums focus:outline-2 focus:outline-[var(--color-accent)]"
                                 placeholder="0"
                              />
                           </div>
                        )}
                     </div>
                  </div>
               </div>

               {/* Reset Button */}
               <div className="flex justify-end pt-2 border-t border-[var(--color-ink)]/15">
                  <button
                     type="button"
                     onClick={handleReset}
                     className="font-mono uppercase text-xs tracking-wider font-bold bg-[var(--color-surface)] text-[var(--color-ink)] border-2 border-[var(--color-ink)] px-4 py-1.5 shadow-[2px_2px_0_var(--color-ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_var(--color-ink)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all duration-100 flex items-center gap-1.5"
                  >
                     <RotateCcw size={13} className="stroke-[2.5]" />
                     <span>RESET FILTER</span>
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default WishlistFilter;