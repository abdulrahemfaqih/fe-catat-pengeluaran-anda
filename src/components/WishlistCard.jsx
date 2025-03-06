import React, { useState } from "react";
import WishlistDeleteConfirmation from "./WishlistDeleteConfirmation";

// Light mode colors
const colors = [
   "bg-red-100",
   "bg-yellow-100",
   "bg-green-100",
   "bg-blue-100",
   "bg-indigo-100",
   "bg-purple-100",
   "bg-pink-100",
   "bg-orange-100",
   "bg-amber-100",
   "bg-lime-100",
   "bg-cyan-100",
];

// Dark mode equivalent colors
const darkColors = [
   "dark:bg-red-900/50",
   "dark:bg-yellow-900/50",
   "dark:bg-green-900/50",
   "dark:bg-blue-900/50",
   "dark:bg-indigo-900/50",
   "dark:bg-purple-900/50",
   "dark:bg-pink-900/50",
   "dark:bg-orange-900/50",
   "dark:bg-amber-900/50",
   "dark:bg-lime-900/50",
   "dark:bg-cyan-900/50",
];

const getRandomColor = (index) => {
   return index % colors.length;
};

const generateRandomString = (length) => {
   const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
   let result = "";
   for (let i = 0; i < length; i++) {
      result += characters.charAt(
         Math.floor(Math.random() * characters.length)
      );
   }
   return result;
};

const WishlistCard = ({ item, onUpdate, onDelete, index }) => {
   const colorIndex = getRandomColor(index);
   const lightColor = colors[colorIndex];
   const darkColor = darkColors[colorIndex];

   const randomString = generateRandomString(10);
   // Add state for delete confirmation
   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
   const [isDeleting, setIsDeleting] = useState(false);

   // Helper function to get badge icon based on price range
   const getBadgeIcon = (price) => {
      if (price < 100000) return "🟢";
      if (price < 500000) return "🟡";
      if (price < 1000000) return "🟠";
      return "🔴";
   };

   // Handle delete with confirmation
   const confirmDelete = () => {
      setShowDeleteConfirm(true);
   };

   const handleDelete = async () => {
      setIsDeleting(true);
      try {
         await onDelete(item._id);
         // Delete successful
      } catch (error) {
         console.error("Error deleting wishlist item", error);
      } finally {
         setIsDeleting(false);
         setShowDeleteConfirm(false);
      }
   };

   return (
      <>
         <div
            className={`relative p-5 rounded-xl h-full border-4 border-black ${lightColor} ${darkColor} shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:-translate-y-2 overflow-hidden`}
         >
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-12 h-12 bg-white/30 dark:bg-white/10 rounded-full border-2 border-black z-0 transition-colors duration-300"></div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-black/10 dark:bg-black/20 rounded-full border-2 border-black z-0 transition-colors duration-300"></div>

            <div className="absolute -top-2 -right-2 rounded-full bg-white dark:bg-gray-800 border-4 border-black h-10 w-10 flex items-center justify-center font-bold z-10 dark:text-white transition-colors duration-300">
               #{index + 1}
            </div>

            {/* Price Badge */}
            <div className="absolute top-3 left-3 px-3 py-1 bg-white dark:bg-gray-800 border-3 border-black rounded-full flex items-center gap-1 font-bold text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] z-20 dark:text-white transition-colors duration-300">
               <span>{getBadgeIcon(item.price)}</span>
               <span>Rp {item.price.toLocaleString("id-ID")}</span>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row gap-5">
               <div className="w-full md:w-1/2 h-[200px] md:h-[250px] border-3 border-black rounded-xl overflow-hidden bg-white dark:bg-gray-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] transition-colors duration-300">
                  <div className="relative w-full h-full">
                     <img
                        src={
                           item.imageUrls ||
                           "https://via.placeholder.com/400?text=No+Image"
                        }
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                           e.target.onerror = null;
                           e.target.src =
                              "https://via.placeholder.com/400?text=Image+Error";
                        }}
                     />
                  </div>
               </div>

               {/* Content Section */}
               <div className="flex flex-col w-full md:w-1/2">
                  <div className="bg-white dark:bg-gray-800 border-3 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] h-full transition-colors duration-300">
                     <h2 className="text-xl font-bold text-black dark:text-white mb-3 border-b-3 border-black pb-2 flex items-center gap-2 transition-colors duration-300">
                        <span className="text-2xl">✨</span>
                        {item.name}
                     </h2>

                     <div className="space-y-4 flex-grow">
                        <div className="flex flex-col">
                           <span className="text-black dark:text-white font-bold flex items-center gap-1 mb-1 transition-colors duration-300">
                              <span className="inline-flex items-center justify-center w-5 h-5 min-w-5 bg-yellow-200 dark:bg-yellow-700 rounded-full border-2 border-black text-xs font-bold transition-colors duration-300">
                                 $
                              </span>
                              Harga:
                           </span>
                           <div className="bg-yellow-50 dark:bg-yellow-900/50 px-3 py-2 rounded-lg border-2 border-black transition-colors duration-300">
                              <span className="text-gray-900 dark:text-gray-100 font-semibold transition-colors duration-300">
                                 Rp {item.price.toLocaleString("id-ID")}
                              </span>
                           </div>
                        </div>

                        <div className="flex flex-col">
                           <span className="text-black dark:text-white font-bold flex items-center gap-1 mb-1 transition-colors duration-300">
                              <span className="inline-flex items-center justify-center w-5 h-5 min-w-5 bg-blue-200 dark:bg-blue-700 rounded-full border-2 border-black text-xs font-bold transition-colors duration-300">
                                 📝
                              </span>
                              Deskripsi:
                           </span>
                           <div className="bg-blue-50 dark:bg-blue-900/50 px-3 py-2 rounded-lg border-2 border-black max-h-[80px] overflow-y-auto transition-colors duration-300">
                              <span className="text-gray-900 dark:text-gray-100 transition-colors duration-300">
                                 {item.description}
                              </span>
                           </div>
                        </div>

                        <div className="flex flex-col">
                           <span className="text-black dark:text-white font-bold flex items-center gap-1 mb-1 transition-colors duration-300">
                              <span className="inline-flex items-center justify-center w-5 h-5 min-w-5 bg-green-200 dark:bg-green-700 rounded-full border-2 border-black text-xs font-bold transition-colors duration-300">
                                 🔗
                              </span>
                              Link:
                           </span>
                           <a
                              href={item.purchaseLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-green-50 dark:bg-green-900/50 px-3 py-2 rounded-lg border-2 border-black inline-block hover:bg-green-100 dark:hover:bg-green-800/60 transition-colors break-all text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-200"
                           >
                              {randomString}
                           </a>
                        </div>
                     </div>

                     <div className="flex gap-3 mt-4 pt-3 border-t-3 border-black">
                        <button
                           className="px-4 py-2 border-3 border-black text-black dark:text-white rounded-xl bg-yellow-200 dark:bg-yellow-700 font-bold flex-1 hover:bg-black hover:text-yellow-200 dark:hover:bg-black dark:hover:text-yellow-400 transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] flex items-center justify-center gap-2"
                           onClick={() => onUpdate(item)}
                        >
                           <span className="text-sm">✏️</span>
                           Edit
                        </button>
                        <button
                           className="px-4 py-2 border-3 border-black text-black dark:text-white rounded-xl bg-red-100 dark:bg-red-700 font-bold flex-1 hover:bg-black hover:text-red-100 dark:hover:bg-black dark:hover:text-red-400 transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] flex items-center justify-center gap-2"
                           onClick={confirmDelete}
                        >
                           <span className="text-sm">🗑️</span>
                           Delete
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Delete Confirmation Modal */}
         <WishlistDeleteConfirmation
            isOpen={showDeleteConfirm}
            onClose={() => setShowDeleteConfirm(false)}
            onConfirm={handleDelete}
            wishlistItem={item}
            isLoading={isDeleting}
         />
      </>
   );
};

export default WishlistCard;