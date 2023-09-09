const jwt = require("jsonwebtoken");
const { SECRET } = require("../configs/server.configs");
const userModel = require("../models/user.model");
const { userTypesAuth } = require("../utils/constant");
const bookingModel = require("../models/booking.model");


const verifyToken = async (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ message: "No token provided" })
    }

    jwt.verify(token, SECRET, async (err, payload) => {
        if (err) {
            return res.status(401).send({ message: "invalid jwt provided" })
        }

        req.userId = payload.userId;
        const user = await userModel.findOne({ userId: payload.userId });
        req.user = user
        next()
    })
}

const isAdmin = async (req, res, next) => {
    const { userId } = req;

    try {
        const user = await userModel.findOne({ userId });
        if (user.userType != userTypesAuth.admin) {
            return res.status(403).send({ message: "you need to admin permission to this task" })
        }
    } catch (err) {
        return res.status(500).send({ message: "internal server error " + err })
    }
    next()
}

const isAdminOrShelfBooking = async (req, res, next) => {
    const { userId } = req;
    const bookingId = req.params.id;

    try {
        const user = await userModel.findOne({ userId });
        const booking = await bookingModel.findById(bookingId);

        if (user.userType == userTypesAuth.admin || (JSON.stringify(user._id) === JSON.stringify(booking.user))) {
            next();
            return;
        }

        return res.status(403).send({ message: "this booking doesnot belongs to you" })

    } catch (err) {
        return res.status(500).send({ message: "internal server error " + err })
    }
}

module.exports = {
    verifyToken,
    isAdmin,
    isAdminOrShelfBooking
}