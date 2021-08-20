const mongoose = require("mongoose");
const state = new mongoose.Schema({
  stateName: {
    type: String,
  },
  Name: {
    type: String,
  },
});

module.exports = mongoose.model("State_tbl", state);

