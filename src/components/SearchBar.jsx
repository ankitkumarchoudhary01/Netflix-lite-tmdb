function SearchBar({query, setQuery, handleSearch}) {
    
    

    function handleSubmit(event){
        event.preventDefault();
        handleSearch();
    }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-xl items-center gap-2">
      <div className="relative flex-1">
        <svg
          className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
          />
        </svg>

        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
          className="w-full rounded-xl border border-zinc-700 bg-zinc-900 py-3 pl-12 pr-4 text-sm text-white outline-none placeholder:text-zinc-500 transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-700"
        />
      </div>

      {/* <button
        type="submit"
        className="rounded-xl bg-zinc-200 px-5 py-3 text-sm font-semibold text-black transition hover:bg-white"
      >
        Search
      </button> */}
    </form>
  );
}

export default SearchBar;