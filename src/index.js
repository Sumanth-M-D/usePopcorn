import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import StarRating from "./components/StarRating";
import "./index.css";
import App from "./components/App";

const root = ReactDOM.createRoot(document.getElementById("root"));

//
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating
      maxRating={5}
      messages={["terrible", "bad", "Ok", "good", "amazing"]}
    />
    <RatingText /> */}
  </React.StrictMode>
);

// function RatingText() {
//   const [movieRating, setMovieRating] = useState(0);
//   return (
//     <>
//       <StarRating
//         maxRating={10}
//         size={24}
//         color={"red"}
//         onSetRating={setMovieRating}
//       />
//       <p>This movie is {movieRating} rated</p>
//     </>
//   );
// }
