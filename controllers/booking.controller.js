const bookingModel = require("../models/booking.model");


exports.createBooking = async (req, res) => {
    const userId = req.user._id;
    const { theatreId, movieId, showDate, showTiming, seats } = req.body;

    const bookingObj = {
        movie: movieId,
        theatre: theatreId,
        user: userId,
        showDate,
        showTiming,
        seats,
        totalCost: 1000 * seats.length
    }

    try {
        const booking = await bookingModel.create(bookingObj);
        return res.status(201).send(booking)
    } catch (err) {
        return res.status(500).send({ message: "internal server error " + err })
    }
}

exports.getAllBooking = async (req, res) => {

    try {
        const booking = await bookingModel.find({}).populate("movie").populate("user").populate("theatre");
        return res.status(200).send(booking)
    } catch (err) {
        return res.status(500).send({ message: "internal server error " + err })
    }
}

exports.getBookingDetails = async (req, res) => {
    try {
        const booking = await bookingModel.findById(req.params.id).populate("movie").populate("user").populate("theatre");
        return res.status(200).send(booking)
    } catch (err) {
        return res.status(500).send({ message: "internal server error " + err })
    }
}

exports.updateBookingStatus = async (req, res) => {

    const { status } = req.body;
    try {
        const result = await bookingModel.findByIdAndUpdate(req.params.id, { status });
        return res.status(200).send(result)
    } catch (err) {
        return res.status(500).send({ message: "internal server error " + err })
    }
}