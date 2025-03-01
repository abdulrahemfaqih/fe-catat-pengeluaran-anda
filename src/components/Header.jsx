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
        <header className="border-b-4 border-black p-4 mb-4  shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="container mx-auto flex justify-between items-center px-4">
                <h1 className="text-2xl md:text-3xl font-bold">
                    Dashboard Keuangan Pribadi
                </h1>
                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-black focus:outline-none"
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
                <div className="hidden md:flex md:items-center">
                    {insDashboard && (<button
                        onClick={() => navigate('/wishlist')}
                        className="px-4 py-2 border-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-black bg-white text-black rounded-md font-medium hover:bg-black hover:text-white transition mr-2"
                    >
                        Dashboard Wishlist
                    </button>)}
                    {insWishlist && (<button
                        onClick={() => navigate('/')}
                        className="px-4 py-2 border-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-black bg-white text-black rounded-md font-medium hover:bg-black hover:text-white transition mr-2"
                    >
                        Dashboard Keuangan
                    </button>)}

                    <button
                        onClick={logout}
                        className="px-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] py-2 border-3 border-black bg-white text-black rounded-md font-medium hover:bg-black hover:text-white transition"
                    >
                        Logout
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden mt-2 flex flex-col gap-2">
                    {insDashboard && (<button
                        onClick={() => navigate('/wishlist')}
                        className="px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-3 border-black  bg-white text-black rounded-md font-medium hover:bg-black hover:text-white transition mr-2"
                    >
                        Dashboard Wishlist
                    </button>)}
                    {insWishlist && (<button
                        onClick={() => navigate('/')}
                        className="px-4 py-2 border-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-black bg-white text-black rounded-md font-medium hover:bg-black hover:text-white transition mr-2"
                    >
                        Dashboard Keuangan
                    </button>)}
                    <button
                        onClick={logout}
                        className="block shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full px-4 py-2 border-3 border-black bg-white text-black rounded-md font-medium hover:bg-black hover:text-white transition"
                    >
                        Logout
                    </button>
                </div>
            )}
        </header>
    );
}