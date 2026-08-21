const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const authMiddleware = async (req,res,next)=>{
   try{
     const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({success : false, message : "Token is missing"})
    }
    const token = authHeader.split(' ')[1]
    if(!token){
        return res.status(401).json({success: false, message : "invalid authorization token"})
    }
    const verifyToken = jwt.verify(token,process.env.JWT_SECRET_KEY)
    const user = await userModel.findById(verifyToken.id)
    if(!user){
        return res.status(401).json({success : false , message : "User not found"})
    }
        req.user = user;
        next()
   }catch(err){
    return res.status(500).json({success : false, message : "Internal Server error"})
   }
}

module.exports = {
    authMiddleware
}