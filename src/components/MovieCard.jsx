function MovieCard({ movie }) {
    const imageBaseUrl = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

    return (
        <article className="group overflow-hidden rounded-xl bg-zinc-900 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <div className="relative aspect-[2/3] overflow-hidden bg-zinc-800">
                {movie.poster_path ? (
                    <img
                        src={`${imageBaseUrl}${movie.poster_path}`}
                        alt={movie.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-sm text-zinc-500">
                        No poster available
                    </div>
                )}

                <div className="absolute right-3 top-3 rounded-lg bg-black/75 px-2.5 py-1 text-sm font-semibold text-white backdrop-blur-sm">
                    ★ {movie.vote_average.toFixed(1)}
                </div>
            </div>

            <div className="p-4">
                <h2 className="truncate text-base font-semibold text-white">
                    {movie.title}
                </h2>

                <div className="mt-2 flex items-center justify-between text-sm text-zinc-400">
                    <span>
                        {movie.release_date
                            ? movie.release_date.slice(0, 4)
                            : "N/A"}
                    </span>

                    <span>Movie</span>
                </div>
            </div>
        </article>
    );
}

export default MovieCard;