const router = require("express").Router();
const adminAuth = require("../../../../middlewares/adminAuth");
const Food = require("../../../../models/Food");

router.get("/", async(req,res) => {
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

// DELETE FOOD
router.post("/delete", adminAuth, async(req,res) => {
    try{
        const {id} = req.body;
        if(!id) return res.status(400).json({
            success: false,
            msg: "Please provide an ID"
        });
        const food = await Food.findById(id);
        if(!food) return res.status(404).json({
            success: false,
            msg: "food with that ID not found"
        });
        await Food.deleteOne({_id:id});
        return res.json({
            success: true,
            msg: "food deleted successfully"
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
