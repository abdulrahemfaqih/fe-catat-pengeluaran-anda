import React, { useState, useEffect } from "react";

const DataLoadingIndicator = ({ isLoading, initialDelay = 1000 }) => {
   const [showIndicator, setShowIndicator] = useState(false);
   const [elapsedTime, setElapsedTime] = useState(0);
   const [message, setMessage] = useState("MEMUAT DATA...");

   useEffect(() => {
      const timer = setTimeout(() => {
         if (isLoading) {
            setShowIndicator(true);
         }
      }, initialDelay);

      return () => clearTimeout(timer);
   }, [isLoading, initialDelay]);

   useEffect(() => {
      let interval;

      if (showIndicator && isLoading) {
         interval = setInterval(() => {
            setElapsedTime((prev) => {
               const newTime = prev + 1;
               if (newTime > 10) {
                  setMessage("MENGAMBIL DATA DARI SERVER, MOHON TUNGGU...");
               } else if (newTime > 5) {
                  setMessage("MENYINKRONKAN INFORMASI KEUANGAN ANDA...");
               }
               return newTime;
            });
         }, 1000);
      }

      return () => {
         if (interval) clearInterval(interval);
      };
   }, [showIndicator, isLoading]);

   useEffect(() => {
      if (!isLoading) {
         const hideTimer = setTimeout(() => {
            setShowIndicator(false);
         }, 400);

         return () => clearTimeout(hideTimer);
      }
   }, [isLoading]);

   if (!showIndicator) return null;

   return (
      <div className="mb-6 border-2 border-[var(--color-ink)] bg-[var(--color-surface)] p-4 shadow-[4px_4px_0_var(--color-ink)] animate-fadeIn font-mono">
         <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[var(--color-accent)] animate-ping shrink-0" />
            <div className="flex-1">
               <h3 className="text-xs uppercase font-bold text-[var(--color-ink)] tracking-wider mb-1">
                  {message}
               </h3>
               <div className="w-full bg-[var(--color-bg)] border border-[var(--color-ink)] h-2 overflow-hidden">
                  <div className="bg-[var(--color-accent)] h-full w-2/3 animate-pulse" />
               </div>
            </div>
         </div>
      </div>
   );
};

export default DataLoadingIndicator;