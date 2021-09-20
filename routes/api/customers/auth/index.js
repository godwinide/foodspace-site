const router = require("express").Router();
const Customer = require("../../../../models/Customer");
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
            const user = await Customer.findOne({email: email.trim()})
            if(!user) {
                errors.push({msg: "Incorrect email or password"})
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
})



// GET single Customer user
// @access private
router.get("/loaduser", auth, async (req,res) => {
    const {id} = req.user
    try{
        const user = await Customer.findById(id).select("-password");
        if(!user){
            return res.status(400).json({msg: [{msg:"invalid user was sent"}]})
        }else{
            return res.status(200).json({user, success: true});
    }
    }catch(err){
        return res.status(500).json({msg:[{msg:"internal server error"}]})
    }
});



// Change Customer Password 
// @access private
router.post("/change-password", auth, async (req,res) => {
    const {id} = req.user;
    try{
        const user = await Customer.findById(id);
        if(!user){
            return res.status(400).json({msg: "invalid user was sent"})
        }else{
            const {password, password1} = req.body;
            if(!password || !password1){
                return res.status(400).json({success: false, msg:[{msg:"Please fill all fields"}]});
            }
            if(password !== password1){
                return res.status(400).json({msg:[{msg:"Both password are not thesame"}]});
            } 
            if(password.length < 6 || password1.length < 6){
                return res.status(400).json({msg: "Password length should be between 6-20 characters long."});
            }            
            const salt = await bcrypt.genSalt();
            const newPassword = await bcrypt.hash(password1, salt);
            await user.update({
                password: newPassword
            })
            return res.status(200).json({success: true, msg:[{msg:"password changed successfully"}]});
    }
    }catch(err){
        console.log(err)
        return res.status(500).json({msg:[{msg:"internal server error"}]})
    }
});


// Register Customer
// @access private
router.post("/register", async (req,res) => {
    try{
        const {email, name, phone, password, password1} = req.body;
        const errors = [];
        const return_errors = status => {
            return res.status(status).json({
                success: false,
                msg: errors[0].msg
            })
        }
        if(!email || !phone || !password || !password1 || !name){
            errors.push({msg:"Please fill all fields!"})
            return_errors(400);
        }
        if(password !== password1){
            errors.push({msg: "Both passwords should be thesame"})
            return_errors(400);
        }
        if(String(password).length < 6){
            errors.push({msg:"password length should be minimum 6 chars long"})
            return_errors(400);
        }
        else{
            const exists = await Customer.findOne({email})
            if(exists){
                errors.push({msg:"A user with that email already exists."})
                return_errors(400);
            }else{
                const newUser = {
                    email: email.trim(),
                    name,
                    phone
                };
                    const salt = await bcrypt.genSalt()
                    const hash = await bcrypt.hash(password1, salt);
                    newUser.password = hash;
                    const user = new Customer(newUser);
                    await user.save();
                    return res.status(200).json({
                        success: true,
                        msg:[{msg:"Customer registered successfully"}]
                    })
                }
        
        }

    }catch(err){
        console.log(err)
        return res.status(500).json({
            success: false,
            msg: errors[0]
        })
    }

})



module.exports = router;