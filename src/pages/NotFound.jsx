import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
            <div className="relative overflow-hidden rounded-xl border-4 border-black bg-yellow-100 p-6 md:p-10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full max-w-lg mx-auto transform -rotate-1">
                {/* Decorative elements */}
                <div className="absolute -top-8 -left-8 w-24 h-24 bg-purple-100 rounded-full border-3 border-black -z-10"></div>
                <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-blue-100 rounded-full border-3 border-black -z-10"></div>

                <div className="text-center">
                    {/* Increased spacing with larger margin and padding */}
                    <div className="inline-flex items-center justify-center w-28 h-28 bg-white rounded-full border-4 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] mb-14">
                        <span className="text-6xl">🔍</span>
                    </div>

                    {/* Added more space between elements */}
                    <div className="space-y-8">
                        <h1 className="text-5xl font-bold relative inline-block">
                            404
                            <span className="absolute -bottom-1 left-0 w-full h-4 bg-red-200 -z-10"></span>
                        </h1>

                        <h2 className="text-2xl font-bold relative inline-block mx-auto">
                            Halaman Tidak Ditemukan!
                            <span className="absolute -bottom-1 left-0 w-full h-3 bg-yellow-200 -z-10"></span>
                        </h2>

                        <div className="bg-white border-3 border-black rounded-xl p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-w-md mx-auto">
                            <p className="text-lg mb-3">
                                Oops! Halaman yang Anda cari tidak ditemukan.
                            </p>
                            <p className="text-gray-700">
                                Mungkin halaman tersebut telah dihapus, dipindahkan, atau tidak pernah ada.
                            </p>
                        </div>

                        <Link to="/" className="px-6 py-3 border-3 border-black bg-blue-200 text-black rounded-xl font-bold hover:bg-black hover:text-blue-200 transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transform inline-flex items-center gap-2">
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