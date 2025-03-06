import React from 'react';
import WishlistCard from './WishlistCard';

const Wishlists = ({ items, onUpdate, onDelete, isLoadingWishlists = { isLoadingWishlists } }) => {
    if (isLoadingWishlists) {
        return (
            <div className="border-4 border-black rounded-xl p-8 bg-yellow-50 dark:bg-yellow-900/50 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-1 relative overflow-hidden transition-colors duration-300">
                {/* Decorative elements */}
                <div className="absolute -top-5 -left-5 w-20 h-20 bg-purple-100 dark:bg-purple-800 rounded-full border-3 border-black -z-10 transition-colors duration-300"></div>
                <div className="absolute -bottom-5 -right-5 w-16 h-16 bg-blue-100 dark:bg-blue-800 rounded-full border-2 border-black -z-10 transition-colors duration-300"></div>

                <div className="inline-flex items-center justify-center w-20 h-20 bg-white dark:bg-gray-800 rounded-full border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-5 transition-colors duration-300">
                    <div className="w-10 h-10 border-4 border-black border-t-yellow-300 dark:border-t-yellow-500 rounded-full animate-spin transition-colors duration-300"></div>
                </div>

                <h3 className="text-2xl font-bold mb-4 relative inline-block dark:text-white transition-colors duration-300">
                    Memuat Wishlist...
                    <span className="absolute -bottom-1 left-0 w-full h-3 bg-yellow-200 dark:bg-yellow-700 -z-10 transition-colors duration-300"></span>
                </h3>

                <div className="flex justify-center space-x-2 my-4">
                    <div className="w-3 h-3 bg-black dark:bg-white rounded-full animate-bounce transition-colors duration-300" style={{ animationDelay: '0s' }}></div>
                    <div className="w-3 h-3 bg-black dark:bg-white rounded-full animate-bounce transition-colors duration-300" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-3 h-3 bg-black dark:bg-white rounded-full animate-bounce transition-colors duration-300" style={{ animationDelay: '0.4s' }}></div>
                </div>

                <div className="bg-white dark:bg-gray-800 border-3 border-black rounded-lg p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-w-sm mx-auto transition-colors duration-300">
                    <div className="animate-pulse">
                        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded-full w-3/4 mb-4 transition-colors duration-300"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded-full w-full mb-2 transition-colors duration-300"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded-full w-5/6 mb-2 transition-colors duration-300"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded-full w-4/5 transition-colors duration-300"></div>
                    </div>
                </div>
            </div>
        );
    }
    if (!Array.isArray(items) || items.length === 0) {
        return (
            <div className="border-4 border-black rounded-xl p-8 bg-yellow-100 dark:bg-yellow-900/40 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden transition-colors duration-300">
                {/* Decorative elements */}
                <div className="absolute -top-5 -left-5 w-20 h-20 bg-purple-100 dark:bg-purple-800 rounded-full border-3 border-black -z-10 transition-colors duration-300"></div>
                <div className="absolute -bottom-5 -right-5 w-16 h-16 bg-blue-100 dark:bg-blue-800 rounded-full border-2 border-black -z-10 transition-colors duration-300"></div>

                <div className="inline-flex items-center justify-center w-20 h-20 bg-white dark:bg-gray-800 rounded-full border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-5 transition-colors duration-300">
                    <span className="text-4xl">✨</span>
                </div>

                <h3 className="text-2xl font-bold mb-4 relative inline-block dark:text-white transition-colors duration-300">
                    Wishlist Kosong!
                    <span className="absolute -bottom-1 left-0 w-full h-3 bg-yellow-200 dark:bg-yellow-700 -z-10 transition-colors duration-300"></span>
                </h3>

                <p className="text-lg mb-6 max-w-md mx-auto dark:text-gray-200 transition-colors duration-300">
                    Tambahkan barang-barang yang ingin Anda beli ke dalam wishlist untuk membantu merencanakan keuangan Anda.
                </p>

                <div className="bg-white dark:bg-gray-800 border-3 border-black rounded-lg p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-w-sm mx-auto transition-colors duration-300">
                    <h4 className="font-bold text-lg mb-2 flex items-center gap-2 dark:text-white transition-colors duration-300">
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-green-200 dark:bg-green-700 rounded-full border-2 border-black text-xs font-bold transition-colors duration-300">
                            💡
                        </span>
                        Tips
                    </h4>
                    <ul className="text-sm space-y-2 text-left dark:text-gray-200 transition-colors duration-300">
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 dark:text-green-400 font-bold mt-0.5 transition-colors duration-300">•</span>
                            <span>Klik tombol "Tambah Item Wishlist" untuk menambahkan barang</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 dark:text-green-400 font-bold mt-0.5 transition-colors duration-300">•</span>
                            <span>Prioritaskan barang yang benar-benar Anda butuhkan</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 dark:text-green-400 font-bold mt-0.5 transition-colors duration-300">•</span>
                            <span>Sisihkan uang secara berkala untuk membeli barang dalam wishlist</span>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 inline-block bg-purple-100 dark:bg-purple-800 dark:text-white px-4 py-2 border-3 border-black rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-colors duration-300">
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