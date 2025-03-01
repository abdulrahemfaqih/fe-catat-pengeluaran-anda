import PropTypes from 'prop-types'

export default function WelcomeMessage({ user }) {
    return (
        <section className="mb-6 border-3 border-black p-4 rounded-md" >
            <h2 className="text-xl font-semibold">
                {" "}
                Selamat Datang
                <span className="font-bold text-blue-400">{user && user.name ? `, ${user.name}` : ""}</span> !
            </h2>
        </section>
    )
}

WelcomeMessage.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string
    })
}

