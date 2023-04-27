import Head from "next/head";
import Image from "next/image";
//import { Inter } from "next/font/google";

import axios from "axios";
import MovieCard from "@/components/MovieCard";
import NavBar from "@/components/NavBar";
import { useState, useEffect } from "react";

export default function Home({ data, context }) {
  const [searchedMovies, setSearchedMovies] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("bookmarks")) {
      localStorage.setItem("bookmarks", JSON.stringify([]));
    }
    if (!localStorage.getItem("moviesSeen")) {
      localStorage.setItem("moviesSeen", JSON.stringify([]));
    }
    const makeRequest = async () => {
      const result = await axios.get("/api/");
      let newMovies = result.data.map((movie) => {
        return {
          ...movie,
          watched: false,
        };
      });
      setSearchedMovies(newMovies);
    };
    makeRequest();
  }, []);

  const handleBookmark = (movie) => {
    const movieItem = searchedMovies.find(
      (currentMovie) => currentMovie.imdbID === movie.imdbID
    );
    const movieDB = JSON.parse(localStorage.getItem("bookmarks"));

    /*If this movie is already in the bookmarks don't add it */
    let exists = movieDB.find(
      (currentMovie) => currentMovie.imdbID === movieItem.imdbID
    );
    if (exists) {
      return;
    }
    movieDB.push(movieItem);
    localStorage.setItem("bookmarks", JSON.stringify(movieDB));
  };

  const handleWatch = (movieId, event) => {
    if (event.detail === 0) {
      return;
    }
    let newMovies = [...searchedMovies];
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

  const renderMovies = searchedMovies.map((movie) => {
    return (
      <div key={movie.imdbID}>
        <MovieCard
          movieData={movie}
          onBookmark={() => handleBookmark(movie)}
          onWatch={handleWatch}
          seenMovies={localStorage.getItem("moviesSeen")}
        />
      </div>
    );
  });

  const handleSearchMovie = async (event) => {
    event.preventDefault();
    const { currentTarget = {} } = event;
    const fields = Array.from(currentTarget?.elements);
    const fieldQuery = fields.find((field) => field.name === "query");

    const value = fieldQuery.value || "";
    const result = await axios(`/api/${value}`);
    setSearchedMovies(result.data);
  };

  return (
    <>
      <NavBar />
      <form onSubmit={handleSearchMovie} style={{ textAlign: "center" }}>
        <input
          type="search"
          name="query"
          style={{
            border: "1px solid lightblue",
            borderRadius: "10px",
            padding: "10px",
          }}
          placeholder="Search Movie"
        />
      </form>
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
