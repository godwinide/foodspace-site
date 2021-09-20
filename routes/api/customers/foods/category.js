const router = require("express").Router();
const Category = require("../../../../models/Category");

// GET ALL CATEGORIES
router.get("/", async(req,res) => {
    try{
        const categories = await Category.find({});
        return res.json({
            success: true,
            categories
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