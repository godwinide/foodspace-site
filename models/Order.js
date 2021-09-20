const {model, Schema} = require("mongoose");

const OrderSchema = new Schema({
    customer_id:{
        type: String,
        required: true
    },
    short_id:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    items:{
        type: Array,
        required: true
    },
    deliveryDistrict:{
        type: String,
        required: true
    },
    deliveryInfo:{
        type: Object,
        required: true
    },
    additionalInfo:{
        type: Object,
        required: true
    },
    deliveryTime:{
        type: String,
        required: true
    },
    feedback:{
        type: Object,
        required: false,
        default: {}
    },
    price:{
        type: Number,
        required: true
    },
    rider:{
        type: String,
        required: false,
        default:""
    },
    rider_name:{
        type: String,
        required: false,
        default:""
    },
    rider_phone:{
        type: String,
        required: false,
        default:""
    },
    reference:{
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: false,
        default: Date.now
    }
});

module.exports = Order = model("Order", OrderSchema);