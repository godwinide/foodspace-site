const router = require("express").Router();
const Customer = require("../../../../models/Customer");
const auth = require("../../../../middlewares/auth");
const Order = require("../../../../models/Order");

// GET ALL CUSTOMERS
router.get("/", async(req,res) => {
    try{
        const customers = await Customer.find({});
        return res.json({
            success: true,
            customers
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        });
    }
});


module.exports = router;