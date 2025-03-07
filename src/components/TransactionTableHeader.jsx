import React from "react";

const TransactionTableHeader = () => {
   return (
      <thead>
         <tr className="bg-blue-100 dark:bg-blue-800 dark:text-white transition-colors duration-300">
            <th className="py-3 px-2 border-b-3 border-r-3 border-black text-sm sm:text-base font-bold w-12">
               No
            </th>
            <th className="py-3 px-4 border-b-3 border-r-3 border-black text-sm sm:text-base font-bold">
               Tanggal
            </th>
            <th className="py-3 px-4 border-b-3 border-r-3 border-black text-sm sm:text-base font-bold">
               Nama
            </th>
            <th className="py-3 px-4 border-b-3 border-r-3 border-black text-sm sm:text-base font-bold">
               Kategori
            </th>
            <th className="py-3 px-4 border-b-3 border-r-3 border-black text-sm sm:text-base font-bold">
               Nominal
            </th>
            <th className="py-3 px-4 border-b-3 border-black text-sm sm:text-base font-bold">
               Aksi
            </th>
         </tr>
      </thead>
   );
};

export default TransactionTableHeader;
