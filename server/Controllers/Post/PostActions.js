const Post = require("../../Models/PostModels")
const User = require("../../Models/UserModels")
const Notification = require("../../Models/NotificationModels")

const AddPostLike = async (req,res) => {

	try{
        const user = await User.findById(req.userId)
        const post = await Post.findById(req.params.postId).populate("user")

        if(!post){
            return res.status(404).json({general:"post not found"})
        }
        
        const like_index = post.likes.indexOf(req.userId)
        if(like_index != -1){
            return res.status(400).json({general:"post alredy liked"})
        }
        const userNotif = await User.find({})
        const newNotification = new Notification({
            user:req.userId,
			message:`${user.name} likes ${post.user.name} posts `,
        })

        await newNotification.save()
        await userNotif.map(usr=>{
            usr.notifications.push(newNotification.id)
            usr.save()
        })  
        await post.likes.push(req.userId)
        await post.save()
		return res.status(200).json({message:"like successfully"})
	}catch(err){
		console.log(err)
		return res.status(500).json({error:err.message})
	}
}

const RemovePostLike = async (req,res) => {

	try{
        const user = await User.findById(req.userId)
        const post = await Post.findById(req.params.postId).populate("user")
        if(!post){
            return res.status(404).json({general:"post not found"})
        }
        
        const like_index = post.likes.indexOf(req.userId)
        if(like_index == -1){
            return res.status(400).json({general:"you still not like this post"})
        }
        const userNotif = await User.find({})
        const newNotification = new Notification({
            user:req.userId,
            message:`${user.name} unlike ${post.user.name} posts `,
        })

        await newNotification.save()
        await userNotif.map(usr=>{
            usr.notifications.push(newNotification.id)
            usr.save()
        })
		await newNotification.save()

        await post.likes.splice(like_index,1)
        await post.save()
        return res.status(200).json({message:"like removed"})
        
	}catch(err){
		console.log(err)
		return res.status(500).json({error:err.message})
	}
}




module.exports = {AddPostLike,RemovePostLike}