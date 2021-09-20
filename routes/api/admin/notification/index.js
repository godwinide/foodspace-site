const router = require("express").Router();
const Notification = require("../../../../models/Notification");

router.post("/send", async(req,res) => {
    try{
        const {title, message} = req.body;
        if(!title || !message){
            return res.status(400).json({success:false, msg:"Please fill all fileds!"});
        }
        // const newNot = new Notification({
        //     title,
        //     message,
        //     public: true
        // });
        // await newNot.save();
        return res.json({success: true, msg:"Notification sent successfully"});
    }
    catch(err){
        console.log(err)
        return res.status(500).json({msg:[{msg:"internal server error"}]})
    }
});

module.exports = router;