const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        name : {
            type: String,
            required: true,
        },
       
    },{
        timestamps: true // This will add createdAt and updatedAt fields
    }
)

module.exports = mongoose.model("Category", PostSchema)