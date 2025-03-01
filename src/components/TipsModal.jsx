import React from "react";

const TipsModal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
                <h2 className="text-xl font-bold mb-4">Tips Mengelola Keuangan</h2>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                    <li>Catat semua pemasukan dan pengeluaran.</li>
                    <li>Buat anggaran dan patuhi batasnya.</li>
                    <li>Tabung minimal 20% dari pemasukan.</li>
                    <li>Kurangi pengeluaran tidak perlu.</li>
                    <li>Gunakan aplikasi keuangan untuk tracking.</li>
                </ul>
                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
                >
                    Tutup
                </button>
            </div>
        </div>
    );
};

export default TipsModal;
