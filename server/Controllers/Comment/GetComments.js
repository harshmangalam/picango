const Post = require("../../Models/PostModels")
const User = require("../../Models/UserModels")
const Comment = require("../../Models/CommentModels")
const ReplyComment = require("../../Models/ReplyCommentModels")

const transformCommentData = (comment) => {
    return {
        id:comment.id,
        body:comment.body,
        user:{
            id:comment.user.id,
            name:comment.user.name,
            email:comment.user.email,
            profile_pic:comment.user.profile_pic && comment.user.profile_pic 
        },
        post:{
            id:comment.post.id,
            body:{
                image:comment.post.body.image && comment.post.body.image,
                video:comment.post.body.video && comment.post.body.video,
                text:comment.post.body.text && comment.post.body.text,
            },

        },
        likes:comment.likes.length,
        reply:comment.reply.length,
        createdAt:comment.createdAt,
        replyData:comment.reply.map(r=>{
            return {
                id:r.id,
                comment:{
                    id:r.comment.id,
                },
                replyBody:r.replyBody,
                user:{
                    id:r.user.id,
                    email:r.user.email,
                    name:r.user.name,
                    profile_pic:r.user.profile_pic && r.user.profile_pic
                },
                likes:r.likes.map(user=>{
                    return {
                        id:user.id,
                        name:user.name,
                        email:user.email,
                        profile_pic:user.profile_pic && user.profile_pic
                    }
                })
            }
        })


    }
}
const GetComments = async (req,res) => {

    try{
        const comments = await Comment.find({post:req.params.postId})
        .populate("user")
        .populate("post")
        .populate("likes")
        .populate({path:"reply",populate:{path:"user comment likes"}})
        .sort("-createdAt")
        .exec()
        const comment_data = comments.map(comment=>transformCommentData(comment))
        return res.status(200).json({comments:comment_data})

    }catch(err){
        console.log(err)
        return res.status(500).json({error:err.message})
    }
}

const GetCommentById = async (req,res) => {

    try{
        const comment = await Comment.findById(req.params.commentId)
        .populate("user")
        .populate("post")
        .populate("likes")
        .populate({path:"reply",populate:{path:"user"}})
        
        .exec()
        const comment_data = transformCommentData(comment)
        return res.status(200).json({comment:comment_data})

    }catch(err){
        console.log(err)
        return res.status(500).json({error:err.message})
    }
}



module.exports = {
    GetComments,
    GetCommentById
}