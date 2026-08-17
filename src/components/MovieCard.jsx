function MovieCard({
    movie,
    onToggleFavorite,
    isFavorite,
}) {
    return (
        <article className="group relative overflow-hidden rounded-xl bg-zinc-900">

            <div className="relative aspect-[2/3] overflow-hidden">

                <img
                    src={`${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
                    alt={movie.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />

                <button
                    type="button"
                    onClick={() => onToggleFavorite(movie)}
                    aria-label={
                        isFavorite
                            ? `Remove ${movie.title} from favorites`
                            : `Add ${movie.title} to favorites`
                    }
                    className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-2xl backdrop-blur-sm transition hover:scale-110"
                >
                    {isFavorite ? "♥" : "♡"}
                </button>

            </div>

            <div className="p-4">
                <h2 className="truncate text-lg font-semibold">
                    {movie.title}
                </h2>

                <div className="mt-2 flex items-center justify-between text-sm text-zinc-400">
                    <span>
                        {movie.release_date
                            ? movie.release_date.slice(0, 4)
                            : "N/A"}
                    </span>

                    <span>
                        Rating: {movie.vote_average.toFixed(1)}
                    </span>
                </div>
            </div>

        </article>
    );
}

export default MovieCard;