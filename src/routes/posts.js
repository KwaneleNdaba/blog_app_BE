const router = require("express").Router();
const User = require("../models/User")
const Post = require("../models/Post")
const bcrypt = require("bcrypt");

//create 
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);

    try{
        const savePost = await newPost.save();
      //  res.status(200).json(savePost);
        res.status(200).send(savePost)
    }catch(error){
        res.status(500).json(error.message)
    }
   
});


//update post

router.put("/:id", async (req, res) => {

    
    try{
            const post = await Post.findById(req.params.id);
            if(post.username === req.body.username){
                try{
                    const post = await Post.findByIdAndUpdate(
                        req.params.id,{
                            $set : req.body//update everything on the body accordingly
                        },{
                            new : true//return the updated post Object to the user
                        }
                    )
                    res.status(200).json(post)
                }catch{

                }
            }else{
                res.status(401).json("You can only update your post")
            }
    }catch(error){
        res.status(500).json(error.message)
    }
});

//delete post
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json("Post not found");
        }

        if (post.username === req.body.username) {
            try {
                await post.deleteOne({_id: req.params.id });
                res.status(200).json("Post has been deleted");
            } catch (error) {
                res.status(500).json(error.message); // Handle the error message
            }
        } else {
            res.status(401).json("You can only delete your own posts");
        }
    } catch (error) {
        res.status(500).json(error.message); // Handle the error message
    }
});

router.get("/:id", async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post)

    }catch(error) {
        res.status(500).json(error.message)
    }
})

router.get("/", async (req, res) => {

    const username = req.query.user;
    const categoryName = req.query.cat;
    let posts;
    try{
        if(username){
            posts = await Post.find(({username: username}))
        }else  if(categoryName){
            posts = await Post.find(({categories:{
                $in :[categoryName]//return posts that has the category name 
            }}))
        }else{
            posts = await Post.find()
        }
        res.status(200).json(posts)
    }catch(error) {
        res.status(500).json(error.message)
    }
})

module.exports = router