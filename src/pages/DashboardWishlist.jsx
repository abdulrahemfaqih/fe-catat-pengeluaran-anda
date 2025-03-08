import { useState, useEffect, useContext, useCallback } from 'react';
import api from "../utils/api";
import Header from '../components/Header';
import Wishlist from '../components/Wishlists';
import WishlistModal from '../components/WishlistModal';
import { AuthContext } from '../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import WishlistStatsCard from '../components/WishlistStatsCard';
import AddWishlistButton from '../components/AddWishlistButton';
import LoadingIndicatorWishlist from '../components/LoadingIndicatorWishlist';

const DashboardWishlist = () => {
    const { logout } = useContext(AuthContext);
    const [items, setItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalItem, setTotalItem] = useState(0);
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);
    const [isLoadingWishlists, setIsLoadingWishlists] = useState(true);

    const fetchWishlist = useCallback(async () => {
        try {
            setIsLoadingWishlists(true);
            const response = await api.get('/wishlist');
            setItems(response.data.items || []);
            setTotalPrice(response.data.totalPrice || 0);
            setTotalItem(response.data.totalItem || 0);
        } catch (error) {
            console.error('Error fetching wishlist:', error);
            toast.error('Error fetching wishlist', { duration: 3000 });
        } finally {
            setIsLoadingWishlists(false);
        }
    }, []);

    useEffect(() => {
        fetchWishlist();
    }, [fetchWishlist]);

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
            setIsModalOpen(false);
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
        <div className="DashboardWishlist dark:bg-gray-900 transition-colors duration-300">
            <Header logout={logout} />
            <Toaster />

            <div className="container mx-auto p-4">
                <div className="flex flex-col sm:flex-row gap-6 mb-8">
                    <WishlistStatsCard
                        number="1"
                        title="Total Wishlist"
                        value={totalItem}
                        bgColor="bg-orange-100 dark:bg-orange-900"
                    />

                    <WishlistStatsCard
                        number="2"
                        title="Total Harga"
                        value={totalPrice}
                        bgColor="bg-purple-100 dark:bg-purple-900"
                        isPrice={true}
                    />
                </div>

                <div className="mb-8">
                    <AddWishlistButton onClick={handleAdd} />
                </div>

                {isLoadingDelete && (
                    <LoadingIndicatorWishlist message="Menghapus item..." />
                )}

                <Wishlist
                    isLoadingWishlists={isLoadingWishlists}
                    items={items}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                />

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