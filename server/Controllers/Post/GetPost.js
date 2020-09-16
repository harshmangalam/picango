const Post = require("../../Models/PostModels")
const User = require("../../Models/UserModels")

const transformPostData = (post) => {
	return {
		id:post.id,
		body:{
			image:post.body.image && post.body.image,
			video:post.body.video && post.body.video,
			text:post.body.text && post.body.text,
			location:post.body.location && post.body.location,
		},
		user:{
			id:post.user.id,
			name:post.user.name,
			profile_pic:post.user.profile_pic && post.user.profile_pic,
			email:post.user.email
		},
		comments:post.comments.length,
		likes:post.likes.length,
		likeBy:post.likes.map(user=>{
			return {
				id:user.id,
				name:user.name,
				email:user.email,
				profile_pic:user.profile_pic && user.profile_pic,
			}
		}),
		createdAt:post.createdAt,
		updatedAt:post.updatedAt
	}
}

const GetAllPosts = async (req,res) => {
try{
	const posts = await Post.find()
	.populate("user")
	.populate("comments")
	.populate("likes")
	.sort("-createdAt")
	.exec()
	const post_data  = await posts.map(post=>transformPostData(post))
	return res.status(200).json({posts:post_data})
	}catch(err){
		console.log(err)
		return res.status(500).json({error:err.messge})
	}
}


const GetPostById = async (req,res) => {

	try{
		const post = await Post.findById(req.params.postId)
		.populate("user")
		.populate("comments")
		.populate("likes")
		.exec()
		const post_data = await transformPostData(post)
		return res.status(200).json({post:post_data})

	}catch(err){
		console.log(err)
		return res.status(500).json({error:err.messge})
	}
}

module.exports = {
	GetPostById,
	GetAllPosts
}
