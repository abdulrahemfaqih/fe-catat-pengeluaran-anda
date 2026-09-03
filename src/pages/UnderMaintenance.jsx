import React from "react";
import { Wrench } from "lucide-react";

const UnderMaintenancePage = () => {
   return (
      <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-ink)] flex items-center justify-center p-6">
         <div className="max-w-lg w-full bg-[var(--color-surface)] border-[3px] border-[var(--color-ink)] p-8 shadow-[6px_6px_0_var(--color-ink)]">
            <div className="flex items-center gap-2 mb-4 text-[var(--color-warning)] pb-2 border-b-2 border-[var(--color-ink)]">
               <Wrench size={22} className="stroke-[2.5]" />
               <span className="font-mono text-xs uppercase tracking-widest font-bold">
                  SYSTEM // UNDER MAINTENANCE
               </span>
            </div>

            <h1 className="font-macro uppercase text-2xl sm:text-3xl tracking-tight mb-4">
               SEDANG DALAM PEMELIHARAAN
            </h1>

            <div className="space-y-4 font-mono text-xs text-[var(--color-ink)] mb-6">
               <div className="border border-[var(--color-ink)]/20 p-3 bg-[var(--color-bg)]">
                  <span className="font-bold text-[var(--color-ink-muted)] block mb-1">
                     STATUS OPERASI:
                  </span>
                  <p>
                     Sistem sedang mengalami pembaruan infrastruktur berkala untuk meningkatkan keandalan sistem pencatatan.
                  </p>
               </div>

               <div className="border border-[var(--color-ink)]/20 p-3 bg-[var(--color-bg)]">
                  <span className="font-bold text-[var(--color-ink-muted)] block mb-1">
                     PERKIRAAN WAKTU:
                  </span>
                  <p>
                     Layanan akan kembali beroperasi dalam waktu singkat. Silakan muat ulang halaman beberapa saat lagi.
                  </p>
               </div>
            </div>

            <div className="font-mono text-[11px] text-center text-[var(--color-ink-muted)] uppercase border-t border-[var(--color-ink)]/15 pt-3">
               KEUANGAN SYSTEM // SERVICE DESK: ABDULRAHEMFAQIH.WORKS
            </div>
         </div>
      </div>
   );
};

export default UnderMaintenancePage;
