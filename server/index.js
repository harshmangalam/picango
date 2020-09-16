const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()
const fileupload = require("express-fileupload")

const MONGODB = process.env.MONGODB_URI || "mongodb://localhost:27017/picango
const PORT = process.env.PORT || 4000

const AuthRoutes = require("./Routes/AuthRoutes")
const PostRoutes = require("./Routes/PostRoutes")
const UserRoutes = require("./Routes/UserRoutes")

const cloudinary = require('cloudinary').v2;


cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});





// utility middleware
app.use(cors())
app.use(express.json())
app.use(fileupload({useTempFiles:true}))
app.use("/public",express.static("public"))



// routes middleware
app.use("/api/auth",AuthRoutes)
app.use("/api/post",PostRoutes)
app.use("/api/user",UserRoutes)

app.get("/",(req,res)=>{
	res.json({"server":"open..."})
})
//database and server setup
mongoose.connect(MONGODB,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log("database connection stablished")
    app.listen(PORT,()=>console.log(`server started on port ${PORT}`))
})

.catch(err=>console.log("mongodb error ::: " , err))


