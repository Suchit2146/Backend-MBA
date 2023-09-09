const { default: mongoose } = require("mongoose");
const { paymentStatus } = require("../utils/constant");


const paymentSchema = new mongoose.Schema({

    bookingId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "mba_booking"
    },
    status: {
        type: String,
        default: paymentStatus.pemding,
        enum: Object.values(paymentStatus)
    },
    amount: {
        type: Number,
        required: true
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

module.exports = mongoose.model("mba_payment", paymentSchema)