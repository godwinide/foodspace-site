const auth = require("../../../../middlewares/auth");
const Vendor = require("../../../../models/Restaurant");
const router = require("express").Router();

router.post("/details", auth, async(req,res) => {
    try{
        const {name, phone, accountname, accountnumber, bankname} = req.body;
        if(!name || !phone || !accountname || !accountnumber || !bankname){
            return res.status(400).json({
                success: false,
                msg: "Please enter all fields"
            });
        }
        if(accountnumber.length < 10){
            return res.status(400).json({
                success: false,
                msg: "Invalid account number"
            });
        }

        await Vendor.updateOne({id: req.user._id}, {
            ...req.body
        });
        return res.status(200).json({
            success: true,
            msg: "Details updated successfully"
        });
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