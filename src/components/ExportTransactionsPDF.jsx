import React, { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import toast from "react-hot-toast";

const ExportTransactionsPDF = ({ transactions, filteredTransactions }) => {
    const [exportingPdf, setExportingPdf] = useState(false);

    // Format date function
    const formatDate = (dateString, format = "full") => {
        const date = new Date(dateString);
        if (format === "full") {
            return date.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric"
            });
        } else {
            return date.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short"
            });
        }
    };

    // Export transactions as PDF
    const exportTransactionsPDF = async () => {
        try {
            setExportingPdf(true);

            // Create new PDF
            const pdf = new jsPDF();

            // Add title
            const title = "Laporan Transaksi Harian";
            pdf.setFontSize(18);
            pdf.setTextColor(0, 0, 0);
            pdf.text(title, 14, 22);

            // Add date
            pdf.setFontSize(11);
            pdf.setTextColor(100, 100, 100);
            pdf.text(`Dicetak pada: ${formatDate(new Date())}`, 14, 30);

            // Use either filtered transactions or all transactions
            const dataToExport = filteredTransactions.length > 0 ? filteredTransactions : transactions;

            // Add filter information if there are filters active
            let startY = 36;
            if (filteredTransactions.length !== transactions.length && filteredTransactions.length > 0) {
                pdf.text(
                    `Filter aktif: Menampilkan ${filteredTransactions.length} dari ${transactions.length} transaksi`,
                    14,
                    36
                );
                startY = 42;
            }

            // Prepare table data
            const tableData = dataToExport.map((tx, index) => [
                index + 1,
                formatDate(tx.date),
                tx.name,
                tx.category,
                `Rp ${Number(tx.amount).toLocaleString("id-ID")}`
            ]);

            // Define table headers
            const headers = [
                ["No", "Tanggal", "Nama", "Kategori", "Nominal"]
            ];

            // Define table column styles
            const columnStyles = {
                0: { cellWidth: 15 },  // No
                1: { cellWidth: 35 },  // Tanggal
                2: { cellWidth: 50 },  // Nama
                3: { cellWidth: 40 },  // Kategori
                4: { cellWidth: 40 }   // Nominal
            };

            // Generate table - correct way to use jspdf-autotable
            autoTable(pdf, {
                head: headers,
                body: tableData,
                startY: startY,
                theme: 'grid',
                headStyles: {
                    fillColor: [66, 139, 202],
                    textColor: [255, 255, 255],
                    fontStyle: 'bold'
                },
                columnStyles: columnStyles,
                styles: {
                    lineColor: [0, 0, 0],
                    lineWidth: 0.25,
                },
                alternateRowStyles: {
                    fillColor: [240, 240, 240]
                }
            });

            // Add total at the bottom
            const totalAmount = dataToExport.reduce(
                (sum, tx) => sum + Number(tx.amount), 0
            );

            const finalY = pdf.lastAutoTable.finalY;
            pdf.setFontSize(12);
            pdf.setTextColor(0, 0, 0);
            pdf.setFont(undefined, 'bold');
            pdf.text(
                `Total Pengeluaran: Rp ${totalAmount.toLocaleString("id-ID")}`,
                pdf.internal.pageSize.width - 20,
                finalY + 10,
                { align: 'right' }
            );

            // Add footer
            const pageCount = pdf.internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                pdf.setPage(i);
                pdf.setFontSize(10);
                pdf.setTextColor(150, 150, 150);
                pdf.setFont(undefined, 'normal');
                pdf.text(
                    `Halaman ${i} dari ${pageCount} - Catat Pengeluaran Anda`,
                    pdf.internal.pageSize.width - 20,
                    pdf.internal.pageSize.height - 10,
                    { align: 'right' }
                );
            }

            // Save the PDF
            const fileName = `Transaksi_${new Date().toISOString().slice(0, 10)}.pdf`;
            pdf.save(fileName);

            toast.success("PDF berhasil dibuat", { duration: 3000 });
        } catch (error) {
            console.error('Error exporting PDF:', error);
            toast.error(`Gagal membuat PDF: ${error.message}`, { duration: 3000 });
        } finally {
            setExportingPdf(false);
        }
    };

    return (
        <button
            onClick={exportTransactionsPDF}
            disabled={exportingPdf || transactions.length === 0}
            className={`w-full sm:w-auto px-4 py-2.5 border-3 border-black bg-green-200 dark:bg-green-700 text-black dark:text-white font-bold rounded-xl transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2
   ${(exportingPdf || transactions.length === 0)
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:bg-black hover:text-green-200 dark:hover:bg-black dark:hover:text-green-400 hover:-translate-y-1"}`}
        >
            <span className="text-lg">{exportingPdf ? "⏳" : "📄"}</span>
            <span>{exportingPdf ? "Membuat PDF..." : "Export PDF"}</span>
        </button>
    );
};

export default ExportTransactionsPDF;