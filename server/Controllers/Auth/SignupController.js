const User = require("../../Models/UserModels")
const bcrypt = require("bcryptjs")
const {validationResult} = require("express-validator")


const SignupController = async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({error:errors.array()})
    }
    const {name,email,password} = req.body
    try{
        const user = await User.findOne({email})
        if(user){
            return res.status(409).json({general:"email already exists"})
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = new User({
            name,
            email,
            password:hashedPassword
        })
        const saveUser = await newUser.save()
        return res.status(201).json({userId:saveUser.id ,message:`user created with name ${saveUser.name}`})

    }catch(err){
        console.log(err)
        return res.status(500).json({error:err.message})
    }
    
}

module.exports = SignupController
