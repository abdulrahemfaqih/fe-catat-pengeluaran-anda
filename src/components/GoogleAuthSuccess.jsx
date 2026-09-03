import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const GoogleAuthSuccess = () => {
   const { processGoogleAuthSuccess } = useContext(AuthContext);
   const navigate = useNavigate();

   useEffect(() => {
      const success = processGoogleAuthSuccess();
      if (success) {
         navigate("/");
      } else {
         navigate("/login?error=auth_processing_failed");
      }
   }, [processGoogleAuthSuccess, navigate]);

   return (
      <div className="flex items-center justify-center min-h-screen bg-[var(--color-bg)] p-4">
         <div className="text-center p-8 border-[3px] border-[var(--color-ink)] bg-[var(--color-surface)] shadow-[6px_6px_0_var(--color-ink)] max-w-sm w-full">
            <span className="w-3 h-3 bg-[var(--color-accent)] animate-ping inline-block mb-4" />
            <h2 className="font-macro uppercase text-lg text-[var(--color-ink)] tracking-tight">
               MENGOTENTIKASI...
            </h2>
            <p className="font-mono text-xs text-[var(--color-ink-muted)] mt-2 uppercase tracking-wide">
               Sinkronisasi sesi Google Anda
            </p>
         </div>
      </div>
   );
};

export default GoogleAuthSuccess;