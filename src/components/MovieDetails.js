import { useEffect, useRef, useState } from "react";
import Loader from "./Loader";
import StarRating from "./StarRating";
import { useKey } from "../tools_&_cutom_hooks/useKey";

export default function MovieDetails({
  selectedId,
  handleCloseMovie,
  KEY,
  handleAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  /// "ref" variable for counting the 'number of times the user rates before submitting'
  const countRef = useRef(0);
  useEffect(
    function () {
      if (userRating) countRef.current += 1;
      console.log(countRef.current);
    },
    [userRating]
  );

  const isWatched = watched.map((m) => m.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (m) => m.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ")[0]),
      userRating,
      countRatingDecisions: countRef.current,
    };

    handleAddWatched(newWatchedMovie);
    handleCloseMovie();
  }

  //.
  //? Adding Esc keypress eventHandler
  useKey("Escape", handleCloseMovie);

  //.
  //? Fetching Movie data from an API
  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);

        const res = await fetch(
          `https://www.omdbapi.com/?&apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        setMovie(data);

        setIsLoading(false);
      }
      getMovieDetails();

      /// Resetting countref variable on switching from one movie to another
      countRef.current = 0;
    },
    [selectedId, KEY]
  );

  //.
  //? Setting the page title when a movie is selected
  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      /// Clean up function
      /// For cleaning the side_effect on 2 situations,When component is "closed" and  "re_Rendered"
      return () => {
        document.title = "Use popcorn";
      };
    },
    [title]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={handleCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={22}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to watched list
                    </button>
                  )}
                </>
              ) : (
                <p>You rated this movie {watchedUserRating} ⭐</p>
              )}
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
