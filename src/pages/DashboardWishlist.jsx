import { useState, useEffect, useContext } from 'react';
import api from "../utils/api";
import Header from '../components/Header';
import Wishlist from '../components/Wishlists';
import WishlistModal from '../components/WishlistModal';
import { AuthContext } from '../context/AuthContext';


const DashboardWishlist = () => {
    const {logout} = useContext(AuthContext);
    const [items, setItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalItem, setTotalItem] = useState(0);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await api.get('/wishlist');
                setItems(response.data.items || []);
                setTotalPrice(response.data.totalPrice || 0);
                setTotalItem(response.data.totalItem || 0);
            } catch (error) {
                console.error('Error fetching wishlist:', error);
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
        try {
            const itemToDelete = items.find(item => item._id === itemId);
            await api.delete(`/wishlist/${itemId}`);
            setItems(items.filter(item => item._id !== itemId));
            setTotalPrice(totalPrice - (itemToDelete?.price || 0));
            setTotalItem(totalItem - 1);
        } catch (error) {
            console.error('Error deleting wishlist item:', error);
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
        }
    };

    const handleAdd = () => {
        setCurrentItem(null);
        setIsModalOpen(true);
    };

    return (
        <div className="DashboardWishlist">
            <Header logout={logout} />

            <div className="container mx-auto p-4">

                <div className="border-3 border-black rounded-lg p-6 mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="grid grid-cols-2 gap-8">
                        <div className="text-center border-r-4 border-black pr-4 ">
                            <h3 className="text-xl font-bold mb-2">Total Wishlist</h3>
                            <p className="text-3xl font-black">{totalItem}</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-bold mb-2">Total Harga</h3>
                            <p className="text-3xl font-black">Rp {totalPrice.toLocaleString()}</p>
                        </div>
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