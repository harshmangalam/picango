const express = require("express")
const router = express.Router()
const {body} = require("express-validator")
const CreatePost = require("../Controllers/Post/CreatePost")
const UpdatePost = require("../Controllers/Post/UpdatePost")
const DeletePost = require("../Controllers/Post/DeletePost")
const {AddPostLike,RemovePostLike} = require("../Controllers/Post/PostActions")
const {
	GetAllPosts,GetPostById
} = require("../Controllers/Post/GetPost")


const {GetCommentById,GetComments} = require("../Controllers/Comment/GetComments")

const {ReplyCommentAction,PostComment} = require("../Controllers/Comment/PostComment")
const {AddBookmark,RemoveBookmark} = require("../Controllers/Post/Bookmark")
const {AddCommentLike,RemoveCommentLike,RemoveComment} = require("../Controllers/Comment/CommentAction")

const jwtAuth = require("../Middleware/jwtAuth")


router.get("/",GetAllPosts)
router.get("/:postId",GetPostById)
router.delete("/:postId",jwtAuth,DeletePost)
router.post("/",jwtAuth,CreatePost)
router.post("/:postId",jwtAuth,UpdatePost)


router.get("/:postId/add_like",jwtAuth,AddPostLike)
router.get("/:postId/remove_like",jwtAuth,RemovePostLike)



router.get("/:postId/comment",GetComments)
router.get("/comment/:commentId",GetCommentById)
router.post("/:postId/comment",jwtAuth,PostComment)
router.post("/comment/:commentId/reply/:userId",jwtAuth,ReplyCommentAction)
router.get("/comment/:commentId/add_like",jwtAuth,AddCommentLike)
router.get("/comment/:commentId/remove_like",jwtAuth,RemoveCommentLike)
router.delete("/:postId/comment/:commentId",jwtAuth,RemoveComment)


router.post("/:postId/add_bookmark",jwtAuth,AddBookmark)
router.post("/:postId/remove_bookmark",jwtAuth,RemoveBookmark)


module.exports = router