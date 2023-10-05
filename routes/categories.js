const router = require("express").Router();
const User = require("../models/User")
const Post = require("../models/Post")
const Category = require("../models/Category")
const bcrypt = require("bcrypt");

//create 
router.post("/", async (req, res) => {
    const newCategory = new Category(req.body);

    try{
        const saveCategory = await newCategory.save();
        res.status(200).json(saveCategory);
    }catch(error){
        res.status(500).json(error.message)
    }
   
});


router.get("/", async (req, res) => {
   
    try{
        const Categories = await Category.find();
        res.status(200).json(Categories);
    }catch(error){
        res.status(500).json(error.message)
    }
   
});

module.exports = router