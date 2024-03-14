const express = require("express");
const app = express();

const { infoSeriesMovies } = require("./datos/info.js");

app.get("/", (req, res) => {
  res.send(
    "Hello user!, In /api/series you will find very good series to watch. Good luck !"
  );
});

// Routing
const seriesAndMoviesRouter = require("./routers/series-and-movies.js");
app.use("/api/", seriesAndMoviesRouter);

const seriesRouter = require("./routers/series.js");
app.use("/api/series", seriesRouter);

const moviesRouter = require("./routers/movies.js");
app.use("/api/movies", moviesRouter);

// Listen

const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, () => {
  console.log(`Listening on port ${PUERTO}...`);
});
