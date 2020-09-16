const mongoose = require("mongoose")

const replyCommentSchema = new mongoose.Schema({

    comment:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    replyBody:{
        type:String,
        required:true,
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"    
    }]

},{timestamps:true})

module.exports = mongoose.model("ReplyComment",replyCommentSchema)