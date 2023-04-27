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
    newMovies.splice(index);
    localStorage.setItem("bookmarks", JSON.stringify(newMovies));
    console.log(newMovies);
    setBookMarkedMovies(newMovies);
  };

  const renderMovies =
    !bookMarkedMovies || bookMarkedMovies.length <= 0 ? (
      <NoMovies />
    ) : (
      bookMarkedMovies.map((movie) => {
        return (
          <div key={movie.Title}>
            <MovieCard movieData={movie} onRemove={removeBookmark} />
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
