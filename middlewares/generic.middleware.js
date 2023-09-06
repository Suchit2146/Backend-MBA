const mongoose = require("mongoose")

const verifyIdParam = (req, res, next) => {
    // const id = req.params.id;

    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send({ message: "invalid object id" })
    }

    next()
}

module.exports = {
    verifyIdParam
}