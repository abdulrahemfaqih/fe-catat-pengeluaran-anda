import React from 'react';

const AddWishlistButton = ({ onClick }) => {
    return (
        <button
            className="px-6 py-3 border-4 border-black text-black dark:text-white rounded-xl font-bold bg-yellow-200 dark:bg-yellow-600
                 hover:bg-black hover:text-yellow-200 dark:hover:bg-black dark:hover:text-yellow-400 transition-all duration-300
                 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 flex items-center gap-2"
            onClick={onClick}
        >
            <span className="text-xl">✨</span>
            <span>Tambah Item Wishlist</span>
        </button>
    );
};

export default AddWishlistButton;