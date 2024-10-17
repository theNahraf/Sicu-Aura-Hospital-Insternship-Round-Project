const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async(email, title, body)=>{
    try{
        //create transport 
        let transport = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        })

        //send mail

        let info = transport.sendMail({
            from:"Sicu_Aura",
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`
        })

        console.log("mail sender information ",info);
        return info;

    }catch(error){
        console.log("Error while sending mail", error.message);
    }
}

module.exports = mailSender;