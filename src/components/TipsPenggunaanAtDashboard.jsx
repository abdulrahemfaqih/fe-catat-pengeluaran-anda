import React, { useState } from "react";
import { ChevronDown, ChevronUp, BookOpen, X } from "lucide-react";

export default function TipsPenggunaanAtDashboard() {
   const [isOpen, setIsOpen] = useState(false);

   const tips = [
      {
         step: "01",
         title: "SETUP BUDGET & PEMASUKAN",
         desc: "Tentukan nominal pemasukan bulanan dan alokasikan budget per kategori sesuai target.",
      },
      {
         step: "02",
         title: "CATAT TRANSAKSI HARIAN",
         desc: "Setiap pengeluaran langsung dicatat agar grafik meter kategori akurat secara real-time.",
      },
      {
         step: "03",
         title: "ARSIP AKHIR BULAN",
         desc: "Simpan riwayat pengeluaran setiap akhir bulan agar histori tersimpan rapi dalam arsip tahunan.",
      },
      {
         step: "04",
         title: "MANAJEMEN WISHLIST",
         desc: "Gunakan menu Wishlist untuk merencanakan belanja barang impian dengan disiplin finansial.",
      },
   ];

   return (
      <div className="w-full">
         <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full font-mono uppercase text-xs font-bold tracking-wider py-2 px-3 border-2 border-[var(--color-ink)] bg-[var(--color-surface)] text-[var(--color-ink)] flex items-center justify-between shadow-[2px_2px_0_var(--color-ink)] hover:bg-[var(--color-bg)] transition-all"
         >
            <span className="flex items-center gap-2">
               <BookOpen size={14} className="stroke-[2]" />
               <span>PANDUAN PENGGUNAAN</span>
            </span>
            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
         </button>

         {isOpen && (
            <div className="mt-2 border-2 border-[var(--color-ink)] bg-[var(--color-surface)] p-4 space-y-3 animate-fadeIn">
               {tips.map((item) => (
                  <div
                     key={item.step}
                     className="flex items-start gap-3 pb-2 border-b border-[var(--color-ink)]/10 last:border-b-0 last:pb-0"
                  >
                     <span className="font-mono text-xs font-bold bg-[var(--color-accent)] text-[var(--color-accent-ink)] border border-[var(--color-ink)] px-1.5 py-0.5 shrink-0">
                        {item.step}
                     </span>
                     <div>
                        <h4 className="font-mono uppercase text-xs font-bold text-[var(--color-ink)] tracking-wider">
                           {item.title}
                        </h4>
                        <p className="font-body text-xs text-[var(--color-ink-muted)] mt-0.5">
                           {item.desc}
                        </p>
                     </div>
                  </div>
               ))}
            </div>
         )}
      </div>
   );
}
