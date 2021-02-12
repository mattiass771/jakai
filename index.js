// IMPORTS //
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const fileUpload = require("express-fileupload");
const fs = require("fs");
const { Buffer } = require('buffer')
const AWS = require('aws-sdk')

require("dotenv").config();

// CONVERT IMAGE TO BUFFER
const getImgBuffer = (base64) => {
  const base64str = base64.replace(/^data:image\/\w+;base64,/, '')
  return Buffer.from(base64str, 'base64')
}

// AWS Config
const { ACCESS_KEY_ID, SECRET_ACCESS_KEY } = process.env

AWS.config.update({
  accessKeyId: 'AKIAIYNLYBPFVKVU2JFQ',
  secretAccessKey: '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',
  region: 'eu-central-1'
})

const s3Bucket = new AWS.S3({ params: { Bucket: 'vineckabucket' }})

// CREATE SESSION //

const expressSession = require("cookie-session")({
  secret: process.env.AUTH_SECRET,
  resave: false,
  saveUninitialized: false
});

// USE MIDDLEWARE //

app.use(
  cors({
    origin: true, // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
    allowedHeaders: ['Content-Type','Access-Control-Allow-Origin','X-Requested-With']
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressSession);
// extended logger:
// app.use(require("morgan")("combined"));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

// DATABASE CONNECT //
mongoose.connect(
  process.env.MONGO_URI_LATER,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  },
  (err) => {
    if (err) return console.log(err);
    return console.log("DB connection successful!");
  }
);

// DATABASE COLLECTIONS //
const shopRouter = require("./db/shopDb").router;
app.use("/shop", shopRouter);
const userRouter = require("./db/userDb").router;
app.use("/users", userRouter);
const orderRouter = require("./db/orderDb").router;
app.use("/orders", orderRouter);
const homeRouter = require("./db/homeDb").router;
app.use("/home", homeRouter);
const eventsRouter = require("./db/eventDb").router;
app.use("/events", eventsRouter);
const servicesRouter = require("./db/serviceDb").router;
app.use("/services", servicesRouter);

// ACCESS USER DATABASE //
const User = require("./db/userDb").User;

// PASSPORT //
passport.use(
  new Strategy((username, password, cb) => {
    User.findOne({ userName: username }, (err, user) => {
      if (err) {
        return cb(err);
      }
      if (!user) {
        return cb(null, false);
      }
      if (user.password !== password) {
        return cb(null, false);
      }
      return cb(null, user);
    });
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "https://mas-vino.herokuapp.com/login-page"
  }),
  (req, res) => {
    if (req.query.shopping === 'cart') return res.redirect('https://mas-vino.herokuapp.com/cart-page')
    return res.redirect('https://mas-vino.herokuapp.com/')
  }
);

app.get("/logout", (req, res) => {
  req.logout();
  return res.redirect("/");
});

app.get("/get-user-data", (req, res) => {
  return req.user ? res.json(req.user) : res.json({});
});

// FILE UPLOADER//
//Upload Endpoint
app.use(fileUpload());

app.post("/fileUpload/:shopId", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  console.log('files,', req.files[0])

  const file = req.files.file;

  console.log('file, ',file)

  const imageName = req.params.shopId + "-" + file.name.replace(/_/g,'-')

  const uploadPath = path.resolve(__dirname, 'vinecka-client/public/uploads', imageName)

  const data = {
    Key: imageName,
    Body: file.data,
    ContentType: file.mimetype,
    ACL: 'public-read'
  }

  s3Bucket.putObject(data, (err, data) => {
    if (err) { 
      console.log(err);
      console.log('Error uploading data: ', data); 
    } else {
      console.log('successfully uploaded the image!');
    }
  });

  // file.mv(uploadPath, (err) => {
  //   if (err) {
  //     console.error("moving file error " + err);
  //     return res.status(500).send(err);
  //   }
  //   res.json({ fileName: file.name });
  // });
});

app.get("/deleteFile/:shopId", (req, res) => {
  const file = req.query.name;
  const dirPath = path.join(
    __dirname,
    "vinecka-client/public/uploads",
    req.params.shopId + "-" + file
  );
  fs.unlink(dirPath, () => {
    res.send({
      status: "200",
      responseType: "string",
      response: "success"
    });
  });
});

// ACCESS APP IN PRODUCTION //
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "vinecka-client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "vinecka-client/build", "index.html"));
  });
}

// RUN SERVER //
const listener = app.listen(process.env.PORT || 5000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});