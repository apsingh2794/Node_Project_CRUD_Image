const express = require("express");
const app = new express();
const port = process.env.PORT || 4001;
const path = require("path");
const hbs = require("hbs");
const bodyParser = require("body-parser");
require("./server/database");
const StateName = require("./server/State");
const DistName = require("./server/dist");
const childName = require("./server/addChild");

// Set View Engine
app.set("view engine", "hbs");

// load Assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
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
    res.render("child", {
      ChildData: child_data,
    });
  });
});

// app.get("/view", (req, res) => {
//   childName.find({}, function (err, child_data) {
//     res.render("view", {
//       ChildData: child_data,
//     });
//   });
// }); 
////////////
app.get("/view/:id", async (req, res) => {
  try {
    childName.findById(req.params.id, (err, doc) => {
      if (!err) {
        res.render("view", {
          viewData: doc,
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
});
// app.get("/addChild", (req, res) => {
//   res.render("addChild");
// });

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
    res.render("state", {
      StateList: datas,
    });
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

app.post("/addChild", async (req, res) => {
  
  if(req.body.name==""){
    res.redirect("child");
  }
  else{
  try {
    const regiChild = new childName(req.body);
    const registerchild = await regiChild.save();
    console.log(registerchild);
    res.redirect("child");
  } catch (err) {
    console.log(err);
  }
}
});


app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
