import React, { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import toast from "react-hot-toast";
import { FileDown } from "lucide-react";

const ExportTransactionsPDF = ({ transactions, filteredTransactions }) => {
   const [exportingPdf, setExportingPdf] = useState(false);

   const formatDate = (dateString, format = "full") => {
      const date = new Date(dateString);
      if (format === "full") {
         return date.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
         });
      } else {
         return date.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
         });
      }
   };

   const exportTransactionsPDF = async () => {
      try {
         setExportingPdf(true);

         const pdf = new jsPDF();
         const title = "LAPORAN TRANSAKSI KEUANGAN";
         pdf.setFontSize(16);
         pdf.setTextColor(0, 0, 0);
         pdf.text(title, 14, 22);

         pdf.setFontSize(10);
         pdf.setTextColor(80, 80, 80);
         pdf.text(`DICETAK PADA: ${formatDate(new Date())}`, 14, 30);

         const dataToExport =
            filteredTransactions.length > 0
               ? filteredTransactions
               : transactions;

         let startY = 36;
         if (
            filteredTransactions.length !== transactions.length &&
            filteredTransactions.length > 0
         ) {
            pdf.text(
               `Filter aktif: Menampilkan ${filteredTransactions.length} dari ${transactions.length} transaksi`,
               14,
               36
            );
            startY = 42;
         }

         const tableData = dataToExport.map((tx, index) => [
            index + 1,
            formatDate(tx.date),
            tx.name,
            tx.category,
            `Rp ${Number(tx.amount).toLocaleString("id-ID")}`,
         ]);

         const headers = [["No", "Tanggal", "Nama", "Kategori", "Nominal"]];

         const columnStyles = {
            0: { cellWidth: 15 },
            1: { cellWidth: 35 },
            2: { cellWidth: 50 },
            3: { cellWidth: 40 },
            4: { cellWidth: 40 },
         };

         autoTable(pdf, {
            head: headers,
            body: tableData,
            startY: startY,
            theme: "grid",
            headStyles: {
               fillColor: [10, 10, 10],
               textColor: [255, 255, 255],
               fontStyle: "bold",
            },
            columnStyles: columnStyles,
            styles: {
               lineColor: [0, 0, 0],
               lineWidth: 0.25,
               font: "courier",
            },
         });

         const totalAmount = dataToExport.reduce(
            (sum, tx) => sum + Number(tx.amount),
            0
         );

         const finalY = pdf.lastAutoTable.finalY;
         pdf.setFontSize(11);
         pdf.setTextColor(0, 0, 0);
         pdf.setFont(undefined, "bold");
         pdf.text(
            `Total Pengeluaran: Rp ${totalAmount.toLocaleString("id-ID")}`,
            pdf.internal.pageSize.width - 20,
            finalY + 10,
            { align: "right" }
         );

         const pageCount = pdf.internal.getNumberOfPages();
         for (let i = 1; i <= pageCount; i++) {
            pdf.setPage(i);
            pdf.setFontSize(9);
            pdf.setTextColor(100, 100, 100);
            pdf.setFont(undefined, "normal");
            pdf.text(
               `Halaman ${i} dari ${pageCount} — KEUANGAN`,
               pdf.internal.pageSize.width - 20,
               pdf.internal.pageSize.height - 10,
               { align: "right" }
            );
         }

         const fileName = `Transaksi_${new Date().toISOString().slice(0, 10)}.pdf`;
         pdf.save(fileName);

         toast.success("DOKUMEN PDF BERHASIL DIGENERATE");
      } catch (error) {
         console.error("Error exporting PDF:", error);
         toast.error(`GAGAL MEMBUAT PDF: ${error.message}`);
      } finally {
         setExportingPdf(false);
      }
   };

   return (
      <button
         onClick={exportTransactionsPDF}
         disabled={exportingPdf || transactions.length === 0}
         className="w-full sm:w-auto font-mono uppercase text-xs tracking-wider font-bold bg-[var(--color-surface)] text-[var(--color-ink)] border-2 border-[var(--color-ink)] px-4 py-2.5 shadow-[3px_3px_0_var(--color-ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_var(--color-ink)] active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-40 disabled:pointer-events-none transition-all duration-100 flex items-center justify-center gap-2"
      >
         <FileDown size={15} className="stroke-[2.5]" />
         <span>{exportingPdf ? "EXPORTING PDF..." : "EXPORT PDF"}</span>
      </button>
   );
};

export default ExportTransactionsPDF;