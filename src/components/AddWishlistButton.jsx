import React from 'react';

const AddWishlistButton = ({ onClick }) => {
    return (
        <button
            className="px-6 py-3 border-4 border-black text-black rounded-xl font-bold bg-yellow-200
                 hover:bg-black hover:text-yellow-200 transition-all duration-300
                 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
                 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 flex items-center gap-2"
            onClick={onClick}
        >
            <span className="text-xl">✨</span>
            <span>Tambah Item Wishlist</span>
        </button>
    );
};

export default AddWishlistButton;