const router = require("express").Router();
const Food = require("../../../../models/Food");
const uuid = require("uuid")

router.post("/", async(req,res) => {
    try{
        const {
            name,
            vendor,
            vendor_name,
            category,
            category_name,
            is_visible,
            is_special,
            description,
            price,
            prices
        } = req.body;

        if(!name || 
            !description || 
            !price || 
            !prices ||
            !vendor || 
            !vendor_name || 
            !category || 
            !category_name || 
            !is_visible || 
            !is_special
            ){
            return res.status(400).json({
                success: false,
                msg: "Fill all fields!"
            });
        }
        if(!req.files){
            return res.status(400).json({
                success: false,
                msg: "Upload food image!"
            });
        }

        // save image file
        const file = req.files.image;
        const ext = file.name.split(".").reverse()[0];
        const filename = uuid.v4();
        await file.mv(`${__dirname}/../../../../public/images/foods/${filename}.${ext}`);
        
        const newFood = new Food({
            name,
            vendor,
            vendor_name,
            category,
            category_name,
            is_visible,
            is_special,
            description,
            price,
            prices: prices.split(","),
            image: process.env.image_url+filename+"."+ext
        });
        
        await newFood.save();
        return res.json({
            success: true,
            msg: "Food created successfully!"
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        })
    }
});

module.exports = router;