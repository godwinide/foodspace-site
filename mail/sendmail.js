const nodemailer = require("nodemailer");

async function sendmail(receiver, subject, body){
    try{
        const transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
            user: process.env.email, 
            pass: process.env.emailPass,
            },
        })
    
        await transport.sendMail({
            from: "Belleful",
            to: receiver, 
            subject,
            html: body,
        })
    }
    catch(err){
        console.log(err);
    }
}


module.exports = sendmail;