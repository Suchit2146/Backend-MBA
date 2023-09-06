const mongoose = require("mongoose")
const { releaseStatusType, languageType } = require("../utils/constant")

const movieScema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        minLength: 10
    },
    posterUrl: {
        type: String,
        required: true
    },
    trailerUrl: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true,
        enum: Object.values(languageType)
    },
    director: {
        type: String,
        required: true
    },
    cast: {
        type: String,
        required: true
    },
    releaseStatus: {
        type: String,
        required: true,
        enum: Object.values(releaseStatusType)
    },
    price: {
        type: Number,
        minValue: 1
    },
    releaseDate: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("mba_movie", movieScema)