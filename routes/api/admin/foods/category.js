const router = require("express").Router();
const Category = require("../../../../models/Category");
const auth = require("../../../../middlewares/auth")

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


// CREATE A CATEGORY
router.post("/", async(req,res) => {
    try{
        const {name} = req.body;
        if(!name) return res.status(400).json({
            success: false,
            msg: "Please provide a name"
        });

        const newCat = new Category({
            name
        });

        await newCat.save();
        return res.json({
            success: true,
            msg: "Category created successfully"
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        });
    }
});


// EDIT CATEGORY
router.post("/update", auth, async(req,res) => {
    try{
        const {id, name} = req.body;
        if(!id || !name) return res.status(400).json({
            success: false,
            msg: "Please provide an ID and name"
        });
        const cat = await Category.findById(id);
        if(!cat) return res.status(404).json({
            success: false,
            msg: "Category with that ID not found"
        });
        await cat.updateOne({
            name
        });
        return res.json({
            success: true,
            msg: "Category updated successfully"
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        });
    }
});


// DELETE CATEGORY
router.post("/delete", auth, async(req,res) => {
    try{
        const {id} = req.body;
        if(!id) return res.status(400).json({
            success: false,
            msg: "Please provide an ID"
        });
        const cat = await Category.findById(id);
        if(!cat) return res.status(404).json({
            success: false,
            msg: "Category with that ID not found"
        });
        await Category.deleteOne({_id:id});
        return res.json({
            success: true,
            msg: "Category deleted successfully"
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