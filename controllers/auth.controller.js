const bcrypt = require("bcrypt");
const { userTypesAuth, userStatusAuth } = require("../utils/constant");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../configs/server.configs");
const { sendEmail } = require("../utils/notificationUtils");
const { registerUser } = require("../scripts/emailScripts");

exports.signUp = async (req, res) => {
    var { name, userId, email, userType, password } = req.body;

    if (!userType) {
        userType = userTypesAuth.customer;
    }

    const userObj = {
        name,
        userId,
        email,
        password: bcrypt.hashSync(password, 8),
        userType,
        userStatus: (userType === userTypesAuth.customer) ? userStatusAuth.approved : userStatusAuth.pending,
    }

    try {
        const user = await userModel.create(userObj);

        const { subject, text, html } = registerUser(user);
        sendEmail([user.email], subject, html, text);

        return res.status(201).send(user)

    } catch (err) {
        return res.status(500).send({ message: `internal server error : [${err}]` })
    }
}

exports.signin = async (req, res) => {
    const { password } = req.body;

    //check password whether is correct or not
    const { user } = req.metaData;

    const isvalidpassword = bcrypt.compareSync(password, user.password)

    if (!isvalidpassword) {
        return res.status(401).send({ message: "invalid password" })
    }
    //create a access token;
    const token = jwt.sign({ userId: user.userId }, SECRET, {
        expiresIn: 60 * 60
    })

    res.status(200)
        .send({
            name: user.name,
            userId: user.userId,
            email: user.email,
            userType: user.userType,
            userStatus: user.userStatus,
            accessToken: token
        })
}