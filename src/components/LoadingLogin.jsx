import React from 'react'

export default function LoadingLogin() {
    return (
        <div className="mb-4 p-3 bg-yellow-100 dark:bg-yellow-900/40 border-2 border-yellow-400 dark:border-yellow-600 rounded-lg text-yellow-700 dark:text-yellow-300 text-center transition-colors duration-300">
            <div className="flex items-center justify-center mb-1">
                <span className="mr-2 font-medium">Mohon tunggu</span>
                <span className="flex space-x-1">
                    <span
                        className="inline-block w-2 h-2 bg-yellow-600 dark:bg-yellow-400 rounded-full animate-bounce transition-colors duration-300"
                        style={{ animationDuration: "0.6s" }}
                    ></span>
                    <span
                        className="inline-block w-2 h-2 bg-yellow-600 dark:bg-yellow-400 rounded-full animate-bounce transition-colors duration-300"
                        style={{
                            animationDuration: "0.6s",
                            animationDelay: "0.2s",
                        }}
                    ></span>
                    <span
                        className="inline-block w-2 h-2 bg-yellow-600 dark:bg-yellow-400 rounded-full animate-bounce transition-colors duration-300"
                        style={{
                            animationDuration: "0.6s",
                            animationDelay: "0.4s",
                        }}
                    ></span>
                </span>
            </div>
            <span className="text-sm block">
                Proses ini mungkin memakan waktu beberapa saat
            </span>
        </div>
    )
}