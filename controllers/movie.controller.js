const { default: mongoose } = require("mongoose");
const movieModel = require("../models/movie.model");


exports.createMovie = async (req, res) => {
    try {
        const movie = await movieModel.create(req.body);
        return res.status(201).send(movie);
    }
    catch (e) {
        return res.status(500).send({ message: "internal server error " + e.message })
    }
}

exports.getMovies = async (req, res) => {
    try {
        const cond = {};

        if (req.query.language != undefined) {
            cond.language = req.query.language
        }
        if (req.query.name != undefined) {
            cond.name = req.query.name
        }

        const movies = await movieModel.find(cond);
        if (!movies) {
            return res.status(404).send({ message: "Movies not found" })
        }
        return res.status(201).send(movies);

    }
    catch (e) {
        return res.status(500).send({ message: "internal server error " + e.message })
    }
}

exports.getMovie = async (req, res) => {
    const id = req.params.id;
    try {
        const movie = await movieModel.findById(id);
        if (!movie) {
            return res.status(404).send({ message: "movie not found" })
        }
        return res.send(movie)

    } catch (e) {
        return res.status(500).send({ message: "internal server error " + e.message })
    }
}

exports.updateMovie = async function (req, res) {

    const { movie } = req.metaData;



    const { name, description, cast, director, trailerUrl, posterUrl, language, releaseStatus, releaseDate } = req.body;

    // if(name){
    //     movie.name=name
    // }
    movie.name = (name) ? name : movie.name;
    movie.description = (description) ? description : movie.description;
    movie.cast = (cast) ? cast : movie.cast;
    movie.director = (director) ? director : movie.director;
    movie.trailerUrl = (trailerUrl) ? trailerUrl : movie.trailerUrl;
    movie.posterUrl = (posterUrl) ? posterUrl : movie.posterUrl;
    movie.language = (language) ? language : movie.language;
    movie.releaseStatus = (releaseStatus) ? releaseStatus : movie.releaseStatus;
    movie.releaseDate = (releaseDate) ? releaseDate : movie.releaseDate;
    try {
        const savedMovie = await movie.save();
        return res.status(200).send(savedMovie);

    } catch (e) {
        return res.status(500).send({ message: "internal server error " + e.message });
    }
}


exports.deleteMovie = async function (req, res) {
    const id = req.params.id;
    try {
        const movie = await movieModel.findByIdAndDelete(id);
        if (!movie) {
            return res.status(404).send({ message: "movie mot found" })
        }
        res.send("delete successfully")
    } catch (e) {
        return res.status(500).send({ message: "internal server error " + e.message });
    }
}