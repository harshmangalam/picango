const User = require("../../Models/UserModels")

const transformUserData = (user) => {
    return {
        id:user._id,
        name:user.name,
        email:user.email,
        dob:user.dob,
        bio:user.bio,
        phone:user.phone,
        gender:user.gender,
        profile_pic:user.profile_pic && user.profile_pic,
        followers:user.followers.length,
        followings:user.followings.length,
        posts:user.posts.length,
        bookmarks:user.bookmarks.length,
        createdAt:user.createdAt,
        updatedAt:user.updatedAt,
        notifications:user.notifications.length,
        followersData:user.followers.map(user=>{
            return {
                id:user.id,
                name:user.name,
                email:user.email,
               profile_pic:user.profile_pic && user.profile_pic,
            }
        }),
        followingsData:user.followings.map(user=>{
            return {
                id:user.id,
                name:user.name,
                email:user.email,
                profile_pic:user.profile_pic && user.profile_pic,
            }
        }),
        notificationsData:user.notifications.map(notif=>{
            return {
                id:notif.id,
                msg:notif.message,
                userId:notif.user,
                createdAt:notif.createdAt
            }
        }),

        
    }
}
const GetAllUser = async (req,res)=> {
    try {
        const users = await User.find()
        .populate("followers")
        .populate("followings")
        .populate("posts")
        .populate("bookmarks")
        .populate("notifications")
        
        .sort("-createdAt")

        const user_data = await users.map(user=>transformUserData(user))
        return res.status(200).json({users:user_data})
    }catch(err){
        console.log(err)
		return res.status(500).json({error:err.message})
    }
}


const GetUserById = async (req,res) => {
    try {
        const user = await User.findById(req.params.userId)
        .populate("posts")
        .populate("followings")
        .populate("followers")
        .populate("notifications")
       
        .populate("bookmarks")
        const user_data = await transformUserData(user)
        return res.status(200).json({user:user_data})
    }catch(err){
        console.log(err)
		return res.status(500).json({error:err.message})
    }
}

module.exports = {
    GetAllUser,
    GetUserById
}
