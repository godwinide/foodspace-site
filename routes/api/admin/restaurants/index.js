const router = require("express").Router();
const bcrypt = require("bcryptjs/dist/bcrypt");
const adminAuth = require("../../../../middlewares/adminAuth");
const Restaurant = require("../../../../models/Restaurant");


// GET ALL CUSTOMER'S Restaurants
router.get("/", adminAuth, async(req,res) => {
    try{
        const restaurants = await Restaurant.find({});
        return res.json({
            success: true,
            restaurants
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        })
    }
});

// DELETE RESTAURANT
router.post("/delete", adminAuth, async(req, res) => {
    try{
        const {id} = req.body;
        if(!id){
            return res.status(400).json({
                success: false,
                msg: "Please provide a valid id."
            });
        }
        await Restaurant.deleteOne({_id:id});
        return res.json({
            success: true,
            msg: "Vendor deleted successfully"
        });
    }catch(err){
        return res.json({
            success: false,
            msg: "Interal server error"
        })
    }
})

// CREATE RESTAURANT
router.post("/create", adminAuth, async(req,res) => {
    try{
        const {
            name,
            phone,
            email,
            address,
            firstname,
            lastname,
            password,
            password1
        } = req.body;
        if(!name || !phone || !email || !address || !firstname || !lastname || !password || !password1){
            return res.status(400).json({
                success: false,
                msg: "Please fill all fields"
            });
        }
        if(password !== password1){
            return res.status(400).json({
                success: false,
                msg: "Passwords do not match"
            });
        }
        if(password.length < 6){
            return res.status(400).json({
                success: false,
                msg: "Password should be at least six chars long"
            });
        }
        const emailExists = await Restaurant.findOne({email});
        if(emailExists){
            return res.status(400).json({
                success: false,
                msg: "Restaurant with that email already exists"
            });
        }
        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(password1, salt);
        const newRest = new Restaurant({name, phone, email, address, firstname, lastname, password:hash});
        await newRest.save();
        return res.json({
            success: true,
            msg: "Vendor registered successfully"
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        });
    }
});


// UPDATE RESTAURANT
router.post("/update", adminAuth, async(req,res) => {
    try{
        const {
            name,
            phone,
            email,
            address,
            firstname,
            lastname,
            password,
            password1,
            id
        } = req.body;

        if(!name || !phone || !email || !address || !firstname || !lastname || !id){
            return res.status(400).json({
                success: false,
                msg: "Please fill all fields"
            });
        }

        const exists = await Restaurant.findById(id);

        if(!exists){
            return res.status(400).json({
                success: false,
                msg: "Something went wrong"
            });
        }

        const update = {
            name,
            phone,
            email,
            address,
            firstname,
            lastname
        }

        if(password){
            if(password.length < 6){
                return res.status(400).json({
                    success: false,
                    msg: "Password is too short"
                });
            }
            if(password !== password1){
                return res.status(400).json({
                    success: false,
                    msg: "Passwords do not match"
                });
            }
            const salt = await bcrypt.genSalt()
            const hash = await bcrypt.hash(password1, salt);
            update.password = hash;
        }
        await exists.updateOne({
            ...update
        });
        
        return res.json({
            success: true,
            msg: "Vendor updated successfully"
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        });
    }
})

module.exports = router;