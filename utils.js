export const options = {
  method: "GET",
  url: "https://movie-database-alternative.p.rapidapi.com/",
  params: {
    s: "Avengers Endgame",
    r: "json",
    page: "1",
  },
  headers: {
    "content-type": "application/octet-stream",
    "X-RapidAPI-Key": "d5ce60b0afmsh887a84d00953e33p14671ajsnad4fb79c3f1b",
    "X-RapidAPI-Host": "movie-database-alternative.p.rapidapi.com",
  },
};