const express = require("express");
const app = new express();
const port = process.env.PORT || 4001;
const path = require("path");
const hbs = require("hbs");
const multer = require("multer");
const bodyParser = require("body-parser");
require("./server/database");
const StateName = require("./server/State");
const DistName = require("./server/dist");
const childName = require("./server/addChild");
const uploadImg = require("./server/upload");
const { Script } = require("vm");
// Set View Engine
app.set("view engine", "hbs");
////////////
const Storage = multer.diskStorage({
  destination: "./Images",
  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +"_"+ Date.now()+path.extname(file.originalname)
      );
    },
  });
  
  // MiddleWare to Upload Image
  const upload = multer({ storage: Storage }).single("userImage");
  
  // load Assets
  app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
  app.use("/Images",express.static(__dirname + '/Images'));
// app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
// app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// For fatch data from mongo DB
app.get("/", (req, res) => {
  res.render("login");
});

app.get("/home", (req, res) => {
  res.render("home");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/child", (req, res) => {
  childName.find({}, function (err, child_data) {
    res.render("child", { ChildData: child_data });
  });
});

////////////
app.get("/view/:id", async (req, res) => {
  try {
    childName.findById(req.params.id, (err, doc) => {
      if (!err) {
        res.render("view", { viewData: doc });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/dist", (req, res) => {
  StateName.find({}, function (err, datas_1) {
    DistName.find({}, function (err, datas) {
      res.render("dist", {
        StateList: datas_1,
        DistName: datas,
      });
    });
  });
});

app.post("/dist", async (req, res) => {
  try {
    const regiDist = new DistName(req.body);
    const regiData = await regiDist.save();
    res.redirect("dist");
  } catch (err) {
    console.log(err);
  }
});

app.get("/state", (req, res) => {
  StateName.find({}, function (err, datas) {
    res.render("state", { StateList: datas });
  });
});

app.post("/state", async (req, res) => {
  try {
    const registerEmployee = new StateName(req.body);
    const registerData = await registerEmployee.save();
    res.redirect("state");
  } catch (err) {
    console.log(err);
  }
});

app.get("/addChild", (req, res) => {
  StateName.find({}, function (err, state) {
    DistName.find({}, function (err, dist) {
      res.render("addChild", {
        StateList: state,
        DistName: dist,
      });
    });
  });
});

app.post("/addChild", upload, async (req, res) => {
  var empDetails = new childName({
    name: req.body.name,
    gender: req.body.gender,
    dob: req.body.dob,
    fatherName: req.body.fatherName,
    motherName: req.body.motherName,
    stateName: req.body.stateName,
    distName: req.body.distName,
    userImage: req.file.filename,
  });
  var upldImage = new uploadImg({
    userImage: req.file.filename,
  });
  try {
    const regiChild = await empDetails.save();
    const uploadImg = await upldImage.save();
    res.redirect("child");
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
