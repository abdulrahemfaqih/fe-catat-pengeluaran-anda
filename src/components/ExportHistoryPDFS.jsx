import React, { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import toast from "react-hot-toast";

const ExportHistoryPDFS = ({ history = [] }) => {
    const [exportingPdf, setExportingPdf] = useState(false);

    // Calculate total for a monthly record
    const calculateTotal = (totals) => {
        return Object.values(totals).reduce((acc, curr) => acc + curr, 0);
    };

    // Get month name
    const getMonthName = (month) => {
        const months = [
            "Januari", "Februari", "Maret", "April", "Mei", "Juni",
            "Juli", "Agustus", "September", "Oktober", "November", "Desember"
        ];
        return months[month - 1];
    };

    // Export function
    const exportHistoryPDF = async () => {
        if (history.length === 0) {
            toast.error("Tidak ada data history untuk di-export", { duration: 3000 });
            return;
        }

        setExportingPdf(true);

        try {
            // Create PDF document
            const doc = new jsPDF('p', 'mm', 'a4');

            // Add title
            doc.setFontSize(16);
            // Use setFont with style parameter instead of setFontStyle
            doc.setFont('helvetica', 'bold');
            doc.text('Laporan History Pengeluaran Bulanan', 105, 15, { align: 'center' });

            // Add date info
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.text(`Diekspor pada: ${new Date().toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })}`, 105, 22, { align: 'center' });

            // Spacing
            let yPos = 30;

            // Process each monthly record
            history.forEach((item, index) => {
                // Monthly header
                doc.setFontSize(14);
                doc.setFont('helvetica', 'bold');
                doc.text(`${index + 1}. ${getMonthName(item.month)} ${item.year}`, 14, yPos);

                yPos += 8;

                // Category data as table
                const tableData = Object.entries(item.totals).map(([category, amount]) => {
                    return [category, `Rp ${amount.toLocaleString('id-ID')}`];
                });

                // Add total row
                tableData.push([
                    'Total Pengeluaran',
                    `Rp ${calculateTotal(item.totals).toLocaleString('id-ID')}`
                ]);

                // Generate table
                autoTable(doc, {
                    startY: yPos,
                    head: [['Kategori', 'Nominal']],
                    body: tableData,
                    headStyles: {
                        fillColor: [66, 133, 244],
                        textColor: [255, 255, 255],
                        fontStyle: 'bold'
                    },
                    alternateRowStyles: {
                        fillColor: [240, 240, 240]
                    },
                    foot: [['', '']],
                    footStyles: {
                        fillColor: [255, 255, 255]
                    },
                    theme: 'grid',
                    styles: {
                        font: 'helvetica',
                        fontStyle: 'normal',
                        fontSize: 10
                    },
                    bodyStyles: {
                        lineWidth: 0.1
                    },
                    columnStyles: {
                        0: { fontStyle: 'normal' },
                        1: { halign: 'right', fontStyle: 'normal' }
                    },
                    didDrawCell: (data) => {
                        // Apply special style to the total row
                        if (data.row.index === tableData.length - 1 && data.section === 'body') {
                            doc.setFillColor(220, 230, 240);
                            doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, 'F');
                            doc.setTextColor(0, 0, 0);
                            // Replace setFontStyle with setFont
                            doc.setFont('helvetica', 'bold');

                            if (data.column.index === 0) {
                                doc.text('Total Pengeluaran', data.cell.x + 2, data.cell.y + 5);
                            } else {
                                doc.text(`Rp ${calculateTotal(item.totals).toLocaleString('id-ID')}`,
                                    data.cell.x + data.cell.width - 2,
                                    data.cell.y + 5,
                                    { align: 'right' }
                                );
                            }
                        }
                    }
                });

                // Update position for next table
                yPos = doc.lastAutoTable.finalY + 15;

                // Add page break if necessary
                if (index < history.length - 1 && yPos > 250) {
                    doc.addPage();
                    yPos = 20;
                }
            });

            // Footer
            const pageCount = doc.internal.getNumberOfPages();
            doc.setFontSize(8);
            doc.setTextColor(100, 100, 100);

            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.text(
                    `Halaman ${i} dari ${pageCount} - Aplikasi Catatan Pengeluaran`,
                    105,
                    doc.internal.pageSize.height - 10,
                    { align: 'center' }
                );
            }

            // Save the PDF
            doc.save('History_Pengeluaran_Bulanan.pdf');
            toast.success("PDF berhasil dibuat!", { duration: 3000 });

        } catch (error) {
            console.error("Error generating PDF:", error);
            toast.error("Gagal membuat PDF", { duration: 3000 });
        } finally {
            setExportingPdf(false);
        }
    };

    return (
        <button
            onClick={exportHistoryPDF}
            disabled={exportingPdf || history.length === 0}
            className={`px-4 py-2.5 border-3 border-black bg-green-200 dark:bg-green-700 text-black dark:text-white font-bold rounded-xl transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2
      ${(exportingPdf || history.length === 0)
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:bg-black hover:text-green-200 dark:hover:bg-black dark:hover:text-green-400 hover:-translate-y-1"}`}
        >
            <span className="text-lg">{exportingPdf ? "⏳" : "📄"}</span>
            <span className="hidden sm:inline">{exportingPdf ? "Membuat PDF..." : "Export PDF"}</span>
            <span className="sm:hidden">{exportingPdf ? "..." : "PDF"}</span>
        </button>
    );
};

export default ExportHistoryPDFS;