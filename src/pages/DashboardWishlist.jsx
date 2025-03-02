import { useState, useEffect, useContext } from 'react';
import api from "../utils/api";
import Header from '../components/Header';
import Wishlist from '../components/Wishlists';
import WishlistModal from '../components/WishlistModal';
import { AuthContext } from '../context/AuthContext';
import toast,  { Toaster } from 'react-hot-toast';


const DashboardWishlist = () => {
    const {logout} = useContext(AuthContext);
    const [items, setItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalItem, setTotalItem] = useState(0);
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);


    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await api.get('/wishlist');
                setItems(response.data.items || []);
                setTotalPrice(response.data.totalPrice || 0);
                setTotalItem(response.data.totalItem || 0);
            } catch (error) {
                console.error('Error fetching wishlist:', error);
                toast.error('Error fetching wishlist', { duration: 3000 });
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



                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="border-3 border-black rounded-lg p-4 bg-orange-100 flex-1 relative rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <div className="absolute -top-3 -left-3 w-8 h-8 bg-white border-2 border-black rounded-full flex items-center justify-center font-bold">
                            #1
                        </div>
                        <h3 className="text-center font-bold mb-2">Total Wishlist</h3>
                        <p className="text-center text-4xl font-black">{totalItem}</p>
                    </div>
                    <div className="border-3 border-black rounded-lg p-4 bg-purple-100 flex-1 relative -rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <div className="absolute -top-3 -left-3 w-8 h-8 bg-white border-2 border-black rounded-full flex items-center justify-center font-bold">
                            #2
                        </div>
                        <h3 className="text-center font-bold mb-2">Total Harga</h3>
                        <p className="text-center text-3xl sm:text-2xl md:text-3xl font-black break-words">Rp {totalPrice.toLocaleString()}</p>
                    </div>
                </div>


                <div className="mb-6">
                    <button
                        className="px-6 py-3 border-3 border-black text-black rounded-lg font-bold
                                 hover:bg-black hover:text-white transition-all duration-200
                                 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                                 hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                        onClick={handleAdd}
                    >
                        Tambah Item
                    </button>
                </div>
                {isLoadingDelete && (
                    <p className='py-2 text-black font-semibold'>Loading..</p>
                )}

                <Wishlist items={items} onUpdate={handleUpdate} onDelete={handleDelete} />
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