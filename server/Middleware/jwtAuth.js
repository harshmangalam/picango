const jwt = require("jsonwebtoken")

module.exports = (req,res,next) => {
	const header = req.get("Authorization")
	if(!header){
		return res.status(403).json({general:"Authorization header missing"})
	}

	const token = header.split("Bearer ")[1]
	if(!token){
		return res.status(403).json({general:"Token is missing"})
	}
	let decodedToken;
	try{
		decodedToken = jwt.decode(token,process.env.JWT_SECRET)
	}catch(err){
		console.log(err)
		return res.status(403).json({general:"invalid or expired token"})
	}

	if(!decodedToken){
		return res.status(403).json({general:"Authorization token incorrect"})
	}

	const userId = decodedToken.userId
	req.userId = userId
	next()
}