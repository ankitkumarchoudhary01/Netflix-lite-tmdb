import { useEffect, useState } from "react";

const STORAGE_KEY = "myFavorites";

export default function useFavorites() {
    const [favorites, setFavorites] = useState(() => {
        const storedFavorites = localStorage.getItem(STORAGE_KEY);

        return storedFavorites
            ? JSON.parse(storedFavorites)
            : [];
    });

    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(favorites)
        );
    }, [favorites]);

    function toggleFavorite(movie) {
        setFavorites((previousFavorites) => {
            const alreadyFavorite = previousFavorites.some(
                (favorite) => favorite.id === movie.id
            );

            if (alreadyFavorite) {
                return previousFavorites.filter(
                    (favorite) => favorite.id !== movie.id
                );
            }

            return [
                ...previousFavorites,
                movie,
            ];
        });
    }

    function isFavorite(movieId) {
        return favorites.some(
            (movie) => movie.id === movieId
        );
    }

    return {
        favorites,
        toggleFavorite,
        isFavorite,
    };
}