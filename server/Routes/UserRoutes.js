const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const path = require("path");
const { FollowUser, UnfollowUser,DeleteNotification } = require("../Controllers/User/UserActions");
const { GetAllUser, GetUserById } = require("../Controllers/User/GetUser");
const { updateProfile } = require("../Controllers/User/UserProfile");
const jwtAuth = require("../Middleware/jwtAuth");

router.get("/", GetAllUser);

router.delete("/notification",jwtAuth,DeleteNotification)


router.get("/:userId", GetUserById);

router.get("/:userId/follow", jwtAuth, FollowUser);
router.get("/:userId/unfollow", jwtAuth, UnfollowUser);



router.post("/profile",jwtAuth,updateProfile);

module.exports = router;
