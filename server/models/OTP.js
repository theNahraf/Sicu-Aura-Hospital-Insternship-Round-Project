const mongoose = require("mongoose");

const mailSender = require("../Utils/mailSender");


const OTPSchema = new mongoose.Schema({
    email:{
        type:String, 
        required: true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires : 5*60
    }
})


//otp ko mail me send krte hai 

async function sendVerificationEmail(email, otp){
    try{
        const mailResponse = mailSender(email, "Verification Email from Sicu-Aura", otp)
        console.log("email send successfullly", mailResponse);

    }catch(error){

        console.log("Error occurs during mail send", error)

    }
}

OTPSchema.pre("save", async function(next){
    await sendVerificationEmail(this.email, this.otp);
    next();
})


module.exports = mongoose.model("OTP", OTPSchema);



