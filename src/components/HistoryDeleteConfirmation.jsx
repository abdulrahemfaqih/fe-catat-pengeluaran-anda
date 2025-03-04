import React from "react";

const HistoryDeleteConfirmation = ({
   isOpen,
   onClose,
   onConfirm,
   historyData, // Contains month and year
   isLoading = false,
}) => {
   if (!isOpen) return null;

   // Helper function to get month name
   const getMonthName = (month) => {
      const months = [
         "Januari",
         "Februari",
         "Maret",
         "April",
         "Mei",
         "Juni",
         "Juli",
         "Agustus",
         "September",
         "Oktober",
         "November",
         "Desember",
      ];
      return months[month - 1];
   };

   return (
      <div
         className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4 animate-fadeIn"
         onClick={onClose}
      >
         <div
            className="bg-white p-5 sm:p-6 rounded-xl w-full max-w-md border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform transition-all relative"
            onClick={(e) => e.stopPropagation()}
         >
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-red-200 rounded-full border-4 border-black -z-10"></div>
            <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-yellow-200 rounded-full border-3 border-black -z-10"></div>

            <div className="flex items-center gap-3 mb-4">
               <div className="flex-shrink-0 bg-red-100 w-10 h-10 rounded-full border-3 border-black flex items-center justify-center">
                  <span className="text-xl">🗑️</span>
               </div>
               <h3 className="text-xl font-bold">Hapus History</h3>
            </div>

            <div className="bg-yellow-50 border-3 border-black rounded-lg p-3 mb-4">
               <p className="font-medium">
                  Yakin ingin menghapus history pengeluaran ini?
                  {historyData && (
                     <span className="block mt-2 font-bold border-t-2 border-dashed border-black/30 pt-2 text-center">
                        <span className="text-xl">
                           {getMonthName(historyData.month)} {historyData.year}
                        </span>
                     </span>
                  )}
               </p>

               <div className="mt-3 bg-white border-2 border-black p-2 rounded-lg">
                  <p className="text-sm text-center">
                     Data yang dihapus tidak dapat dikembalikan.
                  </p>
               </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-5 sm:justify-end">
               <button
                  onClick={onClose}
                  className="order-2 sm:order-1 py-2 px-4 border-3 border-black bg-gray-100 rounded-lg font-bold hover:bg-black hover:text-white transition-all shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px]"
               >
                  Batal
               </button>
               <button
                  onClick={onConfirm}
                  disabled={isLoading}
                  className="order-1 sm:order-2 py-2 px-4 border-3 border-black bg-red-200 rounded-lg font-bold hover:bg-red-300 transition-all shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] disabled:opacity-70 disabled:cursor-not-allowed"
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

export default HistoryDeleteConfirmation;
