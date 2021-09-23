const router = require("express").Router();
const Notification = require("../../../../models/Notification");
const auth = require("../../../../middlewares/auth")

router.post("/all", auth, async(req,res) => {
    try{
        const notifications = await Notification.find({clientId:req.user.id});
        console.log(notifications)
        console.log(req.user)
        return res.json({
            success: true,
            notifications
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            msg: "internal server error."
        })
    }
});


module.exports = router;