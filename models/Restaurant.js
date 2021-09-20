const {model, Schema} = require("mongoose");

const RestaurantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    accountname:{
        type: String,
        required: false
    },
    accountnumber:{
        type: String,
        required: false
    },
    bankname:{
        type: String,
        required: false
    },
    phone:{
        type: Number,
        required: true
    },
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
});

module.exports = Restaurant = model("Restaurant", RestaurantSchema);