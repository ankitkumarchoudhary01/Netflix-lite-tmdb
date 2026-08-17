import { useEffect, useState, useRef, useCallback } from "react";

import Header from "../components/Header";
import MovieGrid from "../components/MovieGrid";
import { getPopularMovies, searchMovies } from "../services/tmdb";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import useFavorites from "../hooks/useFavorites";

function Homepage() {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);

    const pageRef = useRef(1);

    const loadMoreRef = useRef(null);
    const {toggleFavorite,isFavorite,} = useFavorites();

    useEffect(() => {
        async function fetchInitialMovies() {
            try {
                setLoading(true);
                setError("");

                const data = await getPopularMovies(1);
                setMovies(data.results);
                pageRef.current = 1;

                setPage(1);
                setHasMore(data.page < data.total_pages);
            } catch (error) {
                console.error(error);
                setError("Unable to load movies. Please try again.");
            } finally {
                setLoading(false);
            }
        }

        fetchInitialMovies();
    }, []);

    const loadMoreMovies = useCallback(async () => {
        if (loadingMore || !hasMore) { return; }
        const nextPage = pageRef.current + 1;

        try {
            setLoadingMore(true);
            const data = await getPopularMovies(nextPage);
            setMovies((previousMovies) => [
                ...previousMovies,
                ...data.results,
            ]);
            pageRef.current = data.page;

            setPage(data.page);
            setHasMore(data.page < data.total_pages);
        } catch (error) {
            console.error(error);
            setError("Unable to load more movies");
        } finally {
            setLoadingMore(false);
        }
    }, [query, hasMore, loadingMore]);

    useInfiniteScroll({ targetRef: loadMoreRef, onLoadMore: loadMoreMovies, hasMore, loading: loadingMore, });



    return (
        <div className="min-h-screen bg-black text-white">
            <Header />

            <main className=" mx-auto max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-4 flex flex-col items-center ">
                    <p className="mt-20 mb-2 text-lg font-bold uppercase tracking-widest text-red-500">
                        Trending now
                    </p>

                </div>

                {loading && (
                    <div className="flex min-h-[400px] items-center justify-center">
                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-800 border-t-white" />
                    </div>
                )}

                {error && (
                    <div className="rounded-xl border border-red-900/50 bg-red-950/30 p-6 text-center">
                        <p className="text-red-400">{error}</p>
                    </div>
                )}

                {!loading && !error &&
                    (<MovieGrid movies={movies} onToggleFavorite={toggleFavorite} isFavorite={isFavorite}/>)}

                <div
                    ref={loadMoreRef}
                    className="flex min-h-24 items-center justify-center"
                >
                    {loadingMore && (
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-800 border-t-white" />
                    )}

                    {!hasMore && (
                        <p className="text-sm text-zinc-600">
                            You've reached the end.
                        </p>
                    )}
                </div>

            </main>
        </div>
    );
}

export default Homepage;