const {model, Schema} = require("mongoose");

const NotificationSchema = new Schema({
    channelId: {
        type: String,
        required: true
    },
    clientId:{
        type: String,
        required: false
    },
    public:{
        type: Boolean,
        required: false
    },
    message:{
        type: String,
        required: true
    },
    priority:{
        type: String,
        required: false
    },
    title:{
        type: String,
        required: false
    },
    viewed:{
        type: Boolean,
        required: false,
        default: false
    }
});

module.exports = Notification = model("Notification", NotificationSchema);