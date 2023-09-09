const { createPayment } = require("../controllers/payment.controller")
const { verifyToken } = require("../middlewares/authJWT.middleware")
const { validateCreateNewPayment } = require("../middlewares/payment.middleware")


module.exports = function (app) {
    app.post("/mba/api/v1/bookings/:bookingId/payments", [verifyToken, validateCreateNewPayment], createPayment)
}