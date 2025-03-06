import React from 'react'

export default function TutorialPenggunaanAtLogin({ setShowTutorial }) {
    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="relative bg-white dark:bg-gray-800 border-4 border-black p-5 rounded-xl w-full max-w-md max-h-[80vh] overflow-y-auto overflow-x-hidden shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-colors duration-300">
                {/* Close X button in top right */}
                <button
                    onClick={() => setShowTutorial(false)}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-red-400 dark:bg-red-600 rounded-full border-3 border-black flex items-center justify-center font-bold text-black hover:bg-black hover:text-red-300 transition-colors duration-300 z-20"
                >
                    ×
                </button>

                {/* Question mark icon */}
                <div className="absolute -top-2 -left-2 rounded-full bg-blue-400 dark:bg-blue-600 border-4 border-black h-12 w-12 flex items-center justify-center font-bold text-2xl text-black transition-colors duration-300">
                    ?
                </div>

                <h2 className="text-2xl font-bold mb-5 mt-4 text-center dark:text-white transition-colors duration-300">
                    Cara Menggunakan Aplikasi
                </h2>

                <p className="mb-4 dark:text-gray-200 transition-colors duration-300">
                    Aplikasi ini membantu Anda mencatat pemasukan dan
                    pengeluaran harian, mengatur budget, serta menyimpan
                    riwayat pengeluaran bulanan.
                </p>

                <div className="space-y-4 mb-5">
                    <div className="p-3 border-3 border-black rounded-lg bg-blue-50 dark:bg-blue-900/40 transition-colors duration-300">
                        <h3 className="font-bold mb-1 dark:text-white transition-colors duration-300">1. Register</h3>
                        <p className="dark:text-gray-200 transition-colors duration-300">
                            Jika belum punya akun, masukkan nama, email, dan
                            password di form Register. Setelah berhasil, Anda
                            akan otomatis login.
                        </p>
                    </div>

                    <div className="p-3 border-3 border-black rounded-lg bg-green-50 dark:bg-green-900/40 transition-colors duration-300">
                        <h3 className="font-bold mb-1 dark:text-white transition-colors duration-300">2. Login</h3>
                        <p className="dark:text-gray-200 transition-colors duration-300">
                            Jika sudah punya akun, gunakan email dan password
                            untuk masuk ke dashboard.
                        </p>
                    </div>

                    <div className="p-3 border-3 border-black rounded-lg bg-yellow-50 dark:bg-yellow-900/40 transition-colors duration-300">
                        <h3 className="font-bold mb-1 dark:text-white transition-colors duration-300">3. Dashboard</h3>
                        <p className="dark:text-gray-200 transition-colors duration-300">
                            Anda bisa menambahkan transaksi harian (tanggal,
                            nama, kategori, dan nominal), mengatur budget per
                            kategori, dan memasukkan pemasukan bulanan.
                        </p>
                    </div>

                    <div className="p-3 border-3 border-black rounded-lg bg-red-50 dark:bg-red-900/40 transition-colors duration-300">
                        <h3 className="font-bold mb-1 dark:text-white transition-colors duration-300">4. History</h3>
                        <p className="dark:text-gray-200 transition-colors duration-300">
                            Setelah selesai mengisi transaksi dalam satu bulan,
                            klik tombol "Simpan Pengeluaran Bulan Ini" agar
                            pengeluaran bulan tersebut tercatat di riwayat.
                        </p>
                    </div>

                    <div className="p-3 border-3 border-black rounded-lg bg-purple-50 dark:bg-purple-900/40 transition-colors duration-300">
                        <h3 className="font-bold mb-1 dark:text-white transition-colors duration-300">5. Melihat Riwayat</h3>
                        <p className="dark:text-gray-200 transition-colors duration-300">
                            Anda dapat membuka riwayat pengeluaran bulanan untuk
                            melihat total per kategori pada bulan sebelumnya.
                        </p>
                    </div>
                </div>

                <p className="mb-5 p-3 border-3 border-black rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-gray-200 transition-colors duration-300">
                    Pastikan Anda mengisi data dengan benar. Setelah selesai,
                    jangan lupa untuk logout agar akun Anda aman.
                </p>

                <p className="mb-5 font-medium dark:text-gray-200 transition-colors duration-300">
                    Jika ada pertanyaan lebih lanjut, silakan hubungi admin di{" "}
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://abdulrahemfaqih.works"
                        className="text-blue-500 dark:text-blue-400 underline font-bold hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300"
                    >
                        link ini
                    </a>{" "}
                    pada menu Contact.
                </p>

                <div className="flex justify-end">
                    <button
                        onClick={() => setShowTutorial(false)}
                        className="px-5 py-2 border-3 border-black bg-white dark:bg-gray-700 text-black dark:text-white font-bold rounded-lg hover:bg-black hover:text-white dark:hover:bg-black dark:hover:text-gray-300 transition-all shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-colors duration-300"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    )
}