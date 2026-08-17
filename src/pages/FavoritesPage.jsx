import { useNavigate } from "react-router-dom";
import MovieGrid from "../components/MovieGrid";
import useFavorites from "../hooks/useFavorites";

export default function FavoritesPage() {
    const navigate = useNavigate();

    const {
        favorites,
        toggleFavorite,
        isFavorite,
    } = useFavorites();

    return (
        <main className="min-h-screen bg-black p-4  text-white">
            <div className="mx-auto max-w-[1600px]">

                {/* Header */}
                <div className="relative w-full mb-8 mt-2 flex flex-col items-center ">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="absolute left-5 rounded-lg border border-zinc-700 px-4 py-2 text-sm transition hover:bg-zinc-900"
                    >
                        ← Back
                    </button>
                    

                    <div>
                        <h1 className="text-3xl font-bold">
                            My Favorites
                        </h1>

                        <p className="mt-2 text-center text-sm text-zinc-500">
                            {favorites.length}{" "}
                            {favorites.length === 1
                                ? "movie"
                                : "movies"}{" "}
                            saved
                        </p>
                    </div>

                </div>

                {/* Empty State */}
                <div className="m-5">
                {favorites.length === 0 ? (
                    <div className="flex min-h-[400px] flex-col items-center justify-center text-center">

                        <div className="mb-4 text-5xl">
                            ♡
                        </div>

                        <h2 className="text-xl font-semibold">
                            No favorites yet
                        </h2>

                        <p className="mt-2 text-sm text-zinc-500">
                            Add movies to your favorites and they will
                            appear here.
                        </p>

                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="mt-6 rounded-lg bg-white px-5 py-3 font-semibold text-black transition hover:bg-zinc-200"
                        >
                            Browse Movies
                        </button>

                    </div>
                ) : (
                    <MovieGrid
                        movies={favorites}
                        onToggleFavorite={toggleFavorite}
                        isFavorite={isFavorite}
                    />
                )}
                </div>

            </div>
        </main>
    );
}