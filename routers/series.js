const express = require("express");

const { series } = require("../datos/info.js").infoSeriesMovies;

const seriesRouter = express.Router();

seriesRouter.use(express.json());

seriesRouter.get("/", (req, res) => {
  res.json(series);
});

seriesRouter.get("/:id", (req, res) => {
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

module.exports = seriesRouter;
