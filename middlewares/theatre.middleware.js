const { default: mongoose } = require("mongoose");
const movieModel = require("../models/movie.model");
const theatreModel = require("../models/theatre.model");


const validateCreateTheatresBody = async function (req, res, next) {
    const { name, description, pinCode, movies } = req.body;
    if (!description) {
        return res.status(400).send({ message: "theatre description is not provided" })
    }
    if (!name) {
        return res.status(400).send({ message: "theatre name is not provided" })
    }
    if (!pinCode) {
        return res.status(400).send({ message: "theatre pinCode is not provided" })
    }

    if (movies && movies.length) {
        //validate aall are correct movie

        const promiseArr = movies.map((movieId) => { return movieModel.findById(movieId) })
        try {
            const values = await Promise.all(promiseArr);
            values.forEach((value) => {
                if (!value) {
                    return res.status(400).send({ message: "invalid movie id is passed" })
                }
            })
            next();
            return;
        } catch (e) {
            return res.status(400).send({ message: "invalid movie id is passed" })
        }
    }
    next()
}

const verifyAddMoviesToTheatreReqIds = async (req, res, next) => {
    const { theatreId, movieId } = req.params;

    if (!mongoose.isValidObjectId(movieId) || !mongoose.isValidObjectId(theatreId)) {
        return res.status(400).send({ message: "invalid object id" })
    }
    try {
        const [movie, theatre] = await Promise.all([movieModel.findById(movieId), theatreModel.findById(theatreId)]);
        if (!theatre) {
            return res.status(404).send({ message: "theatre not found" })
        }
        if (!movie) {
            return res.status(404).send({ message: "movie not found" })
        }

        req.metaData = {
            movie, theatre
        }
        next();
        return;
    } catch (err) {
        return res.status(400).send({ message: "invalid movieid or theatreid is passed" })
    }

}

module.exports = {
    validateCreateTheatresBody,
    verifyAddMoviesToTheatreReqIds
}