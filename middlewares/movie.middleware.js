const { releaseStatusType } = require("../utils/constant");


 const verifyCreateTicketBody = (req, res, next) => {
    const { name, description, releaseDate, releaseStatus } = req.body;

    if (!name) {
        return res.status(400).send({ message: "failed movie name is not provided" })
    }

    if (!description) {
        return res.status(400).send({ message: "failed movie description is not provided" })
    }

    if (!releaseDate) {
        return res.status(400).send({ message: "failed movie release date is not provided" })
    }

    if (!Object.values(releaseStatusType).includes(releaseStatus)) {
        return res.status(400).send({ message: "failed movie release status is not provided" })
    }
    next()
}

module.exports = {
    verifyCreateTicketBody
}

