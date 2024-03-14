const express = require("express");

const { series } = require("../datos/info.js").infoSeriesMovies;

const seriesRouter = express.Router();

seriesRouter.use(express.json());

seriesRouter.get("/", (req, res) => {
  res.json(series);
});

seriesRouter.get("/id/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const serie = series.filter((serie) => serie.id === id);
  if (serie.length === 0) {
    return res.status(404).send("The serie with the given ID was not found");
  }
  res.json(serie);
});

seriesRouter.get("/genre/:genre", (req, res) => {
  const genre = req.params.genre;
  const serie = series.filter(
    (serie) => serie.genre.toLowerCase() === genre.toLowerCase()
  );
  if (serie.length === 0) {
    return res.status(404).send("The serie with the given genre was not found");
  }
  res.json(serie);
});

seriesRouter.post("/", (req, res) => {
  const { title, genre, cover, seasons, episodes, rating } = req.body;
  const id = series.length + 1;
  const newSerie = {
    id,
    title,
    genre,
    cover,
    seasons,
    episodes,
    rating,
  };
  series.push(newSerie);
  res.json(newSerie);
});

seriesRouter.put("/id/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const serie = series.find((serie) => serie.id === id);
  if (!serie) {
    return res.status(404).send("The serie with the given ID was not found");
  }
  serie.title = req.body.title;
  serie.genre = req.body.genre;
  serie.cover = req.body.cover;
  serie.seasons = req.body.seasons;
  serie.episodes = req.body.episodes;
  serie.rating = req.body.rating;
  res.json(serie);
});

seriesRouter.patch("/id/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const serie = series.find((serie) => serie.id === id);
  if (!serie) {
    return res.status(404).send("The serie with the given ID was not found");
  }
  serie.title = req.body.title || serie.title;
  serie.genre = req.body.genre || serie.genre;
  serie.cover = req.body.cover || serie.cover;
  serie.seasons = req.body.seasons || serie.seasons;
  serie.episodes = req.body.episodes || serie.episodes;
  serie.rating = req.body.rating || serie.rating;
  res.json(serie);
});

seriesRouter.delete("/id/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const serie = series.find((serie) => serie.id === id);
  if (!serie) {
    return res.status(404).send("The serie with the given ID was not found");
  }
  const index = series.indexOf(serie);
  series.splice(index, 1);
  res.json(series);
});

module.exports = seriesRouter;
