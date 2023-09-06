const { createMovie, getMovies, getMovie, updateMovie, deleteMovie } = require("../controllers/movie.controller");
const { verifyIdParam } = require("../middlewares/generic.middleware");
const { verifyCreateMovieBody, verifyUpdateMovieBody } = require("../middlewares/movie.middleware")

module.exports = function (app) {
    app.post("/mba/api/v1/movies", [verifyCreateMovieBody], createMovie);
    app.get("/mba/api/v1/movies", [], getMovies);
    app.get("/mba/api/v1/movies/:id", [verifyIdParam], getMovie);
    app.put("/mba/api/v1/movies/:id", [verifyIdParam, verifyUpdateMovieBody], updateMovie);
    app.delete("/mba/api/v1/movies/:id", [verifyIdParam], deleteMovie);
}