const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        title : {
            type: String,
            required: true,
            unique:  true
        },
        description : {
            type: String,
            required: true,
        },
        photo : {
            type: String,
            required: false,
            unique:  false
        },
        username : {
            type : String,
            required: true,
        },
        categories : {
            type : Array,
            required: false,
        }
    },{
        timestamps: true // This will add createdAt and updatedAt fields
    }

)
module.exports = mongoose.model("Post", PostSchema)