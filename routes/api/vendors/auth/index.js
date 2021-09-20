const router = require("express").Router();
const Vendor = require("../../../../models/Restaurant");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../../../middlewares/auth");

// @route POST /api/users/auth/login
// @access private
router.post("/login", async (req,res) => {
    const {email, password} = req.body;

    const errors = [];
    const return_errors = status => {
        return res.status(status).json({
            success: false,
            msg: errors[0].msg
        })
    }
    if(!email || !password){
        errors.push({msg:"Please fill all fields!"})
        return_errors(400);
    }
    else{
        try{
            const user = await Vendor.findOne({email: email.trim()})
            if(!user) {
                errors.push({msg: "Incorrect email or password"});
                return_errors(400);
            }else{
                const matched = await bcrypt.compare(password, user.password)
                if(!matched){
                    errors.push({msg: "Incorrect email or password"})
                    return_errors(400)
                }else{
                    const token = jwt.sign(
                            {id: user._id},
                            process.env.JWTSECRET
                    )
                    return res.status(200).json({
                        success: true,
                        user,
                        token
                    })
                }
            }
        }catch(err){
            console.log(err)
            res.status(500).json({msg:"internal server error"})
        }
    }
});



// GET single Customer user
// @access private
router.get("/loaduser", auth, async (req,res) => {
    const {id} = req.user
    try{
        const user = await Vendor.findById(id).select("-password");
        if(!user){
            return res.status(400).json({msg: [{msg:"invalid user was sent"}]})
        }else{
            return res.status(200).json({user, success: true});
    }
    }catch(err){
        return res.status(500).json({msg:[{msg:"internal server error"}]})
    }
});


module.exports = router;