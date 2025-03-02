import React from "react";
import api from "../utils/api";
import toast from "react-hot-toast";

const HistoryButtons = ({ onOpenHistoryModal, isLoadingPengeluaran, setIsLoadingPengeluaran }) => {
    const handleSaveHistory = async () => {
        // Simpan pengeluaran bulanan ke history
        setIsLoadingPengeluaran(true);
        try {
            const month = new Date().getMonth() + 1;
            const year = new Date().getFullYear();
            await api.post("/history", { month, year });
            toast.success("Pengeluaran bulan ini berhasil disimpan ke history", { duration: 3000 });
        } catch (error) {
            console.error("Error saving history", error);
            toast.error("Gagal menyimpan pengeluaran bulan ini", { duration: 3000 });
        } finally {
            setIsLoadingPengeluaran(false);
        }
    };

    return (
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <button
                onClick={onOpenHistoryModal}
                className="px-6 py-3 border-3 border-black bg-blue-100 text-black rounded-xl font-bold hover:bg-blue-400 hover:text-white transition-all transform hover:-translate-y-1 shadow-[5px_5px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2"
            >
                <span className="text-xl">📊</span>
                <span>History Pengeluaran Bulanan</span>
            </button>

            <button
                onClick={handleSaveHistory}
                className="px-6 py-3 border-3 border-black bg-green-100 text-black rounded-xl font-bold hover:bg-green-400 hover:text-white transition-all transform hover:-translate-y-1 shadow-[5px_5px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2"
            >
                {isLoadingPengeluaran ? (
                    <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Menyimpan...</span>
                    </span>
                ) : (
                    <span className="flex items-center gap-2">
                        <span>💾</span>
                        <span>Simpan Pengeluaran Bulan Ini</span>
                    </span>
                )}
            </button>
        </div>
    );
};

export default HistoryButtons;