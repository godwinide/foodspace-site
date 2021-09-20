const {model, Schema} = require("mongoose");

const CustomerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: false,
        default: ""
    },
    password:{
        type: String,
        required: true
    },
    profile_picture:{
        type: String,
        required: false
    },
    verifycode:{
        type: Number,
        required: false
    }
});

module.exports = Customer = model("Customer", CustomerSchema);