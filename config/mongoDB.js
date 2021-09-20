const {connect} = require("mongoose");

module.exports = async () => {
    try{
        const mongo_uri = process.env.mongo_uri;
        const conn = await connect(mongo_uri, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log("MongoDB connected..");
    }catch(err){
        console.log("MongoDB Connection Error: ", err);
    }
}