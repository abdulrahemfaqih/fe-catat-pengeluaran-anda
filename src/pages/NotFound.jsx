import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="relative overflow-hidden rounded-xl border-4 border-black bg-yellow-100 dark:bg-yellow-900/40 p-6 md:p-10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full max-w-lg mx-auto transform -rotate-1 transition-colors duration-300">
                {/* Decorative elements */}
                <div className="absolute -top-8 -left-8 w-24 h-24 bg-purple-100 dark:bg-purple-900/40 rounded-full border-3 border-black -z-10 transition-colors duration-300"></div>
                <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-blue-100 dark:bg-blue-900/40 rounded-full border-3 border-black -z-10 transition-colors duration-300"></div>

                <div className="text-center">
                    {/* 404 Icon */}
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-white dark:bg-gray-800 rounded-full border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-10 transition-colors duration-300">
                        <span className="text-5xl">🔍</span>
                    </div>

                    <div className="space-y-6">
                        <h1 className="text-5xl font-bold relative inline-block dark:text-white transition-colors duration-300">
                            404
                            <span className="absolute -bottom-1 left-0 w-full h-4 bg-red-200 dark:bg-red-700/60 -z-10 transition-colors duration-300"></span>
                        </h1>

                        <h2 className="text-2xl font-bold relative inline-block mx-auto dark:text-white transition-colors duration-300">
                            Halaman Tidak Ditemukan!
                            <span className="absolute -bottom-1 left-0 w-full h-3 bg-yellow-200 dark:bg-yellow-700/60 -z-10 transition-colors duration-300"></span>
                        </h2>

                        <div className="bg-white dark:bg-gray-800 border-3 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-w-md mx-auto transition-colors duration-300">
                            <p className="text-lg mb-2 dark:text-white transition-colors duration-300">
                                Oops! Halaman yang Anda cari tidak ditemukan.
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300">
                                Mungkin halaman tersebut telah dihapus, dipindahkan, atau tidak pernah ada.
                            </p>
                        </div>

                        <Link to="/" className="px-6 py-3 border-3 border-black bg-blue-200 dark:bg-blue-700 text-black dark:text-white rounded-xl font-bold hover:bg-black hover:text-blue-200 dark:hover:bg-black dark:hover:text-blue-300 transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transform inline-flex items-center gap-2">
                            <span className="text-lg">🏠</span>
                            <span>Kembali ke Dashboard</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;