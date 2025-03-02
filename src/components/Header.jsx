import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Header({ logout }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const insDashboard = location.pathname === '/';
    const insWishlist = location.pathname === '/wishlist';

    return (
        <header className="sticky top-0 z-50 border-4 border-black rounded-xl p-5 mb-8 bg-white  shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">


            <div className="container mx-auto flex justify-between items-center relative z-10">
                <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-10 h-10 bg-purple-100 rounded-full border-3 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        💰
                    </span>
                    <span className="relative">
                        Dashboard Keuangan
                        <span className="absolute -bottom-1 left-0 w-full h-3 bg-yellow-200 -z-10"></span>
                    </span>
                </h1>

                {/* Mobile menu button */}
                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-black focus:outline-none border-3 border-black p-2 rounded-lg bg-purple-100 hover:bg-purple-200 transition-colors shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                    >
                        {isMenuOpen ? (
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                ></path>
                            </svg>
                        ) : (
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                ></path>
                            </svg>
                        )}
                    </button>
                </div>

                {/* Desktop navigation */}
                <div className="hidden md:flex md:items-center gap-4">
                    {insDashboard && (
                        <button
                            onClick={() => navigate('/wishlist')}
                            className="px-5 py-2.5 border-3 border-black bg-orange-100 text-black rounded-xl font-bold hover:bg-black hover:text-orange-100 transition-colors duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transform flex items-center gap-2"
                        >
                            <span className="text-lg">✨</span>
                            <span>Wishlist</span>
                        </button>
                    )}
                    {insWishlist && (
                        <button
                            onClick={() => navigate('/')}
                            className="px-5 py-2.5 border-3 border-black bg-green-100 text-black rounded-xl font-bold hover:bg-black hover:text-green-100 transition-colors duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transform flex items-center gap-2"
                        >
                            <span className="text-lg">💰</span>
                            <span>Keuangan</span>
                        </button>
                    )}

                    <button
                        onClick={logout}
                        className="px-5 py-2.5 border-3 border-black bg-red-100 text-black rounded-xl font-bold hover:bg-black hover:text-red-100 transition-colors duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transform flex items-center gap-2"
                    >
                        <span className="text-lg">👋</span>
                        <span>Logout</span>
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden mt-5 flex flex-col gap-3 border-t-3 border-black pt-4 animate-fadeIn">
                    {insDashboard && (
                        <button
                            onClick={() => navigate('/wishlist')}
                            className="px-4 py-3 border-3 border-black bg-orange-100 text-black rounded-xl font-bold hover:bg-black hover:text-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2 justify-center"
                        >
                            <span className="text-lg">✨</span>
                            <span>Dashboard Wishlist</span>
                        </button>
                    )}
                    {insWishlist && (
                        <button
                            onClick={() => navigate('/')}
                            className="px-4 py-3 border-3 border-black bg-green-100 text-black rounded-xl font-bold hover:bg-black hover:text-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2 justify-center"
                        >
                            <span className="text-lg">💰</span>
                            <span>Dashboard Keuangan</span>
                        </button>
                    )}
                    <button
                        onClick={logout}
                        className="px-4 py-3 border-3 border-black bg-red-100 text-black rounded-xl font-bold hover:bg-black hover:text-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2 justify-center"
                    >
                        <span className="text-lg">👋</span>
                        <span>Logout</span>
                    </button>
                </div>
            )}
        </header>
    );
}