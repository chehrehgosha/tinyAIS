const express = require("express");
const formidable = require("formidable");
const router = express.Router();
const path = require("path");
const { PythonShell } = require("python-shell");
var fs = require("fs");

const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator"); //to check for errors like email and password lengthi

// @route POST api/auth
// @desc for user login.
// @access Public meaning whether we need a token or something
router.post(
  "/login",
  [
    check("email", "Please enter a valid Email Password").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    //async function runs in a seperate order than rest of the code.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;
    try {
      //see if user exists
      let authenticated = false;
      console.log(email, password);
      if (
        email !== "david.saltiel@aisquareconnect.com" ||
        password !== "admin"
      ) {
        return res.status(400).json({
          errors: [
            {
              msg: "Instructor not Found",
            },
          ],
        });
      }

      const payload = {
        token: true,
      };

      jwt.sign(
        payload,
        "mysecret", //mysecrettoken defined in config
        {
          expiresIn: 36000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            loggedIn: true,
          });
        }
      );
    } catch (err) {
      console.error("error in api/auth/ for instructors: ", err.message);
      res.status(500).json({
        errors: [
          {
            msg: "Server Error: AU2",
          },
        ],
      });
    }
  }
);

// @route POST api/auth
// @desc for user login.
// @access Public meaning whether we need a token or something
router.post("/upload", async (req, res) => {
  if (req.student === null) {
    return res.status(400).json({
      errors: [{ msg: "Not Reachable for non-students" }],
    });
  }

  try {
    const form = formidable({
      uploadDir: __dirname,
      keepExtensions: true,
      maxFileSize: 2 * 1024 * 1024,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          errors: [{ msg: err.message }],
        });
      }
      fs.rename(
        files["file"].path,
        form.uploadDir + "/" + "input.csv",
        (error) => console.log(error)
      );

      let options = {
        mode: "text",
        pythonPath:
          "/Library/Frameworks/Python.framework/Versions/3.7/bin/python3",
        pythonOptions: ["-u"], // get print results in real-time
        // scriptPath: "path/to/my/scripts", //If you are having python_test.py script in same folder, then it's optional.
        args: [form.uploadDir + "/" + "input.csv"], //An argument which can be accessed in the script using sys.argv[1]
      };

      PythonShell.run("main.py", options, function (err, result) {
        if (err) {
          res.status(500).send({
            error: err,
          });
          console.log(err);
          return;
        }
        // let obj = fs.readFileSync('outo', 'utf8');
        res.status(200).json({ file: "ready" });
        // result is an array consisting of messages collected
        //during execution of script.
        // console.log("result: ", result.toString());
        // res.send(result.toString());
      });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      errors: [{ msg: "Server Error" }],
    });
  }
});

module.exports = router;
