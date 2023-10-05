const router = require("express").Router();
const User = require("../models/User")
const bcrypt = require("bcrypt");

//Register
router.post("/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashpass =  await bcrypt.hash(req.body.password, salt)//hasing password


        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashpass
        });

        const user = await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post("/login", async (req, res) => {
    try{
        const user = await User.findOne({email : req.body.email})
       !user && res.status(400).json("Wrong login credentials!")
       const validated = await bcrypt.compare(req.body.password, user.password);
       !validated && res.status(400).json("Wrong login credentials")

       const {password, ...others} = user._doc//I am sending all the properties of the user except the password
       res.status(200).json(others)
    }catch(error) {
        res.status(500).json(error);
    }
})

module.exports = router