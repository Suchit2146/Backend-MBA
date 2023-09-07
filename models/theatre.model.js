const mongoose = require("mongoose");

const theatreSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    pinCode: {
        type: Number,
        require: true,
        max: 999999
    },
    noOfScreen: {
        type: Number,
        default: 1
    },
    movies: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "mba_movie"
    }
})

module.exports = mongoose.model("mba_theatre", theatreSchema)