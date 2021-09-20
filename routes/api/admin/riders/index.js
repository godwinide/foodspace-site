const router = require("express").Router();
const auth = require("../../../../middlewares/auth");
const Rider = require("../../../../models/Rider");

// GET ALL RIDERS
router.get("/", async(req,res) => {
    try{
        const riders = await Rider.find({});
        return res.json({
            success: true,
            riders
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        });
    }
});


// CREATE A RIDER
router.post("/create", auth, async(req,res) => {
    try{
        const {name, phone} = req.body;
        if(!name || !phone) return res.status(400).json({
            success: false,
            msg: "Please provide all fields"
        });

        const newRider = new Rider({
            name,
            phone
        });

        await newRider.save();
        return res.json({
            success: true,
            msg: "Rider created successfully"
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        });
    }
});


// EDIT RIDER
router.post("/update", auth, async(req,res) => {
    try{
        const {id, name, phone} = req.body;
        if(!id || !name || !phone) return res.status(400).json({
            success: false,
            msg: "Please provide an ID and name"
        });
        const rider = await Rider.findById(id);
        if(!rider) return res.status(404).json({
            success: false,
            msg: "Rider with that ID not found"
        });
        await rider.updateOne({
            name,
            phone
        });
        return res.json({
            success: true,
            msg: "Rider updated successfully"
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        });
    }
});


// DELETE RIDER
router.post("/delete", auth, async(req,res) => {
    try{
        const {id} = req.body;
        if(!id) return res.status(400).json({
            success: false,
            msg: "Please provide an ID"
        });
        const rider = await Rider.findById(id);
        if(!rider) return res.status(404).json({
            success: false,
            msg: "Rider with that ID not found"
        });
        await Rider.deleteOne({_id:id});
        return res.json({
            success: true,
            msg: "Rider deleted successfully"
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