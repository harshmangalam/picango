const Post = require("../../Models/PostModels")
const User = require("../../Models/UserModels")
const Comment = require("../../Models/CommentModels")
const ReplyComment = require("../../Models/ReplyCommentModels")
const Notification = require("../../Models/NotificationModels")


const PostComment = async (req,res) => {

	const {body} = req.body
	if(!body) return res.status(422).json({error:"comment body is required !!"})
	try{
        const post = await Post.findById(req.params.postId).populate("user")
        const user = await User.findById(req.userId)
		const newComment = new Comment({
			body,
            user:req.userId,
            post:req.params.postId
		})
		const saveComment  = await newComment.save()
		const userNotif = await User.find({})
        const newNotification = new Notification({
            user:req.userId,
			message:`${user.name} commented on ${post.user.name} posts`,
        })

        await newNotification.save()
        await userNotif.map(usr=>{
            usr.notifications.push(newNotification.id)
            usr.save()
        })
        await post.comments.push(saveComment._id)
        await post.save()
		return res.status(201).json({message:"You commented on a post",commentId:saveComment._id})
		
	}catch(err){
		console.log(err)
		return res.status(500).json({error:err.message})
	}
}

const ReplyCommentAction = async (req,res) => {

	const {body} = req.body
	if(!body) return res.status(422).json({error:"comment reply body is required !!"})
	try{
        const comment = await Comment.findById(req.params.commentId).populate("user")
        const user = await User.findById(req.userId)
        const userNotif = await User.find()

		const newReplyComment = new ReplyComment({
			replyBody:body,
            comment:req.params.commentId,
            user:req.params.userId,
		})
		const newNotification = new Notification({
			user:req.userId,
			message:`${user.name} reply on ${comment.user.name} comments`,
		})
		await newNotification.save()
		await userNotif.map(usr=>{
            usr.notifications.push(newNotification.id)
            usr.save()
        })
		const saveReplyComment  = await newReplyComment.save()
        await comment.reply.push(saveReplyComment._id)
        await comment.save()
		return res.status(201).json({message:"You commented on this comment"})
		
	}catch(err){
		console.log(err)
		return res.status(500).json({error:err.message})
	}
}

module.exports = {
    PostComment,
    ReplyCommentAction,
}