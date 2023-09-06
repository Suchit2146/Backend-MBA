const { createMovie } = require("../controllers/movie.controller")
const { verifyCreateTicketBody } = require("../middlewares/movie.middleware")

module.exports = function (app) {
    app.post("/mba/api/v1/movies", [verifyCreateTicketBody], createMovie)
}