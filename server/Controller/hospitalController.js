const hospital = require("../models/Hospitalmodel");


exports.getAllHospitalDetails = async(req, res)=>{
    try{
        const  hospitalDetails = await hospital.find({});
        console.log("hospital details ", hospitalDetails);

        return res.status(200).json({
            success:true,
            message:"Hospital Data fetch successfully",
            hospitalDetails
        })
    }catch(error){
        return res.status(500).json({
            success:false,
          message:"getting all hospital details failed",
            error : error.message
        })
    }
}