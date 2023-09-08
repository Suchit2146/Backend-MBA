const jwt = require("jsonwebtoken");
const { SECRET } = require("../configs/server.configs");
const userModel = require("../models/user.model");
const { userTypesAuth } = require("../utils/constant");


const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ message: "No token provided" })
    }

    jwt.verify(token, SECRET, (err, payload) => {
        if (err) {
            return res.status(401).send({ message: "invalid jwt provided" })
        }

        req.userId = payload.userId;
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
        return res.status(500).send({ message: "internal server error" })
    }
    next()
}

module.exports = {
    verifyToken,
    isAdmin
}