const Post = require("../../Models/PostModels")
const User = require("../../Models/UserModels")
const Notification = require("../../Models/NotificationModels")

const DeletePost = async (req,res) => {

	try{
        const user = await User.findById(req.userId)
        const post = await Post.findById(req.params.postId)
        if(post.user != req.userId){
            return res.status(401).json({general:"only creator can delete their post"})
        }
        await Post.deleteOne({_id:req.params.postId})
        const postIndex = await user.posts.indexOf(req.params.postId)
        if(postIndex == -1){
            return res.status(404).json({general:"post not found"})
        }
       
        await user.posts.splice(postIndex,1)
        await user.save()
        return res.status(201).json({message:"post deleted successfully"})
	}catch(err){
		console.log(err)
		return res.status(500).json({error:err.message})
	}
}
module.exports = DeletePost
