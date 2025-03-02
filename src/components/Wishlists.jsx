import React from 'react';
import WishlistCard from './WishlistCard';

const Wishlists = ({ items, onUpdate, onDelete }) => {
    if (!Array.isArray(items) || items.length === 0) {
        return (
            <div className="border-4 border-black rounded-xl p-8 bg-yellow-100 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform rotate-1 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute -top-5 -left-5 w-20 h-20 bg-purple-100 rounded-full border-3 border-black -z-10"></div>
                <div className="absolute -bottom-5 -right-5 w-16 h-16 bg-blue-100 rounded-full border-2 border-black -z-10"></div>

                <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-5">
                    <span className="text-4xl">✨</span>
                </div>

                <h3 className="text-2xl font-bold mb-4 relative inline-block">
                    Wishlist Kosong!
                    <span className="absolute -bottom-1 left-0 w-full h-3 bg-yellow-200 -z-10"></span>
                </h3>

                <p className="text-lg mb-6 max-w-md mx-auto">
                    Tambahkan barang-barang yang ingin Anda beli ke dalam wishlist untuk membantu merencanakan keuangan Anda.
                </p>

                <div className="bg-white border-3 border-black rounded-lg p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-w-sm mx-auto">
                    <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-green-200 rounded-full border-2 border-black text-xs font-bold">
                            💡
                        </span>
                        Tips
                    </h4>
                    <ul className="text-sm space-y-2 text-left">
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold mt-0.5">•</span>
                            <span>Klik tombol "Tambah Item Wishlist" untuk menambahkan barang</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold mt-0.5">•</span>
                            <span>Prioritaskan barang yang benar-benar Anda butuhkan</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold mt-0.5">•</span>
                            <span>Sisihkan uang secara berkala untuk membeli barang dalam wishlist</span>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 inline-block bg-purple-100 px-4 py-2 border-3 border-black rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                My Wishlist Items ({items.length})
            </h2>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {items.map((item, index) => (
                    <WishlistCard
                        key={item._id}
                        item={item}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                        index={index}
                    />
                ))}
            </div>
        </div>
    );
};

export default Wishlists;