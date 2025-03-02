import React from 'react';
import WishlistCard from './WishlistCard';

const Wishlists = ({ items, onUpdate, onDelete }) => {
    if (!Array.isArray(items)) {
        return (
            <div className="border-3 border-black rounded-lg p-6 bg-yellow-100 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-1">
                <p className="text-xl font-bold">No items available</p>
                <p className="mt-2">Start adding items to your wishlist!</p>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 inline-block bg-purple-100 px-4 py-2 border-3 border-black rounded-lg rotate-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                My Wishlist Items ({items.length})
            </h2>

            <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6'>
                {items.map(item => (
                    <WishlistCard
                        key={item._id}
                        item={item}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </div>
    );
};

export default Wishlists;