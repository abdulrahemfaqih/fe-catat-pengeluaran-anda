import React, { useState, useEffect } from 'react';

export default function TipsPenggunaanAtDashboard() {
    const [showModal, setShowModal] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Check if device is mobile based on screen width
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768); // 768px is typical md breakpoint
        };

        // Check initially
        checkIfMobile();

        // Add event listener for window resize
        window.addEventListener('resize', checkIfMobile);

        // Cleanup
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    // Open the modal (only for mobile)
    const openModal = () => {
        setShowModal(true);
    };

    // Close the modal
    const closeModal = () => {
        setShowModal(false);
    };

    // Tips content component to avoid duplication
    const TipsContent = () => (
        <ul className="text-sm text-gray-800 pl-2 flex flex-col gap-3 relative z-10">
            <li className="flex items-start gap-2">
                <div className="inline-block w-5 h-5 min-w-5 bg-green-200 rounded-full border-2 border-black">
                    <div className="w-full h-full flex items-center justify-center">
                        <span className="text-xs font-bold leading-none">1</span>
                    </div>
                </div>
                <p>Set up pemasukan dan budget anda, pastikan budget harus sama dengan pemasukan, bisa di edit kapan saja</p>
            </li>
            <li className="flex items-start gap-2">
                <div className="inline-block w-5 h-5 min-w-5 bg-blue-200 rounded-full border-2 border-black">
                    <div className="w-full h-full flex items-center justify-center">
                        <span className="text-xs font-bold leading-none">2</span>
                    </div>
                </div>
                <p>Simpan pengeluaran anda pada sehari hari</p>
            </li>
            <li className="flex items-start gap-2">
                <div className="inline-block w-5 h-5 min-w-5 bg-purple-200 rounded-full border-2 border-black">
                    <div className="w-full h-full flex items-center justify-center">
                        <span className="text-xs font-bold leading-none">3</span>
                    </div>
                </div>
                <p>Gunakan fitur simpan history pengeluaran, gunakan fitur ini perbulan agar dapat melihat pengeluaran anda pada setiap bulannya</p>
            </li>
            <li className="flex items-start gap-2">
                <div className="inline-block w-5 h-5 min-w-5 bg-cyan-100 rounded-full border-2 border-black">
                    <div className="w-full h-full flex items-center justify-center">
                        <span className="text-xs font-bold leading-none">✨</span>
                    </div>
                </div>
                <p><span className="font-bold">Fitur baru:</span> Managemen Wishlist, untuk menyimpan wishlist barang yang ingin di beli, buka menu diatas dan akses 🚀</p>
            </li>
        </ul>
    );

    return (
        <>
            {/* Mobile: Show button */}
            {isMobile && (
                <div className="flex justify-center mt-6 mb-2">
                    <button
                        onClick={openModal}
                        className="flex items-center gap-2 bg-yellow-100 hover:bg-yellow-200 text-black px-4 py-2 rounded-lg border-3 border-black font-bold shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1"
                    >
                        <span className="text-xl">💡</span>
                        <span>Lihat Tips Penggunaan</span>
                    </button>
                </div>
            )}

            {/* Desktop: Always show tips */}
            {!isMobile && (
                <div className="bg-white p-5 rounded-xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all animate-fadeIn my-4 relative">
                    {/* Decorative elements */}
                    

                    <div className="relative z-10">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="font-bold text-xl flex items-center gap-2">
                                <span className="inline-block p-1 bg-yellow-200 rounded-md border-2 border-black">💡</span>
                                <span>Tips Penggunaan</span>
                            </h2>
                        </div>

                        <div className="bg-yellow-50 p-4 rounded-lg border-3 border-black relative overflow-hidden">

                            <TipsContent />
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile: Modal */}
            {isMobile && showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-5 rounded-xl w-full max-w-2xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform transition-all animate-fadeIn relative">
                        {/* Decorative elements */}
                        

                        <div className="relative z-10">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="font-bold text-xl flex items-center gap-2">
                                    <span className="inline-block p-1 bg-yellow-200 rounded-md border-2 border-black">💡</span>
                                    <span>Tips Penggunaan</span>
                                </h2>
                                <button
                                    onClick={closeModal}
                                    className="w-8 h-8 rounded-full border-3 border-black flex items-center justify-center font-bold hover:bg-black hover:text-white transition-colors"
                                >
                                    ×
                                </button>
                            </div>

                            <div className="bg-yellow-50 p-4 rounded-lg border-3 border-black relative overflow-hidden">

                                <TipsContent />
                            </div>

                            <div className="flex justify-end mt-4">
                                <button
                                    onClick={closeModal}
                                    className="px-4 py-2 border-3 border-black bg-yellow-200 text-black font-bold rounded-xl hover:bg-black hover:text-yellow-200 transition-all duration-300 shadow-[3px_3px_0px_rgba(0,0,0,1)]"
                                >
                                    Tutup Tips
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}