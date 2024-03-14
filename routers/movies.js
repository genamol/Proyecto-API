const express = require("express");

const { movies } = require("../datos/info.js").infoSeriesMovies;

const moviesRouter = express.Router();

moviesRouter.use(express.json());

moviesRouter.get("/", (req, res) => {
  res.json(movies);
});

moviesRouter.get("/:id", (req, res) => {
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

module.exports = moviesRouter;
