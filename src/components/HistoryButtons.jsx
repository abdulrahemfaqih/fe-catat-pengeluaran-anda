import React, { useState, useEffect } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";

const HistoryButtons = ({ onOpenHistoryModal, isLoadingPengeluaran, setIsLoadingPengeluaran, historyUpdated = 0 }) => {
    const [isEndOfMonth, setIsEndOfMonth] = useState(false);
    const [alreadySaved, setAlreadySaved] = useState(false);
    const [checking, setChecking] = useState(true);

    // Check if current month's history already saved and if it's end of month
    useEffect(() => {
        const checkExistingHistory = async () => {
            try {
                console.log("Checking history status, counter:", historyUpdated);
                setChecking(true);
                const month = new Date().getMonth() + 1;
                const year = new Date().getFullYear();

                // Get all history entries
                const response = await api.get("/history");

                // Check if current month already exists
                const historyExists = response.data.some(
                    item => item.month === month && item.year === year
                );

                console.log("Current month history exists:", historyExists);
                setAlreadySaved(historyExists);

                // Check if it's end of month (last 3 days of the month)
                const today = new Date();
                const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
                const currentDay = today.getDate();

                // For testing, you can use this instead:
                // const currentDay = lastDay - 2; // Simulates 2 days before end of month

                setIsEndOfMonth(lastDay - currentDay <= 3);
            } catch (error) {
                console.error("Error checking history status:", error);
            } finally {
                setChecking(false);
            }
        };

        checkExistingHistory();
    }, [historyUpdated]);

    const handleSaveHistory = async () => {
        // First check if already saved
        if (alreadySaved) {
            toast.error(
                "Pengeluaran bulan ini sudah disimpan sebelumnya!",
                {
                    duration: 5000,
                    icon: "⚠️"
                }
            );
            return;
        }

        // Proceed with saving history
        setIsLoadingPengeluaran(true);
        try {
            const month = new Date().getMonth() + 1;
            const year = new Date().getFullYear();
            await api.post("/history", { month, year });
            toast.success("Pengeluaran bulan ini berhasil disimpan ke history", { duration: 3000 });
            setAlreadySaved(true); // Update state to reflect the save
        } catch (error) {
            console.error("Error saving history", error);

            // Check if error is due to duplicate entry
            if (error.response && error.response.status === 409) {
                toast.error("Pengeluaran bulan ini sudah disimpan sebelumnya!", { duration: 3000 });
                setAlreadySaved(true);
            } else {
                toast.error("Gagal menyimpan pengeluaran bulan ini", { duration: 3000 });
            }
        } finally {
            setIsLoadingPengeluaran(false);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            {/* End of Month Alert */}
            {isEndOfMonth && !alreadySaved && (
                <div className="mb-2 p-4 border-3 border-black bg-yellow-100 dark:bg-yellow-900 dark:text-white rounded-xl shadow-[4px_4px_0px_rgba(0,0,0,1)] animate-pulse transition-colors duration-300">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">⏰</span>
                        <div>
                            <h3 className="font-bold text-base">Sudah Akhir Bulan!</h3>
                            <p className="text-sm dark:text-gray-200">Jangan lupa untuk menyimpan laporan pengeluaran bulan ini sebelum bulan berakhir.</p>
                        </div>
                    </div>
                </div>
            )}

            {/* History Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-4">
                <button
                    onClick={onOpenHistoryModal}
                    className="px-6 py-3 border-3 border-black bg-blue-100 dark:bg-blue-800 text-black dark:text-white rounded-xl font-bold hover:bg-blue-400 dark:hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1 shadow-[4px_4px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2"
                >
                    <span className="text-xl">📊</span>
                    <span>History Pengeluaran Bulanan</span>
                </button>

                <button
                    onClick={handleSaveHistory}
                    disabled={isLoadingPengeluaran || alreadySaved || checking}
                    className={`px-6 py-3 border-3 border-black ${alreadySaved
                            ? "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                            : "bg-green-100 dark:bg-green-800 text-black dark:text-white hover:bg-green-400 dark:hover:bg-green-600 hover:text-white hover:-translate-y-1"
                        } rounded-xl font-bold transition-all transform shadow-[4px_4px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2 ${(isLoadingPengeluaran || alreadySaved || checking) ? "cursor-not-allowed opacity-75" : ""
                        }`}
                >
                    {isLoadingPengeluaran ? (
                        <span className="flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Menyimpan...</span>
                        </span>
                    ) : checking ? (
                        <span className="flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Memeriksa...</span>
                        </span>
                    ) : alreadySaved ? (
                        <span className="flex items-center gap-2">
                            <span>✅</span>
                            <span>Pengeluaran Bulan Ini Sudah Tersimpan</span>
                        </span>
                    ) : (
                        <span className="flex items-center gap-2">
                            <span>💾</span>
                            <span>Simpan Pengeluaran Bulan Ini</span>
                        </span>
                    )}
                </button>
            </div>
        </div>
    );
};

export default HistoryButtons;