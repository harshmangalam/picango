const User = require("../../Models/UserModels");
const Notification = require("../../Models/NotificationModels");

const cloudinary = require("cloudinary").v2;

const updateProfile = async (req, res, next) => {
    const { name, email } = req.body;
    try {
        const user = await User.findById(req.userId);
const userNotif = await User.find()
        user.name = name;
        user.email = email;
        if (req.files) {
            const file = req.files.profile_pic;
            const result = await cloudinary.uploader.upload(file.tempFilePath);
            user.profile_pic = result.url;
        }
        const newNotification = new Notification({
            user:req.userId,
            message:`${user.name} update their profile `,
        })

        await newNotification.save()
        await userNotif.map(usr=>{
            usr.notifications.push(newNotification.id)
            usr.save()
        })
		await newNotification.save() 
            
       
        await user.save();
        return res.status(201).json({ message: "profile  updated" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message, err: err });
    }
};



module.exports = {
    updateProfile,
    
};
