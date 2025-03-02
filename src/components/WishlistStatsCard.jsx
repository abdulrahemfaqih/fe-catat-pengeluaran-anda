import React from 'react';

const WishlistStatsCard = ({ number, title, value, bgColor, isPrice = false }) => {
    return (
        <div className={`border-4 border-black rounded-xl p-5 ${bgColor} flex-1 relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden transform transition-all hover:-translate-y-1`}>
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-black/10 rounded-full border-2 border-black z-0"></div>

            <div className="absolute -top-3 -left-3 w-10 h-10 bg-white border-3 border-black rounded-full flex items-center justify-center font-bold text-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] z-10">
                #{number}
            </div>

            <h3 className="text-center font-bold text-lg mb-3 mt-2 relative z-10">{title}</h3>

            <div className="bg-white border-3 border-black rounded-lg p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] relative z-10">
                <p className={`text-center ${isPrice ? "text-3xl sm:text-2xl md:text-3xl" : "text-4xl"} font-black`}>
                    {isPrice ? `Rp ${value.toLocaleString()}` : value}
                </p>
            </div>
        </div>
    );
};

export default WishlistStatsCard;