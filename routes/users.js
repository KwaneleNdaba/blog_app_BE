const router = require("express").Router();
const User = require("../models/User")
const Post = require("../models/Post")
const bcrypt = require("bcrypt");

//uupdate user
router.put("/:id", async (req, res) => {
    if(req.body.userId === req.params.id){

        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password =  await bcrypt.hash(req.body.password, salt)//hashing password
        }
        try {
       const updateUser = await User.findByIdAndUpdate(req.params.id, {//update the user using the id passed in params 
        $set : req.body,//set the whole body of the request to the current user
       },{new : true});//have to send the updated user back to the client
       res.status(200).json(updateUser)//send back the updated user
        } catch (error) {
            res.status(500).json(error)
        }
    }else{
        res.status(401).json("You can only update your account")
    }
   
});


router.delete("/:id", async (req, res) => {
    if(req.body.userId === req.params.id){
        try{

            const user = await User.findById(req.params.id);

            try {
                await Post.deleteMany({username : user.username})//deleting the user post as well using the username 
                await User.findByIdAndDelete(req.params.id)
                res.status(200).json("user deleted")//send back the updated user
                 } catch (error) {
                     res.status(500).json(error)
                 }
        }catch(error){
                res.status(404).json("user not found!")
        }
  
    }else{
        res.status(401).json("You can only delete your account")
    }
   
});

router.get("/:id", async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        const {password, ...others} = user._doc;
        res.status(200).json(others)

    }catch(error) {
        res.status(500).json(error)
    }
})

module.exports = router