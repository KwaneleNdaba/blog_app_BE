const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");
const app = express();

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");

const cors = require('cors'); 

dotenv.config();

app.use(express.json()); // App should be able to send JSON data
app.use(cors());
app.use(function(req, res, next) {

  app.use(cors({ origin: 'http://localhost:3000' }));
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Request-Headers",
  "access-control-allow-credentials,access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,authorization,content-type,access-control-allow-origin");
   res.header("Access-Control-Allow-Headers", "Authorization, Access-Control-Allow-Headers,access-control-allow-origin, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  
    next();
    });
// Update MONGO_URL to include the "blogs" database
mongoose.connect(process.env.MONGO_URL + "blogs", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads"); // Use the correct folder path
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name); // Use the desired filename
  },
});



const upload = multer({storage: storage})


app.use("/uploads", express.static("public/uploads"));

app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
