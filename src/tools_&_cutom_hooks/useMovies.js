import { useState, useEffect } from "react";

const KEY = "649b030f";

//? Creating a sideEffect to fetch movies from query
export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      callback?.(); /// Close the movieDetails, when new movie is searched

      /// If nothing is typed in search bar
      if (!query.length) {
        setError("Search a movie");
        return;
      }

      /// Abort controller web_API =>provides abort function for fetch request
      const controller = new AbortController();
      const signal = controller.signal;

      // FUction to fetch movies from the API [Debounced]
      async function fetchMovies(query, signal) {
        try {
          setIsLoading(true); /// Show loader
          setError(""); /// reset the error message

          const res = await fetch(
            `http://www.omdbapi.com/?&apikey=${KEY}&s=${query}`,
            { signal }
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();
          if (data.Response === "False" || !data.Search)
            throw new Error("Movie not found");

          setMovies(data.Search);
          setError("");
          //.
        } catch (err) {
          if (err.name !== "AbortError") setError(err.message);
          //.
        } finally {
          setIsLoading(false);
        }
      }

      fetchMovies(query, signal);

      return () => {
        controller.abort();
        // console.log(`Aborted fetch request for query : ${query}`);
      };
    },
    [query]
  );
  return { movies, isLoading, error };
}
