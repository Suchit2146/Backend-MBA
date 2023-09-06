const movieModel = require("../models/movie.model");
const { releaseStatusType, languageType } = require("../utils/constant");


const verifyCreateMovieBody = (req, res, next) => {
    const { name, description, releaseDate, releaseStatus } = req.body;

    if (!name) {
        return res.status(400).send({ message: "failed movie name is not provided" })
    }

    if (!description) {
        return res.status(400).send({ message: "failed movie description is not provided" })
    }

    if (!releaseDate) {
        return res.status(400).send({ message: "failed movie release date is not provided" })
    }

    if (!Object.values(releaseStatusType).includes(releaseStatus)) {
        return res.status(400).send({ message: "failed movie release status is not provided" })
    }
    next()
}

const verifyUpdateMovieBody = async function (req, res, next) {

    try {
        const movie = await movieModel.findById(req.params.id);

        if (!movie) {
            return res.status(404).send({ message: "movie not found" })
        }
        const { releaseStatus, language, name, description } = req.body;
        if (releaseStatus && !Object.values(releaseStatusType).includes(releaseStatus)) {
            return res.status(400).send({ message: "failed movie release status is not correct" })
        }

        if (language && !Object.values(languageType).includes(language)) {
            return res.status(400).send({ message: "failed langauge is not correct" })
        }
        if (!req.metaData) {
            req.metaData = {}
        }
        req.metaData.movie = movie;
        next()

    } catch (e) {
        return res.status(500).send({ message: "internal server error " + e.message })
    }
}

module.exports = {
    verifyCreateMovieBody,
    verifyUpdateMovieBody
}

