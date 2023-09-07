const { default: mongoose } = require("mongoose");
const { userTypes, userTypesAuth, userStatusAuth } = require("../utils/constant");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    userType: {
        type: String,
        required: true,
        default: userTypesAuth.customer,
        enum: Object.values(userTypesAuth)
    },
    userStatus: {
        type: String,
        required: true,
        default: userStatusAuth.pending,
        enum: Object.values(userStatusAuth)
    }
})

module.exports = mongoose.model("mba_user", userSchema)