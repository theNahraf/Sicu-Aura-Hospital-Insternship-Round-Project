const express = require("express")
const server   = express();
const cookieParser= require("cookie-parser");
//importrrouter
const hospitalRoutes = require('./routes/Hospitalroute');
const dbConnect =  require("./config/database")
const {cloudinaryConnect} = require("./config/coudinary")
const fileUpload = require("express-fileupload")
require("dotenv").config();
const cors = require("cors")
const PORT = process.env.PORT || 8080;



//body parser
server.use(express.json());
server.use(cookieParser());

server.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
)

//upload middleware
server.use(fileUpload({
    useTempFiles:true,
		tempFileDir:"/tmp",
    
    }))
    
dbConnect.connect();
cloudinaryConnect();


//routers

server.use("/api/v1",  hospitalRoutes);


server.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})


server.get("/", (req, res)=>{
    return res.json({
        success:true,
        message:"You are live now ,server is running"
    })
})


