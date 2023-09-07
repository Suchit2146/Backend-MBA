const { createTheatre, getTheatres, getTheatre, addMovieToThreatre, checkMovieInTheatre } = require("../controllers/theatre.controller");
const { verifyIdParam } = require("../middlewares/generic.middleware");
const { validateCreateTheatresBody, verifyAddMoviesToTheatreReqIds } = require("../middlewares/theatre.middleware");

module.exports = function (app) {
    app.post("/mba/api/v1/theatres", [validateCreateTheatresBody], createTheatre);
    app.get("/mba/api/v1/theatres", [], getTheatres);
    app.get("/mba/api/v1/theatres/:id", [verifyIdParam], getTheatre);
    app.put("/mba/api/v1/theatres/:theatreId/movies/:movieId", [verifyAddMoviesToTheatreReqIds], addMovieToThreatre);
    app.get("/mba/api/v1/theatres/:theatreId/movies/:movieId", [verifyAddMoviesToTheatreReqIds], checkMovieInTheatre);

}