const express = require("express");

const { movies } = require("../datos/info.js").infoSeriesMovies;

const moviesRouter = express.Router();

moviesRouter.use(express.json());

moviesRouter.get("/", (req, res) => {
  res.json(movies);
});

moviesRouter.get("/id/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const movie = movies.filter((movie) => movie.id === id);
  if (movie.length === 0) {
    return res.status(404).send("The movie with the given ID was not found");
  }
  res.json(movie);
});

moviesRouter.get("/genre/:genre", (req, res) => {
  const genre = req.params.genre;
  const movie = movies.filter(
    (movie) => movie.genre.toLowerCase() === genre.toLowerCase()
  );
  if (movie.length === 0) {
    return res.status(404).send("The movie with the given genre was not found");
  }
  res.json(movie);
});

moviesRouter.post("/", (req, res) => {
  const { title, genre, cover, duration, rating } = req.body;
  const id = movies.length + 1;
  const newMovie = {
    id,
    title,
    genre,
    cover,
    duration,
    rating,
  };
  movies.push(newMovie);
  res.json(newMovie);
});

moviesRouter.put("/id/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const movie = movies.find((movie) => movie.id === id);
  if (!movie) {
    return res.status(404).send("The movie with the given ID was not found");
  }
  movie.title = req.body.title;
  movie.genre = req.body.genre;
  movie.cover = req.body.cover;
  movie.duration = req.body.duration;
  movie.rating = req.body.rating;
  res.json(movie);
});

moviesRouter.patch("/id/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const movie = movies.find((movie) => movie.id === id);
  if (!movie) {
    return res.status(404).send("The movie with the given ID was not found");
  }
  movie.title = req.body.title || movie.title;
  movie.genre = req.body.genre || movie.genre;
  movie.cover = req.body.cover || movie.cover;
  movie.duration = req.body.duration || movie.duration;
  movie.rating = req.body.rating || movie.rating;
  res.json(movie);
});

moviesRouter.delete("/id/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const movie = movies.find((movie) => movie.id === id);
  if (!movie) {
    return res.status(404).send("The movie with the given ID was not found");
  }
  const index = movies.indexOf(movie);
  movies.splice(index, 1);
  res.json(movies);
});

module.exports = moviesRouter;
