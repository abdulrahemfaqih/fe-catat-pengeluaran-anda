import React from "react";

const UnderMaintenancePage = () => {
   return (
      <div className="min-h-screen bg-yellow-50 flex items-center justify-center p-6">
         <div className="max-w-lg w-full bg-white rounded-xl border-4 border-black p-8 shadow-[8px_8px_0px_rgba(0,0,0,1)]">
            <div className="relative">
               <div className="absolute -top-16 -right-12 h-28 w-28 bg-blue-100 rounded-full border-4 border-black flex items-center justify-center transform rotate-12">
                  <span className="text-4xl">🛠️</span>
               </div>

               <h1 className="text-3xl font-bold mb-2">Sedang Perbaikan!</h1>
               <div className="w-full h-2 bg-black mb-6"></div>

               <div className="space-y-6">
                  <div className="flex items-start space-x-3">
                     <span className="text-2xl">👷‍♀️</span>
                     <p className="text-lg">
                        Mohon maaf, aplikasi sedang dalam perbaikan untuk
                        meningkatkan pengalaman Anda!
                     </p>
                  </div>

                  <div className="flex items-start space-x-3">
                     <span className="text-2xl">⏰</span>
                     <p className="text-lg">
                        Kami akan segera kembali dengan fitur yang lebih baik.
                     </p>
                  </div>

                  <div className="flex items-start space-x-3 mt-4">
                     <span className="text-2xl">📅</span>
                     <p className="text-lg">Silakan kembali lagi nanti.</p>
                  </div>
                  <div className="border-2 border-black border-dashed p-4 bg-yellow-100 rounded-lg">
                     <p className="font-medium text-center">
                        Terima kasih atas kesabaran Anda!
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default UnderMaintenancePage;
