const { default: mongoose } = require("mongoose");
const { bookingStatus } = require("../utils/constant");


const bookingSchema = new mongoose.Schema({
    movie: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "mba_movie"
    },
    theatre: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "mba_theatre"
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        // required: true,
        ref: "mba_user"
    },
    showDate: {
        type: Date,
        required: true
    },
    showTimings: {
        type: String
    },
    status: {
        type: String,
        default: bookingStatus.inProgress,
        enum: Object.values(bookingStatus)
    },
    seats: {
        type: [Number],
        required: true
    },
    totalCost: {
        type: Number
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => {
            return Date.now()
        }
    },
    updatedAt: {
        type: Date,
        immutable: true,
        default: () => {
            return Date.now()
        }
    }

})

module.exports = mongoose.model("mba_booking", bookingSchema)