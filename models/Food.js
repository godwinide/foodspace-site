const {model, Schema} = require("mongoose");

const FoodSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    is_visible:{
        type: Boolean,
        required: false,
        default: false
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    prices:{
        type: Array,
        required: false,
        default: []
    },
    vendor:{
        type: String,
        required: true
    },
    vendor_name:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    category_name:{
        type: String,
        required: true
    },
    is_special:{
        type: Boolean,
        required: false
    },
    image:{
        type: String,
        required: true
    }
});

module.exports = Food = model("Food", FoodSchema);