const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const hospitalSchema = new mongoose.Schema({
  hospitalName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image:{
    type:String, 
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  accessCode:{
    type :String,
    enum:["Admin", "Hospital"],
    required:true
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  registrationNumber: {
    type: String,
    required: true,
  },
  wardNumber: {
    type: String,
    required: true,
  },
  registrationDate: {
    type: Date,
    required: true,
  },
  ambulanceNumber: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  registrationCertificate: {
    type: String, // Assuming file path or link is stored
    required: true,
  },
  createdAt: {
		type: Date,
		default: Date.now,
	// The document will be automatically deleted after 5 minutes of its creation time
	},
  status:{
    type:String,
    enum:["active", "inactive"]
  }
});

const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;
