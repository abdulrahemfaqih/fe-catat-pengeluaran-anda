import React from 'react';

const LoadingIndicatorWishlist = ({ message, bgColor = "bg-yellow-100" }) => {
    return (
        <div className={`py-3 px-4 text-black font-bold ${bgColor} border-3 border-black rounded-lg inline-flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}>
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>{message}</span>
        </div>
    );
};

export default LoadingIndicatorWishlist;