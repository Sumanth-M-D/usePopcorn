import { useState } from "react";

export default function WatchedMovie({ movie, handleDeleteWatched }) {
  /// If the movie doesn't have a poster then use a placeholder poster
  const [posterSource, setPosterSource] = useState(movie.poster);
  function handleError() {
    setPosterSource("/poster_placeholder.png");
  }

  return (
    <li key={movie.imdbID}>
      <img
        src={posterSource}
        alt={`${movie.title} poster`}
        onError={handleError}
      />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => handleDeleteWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}
