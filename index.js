import express from "express";
const app = express();

// Middlewares

app.get("/", (req, res) => {
  res.send(
    "Hello user!, In /api/series you will find very good series to watch. Good luck !"
  );
});

// Routing
import seriesAndMoviesRouter from "./routers/series-and-movies.js";
app.use("/api/", seriesAndMoviesRouter);

import seriesRouter from "./routers/series.js";
app.use("/api/series", seriesRouter);

import moviesRouter from "./routers/movies.js";
app.use("/api/movies", moviesRouter);

// Listen

const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, () => {
  console.log(`Listening on port ${PUERTO}...`);
});
