import { searchMovies } from "../services/tmdb";
import { useState } from "react";
import Header from "../components/Header";
import MovieGrid from "../components/MovieGrid";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";

export default function SearchPage() {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();


    async function handleSearch() {
        const trimmedQuery = query.trim();
        if (!trimmedQuery) {
            return;
        }

        try {
            setLoading(true);
            setError("");

            const data = await searchMovies(trimmedQuery);
            setMovies(data.results);
        } catch (error) {
            console.error(error);
            setError("Unable to search movies. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (<>
        <main className='mt-4 p-4 flex flex-col items-center gap-6'>
            <div className="">
                <button className='fixed left-5 border px-2 py-2 rounded-lg text-white' type='button' onClick={((e) => { navigate("/") })}> ← Back to Home </button>
                <SearchBar query={query} setQuery={setQuery} handleSearch={handleSearch} />

            </div>

            {query.trim()==="" && <div className="text-white">Enter something to search</div> }

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

            {!loading && !error && query.trim()!=="" &&(
                movies.length === 0 ? (
                    <div className="text-white">No Search Results</div>
                ) : (
                    <>
                        <div className="text-white">Search Results</div>
                        <MovieGrid movies={movies} />
                    </>
                )
            )}
        </main>
    </>

    )
}