import React, { useState, useEffect } from "react";

const WishlistModal = ({ isOpen, onClose, onSave, item }) => {
   const [name, setName] = useState("");
   const [price, setPrice] = useState("");
   const [displayPrice, setDisplayPrice] = useState(""); // For formatted display
   const [description, setDescription] = useState("");
   const [purchaseLink, setPurchaseLink] = useState("");
   const [imageUrls, setImageUrls] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const [isValidImageUrl, setIsValidImageUrl] = useState(true);
   const [imageError, setImageError] = useState("");
   useEffect(() => {
      if (item) {
         // Set values with fallbacks
         setName(item.name || "");
         setPrice(item.price || "");
         setDisplayPrice(item.price ? item.price.toLocaleString("id-ID") : "");
         setDescription(item.description || "");
         setPurchaseLink(item.purchaseLink || "");

         // Handle imageUrls field that might not exist in document
         const imageUrl = item.imageUrls === undefined ? "" : item.imageUrls;
         setImageUrls(imageUrl);

         // Only validate if there's actually a URL
         if (imageUrl && imageUrl !== "") {
            validateImageUrl(imageUrl);
         } else {
            // Reset validation state for empty URL
            setIsValidImageUrl(true);
            setImageError("");
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
         setIsValidImageUrl(true);
         setImageError("");
      };

   // Enhanced function to validate image URL format with better null/undefined handling
   const validateImageUrl = (url) => {
      // Explicitly check for null, undefined, or empty string
      if (url === null || url === undefined || url === "") {
         setIsValidImageUrl(true); // These are valid since the field is optional
         setImageError("");
         return true;
      }

      try {
         // Ensure url is a string before using string methods
         const urlStr = String(url);

         // Empty after trimming is valid
         if (urlStr.trim() === "") {
            setIsValidImageUrl(true);
            setImageError("");
            return true;
         }

         // Check if it's a data URI for images
         if (urlStr.startsWith("data:image/")) {
            setIsValidImageUrl(true);
            setImageError("");
            return true;
         }

         // Check for common image file extensions
         const validExtensions = [
            ".jpg",
            ".jpeg",
            ".png",
            ".gif",
            ".webp",
            ".svg",
            ".bmp",
         ];

         const hasValidExtension = validExtensions.some((ext) =>
            urlStr.toLowerCase().includes(ext)
         );

         if (!hasValidExtension) {
            setIsValidImageUrl(false);
            setImageError("URL gambar tidak valid");
            return false;
         }

         setIsValidImageUrl(true);
         setImageError("");
         return true;
      } catch (error) {
         console.error("Error validating image URL:", error);
         setIsValidImageUrl(false);
         setImageError("URL gambar tidak valid");
         return false;
      }
   };

   const handleImageUrlChange = (e) => {
      const url = e.target.value || ""; // Ensure it's at least an empty string
      setImageUrls(url);

      // Only validate if there's content to validate
      if (url.trim() === "") {
         // Empty URLs are valid (field is optional)
         setIsValidImageUrl(true);
         setImageError("");
      } else {
         validateImageUrl(url);
      }
   };
      const handlePriceChange = (e) => {
         // Remove non-numeric characters for the actual value
         const numericValue = e.target.value.replace(/\D/g, "");

         // Update the actual value
         setPrice(numericValue ? parseFloat(numericValue) : "");

         // Update the displayed value with formatting
         setDisplayPrice(
            numericValue ? parseInt(numericValue, 10).toLocaleString("id-ID") : ""
         );
      };

   const handleSubmit = async (e) => {
      e.preventDefault();

      // Final validation before submitting, only if there's a URL
      if (imageUrls && imageUrls.trim() !== "" && !validateImageUrl(imageUrls)) {
         return; // Don't submit if image URL is invalid
      }

      setIsLoading(true);
      const newItem = {
         _id: item ? item._id : Date.now(),
         name,
         price: parseFloat(price),
         description,
         purchaseLink,
         // Only include imageUrls if it has content
         ...(imageUrls && imageUrls.trim() !== "" ? { imageUrls } : {})
      };

      try {
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

      return (
         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-96 md:w-104 border-3 border-black shadow-xl transform transition-all animate-fadeIn my-4 mx-2 max-h-[calc(100vh-2rem)] overflow-y-auto">
               <div className="flex justify-between items-center mb-4  pt-1 bg-white z-10">
                  <h2 className="text-2xl font-bold flex items-center">
                     <span className="inline-flex items-center justify-center w-8 h-8 rounded-full mr-2 bg-yellow-200 border-2 border-black">
                        {item ? "✏️" : "✨"}
                     </span>
                     {item ? "Update Item" : "Tambah Item Wishlist"}
                  </h2>
                  <button
                     onClick={handleClose}
                     className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors shrink-0 ml-2"
                  >
                     ×
                  </button>
               </div>

               <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                     <label className="block mb-1 font-medium">Nama</label>
                     <input
                        type="text"
                        className="w-full px-3 py-2 border-3 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nintendo Switch"
                        required
                     />
                  </div>

                  <div>
                     <label className="block mb-1 font-medium">Harga</label>
                     <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                           <span className="text-gray-700 font-medium">Rp</span>
                        </div>
                        <input
                           type="text"
                           className="w-full px-3 py-2 pl-10 border-3 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                           value={displayPrice}
                           onChange={handlePriceChange}
                           placeholder="3.000.000"
                           required
                        />
                     </div>
                  </div>

                  <div>
                     <label className="block mb-1 font-medium">Deskripsi</label>
                     <textarea
                        className="w-full px-3 py-2 border-3 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 shadow-[2px_2px_0px_rgba(0,0,0,1)] min-h-24"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Alasan mengapa saya ingin membelinya..."
                        required
                     ></textarea>
                  </div>

                  <div>
                     <label className="block mb-1 font-medium">
                        Link Pembelian
                     </label>
                     <input
                        type="url"
                        className="w-full px-3 py-2 border-3 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                        value={purchaseLink}
                        onChange={(e) => setPurchaseLink(e.target.value)}
                        placeholder="https://tokopedia.com/..."
                        required
                     />
                  </div>

                  <div>
                     <label className="block mb-1 font-medium">
                        URL Gambar (Opsional)
                     </label>
                     <input
                        type="url"
                        className={`w-full px-3 py-2 border-3 ${imageError ? "border-red-500" : "border-black"
                           } rounded-lg focus:outline-none focus:ring-2 ${imageError
                              ? "focus:ring-red-300"
                              : "focus:ring-yellow-300"
                           } shadow-[2px_2px_0px_rgba(0,0,0,1)]`}
                        value={imageUrls}
                        onChange={handleImageUrlChange}
                        placeholder="https://example.com/image.jpg"
                     />
                     {imageError && (
                        <div className="mt-2 text-red-500 text-sm flex items-center gap-2">
                           <span className="font-bold">⚠️</span>
                           {imageError}
                        </div>
                     )}
                  </div>

                  {imageUrls && isValidImageUrl && (
                     <div className="relative mt-2 rounded-lg overflow-hidden border-3 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                        <div className="absolute top-0 right-0 m-2">
                           <span className="px-2 py-1 bg-yellow-200 rounded-lg text-xs border-2 border-black shadow-[1px_1px_0px_rgba(0,0,0,1)]">
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
                                 "w-full h-48 object-contain bg-gray-100";
                           }}
                        />
                     </div>
                  )}

                  <div className="flex justify-end gap-3 pt-4">
                     <button
                        type="button"
                        className="px-4 py-2 border-3 border-black bg-gray-100 text-black font-bold rounded-xl hover:bg-black hover:text-white transition-all duration-300 shadow-[3px_3px_0px_rgba(0,0,0,1)]"
                        onClick={handleClose}
                     >
                        Batal
                     </button>
                     <button
                        type="submit"
                        className="px-4 py-2 border-3 border-black bg-yellow-200 text-black font-bold rounded-xl hover:bg-black hover:text-yellow-200 transition-all duration-300 shadow-[3px_3px_0px_rgba(0,0,0,1)]"
                        disabled={isLoading || (imageUrls && !isValidImageUrl)}
                     >
                        {isLoading ? "Menyimpan..." : "Simpan Item"}
                     </button>
                  </div>
               </form>
            </div>
         </div>
      );
   }

export default WishlistModal;
