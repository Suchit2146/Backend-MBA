const movieModel = require("../models/movie.model");
const theatreModel = require("../models/theatre.model");


const verifyCreateBokkingRequest = async (req, res, next) => {
    const { theatreId, movieId } = req.body;

    try {
        const [theatre, movie] = await Promise.all([theatreModel.findById(theatreId), movieModel.findById(movieId)]);

        if (theatre && movie) {
            if (!theatre.movies.includes(movie._id)) {
                return res.status(400).send({ message: "movie not available in theatre" })
            }
            next();
            return;
        }
        if (!theatre) {
            return res.status(400).send({ message: "invalid theatre id " })
        }
        if (!theatre) {
            return res.status(400).send({ message: "invalid movie id " })
        }
    } catch (err) {
        return res.status(500).send({ message: "something went wrong " + err })
    }
}

module.exports = {
    verifyCreateBokkingRequest
}