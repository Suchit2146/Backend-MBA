const bookingModel = require("../models/booking.model");
const { bookingStatus, paymentStatus } = require("../utils/constant");


const validateCreateNewPayment = async (req, res, next) => {

    const { bookingId } = req.params;
    const { status, amount } = req.body;

    try {
        const booking = await bookingModel.findById(bookingId);

        if (!booking) {
            return res.status(400).send({ message: "invalid booking id" })
        }

        if (JSON.stringify(booking.user) != JSON.stringify(req.user._id)) {
            return res.status(403).send({ message: "you have insuffiecient permission to make a payment" })
        }


        if (booking.status != bookingStatus.inProgress) {
            return res.status(403).send({ message: "booking must be in progress for payment" })
        }

        if (!Object.values(paymentStatus).includes(status)) {
            return res.status(400).send({ message: "invalid status is passed" })
        }

        next()
    } catch (err) {
        return res.status(500).send({ message: "internal server error " + err })
    }

}

module.exports = {
    validateCreateNewPayment
}