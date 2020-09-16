const User = require("../../Models/UserModels")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const {validationResult} = require("express-validator")

const LoginController = async (req,res) => {
    
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({error:errors.array()})
    }

    const {email,password} = req.body
    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({general:"incorrect credentials"})
        }
        const checkPassword = await bcrypt.compare(password,user.password)
        if(!checkPassword){
            return res.status(401).json({general:"incorrect credentials"})
        }
        const token = jwt.sign({userId:user.id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXP})
        return res.status(201).json({
            message:"loggedin successfully",
            token,
            userId:user.id
        })

    }catch(err){
        console.log(err)
        return res.status(500).json({error:err.message})
    }
    
}

module.exports = LoginController
