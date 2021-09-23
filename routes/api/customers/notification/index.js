const router = require("express").Router();
const Notification = require("../../../../models/Notification");
const auth = require("../../../../middlewares/auth")

router.post("/all", auth, async(req,res) => {
    try{
        const notifications = await Notification.find({clientId:req.user.id});
        return res.json({
            success: true,
            notifications
        });
    }catch(err){
        res.status(500).json({
            msg: "internal server error."
        })
    }
});


module.exports = router;