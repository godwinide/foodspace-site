const router = require("express").Router();
const Admin = require("../../../../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../../../middlewares/adminAuth");

// @route POST /api/users/auth/login
// @access private
router.post("/login", async (req,res) => {
    const {username, password} = req.body;

    const errors = [];
    const return_errors = status => {
        return res.status(status).json({
            success: false,
            msg: errors[0].msg
        })
    }
    if(!username || !password){
        errors.push({msg:"Please fill all fields!"})
        return_errors(400);
    }
    else{
        try{
            const user = await Admin.findOne({username: username})
            if(!user) {
                errors.push({msg: "Incorrect username or password"})
                return_errors(400);
            }else{
                const matched = await bcrypt.compare(password, user.password)
                if(!matched){
                    errors.push({msg: "Incorrect username or password"})
                    return_errors(400)
                }else{
                    const token = jwt.sign(
                            {id: user._id},
                            process.env.JWTSECRET,
                            {expiresIn: "1d"}
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



// GET single admin user
// @access private
router.get("/loaduser", auth, async (req,res) => {
    const {id} = req.user
    try{
        const user = await Admin.findById(id).select("-password");
        if(!user){
            return res.status(400).json({msg: [{msg:"invalid user was sent"}]})
        }else{
            return res.status(200).json({user, success: true});
    }
    }catch(err){
        return res.status(500).json({msg:[{msg:"internal server error"}]})
    }
});



// Change Admin Password 
// @access private
router.post("/change-password", auth, async (req,res) => {
    const {id} = req.user;
    try{
        const user = await Admin.findById(id);
        if(!user){
            return res.status(400).json({msg: "invalid user was sent"})
        }else{
            const {password, password1} = req.body;
            if(!password || !password1){
                return res.status(400).json({success: false, msg:"Please fill all fields"});
            }
            if(password !== password1){
                return res.status(400).json({msg: "Both password are not thesame"});
            } 
            if(password.length < 8 || password1.length < 8){
                return res.status(400).json({msg: "Password length should be between 8-20 characters long."});
            }            
            const salt = await bcrypt.genSalt();
            const newPassword = await bcrypt.hash(password1, salt);
            await user.update({
                password: newPassword
            })
            return res.status(200).json({success: true, msg:[{msg:"password changed successfully"}]});
    }
    }catch(err){
        return res.status(500).json({msg:[{msg:"internal server error"}]})
    }
});


// Register Admin
// @access private
router.post("/register", async (req,res) => {
    try{
        const {username, password, password1} = req.body;
        const errors = [];
        const return_errors = status => {
            return res.status(status).json({
                success: false,
                msg: errors[0].msg
            })
        }
        if(!username || !password || !password1){
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
            const exists = await Admin.findOne({username: username.trim()})
            if(exists){
                errors.push({msg:"A user with that username already exists."})
                return_errors(400);
            }else{
                const newUser = {
                    username: username.trim()
                };
                    const salt = await bcrypt.genSalt()
                    const hash = await bcrypt.hash(password1, salt);
                    newUser.password = hash;
                    const user = new Admin(newUser);
                    await user.save();
                    return res.status(200).json({
                        success: true,
                        msg:[{msg:"Admin registered successfully"}]
                    })
                }
        
        }

    }catch(err){
        console.log(err)
        return res.status(500).json({
            success: false,
            errors: [{msg: "internal server error"}]
        })
    }

})



module.exports = router;