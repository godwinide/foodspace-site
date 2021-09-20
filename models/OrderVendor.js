const {model, Schema} = require("mongoose");

const OrderVendorSchema = new Schema({
    short_id:{
        type: String,
        required: true
    },
    vendor_id:{
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
    processed:{
        type: Boolean,
        required: false,
        default: false  
    },
    date: {
        type: Date,
        required: false,
        default: Date.now
    }
});

module.exports = OrderVendor = model("OrderVendor", OrderVendorSchema);