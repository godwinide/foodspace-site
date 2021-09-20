const auth = require("../../../../middlewares/auth");
const Customer = require("../../../../models/Customer");
const router = require("express").Router();

router.post("/details", auth, async(req,res) => {
    try{
        const {name, phone} = req.body;
        if(!name || !phone){
            return res.status(400).json({
                success: false,
                msg: "Please enter all fields"
            });
        }else{
            await Customer.updateOne({id: req.user._id}, {
                ...req.body
            });
            return res.status(200).json({
                success: true,
                msg: "Details updated successfully"
            });
        }
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            success: false,
            msg: "Internal Server Error"
        })
    }
})

module.exports = router;