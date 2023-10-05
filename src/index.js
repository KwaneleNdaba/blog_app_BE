const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");
const app = express();

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");

dotenv.config();

app.use(express.json()); // App should be able to send JSON data

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
  destination:(req, file, cb)=> {
    cb(null, "images")//gonna take the file and save it in the images folder 
  },
  filename: (req, file, cb)=> {
    cb(null, req.body.name)//give it a name which we are providing 
  },

})

const upload = multer({storage: storage})
app.post("/api/upload", upload.single("file"),(req,res)=> {
  res.status(200).json("File has been uploaded")
})

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
