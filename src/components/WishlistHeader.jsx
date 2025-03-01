import React from 'react';

const WishlistHeader = ({ totalItems, totalPrice, onAddClick }) => {
    return (
        <div className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg mb-4">
            <div className="flex flex-col">
                <h2 className="text-xl font-semibold text-gray-800">Wishlist Saya</h2>
                <div className="text-sm text-gray-600">
                    <span>Total Item: {totalItems}</span>
                    <span className="mx-2">|</span>
                    <span>Total Harga: Rp {totalPrice.toLocaleString()}</span>
                </div>
            </div>
            <button
                className="flex items-center gap-2 bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition-colors"
                onClick={onAddClick}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Tambah Wishlist
            </button>
        </div>
    );
};

export default WishlistHeader;
