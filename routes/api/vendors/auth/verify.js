const router = require("express").Router();
const Vendor = require("../../../../models/Restaurant");
const sendmail = require("../../../../mail/sendmail");
const verifyCodeTemplate = require('../../../../templates/verifyCodeTemplates')

router.post("/", async (req,res) => {
    try{
        const {email} = req.body;
        if(!email){
            return res.status(400).json({msg:"Please provide an email."})
        }
        const user = await Vendor.findOne({email});
        if(!user){
            return res.status(400).json({msg:"Account with that email does not exist."})
        }else{
            const code = Math.floor(Math.random()*1000000);
            const temp = verifyCodeTemplate(code);
            await user.update({
                verifycode: code
            });
            sendmail(email, 'Verification Code', temp);
            return res.status(200).json({msg:"verification code has been sent, check your inbox and spam folders."})
        }
    }catch(err){
        console.log(err);
        return res.json({
            success: false,
            msg: "internal server error"
        })
    }
});

router.post("/confirm", async (req,res) => {
    const {code, email} = req.body;
    if(!code || !email){
        return res.status(400).json({msg:"Please provide user's email and code."})
    }
    const user = await Vendor.findOne({email});
    if(!user){
        return res.status(400).json({msg:"Account with that email does not exist."})
    }else{
        if(user.verifycode != code){
            return res.status(400).json({msg:"incorrect code, try again."})
        }
        return res.status(200).json({msg:"code verified."})
    }
});

module.exports = router;