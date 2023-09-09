const { createBooking, getAllBooking, getBookingDetails, updateBookingStatus } = require("../controllers/booking.controller")
const { verifyToken, isAdminOrShelfBooking, isAdmin } = require("../middlewares/authJWT.middleware")
const { verifyCreateBokkingRequest } = require("../middlewares/booking.middleware")

module.exports = function (app) {
    app.post("/mba/api/v1/bookings", [verifyToken, verifyCreateBokkingRequest], createBooking)
    app.get("/mba/api/v1/bookings", [verifyToken, isAdmin], getAllBooking)
    app.get("/mba/api/v1/bookings/:id", [verifyToken, isAdminOrShelfBooking], getBookingDetails)
    app.put("/mba/api/v1/bookings/:id/status", [verifyToken, isAdminOrShelfBooking], updateBookingStatus)
}