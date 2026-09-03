import React, { useState, useEffect } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";
import { X, Check } from "lucide-react";

const TransactionModal = ({ onClose, editData, refreshTransactions }) => {
   const [formData, setFormData] = useState({
      name: "",
      category: "Makanan",
      amount: "",
      date: new Date().toISOString().slice(0, 10),
   });
   const [displayAmount, setDisplayAmount] = useState("");
   const [loading, setLoading] = useState(false);

   const categories = [
      "Makanan",
      "Transportasi",
      "Hiburan",
      "Kesehatan",
      "Pendidikan",
      "Kebutuhan Pribadi",
   ];

   useEffect(() => {
      if (editData) {
         setFormData({
            name: editData.name || "",
            category: editData.category || "Makanan",
            amount: editData.amount || "",
            date: editData.date
               ? new Date(editData.date).toISOString().slice(0, 10)
               : new Date().toISOString().slice(0, 10),
         });
         setDisplayAmount(
            editData.amount ? Number(editData.amount).toLocaleString("id-ID") : ""
         );
      }
   }, [editData]);

   const handleAmountChange = (e) => {
      const numericValue = e.target.value.replace(/\D/g, "");
      setFormData({
         ...formData,
         amount: numericValue ? parseInt(numericValue, 10) : "",
      });
      setDisplayAmount(
         numericValue ? parseInt(numericValue, 10).toLocaleString("id-ID") : ""
      );
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
         if (editData) {
            await api.put(`/transactions/${editData._id}`, formData);
            toast.success("TRANSAKSI BERHASIL DIPERBARUI");
         } else {
            await api.post("/transactions", formData);
            toast.success("TRANSAKSI BERHASIL DITAMBAHKAN");
         }
         refreshTransactions();
         onClose();
      } catch (error) {
         console.error("Transaction submit error", error);
         toast.error("GAGAL MENYIMPAN TRANSAKSI");
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fadeIn">
         <div className="bg-[var(--color-surface)] border-[3px] border-[var(--color-ink)] shadow-[8px_8px_0_var(--color-ink)] w-full max-w-md flex flex-col">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b-[3px] border-[var(--color-ink)] flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-[var(--color-accent)] border border-[var(--color-ink)]" />
                  <h2 className="font-macro uppercase text-base sm:text-lg tracking-tight text-[var(--color-ink)]">
                     {editData ? "EDIT TRANSAKSI" : "TAMBAH TRANSAKSI"}
                  </h2>
               </div>

               <button
                  onClick={onClose}
                  className="w-8 h-8 border-2 border-[var(--color-ink)] bg-[var(--color-surface)] text-[var(--color-ink)] flex items-center justify-center hover:bg-[var(--color-ink)] hover:text-[var(--color-bg)] transition-colors"
                  aria-label="Tutup"
               >
                  <X size={18} className="stroke-[2.5]" />
               </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
               {/* Nama */}
               <div>
                  <label className="block mb-1 font-mono uppercase text-[11px] font-bold text-[var(--color-ink-muted)] tracking-wider">
                     NAMA TRANSAKSI
                  </label>
                  <input
                     type="text"
                     value={formData.name}
                     onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                     }
                     className="w-full border-2 border-[var(--color-ink)] bg-[var(--color-surface)] text-[var(--color-ink)] p-2 font-body text-sm focus:outline-2 focus:outline-[var(--color-accent)] focus:outline-offset-2"
                     placeholder="Misal: Makan Siang Karyawan"
                     required
                  />
               </div>

               {/* Kategori */}
               <div>
                  <label className="block mb-1 font-mono uppercase text-[11px] font-bold text-[var(--color-ink-muted)] tracking-wider">
                     KATEGORI
                  </label>
                  <select
                     value={formData.category}
                     onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                     }
                     className="w-full border-2 border-[var(--color-ink)] bg-[var(--color-surface)] text-[var(--color-ink)] p-2 font-mono text-xs uppercase focus:outline-2 focus:outline-[var(--color-accent)] focus:outline-offset-2"
                     required
                  >
                     {categories.map((cat) => (
                        <option key={cat} value={cat}>
                           {cat.toUpperCase()}
                        </option>
                     ))}
                  </select>
               </div>

               {/* Nominal */}
               <div>
                  <label className="block mb-1 font-mono uppercase text-[11px] font-bold text-[var(--color-ink-muted)] tracking-wider">
                     NOMINAL
                  </label>
                  <div className="relative">
                     <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs font-bold text-[var(--color-ink-muted)]">
                        RP
                     </span>
                     <input
                        type="text"
                        value={displayAmount}
                        onChange={handleAmountChange}
                        className="w-full border-2 border-[var(--color-ink)] bg-[var(--color-surface)] text-[var(--color-ink)] p-2 pl-10 font-mono text-sm tabular-nums focus:outline-2 focus:outline-[var(--color-accent)] focus:outline-offset-2"
                        placeholder="0"
                        required
                     />
                  </div>
               </div>

               {/* Tanggal */}
               <div>
                  <label className="block mb-1 font-mono uppercase text-[11px] font-bold text-[var(--color-ink-muted)] tracking-wider">
                     TANGGAL
                  </label>
                  <input
                     type="date"
                     value={formData.date}
                     onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                     }
                     className="w-full border-2 border-[var(--color-ink)] bg-[var(--color-surface)] text-[var(--color-ink)] p-2 font-mono text-xs focus:outline-2 focus:outline-[var(--color-accent)] focus:outline-offset-2 uppercase"
                     required
                  />
               </div>

               {/* Action Buttons */}
               <div className="flex gap-3 justify-end pt-3 border-t border-[var(--color-ink)]/15">
                  <button
                     type="button"
                     onClick={onClose}
                     className="font-mono uppercase text-xs tracking-wider font-bold bg-[var(--color-surface)] text-[var(--color-ink)] border-2 border-[var(--color-ink)] px-4 py-2 hover:bg-[var(--color-bg)] transition-colors"
                  >
                     BATAL
                  </button>

                  <button
                     type="submit"
                     disabled={loading}
                     className="font-mono uppercase text-xs tracking-wider font-bold bg-[var(--color-accent)] text-[var(--color-accent-ink)] border-2 border-[var(--color-ink)] px-5 py-2 shadow-[3px_3px_0_var(--color-ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_var(--color-ink)] active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-40 transition-all flex items-center gap-1.5"
                  >
                     <Check size={14} className="stroke-[3]" />
                     <span>{loading ? "MENYIMPAN..." : "SIMPAN TRANSAKSI"}</span>
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default TransactionModal;