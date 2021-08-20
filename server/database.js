const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/User_data", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Mongo DB Connect Successful");
  })
  .catch((err) => {
    console.log(err);
  });
