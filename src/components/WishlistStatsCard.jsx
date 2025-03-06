import React from 'react';

const WishlistStatsCard = ({ number, title, value, bgColor, isPrice = false }) => {
    // Helper function to get appropriate icon based on card number/type
    const getCardIcon = (num) => {
        switch (num) {
            case "1":
                return "✨"; // For Total Wishlist
            case "2":
                return "💰"; // For Total Price
            default:
                return "📊"; // Default icon
        }
    };

    return (
        <div className={`border-4 border-black rounded-xl p-4 sm:p-5 ${bgColor} flex-1 relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden transform transition-all hover:-translate-y-1`}>
            {/* Title section with icon */}
            <div className="flex items-center gap-2 mb-3 border-black pb-2">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-white dark:bg-gray-700 rounded-md border-3 border-black text-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-colors duration-300">
                    {getCardIcon(number)}
                </span>
                <h3 className="font-bold text-lg relative z-10 dark:text-white transition-colors duration-300">{title}</h3>
            </div>

            {/* Value display */}
            <div className="bg-white dark:bg-gray-800 border-3 border-black rounded-lg p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] relative z-10 transition-colors duration-300">
                <p className={`text-center ${isPrice ? "text-2xl sm:text-xl md:text-2xl lg:text-3xl" : "text-3xl sm:text-2xl md:text-3xl lg:text-4xl"} font-black dark:text-white transition-colors duration-300`}>
                    {isPrice ? `Rp ${value.toLocaleString()}` : value}
                </p>
            </div>

            {/* Subtle corner decoration */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-black/5 dark:bg-white/5 -mt-8 -mr-8 transform rotate-45 transition-colors duration-300"></div>
        </div>
    );
};

export default WishlistStatsCard;