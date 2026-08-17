import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();

    return (
        <header className="fixed top-0 z-50 w-full border-b border-zinc-800 bg-black">
            <div className="mx-auto grid max-w-[1600px] grid-cols-3 items-center px-4 py-4 sm:px-6 lg:px-8">

                {/* Left */}
                <div className="justify-self-start">
                    <span className="text-xl tracking-tight text-red-500 sm:text-2xl">
                        Netflix Lite
                    </span>

                    <p className="mt-1 hidden text-sm text-zinc-500 sm:block">
                        Get the movies you love
                    </p>
                </div>

                {/* Center */}
                <div className="justify-self-center">
                    <input
                        type="text"
                        onClick={() => navigate("/search")}
                        placeholder="Search movies"
                        className="w-32 rounded-lg border border-zinc-600 bg-transparent px-3 py-2 text-sm text-white outline-none transition-all duration-200 placeholder:text-center hover:border-white focus:border-white sm:w-48 md:w-64"
                    />
                </div>

                {/* Right */}
                <button
                    type="button"
                    onClick={() => navigate("/favourites")}
                    className="justify-self-end rounded-xl border border-zinc-700 px-3 py-2 text-sm font-medium text-zinc-300 transition hover:border-zinc-500 hover:text-white sm:px-4 sm:py-2.5"
                >
                    Favorites
                </button>

            </div>
        </header>

    );
}

export default Header;