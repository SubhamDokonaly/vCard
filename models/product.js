let mongoose = require("mongoose");

//Product Schema
let productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    brand: {
        type: String,
        require: true,
        trim: true
    },
    image: {
        type: String,
        require: true,
        trim: true
    },
    price: {
        type: String,
        require: true,
        trim: true
    },
    discount: {
        type: String,
        require: true,
        trim: true
    },
    decription: {
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
    }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model("product", productSchema);