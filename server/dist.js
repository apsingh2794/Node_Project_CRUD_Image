const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const user = new Schema({
 
  stateName: {
    type: String,
  },
  distName: {
    type: String,
  },
});

module.exports = mongoose.model("dist_tbl", user);
