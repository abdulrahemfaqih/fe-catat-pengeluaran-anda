import React, { useState, useEffect } from "react";
import WishlistCard from "./WishlistCard";
import WishlistFilter from "./WishlistFilter";
import { Filter } from "lucide-react";

const Wishlists = ({
   items = [],
   onUpdate,
   onDelete,
   isLoadingWishlists,
}) => {
   const [filteredItems, setFilteredItems] = useState([]);
   const [activeFilters, setActiveFilters] = useState({
      searchTerm: "",
      priceOperator: "lessEqual",
      priceValue: "",
      minPrice: "",
      maxPrice: "",
   });
   const [showFilters, setShowFilters] = useState(false);

   useEffect(() => {
      if (items && Array.isArray(items)) {
         setFilteredItems(items);
      }
   }, [items]);

   useEffect(() => {
      if (!Array.isArray(items)) return;

      let filtered = [...items];
      const { searchTerm, priceOperator, priceValue, minPrice, maxPrice } =
         activeFilters;

      if (searchTerm) {
         filtered = filtered.filter((item) =>
            (item.name || "").toLowerCase().includes(searchTerm.toLowerCase())
         );
      }

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
                  filtered = filtered.filter((item) => parseFloat(item.price) === price);
                  break;
               case "greater":
                  filtered = filtered.filter((item) => parseFloat(item.price) > price);
                  break;
               case "less":
                  filtered = filtered.filter((item) => parseFloat(item.price) < price);
                  break;
               case "greaterEqual":
                  filtered = filtered.filter((item) => parseFloat(item.price) >= price);
                  break;
               case "lessEqual":
                  filtered = filtered.filter((item) => parseFloat(item.price) <= price);
                  break;
               default:
                  break;
            }
         }
      }

      setFilteredItems(filtered);
   }, [items, activeFilters]);

   const handleApplyFilters = (filters) => {
      setActiveFilters(filters);
   };

   const handleToggleFilters = () => {
      setShowFilters(!showFilters);
   };

   if (isLoadingWishlists) {
      return (
         <div className="py-16 text-center font-mono text-xs uppercase tracking-widest text-[var(--color-ink-muted)]">
            MEMUAT DATA WISHLIST...
         </div>
      );
   }

   if (!items || items.length === 0) {
      return (
         <div className="border-[3px] border-dashed border-[var(--color-ink)] p-12 text-center bg-[var(--color-surface)] shadow-[4px_4px_0_var(--color-ink)]">
            <h3 className="font-macro uppercase text-xl tracking-tight text-[var(--color-ink)] mb-2">
               WISHLIST KOSONG
            </h3>
            <p className="font-mono text-xs text-[var(--color-ink-muted)] max-w-md mx-auto mb-4">
               Belum ada item yang didaftarkan ke arsip wishlist. Tekan tombol "+ TAMBAH ITEM WISHLIST" untuk mulai mencatat.
            </p>
         </div>
      );
   }

   return (
      <div className="space-y-6">
         {/* Title & Mobile Toggle */}
         <div className="flex justify-between items-center border-b-2 border-[var(--color-ink)] pb-4">
            <div>
               <h2 className="font-macro uppercase text-xl sm:text-2xl text-[var(--color-ink)] tracking-tight">
                  DAFTAR WISHLIST BARANG
               </h2>
               <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)]">
                  TOTAL: {items.length} ITEM TERCATAT
               </span>
            </div>

            <button
               onClick={handleToggleFilters}
               className="md:hidden font-mono uppercase text-xs tracking-wider font-bold bg-[var(--color-surface)] text-[var(--color-ink)] border-2 border-[var(--color-ink)] px-3 py-2 shadow-[2px_2px_0_var(--color-ink)] flex items-center gap-1.5"
            >
               <Filter size={14} className="stroke-[2.5]" />
               <span>{showFilters ? "TUTUP FILTER" : "FILTER"}</span>
            </button>
         </div>

         {/* Filter Component */}
         <WishlistFilter
            onApplyFilters={handleApplyFilters}
            initialFilters={activeFilters}
            onToggleVisibility={handleToggleFilters}
            isVisible={showFilters}
         />

         {/* Filter status */}
         {filteredItems.length !== items.length && (
            <div className="border-2 border-[var(--color-ink)] bg-[var(--color-surface)] p-3 font-mono text-xs text-[var(--color-ink)] flex items-center justify-between">
               <span>
                  MENAMPILKAN <strong className="tabular-nums">{filteredItems.length}</strong> DARI {items.length} ITEM SESUAI KRITERIA
               </span>
            </div>
         )}

         {/* Grid Cards */}
         {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {filteredItems.map((item, index) => (
                  <WishlistCard
                     key={item._id || index}
                     item={item}
                     onUpdate={onUpdate}
                     onDelete={onDelete}
                     index={index}
                  />
               ))}
            </div>
         ) : (
            <div className="border-2 border-[var(--color-ink)] p-8 text-center font-mono text-xs uppercase text-[var(--color-ink-muted)]">
               [ TIDAK ADA HASIL WISHLIST YANG COCOK DENGAN FILTER ]
            </div>
         )}
      </div>
   );
};

export default Wishlists;