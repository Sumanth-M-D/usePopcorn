import { useState } from "react";

export default function Movie({ movie, handleSelectMovie }) {
  /// If the movie doesn't have a poster then use a placeholder poster
  const [posterSource, setPosterSource] = useState(movie.Poster);
  function handleError() {
    setPosterSource("/poster_placeholder.png");
  }

  return (
    <li key={movie.imdbID} onClick={() => handleSelectMovie(movie.imdbID)}>
      <img
        src={posterSource}
        alt={`${movie.Title} poster`}
        onError={handleError}
      />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
