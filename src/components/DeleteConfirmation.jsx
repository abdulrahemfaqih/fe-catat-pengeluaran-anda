import React from "react";

const DeleteConfirmation = ({
   isOpen,
   onClose,
   onConfirm,
   title = "Konfirmasi Hapus",
   message = "Apakah Anda yakin ingin menghapus item ini?",
   itemName = "",
   isLoading = false,
}) => {
   if (!isOpen) return null;

   return (
      <div
         className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
         onClick={onClose}
      >
         <div
            className="bg-white dark:bg-gray-800 p-5 sm:p-6 rounded-xl w-full max-w-md border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform transition-all relative transition-colors duration-300"
            onClick={(e) => e.stopPropagation()}
         >
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-red-200 dark:bg-red-700 rounded-full border-4 border-black -z-10 transition-colors duration-300"></div>
            <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-yellow-200 dark:bg-yellow-700 rounded-full border-3 border-black -z-10 transition-colors duration-300"></div>

            <div className="flex items-center gap-3 mb-4">
               <div className="flex-shrink-0 bg-red-100 dark:bg-red-800 w-10 h-10 rounded-full border-3 border-black flex items-center justify-center transition-colors duration-300">
                  <span className="text-xl">🗑️</span>
               </div>
               <h3 className="text-xl font-bold dark:text-white transition-colors duration-300">{title}</h3>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/40 border-3 border-black rounded-lg p-3 mb-4 transition-colors duration-300">
               <p className="font-medium dark:text-white transition-colors duration-300">
                  {message}
                  {itemName && (
                     <span className="block mt-1 font-bold text-lg border-t-2 border-dashed border-black/30 dark:border-white/30 pt-1 transition-colors duration-300">
                        "{itemName}"
                     </span>
                  )}
               </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-5 sm:justify-end">
               <button
                  onClick={onClose}
                  className="order-2 sm:order-1 py-2 px-4 border-3 border-black bg-gray-100 dark:bg-gray-600 dark:text-white rounded-lg font-bold hover:bg-black hover:text-white dark:hover:bg-black dark:hover:text-gray-300 transition-all shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-colors duration-300"
               >
                  Batal
               </button>
               <button
                  onClick={onConfirm}
                  disabled={isLoading}
                  className="order-1 sm:order-2 py-2 px-4 border-3 border-black bg-red-200 dark:bg-red-700 dark:text-white rounded-lg font-bold hover:bg-red-300 dark:hover:bg-red-600 transition-all shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] disabled:opacity-70 disabled:cursor-not-allowed transition-colors duration-300"
               >
                  {isLoading ? (
                     <span className="flex items-center justify-center gap-2">
                        <svg
                           className="animate-spin h-4 w-4"
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 24 24"
                        >
                           <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                           ></circle>
                           <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                           ></path>
                        </svg>
                        Menghapus...
                     </span>
                  ) : (
                     "Ya, Hapus"
                  )}
               </button>
            </div>
         </div>
      </div>
   );
};