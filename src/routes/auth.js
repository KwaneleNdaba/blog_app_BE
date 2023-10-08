const router = require("express").Router();
const User = require("../models/User")
const bcrypt = require("bcrypt");


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
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(400).json("Wrong login credentials!");
        }

        // Check if req.body.password matches the hashed password from the user object
        const validated = await bcrypt.compare(req.body.password, user.password);

        if (!validated) {
            return res.status(400).json("Wrong login credentials");
        }

        const { password, ...others } = user._doc;

        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

module.exports = router