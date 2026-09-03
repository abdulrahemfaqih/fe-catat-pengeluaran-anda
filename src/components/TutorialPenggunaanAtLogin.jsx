import React from "react";
import { X, BookOpen, Check } from "lucide-react";

export default function TutorialPenggunaanAtLogin({ setShowTutorial }) {
   const steps = [
      {
         num: "01",
         title: "REGISTRASI AKUN",
         desc: "Buat akun baru menggunakan nama lengkap, email aktif, dan password minimal 6 karakter. Anda juga dapat mendaftar langsung menggunakan akun Google.",
      },
      {
         num: "02",
         title: "SETUP PEMASUKAN & TARGET",
         desc: "Setelah masuk ke dashboard, masukkan estimasi pemasukan bulanan dan tetapkan batas budget per kategori.",
      },
      {
         num: "03",
         title: "TRANSAKSI HARIAN",
         desc: "Catat setiap transaksi pengeluaran. Meter konsumsi budget akan otomatis terisi secara visual sesuai persentase.",
      },
      {
         num: "04",
         title: "ARSIP AKHIR BULAN",
         desc: "Saat periode bulan berakhir, tekan tombol 'ARSIPKAN PENGELUARAN' untuk membukukan laporan bulanan ke dalam arsip historis permanen.",
      },
      {
         num: "05",
         title: "WISHLIST & PERENCANAAN",
         desc: "Buka tab Wishlist untuk mencatat barang impian lengkap dengan harga, catatan, dan tautan toko online.",
      },
   ];

   return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fadeIn">
         <div className="bg-[var(--color-surface)] border-[3px] border-[var(--color-ink)] shadow-[8px_8px_0_var(--color-ink)] w-full max-w-lg max-h-[85vh] flex flex-col">
            {/* Header */}
            <div className="p-4 sm:p-5 border-b-[3px] border-[var(--color-ink)] flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <BookOpen size={18} className="stroke-[2.5] text-[var(--color-ink)]" />
                  <h2 className="font-macro uppercase text-base sm:text-lg tracking-tight text-[var(--color-ink)]">
                     PANDUAN PENGGUNAAN
                  </h2>
               </div>

               <button
                  onClick={() => setShowTutorial(false)}
                  className="w-8 h-8 border-2 border-[var(--color-ink)] bg-[var(--color-surface)] text-[var(--color-ink)] flex items-center justify-center hover:bg-[var(--color-ink)] hover:text-[var(--color-bg)] transition-colors"
                  aria-label="Tutup"
               >
                  <X size={18} className="stroke-[2.5]" />
               </button>
            </div>

            {/* Body */}
            <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4 font-mono text-xs">
               <p className="font-body text-xs text-[var(--color-ink-muted)]">
                  KEUANGAN adalah aplikasi pelacak keuangan personal berbasis prinsip disiplin anggaran dan pencatatan kas sistematis.
               </p>

               <div className="space-y-3">
                  {steps.map((step) => (
                     <div
                        key={step.num}
                        className="border-2 border-[var(--color-ink)] bg-[var(--color-surface)] p-3 flex gap-3"
                     >
                        <span className="font-mono text-xs font-bold bg-[var(--color-accent)] text-[var(--color-accent-ink)] border border-[var(--color-ink)] px-1.5 py-0.5 self-start">
                           {step.num}
                        </span>
                        <div>
                           <h4 className="font-mono uppercase text-xs font-bold text-[var(--color-ink)] tracking-wider">
                              {step.title}
                           </h4>
                           <p className="font-body text-xs text-[var(--color-ink)] mt-0.5">
                              {step.desc}
                           </p>
                        </div>
                     </div>
                  ))}
               </div>

               <div className="p-3 border border-[var(--color-ink)] bg-[var(--color-bg)] text-[11px] text-[var(--color-ink-muted)]">
                  Bantuan & Pertanyaan: hubungi kontak di{" "}
                  <a
                     href="https://abdulrahemfaqih.works"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="text-[var(--color-ink)] underline font-bold"
                  >
                     abdulrahemfaqih.works
                  </a>
               </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t-2 border-[var(--color-ink)] flex justify-end">
               <button
                  onClick={() => setShowTutorial(false)}
                  className="font-mono uppercase text-xs tracking-wider font-bold bg-[var(--color-accent)] text-[var(--color-accent-ink)] border-2 border-[var(--color-ink)] px-5 py-2 shadow-[3px_3px_0_var(--color-ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_var(--color-ink)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
               >
                  TUTUP PANDUAN
               </button>
            </div>
         </div>
      </div>
   );
}