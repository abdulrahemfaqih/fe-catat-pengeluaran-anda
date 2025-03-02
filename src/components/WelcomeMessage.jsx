import PropTypes from 'prop-types';

export default function WelcomeMessage({ user }) {
    return (
        <section className="relative overflow-hidden rounded-xl border-4 border-black bg-blue-50 p-6 shadow-[8px_8px_0px_rgba(0,0,0,1)]">
            {/* Ribbon decoration - diperbaiki dengan z-index dan ukuran yang lebih kecil di mobile */}
            <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 bg-yellow-300 border-b-4 border-l-4 border-black transform rotate-0 -z-0">
                <div className="absolute bottom-1 left-1 text-base sm:text-lg font-bold">✨</div>
            </div>

            {/* Content wrapper - ditambahkan max-width agar teks tidak tumpang tindih dengan ribbon */}
            <div className="relative z-10 max-w-[calc(100%-3rem)]">
                <h2 className="text-xl sm:text-2xl font-bold mb-2 break-words">
                    Selamat Datang,
                    <span className="text-blue-600 block sm:inline">{user && user.name ? ` ${user.name}` : ""}!</span>
                </h2>
                <p className="text-gray-700">
                    Kelola keuangan pribadi Anda dengan mudah dan menyenangkan.
                </p>
            </div>
        </section>
    );
}

WelcomeMessage.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string
    })
};