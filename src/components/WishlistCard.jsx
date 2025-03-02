import React, { useState } from 'react';

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
    const randomString = generateRandomString(10); // Generate a random string of length 10

    const handleImageClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={`p-4 rounded-lg shadow-lg h-full border-2 border-black ${randomColor}`}>
            <div className="flex flex-col md:flex-row gap-4">
                {/* Image Section */}
                <div className="w-full md:w-1/2 h-[200px] md:h-[300px] border-4 border-black rounded-lg overflow-hidden cursor-pointer" onClick={handleImageClick}>
                    <img
                        src={item.imageUrls || 'https://via.placeholder.com/400'}
                        alt={item.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content Section */}
                <div className="flex flex-col w-full md:w-1/2">
                    <h2 className="text-xl font-bold text-black mb-4">{item.name}</h2>
                    <div className="space-y-2 flex-grow">
                        <p className="text-gray-900 font-medium">
                            Harga: <span className="font-normal">Rp {item.price.toLocaleString('id-ID')}</span>
                        </p>
                        <p className="text-gray-900 font-medium">
                            Deskripsi: <span className="font-normal">{item.description}</span>
                        </p>
                        <p className="text-gray-900 font-medium">
                            Link Pembelian:
                            <a
                                href={item.purchaseLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-1 underline hover:text-gray-600 break-all"
                            >
                                {randomString}
                            </a>
                        </p>
                    </div>
                    <div className="flex gap-2 mt-4">
                        <button
                            className="px-3 py-1 text-sm border-2 border-black text-black rounded-md hover:bg-black hover:text-white transition-colors bg-white"
                            onClick={() => onUpdate(item)}
                        >
                            Edit
                        </button>
                        <button
                            className="px-3 py-1 text-sm border-2 border-black text-black rounded-md hover:bg-black hover:text-white transition-colors bg-white"
                            onClick={() => onDelete(item._id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50" onClick={handleCloseModal}>
                    <div className="relative bg-white p-4 rounded-lg border-4 border-black" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="absolute top-2 right-2 text-black font-bold"
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