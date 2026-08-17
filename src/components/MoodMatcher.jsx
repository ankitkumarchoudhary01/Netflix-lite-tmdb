import { useState } from 'react';
import { getMovieFromMood } from '../services/gemini';

function MoodMatcher({ onMovieFound }) {
    const [mood, setMood] = useState("")
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleMoodSearch() {
        const trimmedMood = mood.trim();

        if (!trimmedMood) { return; }

        try {
            setLoading(true);
            setError("");
            const movieTitle = await getMovieFromMood(trimmedMood);
            if (!movieTitle) {
                throw new Error("No movie was suggested");
            }
            console.log("Gemini movie:", movieTitle);

            onMovieFound(movieTitle);
        } catch (error) {
            console.error("Mood Matcher Error:", error);
            setError("Unable to find a movie for that mood.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className=" max-w-2xl rounded-2xl border border-zinc-800">

            <div className="flex w-full overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900 focus-within:border-zinc-500">
                <input
                    type="text"
                    value={mood}
                    onChange={(event) => {
                        setMood(event.target.value);
                    }}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            handleMoodSearch();
                        }
                    }}
                    placeholder="Describe your mood"
                    className="min-w-0 flex-1 bg-transparent px-4 py-3 text-white outline-none placeholder:text-zinc-600"
                />

                <button
                    type="button"
                    onClick={handleMoodSearch}
                    disabled={loading}
                    className="shrink-0 bg-white px-5 py-3 font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading ? "Finding..." : "Match Mood"}
                </button>
            </div>

            {error && (
                <p className="mt-4 text-sm text-red-400">
                    {error}
                </p>
            )}

        </section>
    );
}

export default MoodMatcher;
