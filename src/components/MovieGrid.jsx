import MovieCard from "./MovieCard";

function MovieGrid({
    movies,
    onToggleFavorite,
    isFavorite,
}) {
    return (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onToggleFavorite={onToggleFavorite}
                    isFavorite={isFavorite(movie.id)}
                />
            ))}
        </div>
    );
}

export default MovieGrid;