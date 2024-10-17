const Hospital = require("../models/Hospitalmodel")
const otpGenerator = require("otp-generator");
const OTP = require("../models/OTP");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();




// exports.sendOTP = async (req, res) => {
//     try {
//         const { email } = req.body;

//         const checkUserPresent = await Hospital.findOne({ email });

//         // If user already exists, send the response
//         if (checkUserPresent) {
//             return res.status(401).json({
//                 success: false,
//                 message: "User already Registered"
//             });
//         }

//         // OTP generation and uniqueness check only after confirming user is not registered
//         let otp = otpGenerator.generate(6, {
//             upperCaseAlphabets: false,
//             lowerCaseAlphabets: false,
//             specialChars: false
//         });

//         console.log("OTP generated -> ", otp);

//         // Check if OTP is unique
//         let result = await OTP.findOne({ otp });

//         // Keep generating OTP until a unique one is found
//         while (result) {
//             otp = otpGenerator.generate(6, {
//                 upperCaseAlphabets: false,
//                 lowerCaseAlphabets: false,
//                 specialChars: false
//             });

//             result = await OTP.findOne({ otp });
//         }

//         // Create OTP entry in the database
//         const otpPayload = { email, otp };
//         const otpBody = await OTP.create(otpPayload);
//         console.log("otp saved in db", otpBody);

//         // Return success response
//         return res.status(200).json({
//             success: true,
//             message: "OTP sent successfully",
//             otp
//         });

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({

//             success: false,
//             message: "Otp SEnding  problem "
//         })}}



exports.signUp = async(req, res)=>{
    try{

        const {
            hospitalName,
            email,
            address,
            phoneNumber,
            city,
            registrationNumber,
            state,
            wardNumber,
            pincode,
            registrationCertificate,
            registrationDate,
            password,
            confirmPassword, 
            ambulanceNumber, 

        } = req.body;


        if(!hospitalName || !email || !address || !phoneNumber || !city || !registrationNumber || !state ||
            !wardNumber || !pincode || !registrationCertificate || !registrationDate || !password ||
            !confirmPassword || !ambulanceNumber ) {
                
            
            return res.status(403).json({
                success:false,
                message:"All fields are required"
            })
        }

            if(password!==confirmPassword){
                return res.status(403).json({
                    success:false,
                    message:"Password and Confirm password value Does Not match , pls Try again"
                })
            }

            const exitingUser = await Hospital.findOne({email});

            //check user 
            if(exitingUser){
                return res.status(403).json({
                    success:false,
                    message:"Email already exists"
                })
            }

             // Check if the user is inactive
    
            // //find most recent otp stored for the user 
            // const recentOtp = await OTP.findOne({email}).sort({createdAt:-1}).limit(1);

            // console.log("recent otp is ", recentOtp);
            // console.log("recent.otp" , recentOtp.otp);


            // //validate otp
            // if(recentOtp.length===0){
            //     return res.status(403).json({
            //         success:false,
            //         message:"OTP not found"
            //     })
            // }
            // //if otp is incpoorrect

            // else if(otp!==recentOtp.otp){
            //     //invalid otp
            //     return res.status(403).json({
            //         success:false,
            //         message:"Invalid OTP"
            //     })
            // }

            //otp is correct 
            //now hash password
            const hashPassword = await  bcrypt.hash(password, 10);

            //entry create in db

            //creating a profile details

            const hospitalData = await Hospital.create({
            hospitalName,
            email,
            address,
            phoneNumber,
            city,
            registrationNumber,
            state,
            wardNumber,
            pincode,
            registrationCertificate,
            registrationDate,
            password:hashPassword,
            ambulanceNumber, 
            accessCode : "Hospital",
            status:"active"
            })

            console.log("singup sucessfully", hospitalData)
            //signup successfully response
            return res.status(200).json({
                success:true,
                message:"Signup successfully",
                 hospitalData
            })

        

     } catch(error){
        console.log(error)
        return  res.status(500).json({
            success:false,
            message:"User cannot be registred , please try again"
        })

    }
}


exports.login = async(req , res)=>{
    try{
        const {email, password, hospitalName, accessCode } = req.body;

        if(!email || !password || !hospitalName, !accessCode){
            return res.status(403).json({
                success:false,
                message:"All fields are required"
            })
        }
        

    //check valid hospital user

    const hospital= await  Hospital.findOne({email})
    // console.log("hospital data from auth ", hospital)

    if(!hospital){
        return res.status(401).json({
            success:false, 
            message:"User is not Registered, please sign up first"
        }) 
    }

     // Check if the user is inactive
//   if (hospital.status !== 'active') {
//     return res.status(403).json({ message: 'Account is inactive. Contact admin.' });
//   }

    //generate jwt , after password match 
    

    if(await  bcrypt.compare(password, hospital.password)){
        const payload = {
            hospital : hospital,
            id : hospital._id
        }

        if (hospital.accessCode !== accessCode) {
            return res.status(403).json({ success: false, message: "Access denied. Invalid code." });
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn:"2h"
        })

        hospital.token = token;
        hospital.password = undefined;

        //create cookie and send response


        const options= {
            expires : new Date(Date.now() + 3*24*60*60*1000),
            httpOnly:true
        }

        console.log("token form login ", token);


        res.cookie("token", token , options).status(200).json({
            success:true ,
            message:"User logged in successfully",
            data:hospital
            
        })

    }
    
    else{
        return res.status(401).json({
            success:false, 
            message:"Password is Incorrect"
        })

    }

    }catch(error){
        console.log(error);
    return res.status(500).json({
        success:false, 
        message:"Login failed , please try again"
    })
    }
}
