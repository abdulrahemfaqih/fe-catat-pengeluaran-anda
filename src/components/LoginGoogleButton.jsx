import React from 'react';

const GoogleLoginButton = ({ onClick, isLoading }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isLoading}
      className={`w-full mt-3 flex items-center justify-center gap-3 border-3 border-black bg-white dark:bg-gray-700 py-3 rounded-lg font-bold text-black dark:text-white transition-colors duration-300 ${isLoading
        ? 'opacity-80 cursor-wait shadow-[2px_2px_0px_rgba(0,0,0,1)]'
        : 'hover:bg-gray-50 dark:hover:bg-gray-600 shadow-[5px_5px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:-translate-y-1'
        }`}
    >
      {isLoading ? (
        <>
          {/* Improved spinner with full circle design */}
          <div className="w-6 h-6 rounded-full border-3 border-blue-300 dark:border-blue-400 border-t-blue-600 dark:border-t-blue-300 animate-spin transition-colors duration-300"></div>
          <span className="ml-2 truncate">Menyambungkan...</span>
        </>
      ) : (
        <>
          <svg width="24" height="24" viewBox="0 0 24 24" className="dark:drop-shadow-[0_0_2px_rgba(255,255,255,0.3)]">
            <path
              fill="#4285F4"
              d="M21.8,12.1c0-0.7-0.1-1.4-0.2-2.1H12v3.9h5.5c-0.2,1.2-0.9,2.3-2,3v2.5h3.2C20.2,17.5,21.8,15,21.8,12.1z"
            />
            <path
              fill="#34A853"
              d="M12,22c2.7,0,4.9-0.9,6.5-2.4l-3.2-2.5c-0.9,0.6-2,0.9-3.4,0.9c-2.6,0-4.7-1.7-5.5-4.1H3.1v2.6C4.8,19.7,8.2,22,12,22z"
            />
            <path
              fill="#FBBC05"
              d="M6.5,13.9c-0.2-0.6-0.3-1.2-0.3-1.9c0-0.7,0.1-1.3,0.3-1.9V7.6H3.1C2.4,9,2,10.5,2,12s0.4,3,1.1,4.4L6.5,13.9z"
            />
            <path
              fill="#EA4335"
              d="M12,5.8c1.4,0,2.7,0.5,3.8,1.5l2.8-2.8C16.9,2.9,14.7,2,12,2C8.2,2,4.8,4.3,3.1,7.6l3.4,2.6C7.3,7.5,9.5,5.8,12,5.8z"
            />
          </svg>
          <span>Login dengan Google</span>
        </>
      )}
    </button>
  );
};

export default GoogleLoginButton;