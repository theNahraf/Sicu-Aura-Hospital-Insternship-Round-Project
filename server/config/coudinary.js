const Cloudinary = require("cloudinary").v2;

exports.cloudinaryConnect = ()=>{
    try{
        Cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
			api_key: process.env.API_KEY,
			api_secret: process.env.API_SECRET,
        })
        console.log("Cloudinary Is Connected Successfully")

    }catch(error){
        console.log(error);
    }
}
