import React from 'react';
import WishlistCard from './WishlistCard';

const Wishlists = ({ items, onUpdate, onDelete }) => {
    if (!Array.isArray(items)) {
        return <p>No items available</p>;
    }

    return (
        <div className='space-y-4'>
            {items.map(item => (
                <WishlistCard
                    key={item._id}
                    item={item}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default Wishlists;