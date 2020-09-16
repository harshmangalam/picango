const Post = require("../../Models/PostModels")
const User = require("../../Models/UserModels")

const AddBookmark = async (req,res)=> {

    try {
        const post = await Post.findById(req.params.postId)
        const user = await User.findById(req.userId)
        if(!post){
            return res.status(404).json({general:"post not found"})
        }
        const alredyBookmark = await user.bookmarks.indexOf(req.params.postId)
        if(alredyBookmark != -1){
            return res.status(404).json({general:"post alredy bookmarked"})
        }
        await user.bookmarks.push(req.params.postId)
        await user.save()
        return res.status(201).json({message:"bookmarked successfully"})
    }catch(err){
        console.log(err)
        return res.status(500).json({error:err.message})
    }
}




const RemoveBookmark = async (req,res)=> {

    try {
        const post = await Post.findById(req.params.postId)
        const user = await User.findById(req.userId)
        if(!post){
            return res.status(404).json({general:"post not found"})
        }
        const bookmark_index = await user.bookmarks.indexOf(req.params.postId)
        if(bookmark_index == -1){
            return res.status(404).json({general:"post is not bookmarked yet"})
        }
        await user.bookmarks.splice(bookmark_index,1)
        await user.save()
        return res.status(201).json({message:"bookmarked removed"})
    }catch(err){
        console.log(err)
        return res.status(500).json({error:err.message})
    }
}


module.exports = {
    AddBookmark,
    RemoveBookmark
}

