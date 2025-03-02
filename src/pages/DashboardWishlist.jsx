import { useState, useEffect, useContext } from 'react';
import api from "../utils/api";
import Header from '../components/Header';
import Wishlist from '../components/Wishlists';
import WishlistModal from '../components/WishlistModal';
import { AuthContext } from '../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';


const DashboardWishlist = () => {
    const { logout } = useContext(AuthContext);
    const [items, setItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalItem, setTotalItem] = useState(0);
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);
    const [isLoadingWishlists, setIsLoadingWishlists] = useState(true)
    


    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                setIsLoadingWishlists(true)
                const response = await api.get('/wishlist');
                setItems(response.data.items || []);
                setTotalPrice(response.data.totalPrice || 0);
                setTotalItem(response.data.totalItem || 0);
            } catch (error) {
                console.error('Error fetching wishlist:', error);
                toast.error('Error fetching wishlist', { duration: 3000 });
            } finally {
                setIsLoadingWishlists(false)
            }
        };

        fetchWishlist();
        console.log(items);
    }, []);

    const handleUpdate = (item) => {
        setCurrentItem(item);
        setIsModalOpen(true);
    };

    const handleDelete = async (itemId) => {
        setIsLoadingDelete(true);
        try {
            const itemToDelete = items.find(item => item._id === itemId);
            await api.delete(`/wishlist/${itemId}`);
            setItems(items.filter(item => item._id !== itemId));
            setTotalPrice(totalPrice - (itemToDelete?.price || 0));
            setTotalItem(totalItem - 1);
        } catch (error) {
            console.error('Error deleting wishlist item:', error);
        } finally {
            toast.success('Item berhasil dihapus', { duration: 3000 });
            setIsLoadingDelete(false);
        }
    };

    const handleSave = async (item) => {
        try {
            if (currentItem) {
                const response = await api.put(`/wishlist/${item._id}`, item);
                setItems(items.map(i => (i._id === item._id ? response.data.whistlist : i)));
                setTotalPrice(totalPrice + item.price - currentItem.price);
            } else {
                const response = await api.post('/wishlist', item);
                setItems([...items, response.data.whistlist]);
                setTotalPrice(totalPrice + item.price);
                setTotalItem(totalItem + 1);
            }
        } catch (error) {
            console.error('Error saving wishlist item:', error);
        } finally {
            toast.success('Item berhasil disimpan', { duration: 3000 });
        }
    };

    const handleAdd = () => {
        setCurrentItem(null);
        setIsModalOpen(true);
    };

    return (
        <div className="DashboardWishlist">
            <Header logout={logout} />
            <Toaster />

            <div className="container mx-auto p-4">

                <div className="flex flex-col sm:flex-row gap-6 mb-8">
                    <div className="border-4 border-black rounded-xl p-5 bg-orange-100 flex-1 relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden transform transition-all hover:-translate-y-1">
                        {/* Decorative elements */}
                        <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-black/10 rounded-full border-2 border-black z-0"></div>

                        <div className="absolute -top-3 -left-3 w-10 h-10 bg-white border-3 border-black rounded-full flex items-center justify-center font-bold text-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] z-10">
                            #1
                        </div>
                        <h3 className="text-center font-bold text-lg mb-3 mt-2 relative z-10">Total Wishlist</h3>
                        <div className="bg-white border-3 border-black rounded-lg p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] relative z-10">
                            <p className="text-center text-4xl font-black">{totalItem}</p>
                        </div>
                    </div>

                    <div className="border-4 border-black rounded-xl p-5 bg-purple-100 flex-1 relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden transform transition-all hover:-translate-y-1">
                        {/* Decorative elements */}
                        <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-black/10 rounded-full border-2 border-black z-0"></div>

                        <div className="absolute -top-3 -left-3 w-10 h-10 bg-white border-3 border-black rounded-full flex items-center justify-center font-bold text-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] z-10">
                            #2
                        </div>
                        <h3 className="text-center font-bold text-lg mb-3 mt-2 relative z-10">Total Harga</h3>
                        <div className="bg-white border-3 border-black rounded-lg p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] relative z-10">
                            <p className="text-center text-3xl sm:text-2xl md:text-3xl font-black">Rp {totalPrice.toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <button
                        className="px-6 py-3 border-4 border-black text-black rounded-xl font-bold bg-yellow-200
                 hover:bg-black hover:text-yellow-200 transition-all duration-300
                 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
                 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 flex items-center gap-2"
                        onClick={handleAdd}
                    >
                        <span className="text-xl">✨</span>
                        <span>Tambah Item Wishlist</span>
                    </button>
                </div>

                {isLoadingDelete && (
                    <div className="py-3 px-4 text-black font-bold bg-yellow-100 border-3 border-black rounded-lg inline-flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Menghapus item...</span>
                    </div>
                )}

                <Wishlist isLoadingWishlists={isLoadingWishlists} items={items} onUpdate={handleUpdate} onDelete={handleDelete} />
                <WishlistModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSave}
                    item={currentItem}
                />
            </div>
        </div>
    );
};

export default DashboardWishlist;