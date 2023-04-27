import { useState, useEffect } from "react";
import MovieCard from "@/components/MovieCard";
import NoMovies from "@/components/NoMovies";
import MyButton from "@/components/MyButton";

export default function Bookmarks() {
  const [bookMarkedMovies, setBookMarkedMovies] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("bookmarks")) {
      let movieDB = JSON.parse(localStorage.getItem("bookmarks"));
      setBookMarkedMovies(movieDB);
    }
  }, []);

  const removeBookmark = (movie) => {
    let newMovies = [...bookMarkedMovies];
    let index = newMovies.indexOf(movie);
    newMovies.splice(index, 1);
    localStorage.setItem("bookmarks", JSON.stringify(newMovies));
    setBookMarkedMovies(newMovies);
  };

  const handleWatch = (movieId, event) => {
    if (event.detail === 0) {
      return;
    }
    let newMovies = [...bookMarkedMovies];
    let index = newMovies.findIndex((movie) => movie.imdbID === movieId);
    let seenDB = JSON.parse(localStorage.getItem("moviesSeen"));
    let tempindex = seenDB.findIndex((m) => m.imdbID === movieId);
    if (tempindex >= 0) {
      seenDB.splice(tempindex);
      localStorage.setItem("moviesSeen", JSON.stringify(seenDB));
      return;
    }
    let newObj = {
      ...newMovies[index],
      watched: !newMovies[index].watched,
    };
    seenDB.push(newObj);
    localStorage.setItem("moviesSeen", JSON.stringify(seenDB));
  };

  const renderMovies =
    !bookMarkedMovies || bookMarkedMovies.length <= 0 ? (
      <NoMovies />
    ) : (
      bookMarkedMovies.map((movie) => {
        return (
          <div key={movie.Title}>
            <MovieCard
              movieData={movie}
              onRemove={removeBookmark}
              onWatch={handleWatch}
              seenMovies={localStorage.getItem("moviesSeen")}
            />
          </div>
        );
      })
    );

  return (
    <>
      <MyButton />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",

          flexFlow: "wrap",
        }}
      >
        {renderMovies}
      </div>
    </>
  );
}
