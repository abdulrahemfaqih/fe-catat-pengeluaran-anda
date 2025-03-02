import React, { useState, useEffect } from 'react';

const DataLoadingIndicator = ({ isLoading, initialDelay = 1000 }) => {
    const [showIndicator, setShowIndicator] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [message, setMessage] = useState('Memuat data...');

    useEffect(() => {

        const timer = setTimeout(() => {
            if (isLoading) {
                setShowIndicator(true);
            }
        }, initialDelay);

        return () => clearTimeout(timer);
    }, [isLoading, initialDelay]);

    useEffect(() => {
        let interval;

        if (showIndicator && isLoading) {
            interval = setInterval(() => {
                setElapsedTime(prev => {
                    const newTime = prev + 1;

                    // Update message based on elapsed time
                    if (newTime > 10) {
                        setMessage('Mohon tunggu sebentar, mengambil data anda...');
                    } else if (newTime > 5) {
                        setMessage('Sedang menyiapkan informasi keuangan anda...');
                    }

                    return newTime;
                });
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [showIndicator, isLoading]);

    useEffect(() => {
        if (!isLoading) {
            // When loading completes, keep the message visible briefly before hiding
            const hideTimer = setTimeout(() => {
                setShowIndicator(false);
            }, 500);

            return () => clearTimeout(hideTimer);
        }
    }, [isLoading]);

    if (!showIndicator) return null;

    return (
        <div className="mb-8 rounded-xl border-4 border-black bg-yellow-50 p-5 shadow-[8px_8px_0px_rgba(0,0,0,1)] relative overflow-hidden animate-fadeIn">
            <div className="absolute -top-3 -right-3 w-20 h-20 bg-yellow-200 rounded-bl-full -mr-2 -mt-2 border-b-4 border-l-4 border-black"></div>

            <div className="flex items-center gap-4 relative z-10">
                <div className="shrink-0">
                    <div className="w-12 h-12 border-4 border-black border-t-blue-400 rounded-full animate-spin"></div>
                </div>

                <div>
                    <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
                        <span>⏱️</span>
                        {message}
                    </h3>

                    <div className="text-sm text-gray-700">
                        <span>
                            {elapsedTime > 10 ? (
                                "Pertama kali memuat mungkin membutuhkan waktu lebih lama. Silakan tunggu sebentar ya."
                            ) : (
                                "Sedang mempersiapkan data, harap bersabar sebentar."
                            )}
                        </span>

                        <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                            <div className="bg-blue-600 h-2.5 rounded-full animate-pulse" style={{ width: '80%' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataLoadingIndicator;