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
            prices,
            id
        } = req.body;

        if( !id ||
            !name || 
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

        const update = {
            name,
            vendor,
            vendor_name,
            category,
            category_name,
            is_visible,
            is_special,
            description,
            price,
            prices: prices.split(",")
        }

        if(req.files){
            // save image file
            const file = req.files.image;
            const ext = file.name.split(".").reverse()[0];
            const filename = uuid.v4();
            await file.mv(`${__dirname}/../../../../public/images/foods/${filename}.${ext}`);
            update.image = process.env.image_url+filename+"."+ext
        }
        await Food.updateOne({_id:id}, {...update});
        return res.json({
            success: true,
            msg: "Food updated successfully!"
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        })
    }
});

module.exports = router;