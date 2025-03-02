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
        <header className="border-3 border-black rounded-lg p-4 mb-6 bg-white relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            {/* Background accent */}
            <div className="absolute -left-8 -bottom-8 w-24 h-24 bg-yellow-200 rounded-full border-2 border-black -z-10"></div>

            <div className="container mx-auto flex justify-between items-center px-4 relative">
                <h1 className="text-2xl md:text-3xl font-bold rotate-1">
                    Dashboard Keuangan Pribadi
                </h1>
                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-black focus:outline-none border-2 border-black p-1 rounded-md bg-purple-100"
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
                <div className="hidden md:flex md:items-center gap-3">
                    {insDashboard && (
                        <button
                            onClick={() => navigate('/wishlist')}
                            className="px-4 py-2 border-3 border-black bg-orange-100 text-black rounded-md font-bold hover:bg-black hover:text-white transition relative shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rotate-1"
                        >
                            Dashboard Wishlist
                        </button>
                    )}
                    {insWishlist && (
                        <button
                            onClick={() => navigate('/')}
                            className="px-4 py-2 border-3 border-black bg-green-100 text-black rounded-md font-bold hover:bg-black hover:text-white transition relative shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] -rotate-1"
                        >
                            Dashboard Keuangan
                        </button>
                    )}

                    <button
                        onClick={logout}
                        className="px-4 py-2 border-3 border-black bg-red-100 text-black rounded-md font-bold hover:bg-black hover:text-white transition shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rotate-1"
                    >
                        Logout
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden mt-4 flex flex-col gap-3 border-t-2 border-black pt-4">
                    {insDashboard && (
                        <button
                            onClick={() => navigate('/wishlist')}
                            className="px-4 py-2 border-3 border-black bg-orange-100 text-black rounded-md font-bold hover:bg-black hover:text-white transition shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rotate-1"
                        >
                            Dashboard Wishlist
                        </button>
                    )}
                    {insWishlist && (
                        <button
                            onClick={() => navigate('/')}
                            className="px-4 py-2 border-3 border-black bg-green-100 text-black rounded-md font-bold hover:bg-black hover:text-white transition shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] -rotate-1"
                        >
                            Dashboard Keuangan
                        </button>
                    )}
                    <button
                        onClick={logout}
                        className="px-4 py-2 border-3 border-black bg-red-100 text-black rounded-md font-bold hover:bg-black hover:text-white transition shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rotate-1"
                    >
                        Logout
                    </button>
                </div>
            )}
        </header>
    );
}