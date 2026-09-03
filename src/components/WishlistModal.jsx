import React, { useState, useEffect } from "react";
import { X, Check } from "lucide-react";

const WishlistModal = ({ isOpen, onClose, onSave, item }) => {
   const [name, setName] = useState("");
   const [price, setPrice] = useState("");
   const [displayPrice, setDisplayPrice] = useState("");
   const [description, setDescription] = useState("");
   const [purchaseLink, setPurchaseLink] = useState("");
   const [imageUrls, setImageUrls] = useState("");
   const [isLoading, setIsLoading] = useState(false);

   const safeToString = (value) => {
      try {
         if (value === null || value === undefined) return "";
         return String(value);
      } catch (e) {
         console.error("Error converting to string:", e);
         return "";
      }
   };

   useEffect(() => {
      if (item) {
         try {
            setName(safeToString(item.name));

            if (item.price !== undefined && item.price !== null) {
               const priceValue = parseFloat(item.price);
               if (!isNaN(priceValue)) {
                  setPrice(priceValue);
                  setDisplayPrice(priceValue.toLocaleString("id-ID"));
               } else {
                  setPrice("");
                  setDisplayPrice("");
               }
            } else {
               setPrice("");
               setDisplayPrice("");
            }

            setDescription(safeToString(item.description));
            setPurchaseLink(safeToString(item.purchaseLink));
            setImageUrls(safeToString(item.imageUrls));
         } catch (error) {
            console.error("Error setting form values:", error);
            resetForm();
         }
      } else {
         resetForm();
      }
   }, [item]);

   const resetForm = () => {
      setName("");
      setPrice("");
      setDisplayPrice("");
      setDescription("");
      setPurchaseLink("");
      setImageUrls("");
   };

   const handlePriceChange = (e) => {
      try {
         const numericValue = e.target.value.replace(/\D/g, "");
         setPrice(numericValue ? parseFloat(numericValue) : "");
         setDisplayPrice(
            numericValue
               ? parseInt(numericValue, 10).toLocaleString("id-ID")
               : ""
         );
      } catch (error) {
         console.error("Error in handlePriceChange:", error);
         setPrice("");
         setDisplayPrice("");
      }
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         setIsLoading(true);
         const newItem = {
            _id: item ? item._id : Date.now(),
            name: safeToString(name),
            price: typeof price === "number" ? price : 0,
            description: safeToString(description),
            purchaseLink: safeToString(purchaseLink),
            imageUrls: safeToString(imageUrls),
         };

         onSave(newItem);
         resetForm();
         onClose();
      } catch (error) {
         console.error("Error saving wishlist item:", error);
      } finally {
         setIsLoading(false);
      }
   };

   const handleClose = () => {
      resetForm();
      onClose();
   };

   if (!isOpen) return null;

   const hasImageUrl = Boolean(imageUrls && imageUrls.trim() !== "");

   return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fadeIn">
         <div className="bg-[var(--color-surface)] border-[3px] border-[var(--color-ink)] shadow-[8px_8px_0_var(--color-ink)] w-full max-w-lg max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b-[3px] border-[var(--color-ink)] flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-[var(--color-accent)] border border-[var(--color-ink)]" />
                  <h2 className="font-macro uppercase text-base sm:text-lg tracking-tight text-[var(--color-ink)]">
                     {item ? "EDIT ITEM WISHLIST" : "TAMBAH ITEM WISHLIST"}
                  </h2>
               </div>

               <button
                  onClick={handleClose}
                  className="w-8 h-8 border-2 border-[var(--color-ink)] bg-[var(--color-surface)] text-[var(--color-ink)] flex items-center justify-center hover:bg-[var(--color-ink)] hover:text-[var(--color-bg)] transition-colors"
                  aria-label="Tutup"
               >
                  <X size={18} className="stroke-[2.5]" />
               </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
               {/* Name */}
               <div>
                  <label className="block mb-1 font-mono uppercase text-[11px] font-bold text-[var(--color-ink-muted)] tracking-wider">
                     NAMA BARANG
                  </label>
                  <input
                     type="text"
                     className="w-full border-2 border-[var(--color-ink)] bg-[var(--color-surface)] text-[var(--color-ink)] p-2 font-body text-sm focus:outline-2 focus:outline-[var(--color-accent)] focus:outline-offset-2"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     placeholder="Misal: Mechanical Keyboard Keychron V1"
                     required
                  />
               </div>

               {/* Price */}
               <div>
                  <label className="block mb-1 font-mono uppercase text-[11px] font-bold text-[var(--color-ink-muted)] tracking-wider">
                     ESTIMASI HARGA
                  </label>
                  <div className="relative">
                     <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs font-bold text-[var(--color-ink-muted)]">
                        RP
                     </span>
                     <input
                        type="text"
                        className="w-full border-2 border-[var(--color-ink)] bg-[var(--color-surface)] text-[var(--color-ink)] p-2 pl-10 font-mono text-sm tabular-nums focus:outline-2 focus:outline-[var(--color-accent)] focus:outline-offset-2"
                        value={displayPrice}
                        onChange={handlePriceChange}
                        placeholder="0"
                        required
                     />
                  </div>
               </div>

               {/* Description */}
               <div>
                  <label className="block mb-1 font-mono uppercase text-[11px] font-bold text-[var(--color-ink-muted)] tracking-wider">
                     CATATAN / ALASAN PEMBELIAN
                  </label>
                  <textarea
                     className="w-full border-2 border-[var(--color-ink)] bg-[var(--color-surface)] text-[var(--color-ink)] p-2 font-body text-xs min-h-20 focus:outline-2 focus:outline-[var(--color-accent)] focus:outline-offset-2"
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                     placeholder="Tuliskan catatan detail kebutuhan atau target tanggal pembelian..."
                     required
                  />
               </div>

               {/* Purchase Link */}
               <div>
                  <label className="block mb-1 font-mono uppercase text-[11px] font-bold text-[var(--color-ink-muted)] tracking-wider">
                     LINK TOKO / PRODUK
                  </label>
                  <input
                     type="url"
                     className="w-full border-2 border-[var(--color-ink)] bg-[var(--color-surface)] text-[var(--color-ink)] p-2 font-mono text-xs focus:outline-2 focus:outline-[var(--color-accent)] focus:outline-offset-2"
                     value={purchaseLink}
                     onChange={(e) => setPurchaseLink(e.target.value)}
                     placeholder="https://tokopedia.com/..."
                     required
                  />
               </div>

               {/* Image URL */}
               <div>
                  <label className="block mb-1 font-mono uppercase text-[11px] font-bold text-[var(--color-ink-muted)] tracking-wider">
                     URL FOTO BARANG (OPSIONAL)
                  </label>
                  <input
                     type="url"
                     className="w-full border-2 border-[var(--color-ink)] bg-[var(--color-surface)] text-[var(--color-ink)] p-2 font-mono text-xs focus:outline-2 focus:outline-[var(--color-accent)] focus:outline-offset-2"
                     value={imageUrls}
                     onChange={(e) => setImageUrls(e.target.value)}
                     placeholder="https://images.unsplash.com/..."
                  />
               </div>

               {/* Preview */}
               {hasImageUrl && (
                  <div className="border-2 border-[var(--color-ink)] p-2 bg-[var(--color-bg)]">
                     <span className="font-mono text-[10px] uppercase font-bold text-[var(--color-ink-muted)] block mb-1">
                        PREVIEW FOTO:
                     </span>
                     <img
                        src={imageUrls}
                        alt="Preview"
                        className="w-full h-36 object-cover border border-[var(--color-ink)]"
                        onError={(e) => {
                           e.target.onerror = null;
                           e.target.style.display = "none";
                        }}
                     />
                  </div>
               )}

               {/* Action Buttons */}
               <div className="flex justify-end gap-3 pt-3 border-t border-[var(--color-ink)]/15">
                  <button
                     type="button"
                     onClick={handleClose}
                     className="font-mono uppercase text-xs tracking-wider font-bold bg-[var(--color-surface)] text-[var(--color-ink)] border-2 border-[var(--color-ink)] px-4 py-2 hover:bg-[var(--color-bg)] transition-colors"
                  >
                     BATAL
                  </button>

                  <button
                     type="submit"
                     disabled={isLoading}
                     className="font-mono uppercase text-xs tracking-wider font-bold bg-[var(--color-accent)] text-[var(--color-accent-ink)] border-2 border-[var(--color-ink)] px-5 py-2 shadow-[3px_3px_0_var(--color-ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_var(--color-ink)] active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-40 transition-all flex items-center gap-1.5"
                  >
                     <Check size={14} className="stroke-[3]" />
                     <span>{isLoading ? "MENYIMPAN..." : "SIMPAN ITEM"}</span>
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default WishlistModal;