const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const upload = new Schema({
 userImage :{ 
    type:String
  },
});

module.exports = mongoose.model("uploadImage", upload);
