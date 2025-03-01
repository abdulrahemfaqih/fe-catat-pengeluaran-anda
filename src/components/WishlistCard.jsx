import React from 'react';
const colors = [
    'bg-red-100',
    'bg-yellow-100',
    'bg-green-100',
    'bg-blue-100',
    'bg-indigo-100',
    'bg-purple-100',
    'bg-pink-100',
    'bg-gray-100',
    'bg-orange-100',
    'bg-amber-100',
    'bg-lime-100',
    'bg-cyan-100',

];

const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
};
const WishlistCard = ({ item, onUpdate, onDelete }) => {
    const randomColor = getRandomColor();
    return (
        <div className={`p-4 rounded-lg shadow h-full border-3 border-black ${randomColor}`}>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-black">{item.name}</h2>
                <div>
                    <button
                        className="px-4 py-2 text-sm border-3 border-black text-black rounded hover:bg-black hover:text-white transition-colors mr-2 bg-white"
                        onClick={() => onUpdate(item)}
                    >
                        Edit
                    </button>
                    <button
                        className="px-4 py-2 text-sm border-3 border-black text-black rounded hover:bg-black hover:text-white transition-colors bg-white"
                        onClick={() => onDelete(item._id)}
                    >
                        Delete
                    </button>
                </div>
            </div>
            <p className="text-gray-900">Harga: Rp {item.price.toLocaleString('id-ID')}</p>
            <p className="text-gray-900">Deskripsi: {item.description}</p>
            <p className="text-gray-900">
                Link Pembelian: <a href={item.purchaseLink} target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">{item.purchaseLink}</a>
            </p>
        </div>
    );
};

export default WishlistCard;