let mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

//payment Schema
let paymentSchema = mongoose.Schema({
    bookingId: {
        type: String,
        required: true,
        trim: true
    },
    delieveryAddress: {
        type: Object,
        require: true
    },
    billingAddress: {
        type: Object,
        require: true
    },
    productId: {
        type: ObjectId,
        require: true,
        ref: "product"
    },
    detailsId: {
        type: ObjectId,
        require: true,
        ref: "userDetail"
    },
    payment: {
        type: String,
        require: true,
        trim: true
    },
    systemInfo: {
        type: Object
    },
    status: {
        type: Number,
        default: 1
    },
    paymentStatus: {
        type: Number
    }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model("payment", paymentSchema);