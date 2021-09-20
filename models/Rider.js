const {model, Schema} = require("mongoose");

const RiderSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    }
});

module.exports = Rider = model("Rider", RiderSchema);