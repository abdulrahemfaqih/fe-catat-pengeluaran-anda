import PropTypes from 'prop-types';

export default function WelcomeMessage({ user }) {
    return (
        <section className="relative overflow-hidden rounded-xl border-4 border-black bg-blue-50 p-6 shadow-[8px_8px_0px_rgba(0,0,0,1)]">
            <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-300 border-b-4 border-l-4 border-black transform rotate-0">
                <div className="absolute bottom-1 left-1 text-lg font-bold">✨</div>
            </div>
            <h2 className="text-2xl font-bold mb-2">
                Selamat Datang,
                <span className="text-blue-600">{user && user.name ? ` ${user.name}` : ""}!</span>
            </h2>
            <p className="text-gray-700">
                Kelola keuangan pribadi Anda dengan mudah dan menyenangkan.
            </p>
        </section>
    );
}

WelcomeMessage.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string
    })
};