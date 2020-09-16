const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],

    reply:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"ReplyComment"
    }],
    body:{
        type:String,
        required:true,
    },

},{timestamps:true})


module.exports = mongoose.model("Comment",commentSchema)