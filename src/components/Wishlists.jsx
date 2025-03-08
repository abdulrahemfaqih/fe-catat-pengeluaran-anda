import React, { useState, useEffect } from "react";
import WishlistCard from "./WishlistCard";
import WishlistFilter from "./WishlistFilter";

const Wishlists = ({
    items,
    onUpdate,
    onDelete,
    isLoadingWishlists,
}) => {
    const [filteredItems, setFilteredItems] = useState([]);
    const [activeFilters, setActiveFilters] = useState({
        searchTerm: "",
        priceOperator: "lessEqual",
        priceValue: "",
        minPrice: "",
        maxPrice: "",
    });
    // State to track filter visibility on mobile
    const [showFilters, setShowFilters] = useState(false);

    // Initialize filtered items
    useEffect(() => {
        if (items && Array.isArray(items)) {
            setFilteredItems(items);
        }
    }, [items]);

    // Apply filters when they change
    useEffect(() => {
        if (!Array.isArray(items)) return;

        let filtered = [...items];
        const { searchTerm, priceOperator, priceValue, minPrice, maxPrice } =
            activeFilters;

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter((item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply price filter
        if (priceOperator === "between" && minPrice && maxPrice) {
            const min = parseFloat(minPrice);
            const max = parseFloat(maxPrice);

            if (!isNaN(min) && !isNaN(max)) {
                filtered = filtered.filter((item) => {
                    const price = parseFloat(item.price);
                    return price >= min && price <= max;
                });
            }
        } else if (priceValue) {
            const price = parseFloat(priceValue);

            if (!isNaN(price)) {
                switch (priceOperator) {
                    case "equals":
                        filtered = filtered.filter(
                            (item) => parseFloat(item.price) === price
                        );
                        break;
                    case "greater":
                        filtered = filtered.filter(
                            (item) => parseFloat(item.price) > price
                        );
                        break;
                    case "less":
                        filtered = filtered.filter(
                            (item) => parseFloat(item.price) < price
                        );
                        break;
                    case "greaterEqual":
                        filtered = filtered.filter(
                            (item) => parseFloat(item.price) >= price
                        );
                        break;
                    case "lessEqual":
                        filtered = filtered.filter(
                            (item) => parseFloat(item.price) <= price
                        );
                        break;
                    default:
                        break;
                }
            }
        }

        setFilteredItems(filtered);
    }, [items, activeFilters]);

    // Handle filter changes
    const handleApplyFilters = (filters) => {
        setActiveFilters(filters);
    };

    // Check if any filters are active
    const hasActiveFilters = () => {
        return (
            activeFilters.searchTerm !== "" ||
            (activeFilters.priceValue !== "" &&
                activeFilters.priceOperator !== "between") ||
            (activeFilters.minPrice !== "" &&
                activeFilters.maxPrice !== "" &&
                activeFilters.priceOperator === "between")
        );
    };

    // Format price operator for display
    const formatPriceOperator = (operator) => {
        switch (operator) {
            case "equals":
                return "=";
            case "greater":
                return ">";
            case "less":
                return "<";
            case "greaterEqual":
                return "≥";
            case "lessEqual":
                return "≤";
            case "between":
                return "antara";
            default:
                return operator;
        }
    };

    // Toggle filter visibility
    const handleToggleFilters = () => {
        setShowFilters(!showFilters);
    };

    // Loading State
    if (isLoadingWishlists) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <div className="relative w-16 h-16 mb-4">
                    {/* Outer circle - visible in both light/dark modes */}
                    <div className="absolute inset-0 border-4 border-gray-200 dark:border-gray-700 rounded-full"></div>

                    {/* Spinning inner circle with color that works in both modes */}
                    <div className="absolute inset-0 border-4 border-yellow-400 dark:border-purple-500 rounded-full border-t-transparent animate-spin"></div>

                    {/* Decoration dot */}
                    <div className="absolute top-1 right-1 w-3 h-3 bg-purple-500 dark:bg-yellow-400 rounded-full"></div>
                </div>
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Loading wishlist...
                </p>
            </div>
        );
    }

    // Empty State
    if (!items || items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                <div className="bg-yellow-100 dark:bg-yellow-800 w-20 h-20 rounded-full flex items-center justify-center mb-6 border-4 border-black">
                    <span className="text-4xl">✨</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 dark:text-white">
                    Wishlist Anda Kosong
                </h3>
                <p className="text-gray-600 dark:text-gray-300 max-w-md mb-6">
                    Belum ada item yang ditambahkan ke wishlist. Silahkan tambahkan barang yang Anda inginkan untuk melacak keinginan belanja Anda.
                </p>
                <div className="bg-gradient-to-r from-purple-100 to-yellow-100 dark:from-purple-900 dark:to-yellow-800 p-4 rounded-lg border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    <p className="text-sm font-medium dark:text-white">
                        💡 <span className="font-bold">Tip:</span> Gunakan wishlist untuk merencanakan pembelian Anda di masa depan dan membantu mengatur prioritas keuangan Anda.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <h2 className="text-2xl font-bold mb-4 md:mb-0 inline-flex flex-col md:flex-row md:items-center bg-purple-100 dark:bg-purple-800 dark:text-white px-4 py-2 border-3 border-black rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-colors duration-300">
                    <span>My Wishlist Items</span>
                </h2>

                {/* Show filter toggle button only on mobile */}
                {items.length > 0 && (
                    <button
                        onClick={handleToggleFilters}
                        className="md:hidden px-4 py-2 bg-purple-100 dark:bg-purple-800 dark:text-white border-3 border-black rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] font-bold flex items-center gap-2 hover:bg-purple-200 dark:hover:bg-purple-700 transition-colors"
                    >
                        <span>{showFilters ? "🔽 Tutup Filter" : "🔼 Tampilkan Filter"}</span>
                    </button>
                )}
            </div>

            {/* Filter Component - Only show if there are items */}
            {items.length > 0 && (
                <WishlistFilter
                    onApplyFilters={handleApplyFilters}
                    initialFilters={activeFilters}
                    onToggleVisibility={handleToggleFilters}
                    isVisible={showFilters}
                />
            )}

            {/* Filter Status Indicator */}
            {hasActiveFilters() && (
                <div className="mt-4 mb-6 px-4 py-3 bg-gradient-to-r from-yellow-100 to-yellow-50 dark:from-yellow-800 dark:to-yellow-900 dark:text-white border-2 border-yellow-500 dark:border-yellow-600 rounded-lg text-sm flex items-center transition-colors duration-300">
                    <span className="font-bold mr-2 bg-white dark:bg-gray-700 p-1 border-2 border-yellow-500 dark:border-yellow-600 rounded-md transition-colors duration-300">
                        📋
                    </span>
                    <span>
                        <span className="font-bold">
                            {filteredItems.length} dari {items.length}
                        </span>{" "}
                        item wishlist sesuai filter yang diterapkan
                        {activeFilters.searchTerm && (
                            <span className="ml-2 inline-block px-2 py-0.5 bg-blue-100 dark:bg-blue-800 rounded-md text-xs border border-blue-300 dark:border-blue-600">
                                Kata kunci: "{activeFilters.searchTerm}"
                            </span>
                        )}
                        {activeFilters.priceOperator === "between" &&
                            activeFilters.minPrice &&
                            activeFilters.maxPrice ? (
                            <span className="ml-2 inline-block px-2 py-0.5 bg-green-100 dark:bg-green-800 rounded-md text-xs border border-green-300 dark:border-green-600">
                                Harga: Rp{" "}
                                {parseInt(activeFilters.minPrice).toLocaleString()} - Rp{" "}
                                {parseInt(activeFilters.maxPrice).toLocaleString()}
                            </span>
                        ) : (
                            activeFilters.priceValue && (
                                <span className="ml-2 inline-block px-2 py-0.5 bg-green-100 dark:bg-green-800 rounded-md text-xs border border-green-300 dark:border-green-600">
                                    Harga{" "}
                                    {formatPriceOperator(activeFilters.priceOperator)} Rp{" "}
                                    {parseInt(activeFilters.priceValue).toLocaleString()}
                                </span>
                            )
                        )}
                    </span>
                </div>
            )}

            {filteredItems.length === 0 && items.length > 0 && (
                <div className="mb-6 p-3 bg-orange-100 dark:bg-orange-900/50 border-2 border-black rounded-lg flex items-center gap-2 text-sm dark:text-white">
                    <span className="text-xl">🔔</span>
                    <span>
                        Tidak ada hasil yang cocok dengan filter. Coba ubah kriteria
                        pencarian.
                    </span>
                </div>
            )}

            {/* Wishlist Cards Grid - Now showing all items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredItems.map((item, index) => (
                    <WishlistCard
                        key={item._id || index}
                        item={item}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                        index={index}
                    />
                ))}
            </div>

            {/* Simple result info */}
            {filteredItems.length > 0 && (
                <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                    Menampilkan {filteredItems.length} item dari total {items.length} item
                </div>
            )}
        </div>
    );
};

export default Wishlists;