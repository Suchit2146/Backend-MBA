const theatreModel = require("../models/theatre.model");

exports.createTheatre = async (req, res) => {
    try {
        const theatre = await theatreModel.create(req.body)
        return res.status(201).send(theatre)
    } catch (e) {
        return res.status(500).send({ message: "internal server error " + e.message });
    }
}

exports.getTheatres = async (req, res) => {
    try {
        let cond = {}
        if (req.body.name != undefined) {
            cond.name = req.body.name;
        }
        if (req.body.pinCode != undefined) {
            cond.pinCode = req.body.pinCode;
        }
        const theatre = await theatreModel.find(cond).populate("movies");
        if (!theatre) {
            res.status(404).send({ message: "theatre not found" })
        }
        res.status(201).send(theatre)
    } catch (e) {
        return res.status(500).send({ message: "internal server error " + e.message })
    }
}

exports.getTheatre = async (req, res) => {
    var id = req.params.id;

    try {
        let theatre = await theatreModel.findById(id).populate("movies")
        if (!theatre) {
            return res.status(404).send({ message: "theatre not found" })
        }
        return res.status(201).send(theatre)
    } catch (e) {
        return res.status(500).send({ message: "internal server error " + e.message })
    }
}

exports.addMovieToThreatre = async (req, res) => {
    const { remove } = req.query;

    const { movie, theatre } = req.metaData;
    if (remove) {
        theatre.movies = theatre.movies.filter((movieId) => JSON.stringify(movieId) != JSON.stringify(movie._id))
    } else {

        theatre.movies.push(movie._id)
    }

    try {
        const updatedTheatre = await theatre.save();
        return res.send(updatedTheatre);
    } catch (e) {
        return res.status(500).send({ message: "internal server error " + e.message })
    }
}

exports.checkMovieInTheatre = async (req, res) => {
    const { movie, theatre } = req.metaData;
    return res.status(200).send({ running: theatre.movies.includes(movie._id) })
}