import React, { useState, useEffect } from 'react';

const WishlistModal = ({ isOpen, onClose, onSave, item }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [purchaseLink, setPurchaseLink] = useState('');
    const [imageUrls, setImageUrls] = useState('');

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
            onClose();
        } catch (error) {
            console.error('Error saving wishlist item:', error);
        }
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 border-3 border-black">
                <h2 className="text-xl font-semibold mb-4">{item ? 'Update Item' : 'Tambah Item'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Nama</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border-3 border-black rounded"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Harga</label>
                        <input
                            type="number"
                            className="w-full px-3 py-2 border-3 border-black rounded"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Deskripsi</label>
                        <textarea
                            className="w-full px-3 py-2 border-3 border-black rounded"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Link Pembelian</label>
                        <input
                            type="url"
                            className="w-full px-3 py-2 border-3 border-black rounded"
                            value={purchaseLink}
                            onChange={(e) => setPurchaseLink(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">URL Gambar</label>
                        <input
                            type="url"
                            className="w-full px-3 py-2 border-3 border-black rounded"
                            value={imageUrls}
                            onChange={(e) => setImageUrls(e.target.value)}
                        />
                    </div>
                    {imageUrls && (
                        <div className="mb-4">
                            <img src={imageUrls} alt="Preview" className="w-full h-auto rounded-lg border-3 border-black" />
                        </div>
                    )}
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            className="px-4 py-2 border-3 border-black text-black rounded hover:bg-black hover:text-white transition-colors"
                            onClick={handleClose}
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 border-3 border-black text-black rounded hover:bg-black hover:text-white transition-colors"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default WishlistModal;