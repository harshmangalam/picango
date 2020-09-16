const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    dob:{
        type:Date
    },
    bio:String,

    phone:String,

    gender:String,

    profile_pic:String,

    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    followings:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    }],
    bookmarks:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    }],
    notifications:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Notification"
    }],
   
    
   


},{timestamps:true})

module.exports = mongoose.model("User",userSchema)
