let mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

//userDetails Schema
let userDetailsSchema = mongoose.Schema({
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    position: {
        type: String,
        trim: true
    },
    phone: {
        type: Number
    },
    companyName: {
        type: String,
        trim: true
    },
    website: {
        type: String,
        trim: true
    },
    linkedin: {
        type: String,
        trim: true
    },
    facebook: {
        type: String,
        trim: true
    },
    instagram: {
        type: String,
        trim: true
    },
    youtube: {
        type: String,
        trim: true
    },
    x: {
        type: String,
        trim: true
    },
    companyLogo: {
        type: String,
        trim: true
    },
    profileLogo: {
        type: String,
        trim: true
    },
    productId: {
        type: ObjectId,
        ref: "product"
    },
    systemInfo: {
        type: Object
    },
    status: {
        type: Number,
        default: 1
    }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model("userDetail", userDetailsSchema);

