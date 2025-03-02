import React, { useState, useEffect } from 'react';

const WishlistModal = ({ isOpen, onClose, onSave, item }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [purchaseLink, setPurchaseLink] = useState('');
    const [imageUrls, setImageUrls] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (item) {
            setName(item.name);
            setPrice(item.price);
            setDescription(item.description);
            setPurchaseLink(item.purchaseLink);
            setImageUrls(item.imageUrls);
        } else {
            resetForm();
        }
    }, [item]);

    const resetForm = () => {
        setName('');
        setPrice('');
        setDescription('');
        setPurchaseLink('');
        setImageUrls('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const newItem = {
            _id: item ? item._id : Date.now(),
            name,
            price: parseFloat(price),
            description,
            purchaseLink,
            imageUrls,
        };

        try {
            onSave(newItem);
            resetForm();
            onClose();
        } catch (error) {
            console.error('Error saving wishlist item:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-96 md:w-104 border-3 border-black transform transition-all animate-fadeIn">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">{item ? '✏️ Update Item' : '✨ Tambah Item Wishlist'}</h2>
                    <button
                        onClick={handleClose}
                        className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-medium mb-1">Nama</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border-3 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nintendo Switch"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Harga</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500">Rp</span>
                            </div>
                            <input
                                type="number"
                                className="w-full px-3 py-2 pl-10 border-3 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="3000000"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Deskripsi</label>
                        <textarea
                            className="w-full px-3 py-2 border-3 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 min-h-24"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Alasan mengapa saya ingin membelinya..."
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Link Pembelian</label>
                        <input
                            type="url"
                            className="w-full px-3 py-2 border-3 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
                            value={purchaseLink}
                            onChange={(e) => setPurchaseLink(e.target.value)}
                            placeholder="https://tokopedia.com/..."
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">URL Gambar (Opsional)</label>
                        <input
                            type="url"
                            className="w-full px-3 py-2 border-3 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
                            value={imageUrls}
                            onChange={(e) => setImageUrls(e.target.value)}
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>

                    {imageUrls && (
                        <div className="relative mt-2 rounded-lg overflow-hidden border-3 border-black">
                            <div className="absolute top-0 right-0 m-2">
                                <span className="px-2 py-1 bg-yellow-200 rounded-lg text-xs border-2 border-black">Preview</span>
                            </div>
                            <img
                                src={imageUrls}
                                alt="Preview"
                                className="w-full h-48 object-cover"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "/placeholder-image.png";
                                    e.target.className = "w-full h-48 object-contain bg-gray-100";
                                }}
                            />
                        </div>
                    )}

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            className="px-4 py-2 border-3 border-black text-black rounded-xl bg-gray-100 hover:bg-black hover:text-white transition-all duration-300"
                            onClick={handleClose}
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 border-3 border-black text-black rounded-xl bg-yellow-200 hover:bg-black hover:text-yellow-200 transition-all duration-300 shadow-md"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Menyimpan...' : 'Simpan Item'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default WishlistModal;