const Post = require("../../Models/PostModels")
const User = require("../../Models/UserModels")
const cloudinary = require("cloudinary").v2
const UpdatePost = async (req,res,next) => {

	const {text} = req.body
	try{
        const user = await User.findById(req.userId)
        const post = await Post.findById(req.params.postId)
        if(post.user != req.userId){
            return res.status(401).json({general:"only creator can update their post"})
        }
        let body = {}
        if(text.trim().length > 0){
            body.text = text
        }
        
		if (req.files) {
            const file = req.files.post_upload;
            const result = await cloudinary.uploader.upload(file.tempFilePath)
            body.image = result.url
        }
        await Post.updateOne({_id:req.params.postId},{body})
        return res.status(201).json({message:"post updated successfully"})
	}catch(err){
		console.log(err)
		return res.status(500).json({error:err.message})
	}
}
module.exports = UpdatePost
