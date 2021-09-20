const router = require("express").Router();
const Food = require("../../../../models/Food");

router.get("/all", async(req,res) => {
    try{
        const foods = await Food.find({});
        return res.json({
            success: true,
            foods
        });
    }catch(err){
        res.status(500).json({
            msg: "internal server error."
        })
    }
});



router.get("/category/:category_id", async(req,res) => {
    try{
        const {category_id} = req.params;
        if(!category_id) return res.status(400).json({
            success: false,
            msg: "Please provide a category ID"
        });
        const foods = await Food.find({category: category_id});
        return res.json({
            success: true,
            foods
        });
    }catch(err){
        res.status(500).json({
            msg: "internal server error."
        })
    }
});



module.exports = router;