const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const child = new Schema({
 
  name: {
    type: String,
  },
  gender: {
    type: String,
  },
  dob: {
    type: String,
  },
  fatherName: {
    type: String,
  },
  motherName: {
    type: String,
  },
  stateName: {
    type: String,
  },
  distName: {
    type: String,
  },
  userImage:{ 
    type:String
  },
});

module.exports = mongoose.model("childName", child);
