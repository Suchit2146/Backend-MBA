const bookingModel = require("../models/booking.model");
const paymentModel = require("../models/payment.model");
const { paymentStatus, bookingStatus } = require("../utils/constant");


exports.createPayment = async (req, res) => {

    const { bookingId } = req.params;
    const { status, amount } = req.body;
    const paymentObj = {
        bookingId,
        status,
        amount
    }
    try {
        const payment = await paymentModel.create(paymentObj);

        if (payment.status == paymentStatus.success) {
            await bookingModel.findByIdAndUpdate(bookingId, {
                status: bookingStatus.completed
            })
        }
        return res.status(201).send(payment);

    } catch (err) {
        return res.status(500).send({ message: "internal server error " + err })
    }


}