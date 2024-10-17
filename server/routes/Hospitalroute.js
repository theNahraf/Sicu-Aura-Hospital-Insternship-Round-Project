const express =  require("express");

const router = express.Router();
const{getAllHospitalDetails} =require("../Controller/hospitalController")
const {login , signUp, sendOTP} = require("../Controller/Auth");

const {auth} = require("../middleware/auth");


router.post("/login", login);
router.post("/signup", signUp);
// router.post("/auth/sendotp", sendOTP);
router.get("/getallhospitaldetails", getAllHospitalDetails)

module.exports  = router;
