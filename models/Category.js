const {model, Schema} = require("mongoose")

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = Category = model("Category", CategorySchema);