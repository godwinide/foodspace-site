const router = require("express").Router();
const Customer = require("../../../../models/Customer");
const bcrypt = require("bcryptjs");
const auth = require("../../../../middlewares/auth");

/// @route POST /api/customers/auth/changepassword
// @access private
router.post("/change-password", auth, async (req,res) => {
    const {id} = req.user;
    try{
        const user = await Customer.findById(id);
        if(!user){
            return res.status(400).json({msg: "invalid user was sent"})
        }else{
            const {currentPass, newPass, newPass2} = req.body;
            if(!currentPass || !newPass2 || !newPass){
                return res.status(400).json({msg: "Please fill all fields"});
            }
            if(newPass !== newPass2){
                return res.status(400).json({msg:"Both password are not thesame"});
            } 
            if(currentPass.length < 6 || newPass2.length < 6 || newPass.length < 6){
                return res.status(400).json({
                    success: false,
                    msg: "Password length should be between 6-20 characters long."
                });
            }            
            const isMatch = await bcrypt.compare(currentPass, user.password);
            if(!isMatch){
                return res.status(400).json({msg: "incorrect password"});
            }
            const salt = await bcrypt.genSalt();
            const newPassword = await bcrypt.hash(newPass, salt);
            await user.update({
                password: newPassword
            })
            return res.status(200).json({success: true, msg:"password changed successfully"});
    }
    }catch(err){
        return res.status(500).json({msg:"internal server error"})
    }
})


//  @route POST /api/customers/auth/changepassword
// @access private
router.post("/change-password2", async (req,res) => {
    const {newPass, newPass2, code, email} = req.body;
    if(!newPass2 || !newPass || !code ){
        return res.status(400).json({msg: "Please fill all fields"});
    }
    if(code.length < 6 || newPass2.length < 6 || newPass.length < 6){
        return res.status(400).json({msg: "Password length should be between 6-20 characters long."});
    }
    if(newPass !== newPass2){
        return res.status(400).json({msg:"Both password are not thesame"});
    }            
    try{
        const user = await Customer.findOne({email: email.toLowerCase().trim()});
        if(!user){
            return res.status(400).json({msg: "a user with that email does not exist"})
        }
        if(user.verifycode != code){
            return res.status(400).json({msg: "incorrect verification code was sent"});
        }
        else{
            const salt = await bcrypt.genSalt();
            const newPassword = await bcrypt.hash(newPass, salt);
            await user.update({
                password: newPassword,
                verifycode: Math.floor(Math.random()*1000000)
            })
            return res.status(200).json({success: true, msg:"password changed successfully"});
    }
    }catch(err){
        console.log(err)
        return res.status(500).json({msg:"internal server error"})
    }
})





module.exports = router;