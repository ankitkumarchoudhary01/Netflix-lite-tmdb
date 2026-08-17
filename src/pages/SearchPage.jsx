import { searchMovies } from "../services/tmdb";
import { useCallback, useRef, useState, useEffect } from "react";
import MovieGrid from "../components/MovieGrid";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import useDebounce from "../hooks/useDebounce";
import useFavorites from "../hooks/useFavorites";
import MoodMatcher from "../components/MoodMatcher";

export default function SearchPage() {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [movies, setMovies] = useState([]);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [page, setPage] = useState(1);
    const debouncedQuery = useDebounce(query, 500);

    const pageRef = useRef(1);
    const loadMoreRef = useRef(null);
    const { toggleFavorite, isFavorite, } = useFavorites();

    const navigate = useNavigate();

    useEffect(() => {
        const trimmedQuery = debouncedQuery.trim();

        if (!trimmedQuery) {
            setMovies([]);
            setHasMore(false);
            setPage(1);
            pageRef.current = 1;
            return;
        }

        async function fetchSearchResults() {
            try {
                setLoading(true);
                setError("");

                const data = await searchMovies(
                    trimmedQuery,
                    1
                );

                setMovies(data.results);

                pageRef.current = 1;
                setPage(1);

                setHasMore(
                    data.page < data.total_pages
                );
            } catch (error) {
                console.error(error);
                setError(
                    "Unable to search movies. Please try again."
                );
            } finally {
                setLoading(false);
            }
        }

        fetchSearchResults();
    }, [debouncedQuery]);

    function handleSearch() {
        // Search is handled automatically
        // through the debounced query.
    }

    const loadMoreMovies = useCallback(async () => {
        if (loadingMore || !hasMore) {
            return;
        }

        const trimmedQuery = debouncedQuery.trim();

        if (!trimmedQuery) {
            return;
        }
        const nextPage = pageRef.current + 1;

        try {
            setLoadingMore(true);
            setError("");

            const data = await searchMovies(
                trimmedQuery,
                nextPage
            );

            setMovies((previousMovies) => [
                ...previousMovies,
                ...data.results,
            ]);
            pageRef.current = data.page;
            setPage(data.page);
            setHasMore(data.page < data.total_pages);
        } catch (error) {
            console.error(error);
            setError("Unable to load more movies.");
        } finally {
            setLoadingMore(false);
        }
    }, [
        debouncedQuery,
        hasMore,
        loadingMore,
    ]);

    useInfiniteScroll({
        targetRef: loadMoreRef,
        onLoadMore: loadMoreMovies,
        hasMore,
        loading: loadingMore,
    });

    async function handleMoodMovie(movieTitle) {
        try {
            console.log("Starting")
            setLoading(true);
            setError("");

            const data = await searchMovies(
                movieTitle,
                1
            );

            setMovies(data.results);

            pageRef.current = 1;
            setPage(1);

            setHasMore(
                data.page < data.total_pages
            );
            console.log("ended")
        } catch (error) {
            console.error(error);

            setError(
                "Unable to find the recommended movie."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-black p-4 text-white">
            <div className="flex flex-col items-center gap-6">

                {/* Back Button + Search */}
                <div className="flex w-full max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
                    <button
                        className="w-full rounded-lg border border-zinc-700 px-3 py-3 text-sm transition hover:bg-zinc-900 sm:w-auto"
                        type="button"
                        onClick={() => navigate("/")}
                    >
                        ← Back to Home
                    </button>

                    <div className="w-full sm:flex-1">
                        <SearchBar
                            query={query}
                            setQuery={setQuery}
                            handleSearch={handleSearch}
                        />
                    </div>

                    <MoodMatcher onMovieFound={handleMoodMovie}/>
                </div>

                {/* Empty search
                {query.trim() === "" && (
                    <div className="flex min-h-[300px] items-center justify-center">
                        <p className="text-zinc-500">
                            Enter something to search
                        </p>
                    </div>
                )} */}

                {/* Initial loading */}
                {loading  && (
                    <div className="flex min-h-[400px] items-center justify-center">
                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-800 border-t-white" />
                    </div>
                )}

                {/* Error */}
                {error && (
                    <div className="w-full max-w-3xl rounded-xl border border-red-900/50 bg-red-950/30 p-6 text-center">
                        <p className="text-red-400">
                            {error}
                        </p>
                    </div>
                )}

                {/* Search results */}
                {!loading &&
                    !error &&
                     (
                        movies.length === 0 ? (
                            <div className="flex min-h-[300px] items-center justify-center">
                                <p className="text-zinc-500">
                                    No search results
                                </p>
                            </div>
                        ) : (
                            <div className="w-full max-w-[1600px]">

                                <div className="mb-6">
                                    <h1 className="text-2xl font-bold">
                                        Search Results
                                    </h1>

                                    <p className="mt-1 text-sm text-zinc-500">
                                        Showing results for "{query}"
                                    </p>
                                </div>

                                <MovieGrid movies={movies} onToggleFavorite={toggleFavorite} isFavorite={isFavorite} />

                            </div>
                        )
                    )}

                {/* Always mounted */}
                <div
                    ref={loadMoreRef}
                    className="flex min-h-28 items-center justify-center"
                >
                    {loadingMore && (
                        <div className="flex flex-col items-center gap-3">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-800 border-t-white" />

                            <p className="text-sm text-zinc-500">
                                Loading more movies...
                            </p>
                        </div>
                    )}

                    {!hasMore && query.trim() !== "" && movies.length > 0 && (
                        <p className="text-sm text-zinc-600">
                            You've reached the end of the results.
                        </p>
                    )}
                </div>
            </div>
        </main>
    );
}