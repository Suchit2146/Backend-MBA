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