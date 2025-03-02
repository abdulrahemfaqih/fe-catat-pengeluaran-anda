import React, { useState } from 'react';

const colors = [
    'bg-red-100',
    'bg-yellow-100',
    'bg-green-100',
    'bg-blue-100',
    'bg-indigo-100',
    'bg-purple-100',
    'bg-pink-100',
    'bg-orange-100',
    'bg-amber-100',
    'bg-lime-100',
    'bg-cyan-100',
];

const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
};

const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

const WishlistCard = ({ item, onUpdate, onDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const randomColor = getRandomColor();
    const randomString = generateRandomString(10);
    const rotateClass = Math.random() > 0.5 ? 'rotate-1' : '-rotate-1';

    const handleImageClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={`p-4 rounded-lg h-full border-3 border-black ${randomColor} ${rotateClass} shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-1`}>
            <div className="absolute -top-3 -right-3 w-8 h-8 bg-white border-2 border-black rounded-full flex items-center justify-center font-bold text-sm">
                #{item._id.slice(-2)}
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                {/* Image Section */}
                <div className="w-full md:w-1/2 h-[200px] md:h-[250px] border-3 border-black rounded-lg overflow-hidden cursor-pointer bg-white" onClick={handleImageClick}>
                    <img
                        src={item.imageUrls || 'https://via.placeholder.com/400'}
                        alt={item.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content Section */}
                <div className="flex flex-col w-full md:w-1/2">
                    <h2 className="text-xl font-bold text-black mb-3 border-b-2 border-black pb-2">{item.name}</h2>

                    <div className="space-y-3 flex-grow">
                        <div className="flex flex-col">
                            <span className="text-black font-bold">Harga:</span>
                            <span className="text-gray-900 bg-white px-2 py-1 rounded border border-black inline-block">Rp {item.price.toLocaleString('id-ID')}</span>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-black font-bold">Deskripsi:</span>
                            <span className="text-gray-900">{item.description}</span>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-black font-bold">Link Pembelian:</span>
                            <a
                                href={item.purchaseLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-900 underline hover:text-gray-600 break-all bg-white px-2 py-1 rounded border border-black inline-block"
                            >
                                {randomString}
                            </a>
                        </div>
                    </div>

                    <div className="flex gap-2 mt-4 pt-3 border-t-2 border-black">
                        <button
                            className="px-4 py-2 border-3 border-black text-black rounded-md hover:bg-black hover:text-white transition-colors bg-white font-bold flex-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                            onClick={() => onUpdate(item)}
                        >
                            Edit
                        </button>
                        <button
                            className="px-4 py-2 border-3 border-black text-black rounded-md hover:bg-black hover:text-white transition-colors bg-white font-bold flex-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                            onClick={() => onDelete(item._id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50" onClick={handleCloseModal}>
                    <div className="relative bg-white p-4 rounded-lg border-4 border-black max-w-4xl max-h-[90vh] overflow-auto shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="absolute top-2 right-2 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold text-lg"
                            onClick={handleCloseModal}
                        >
                            &times;
                        </button>
                        <img src={item.imageUrls || 'https://via.placeholder.com/400'} alt={item.name} className="w-full h-auto rounded-lg" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default WishlistCard;