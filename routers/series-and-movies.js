import express from "express";

import { infoSeriesMovies } from "../datos/info.js";

const { series, movies } = infoSeriesMovies;

const seriesAndMoviesRouter = express.Router();

seriesAndMoviesRouter.use(express.json());

seriesAndMoviesRouter.get("/", (req, res) => {
  res.json(infoSeriesMovies);
});

seriesAndMoviesRouter.get("/genre/:genre", (req, res) => {
  const genre = req.params.genre;
  const seriesResult = series.filter(
    (serie) => serie.genre.toLowerCase() === genre.toLowerCase()
  );
  const moviesResult = movies.filter(
    (movie) => movie.genre.toLowerCase() === genre.toLowerCase()
  );

  if (seriesResult.length === 0 && moviesResult.length === 0) {
    return res
      .status(404)
      .send("The serie or movie with the given genre was not found");
  }
  res.json({ series: seriesResult, movies: moviesResult });
});

export default seriesAndMoviesRouter;
