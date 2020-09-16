const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    body:{
        image:String,
        video:String,
        location:Object,
        text:String,
    },
    user:{
         type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }],

    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    
    
},{timestamps:true})

module.exports = mongoose.model("Post",postSchema)