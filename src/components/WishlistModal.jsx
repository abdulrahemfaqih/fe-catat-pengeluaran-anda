import React, { useState, useEffect } from "react";

const WishlistModal = ({ isOpen, onClose, onSave, item }) => {
   const [name, setName] = useState("");
   const [price, setPrice] = useState("");
   const [displayPrice, setDisplayPrice] = useState("");
   const [description, setDescription] = useState("");
   const [purchaseLink, setPurchaseLink] = useState("");
   const [imageUrls, setImageUrls] = useState("");
   const [isLoading, setIsLoading] = useState(false);

   // Convert ANY value to string safely
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

            // Handle price
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

            // Handle imageUrls - don't use trim() or any string methods
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

         // Create item with sanitized values
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
         alert("Error saving item. Please try again.");
      } finally {
         setIsLoading(false);
      }
   };

   const handleClose = () => {
      resetForm();
      onClose();
   };

   if (!isOpen) return null;

   // Determine if we should show the image preview
   const hasImageUrl =
      imageUrls !== null && imageUrls !== undefined && imageUrls !== "";

   return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-96 md:w-104 border-3 border-black shadow-xl transform transition-all animate-fadeIn my-4 mx-2 max-h-[calc(100vh-2rem)] overflow-y-auto transition-colors duration-300">
            <div className="flex justify-between items-center mb-4 pt-1 bg-white dark:bg-gray-800 z-10 transition-colors duration-300">
               <h2 className="text-2xl font-bold flex items-center dark:text-white transition-colors duration-300">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full mr-2 bg-yellow-200 dark:bg-yellow-600 border-2 border-black transition-colors duration-300">
                     {item ? "✏️" : "✨"}
                  </span>
                  {item ? "Update Wishlist" : "Tambah Wishlist"}
               </h2>
               <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-white dark:text-white dark:hover:bg-black dark:hover:text-yellow-400 transition-colors shrink-0 ml-2"
               >
                  ×
               </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
               <div>
                  <label className="block mb-1 font-medium dark:text-white transition-colors duration-300">Nama</label>
                  <input
                     type="text"
                     className="w-full px-3 py-2 border-3 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:bg-gray-700 dark:text-white dark:focus:ring-yellow-500 transition-colors duration-300"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     placeholder="Nintendo Switch"
                     required
                  />
               </div>
               <div>
                  <label className="block mb-1 font-medium dark:text-white transition-colors duration-300">Harga</label>
                  <div className="relative">
                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-700 dark:text-gray-300 font-medium transition-colors duration-300">Rp</span>
                     </div>
                     <input
                        type="text"
                        className="w-full px-3 py-2 pl-10 border-3 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:bg-gray-700 dark:text-white dark:focus:ring-yellow-500 transition-colors duration-300"
                        value={displayPrice}
                        onChange={handlePriceChange}
                        placeholder="3.000.000"
                        required
                     />
                  </div>
               </div>
               <div>
                  <label className="block mb-1 font-medium dark:text-white transition-colors duration-300">Deskripsi</label>
                  <textarea
                     className="w-full px-3 py-2 border-3 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 shadow-[2px_2px_0px_rgba(0,0,0,1)] min-h-24 dark:bg-gray-700 dark:text-white dark:focus:ring-yellow-500 transition-colors duration-300"
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                     placeholder="Alasan mengapa saya ingin membelinya..."
                     required
                  ></textarea>
               </div>
               <div>
                  <label className="block mb-1 font-medium dark:text-white transition-colors duration-300">
                     Link Pembelian
                  </label>
                  <input
                     type="url"
                     className="w-full px-3 py-2 border-3 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:bg-gray-700 dark:text-white dark:focus:ring-yellow-500 transition-colors duration-300"
                     value={purchaseLink}
                     onChange={(e) => setPurchaseLink(e.target.value)}
                     placeholder="https://tokopedia.com/..."
                     required
                  />
               </div>
               <div>
                  <label className="block mb-1 font-medium dark:text-white transition-colors duration-300">
                     URL Gambar (Opsional)
                  </label>
                  <input
                     type="url"
                     className="w-full px-3 py-2 border-3 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:bg-gray-700 dark:text-white dark:focus:ring-yellow-500 transition-colors duration-300"
                     value={imageUrls}
                     onChange={(e) => setImageUrls(e.target.value)}
                     placeholder="https://example.com/image.jpg"
                  />
               </div>

               {/* Image preview - using a simple boolean check */}
               {hasImageUrl && (
                  <div className="relative mt-2 rounded-lg overflow-hidden border-3 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                     <div className="absolute top-0 right-0 m-2">
                        <span className="px-2 py-1 bg-yellow-200 dark:bg-yellow-600 rounded-lg text-xs border-2 border-black shadow-[1px_1px_0px_rgba(0,0,0,1)] transition-colors duration-300">
                           Preview
                        </span>
                     </div>
                     <img
                        src={imageUrls}
                        alt="Preview"
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                           e.target.onerror = null;
                           e.target.src =
                              "https://via.placeholder.com/400x300?text=Gambar+Tidak+Tersedia";
                           e.target.className =
                              "w-full h-48 object-contain bg-gray-100 dark:bg-gray-700 transition-colors duration-300";
                        }}
                     />
                  </div>
               )}

               <div className="flex justify-end gap-3 pt-4">
                  <button
                     type="button"
                     className="px-4 py-2 border-3 border-black bg-gray-100 dark:bg-gray-600 text-black dark:text-white font-bold rounded-xl hover:bg-black hover:text-white dark:hover:bg-black dark:hover:text-gray-300 transition-all duration-300 shadow-[3px_3px_0px_rgba(0,0,0,1)]"
                     onClick={handleClose}
                  >
                     Batal
                  </button>
                  <button
                     type="submit"
                     className="px-4 py-2 border-3 border-black bg-yellow-200 dark:bg-yellow-600 text-black dark:text-white font-bold rounded-xl hover:bg-black hover:text-yellow-200 dark:hover:bg-black dark:hover:text-yellow-400 transition-all duration-300 shadow-[3px_3px_0px_rgba(0,0,0,1)]"
                     disabled={isLoading}
                  >
                     {isLoading ? "Menyimpan..." : "Simpan Item"}
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default WishlistModal;