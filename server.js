const express = require("express");
// const connectDB = require("./config/db");
const path = require("path");
// const multer = require("multer");
const bodyParser = require('body-parser');
// const { url } = require("inspector");
const app = express();


//connect database
// connectDB();

// initialize middleware; get data inside body
app.use(express.json({ extended: false , limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
// define routes
app.use("/api/users", require("./api/users"));
app.get('/output.png', function (req, res) {
  res.sendFile(__dirname + '/output.png');
});
app.get('/output.csv', function (req, res) {
  res.sendFile(__dirname + '/output.csv');
});

// app.use("/api/profile", require("./api/profile"));

// Servee static assets in production
if (process.env.NODE_ENV == "production") {
  // Set Static Folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is running on ${PORT}`));