const jwt = require("jsonwebtoken");
require("dotenv").config();
const hospital = require("../models/Hospitalmodel");


exports.auth = async(req, res, next)=>{
    try{    
        const token = req.cookies.token
        || req.body.token 
        || req.header("Authorization").replace("Bearer ","")

        // console.log("toke from middleware", token );
        //if token is missing

        if(!token){
            return res.status(401).json({
                success:false, 
                message:"Token is missing",
            })
        }

        try{
            const payload =  await jwt.verify(token , process.env.JWT_SECRET);
            console.log("Middleware me paylod...", payload);

            req.hospital = payload;
            
        }


        catch(error){
             //verifation issue
             return res.status(401).json({
                success:false, 
                message:"token is invalid"
            })
        }
        next()
    }
    
    catch{
        return res.status(401).json({
            success:false,
            message:"something went wrong while validating the token in auth middlware",
            error:error.message    
        })
    }
}