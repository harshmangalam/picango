const User = require("../../Models/UserModels")
const Notification = require("../../Models/NotificationModels")

const FollowUser = async (req,res) => {

    try {
        const current_user = await User.findById(req.userId)
        const follow_user = await User.findById(req.params.userId)

        if(!follow_user){
            return res.status(404).json({general:"user not found"})
        }

        if(req.userId == req.params.userId){
            return res.status(400).json({general:"you cannot subscribe yourself"})

        } 
        const index = await current_user.followings.indexOf(req.params.userId)
        if(index != -1){
            return res.status(400).json({general:"you already subscribe this user"})
           
        }
        const userNotif = await User.find({})
        const newNotification = new Notification({
            user:req.userId,
            message:`${current_user.name} start following ${follow_user.name} `,
        })

        await newNotification.save()
        await userNotif.map(usr=>{
            usr.notifications.push(newNotification.id)
            usr.save()
        }) 
        await current_user.followings.push(req.params.userId)
        await follow_user.followers.push(req.userId)
        await current_user.save()
        await follow_user.save()
        return res.status(201).json({message:"you follow this user"})

    }catch(err){
		console.log(err)
		return res.status(500).json({error:err.message})
	}
}










const UnfollowUser = async (req,res) => {

    try {
        const current_user = await User.findById(req.userId)
        const follow_user = await User.findById(req.params.userId)

        if(!follow_user){
            return res.status(404).json({general:"user not found"})
        }
        const index = await current_user.followings.indexOf(req.params.userId)
        if(index == -1){
            return res.status(400).json({general:"you still not follow this user"})
        }
        await current_user.followings.splice(index,1)
        const follow_index = await follow_user.followers.indexOf(req.userId)
        await follow_user.followers.splice(follow_index,1)
        await current_user.save()
        await follow_user.save()
        const userNotif = await User.find({})
        const newNotification = new Notification({
            user:req.userId,
            message:`${current_user.name} stop following ${follow_user.name} `,
        })

        await newNotification.save()
        await userNotif.map(usr=>{
            usr.notifications.push(newNotification.id)
            usr.save()
        }) 
        return res.status(201).json({message:"you unfollow this user"})

    }catch(err){
		console.log(err)
		return res.status(500).json({error:err.message})
	}
}


const DeleteNotification = async (req,res) => {

    try{
       const user = await User.findById(req.userId)
         user.notifications = []
         await user.save()
         res.status(200).json({message:"cleared notifications !"})
    }catch(err){
        console.log(err)
        res.status(500).json({error:err.message})
    }
}




module.exports = {
    FollowUser,
    UnfollowUser,
    DeleteNotification,

}