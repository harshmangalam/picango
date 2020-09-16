const User = require("../../Models/UserModels")
const Post = require("../../Models/PostModels")
const ReplyCommentModel = require("../../Models/ReplyCommentModels")
const Comment = require("../../Models/CommentModels")
const Notification = require("../../Models/NotificationModels")




const RemoveComment = async (req,res) => {
    try{
        const post = await Post.findById(req.params.postId).populate("user")
        const user = await User.findById(req.userId)
        const comment = await Comment.findById(req.params.commentId)
        if(!comment){
            return res.status(404).json({general:"comment not found"})
        }
        const userNotif = await User.find()
        const newNotification = new Notification({
            user:req.userId,
            message:`${user.name} remove a comment from ${post.user.name} posts`,
        })

        await newNotification.save()
        await userNotif.map(usr=>{
            usr.notifications.push(newNotification.id)
            usr.save()
        })
        await Comment.deleteOne({_id:req.params.commentId})
        await ReplyCommentModel.deleteMany({comment:req.params.commentId})
        const commentIndex = await post.comments.indexOf(req.params.commentId)
        if(commentIndex > -1){
            await post.comments.splice(commentIndex,1)
        }
        return res.status(201).json({message:"comment deleted successfully"})
        
    }catch(err){
        console.log(err)
        return res.status(500).json({error:err.message})
    }
}
const AddCommentLike = async (req,res) => {

	try{
        const user = await User.findById(req.userId)
        const comment = await Comment.findById(req.params.commentId).populate("user")

        if(!comment){
            return res.status(404).json({general:"comment not found"})
        }
        
        const like_index = await comment.likes.indexOf(req.userId)
        if(like_index != -1){
            return res.status(400).json({general:"comment alredy liked"})
        }
        const userNotif = await User.find()
         const newNotification = new Notification({
            user:req.userId,
            message:`${user.name} like  ${comment.user.name} comments`,
        })
        await newNotification.save()
        await userNotif.map(usr=>{
            usr.notifications.push(newNotification.id)
            usr.save()
        })
        await comment.likes.push(req.userId)
        await comment.save()
		return res.status(201).json({message:"like successfully"})
	}catch(err){
		console.log(err)
		return res.status(500).json({error:err.message})
	}
}

const RemoveCommentLike = async (req,res) => {

	try{
        const user = await User.findById(req.userId)
        const comment = await Comment.findById(req.params.commentId).populate("user")
        if(!comment){
            return res.status(404).json({general:"comment not found"})
        }
        const like_index =await comment.likes.indexOf(req.userId)
        if(like_index == -1){
            return res.status(400).json({general:"you still not like this comment"})
        }
        const userNotif = await user.find()
         const newNotification = new Notification({
            user:req.userId,
            message:`${user.name} unlike ${comment.user.name} comments`,
        })
        
        await newNotification.save()
         await userNotif.map(user=>{
            user.push(newNotification.id)
            user.save()
        })
        await comment.likes.splice(like_index,1)
        await comment.save()
        return res.status(201).json({message:"like removed"})
        
	}catch(err){
		console.log(err)
		return res.status(500).json({error:err.message})
	}
}

module.exports = {AddCommentLike,RemoveCommentLike,RemoveComment}