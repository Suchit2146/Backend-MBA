const { createTheatre, getTheatres, getTheatre, addMovieToThreatre, checkMovieInTheatre } = require("../controllers/theatre.controller");
const { verifyToken, isAdmin } = require("../middlewares/authJWT.middleware");
const { verifyIdParam } = require("../middlewares/generic.middleware");
const { validateCreateTheatresBody, verifyAddMoviesToTheatreReqIds } = require("../middlewares/theatre.middleware");

module.exports = function (app) {
    app.post("/mba/api/v1/theatres", [verifyToken, isAdmin, validateCreateTheatresBody], createTheatre);
    app.get("/mba/api/v1/theatres", [verifyToken], getTheatres);
    app.get("/mba/api/v1/theatres/:id", [verifyToken, verifyIdParam], getTheatre);
    app.put("/mba/api/v1/theatres/:theatreId/movies/:movieId", [verifyToken, isAdmin, verifyAddMoviesToTheatreReqIds], addMovieToThreatre);
    app.get("/mba/api/v1/theatres/:theatreId/movies/:movieId", [verifyToken, verifyAddMoviesToTheatreReqIds], checkMovieInTheatre);

}