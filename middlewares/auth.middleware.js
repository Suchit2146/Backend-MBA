const userModel = require("../models/user.model");
const { userTypesAuth, userStatusAuth } = require("../utils/constant");


const verifySignUpRequset = async (req, res, next) => {
    var { name, userId, email, userType, password } = req.body;
    if (!name) {
        return res.status(400).send({ message: "name is not provided" })
    }

    if (!userId) {
        return res.status(400).send({ message: "userid is not provided" })
    }

    if (!email) {
        return res.status(400).send({ message: "email is not provided" })
    }

    if (!password) {
        return res.status(400).send({ message: "password is not provided" })
    }

    try {
        const user = await userModel.find({
            $or: [{ userId: userId }, { email: email }]
        })
        if (user.length) {
            return res.status(400).send({ message: "userid or email is alredy exists" })
        }

    } catch (e) {
        return res.status(500).send({ message: "something went wrong" })
    }

    if (userType && !Object.values(userTypesAuth).includes(userType)) {
        return res.status(400).send({ message: `usertype shold be among ${userTypesAuth}` })
    }

    next()
}

const verifySignInRequset = async (req, res, next) => {
    var { userId, password } = req.body;

    if (!userId) {
        return res.status(400).send({ message: "userid is not provided" })
    }

    if (!password) {
        return res.status(400).send({ message: "password is not provided" })
    }

    try {
        let user = await userModel.findOne({ userId });
        if (!user) {
            return res.status(404).send({ message: "userid doesnot exits" })
        }
        if (!(user.userStatus === userStatusAuth.approved)) {
            return res.status(404).send({ message: "user status  is not approved" })
        }

        req.metaData = { ...req.metaData, user }

    } catch (err) {
        return res.status(500).send({ message: "something went wrong" })
    }

    next()
}

module.exports = {
    verifySignInRequset,
    verifySignUpRequset
}