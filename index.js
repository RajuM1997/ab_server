const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const teamRoute = require("./routes/teams.js");
const galleryRoute = require("./routes/gallery.js");
const path = require("path");
const app = express();

dotenv.config();
const port = process.env.PORT || 5000;
const server = require("http").Server(app);

// connect to database
mongoose.set("strictQuery", true);
const connect = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.gyrha.mongodb.net/dai_ichi?retryWrites=true&w=majority`
    );
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected");
});

mongoose.connection.on("connected", () => {
  console.log("mongoDB connected");
});

//middlewares
app.use(cookieParser());
app.use(cors());
app.use(
  bodyParser.json({
    verify: function (req, res, buf) {
      req.rawBody = buf;
    },
  })
);
app.use(express.json({ limit: "100mb" }));

// all route
app.use("/api/teams", teamRoute);
app.use("/api/gallery", galleryRoute);

// error handling middlewares
app.use((err, req, res, next) => {
  if (err) {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Somthing went wrong!";
    if (err instanceof multer.MulterError) {
      res.status(500).send("Only, jpg, png, jpeg allow");
    } else {
      return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
      });
    }
  } else {
    res.send("success upload");
  }
});

// image upload functionalty start here
const uploadTeam = "./public/upload/team";
const uploadGallery = "./public/upload/gallery";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "team") {
      cb(null, uploadTeam);
    } else if (file.fieldname === "gallery") {
      cb(null, uploadGallery);
    }
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({
  storage: storage,
  limits: 1000000, //1mb
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only, jpg, png, jpeg allow"));
    }
  },
});

app.post(
  "/api/upload",
  upload.fields([
    { name: "team", maxCount: 1 },
    { name: "gallery", maxCount: 1 },
  ]),

  async (req, res) => {
    try {
      return res.status(200).json("file upload successfully");
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
);

app.use("/team", express.static(path.join(__dirname, "./public/upload/team/")));
app.use(
  "/gallery",
  express.static(path.join(__dirname, "./public/upload/gallery/"))
);

app.delete("/api/delete/:imagename", function (req, res) {
  const query = req.query;
  const key = Object?.keys(query);
  const DIR = `./public/upload/${key[0]}/`;
  console.log(key);
  message: "Error! in image upload.";
  if (!req.params.imagename) {
    console.log("No file received");
    message = "Error! in image delete.";
    return res.status(500).json("error in delete");
  } else {
    console.log(req.params.imagename);
    try {
      fs.unlinkSync(DIR + req.params.imagename);
      console.log("successfully deleted");
      return res.status(200).send("Successfully! Image has been Deleted");
    } catch (err) {
      // handle the error
      return res.status(400).send(err);
    }
  }
});

server.listen(port, () => {
  connect();
  console.log("Connected  to backend");
});
