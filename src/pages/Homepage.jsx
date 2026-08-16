import { useEffect, useState } from "react";

import Header from "../components/Header";
import MovieGrid from "../components/MovieGrid";
import { getPopularMovies,searchMovies } from "../services/tmdb";

function Homepage() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        setError("");

        const data = await getPopularMovies();

        setMovies(data.results);
      } catch (error) {
        console.error(error);
        setError("Unable to load movies. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  async function handleSearch() {
    const trimmedQuery = query.trim();
    if (!trimmedQuery){
      return;
    }

    try{
      setLoading(true);
      setError("");

      const data=await searchMovies(trimmedQuery);
      setMovies(data.results);
    } catch (error) {
      console.error(error);
      setError("Unable to search movies. Please try again.");
    } finally {
      setLoading(false);
    }
  }

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

        {!loading && !error && <MovieGrid movies={movies} />}
      </main>
    </div>
  );
}

export default Homepage;