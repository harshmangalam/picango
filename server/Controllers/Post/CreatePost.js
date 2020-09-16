const Post = require("../../Models/PostModels")
const User = require("../../Models/UserModels")
const Notification = require("../../Models/NotificationModels")

const cloudinary = require("cloudinary").v2

const CreatePost = async (req,res) => {
	const {text,location} = req.body
	if(!text && !req.files && !location){
		return res.status(422).json({general:"you cannot upload empty post"})
	}
	try{
		const user = await User.findById(req.userId)

		let body = {}
		if(text && text.trim().length > 0){
			body.text = text
		}
		if(location){
			body.location = JSON.parse(location)
		}
		if (req.files) {
            const file = req.files.post_upload;
            const result = await cloudinary.uploader.upload(file.tempFilePath)
            body.image = result.url
        }
		const newPost = new Post({
			body,
			user:req.userId,
		})
		const savePost = await newPost.save()
		const userNotif = await User.find({})
        const newNotification = new Notification({
            user:req.userId,
			message:`${user.name} publish new post`,
        })
        await newNotification.save()
        await userNotif.map(usr=>{
            usr.notifications.push(newNotification.id)
            usr.save()
        })
		await user.posts.push(savePost._id)
		await user.save()
		return res.status(201).json({message:"post created successfully",postId:savePost._id})
		

	}catch(err){
		console.log(err)
		return res.status(500).json({error:err.message})
	}
}

module.exports = CreatePost