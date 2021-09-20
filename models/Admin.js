const {model, Schema} = require("mongoose")

const AdminSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        required: false,
        default: true
    },
    isSuper:{
        type: Boolean,
        required: false,
        default: false
    }
});

module.exports = Admin = model("Admin", AdminSchema);