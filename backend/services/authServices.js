const googleClient = require('../config/google');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

const verifyToken = async (idToken)=>{
        const ticket = await googleClient.verifyIdToken({
            idToken,
            audience:process.env.GOOGLE_CLIENT_ID
        });
        const payLoad = ticket.getPayload();
        const {sub,name,email} = payLoad;

        let user = await userModel.findOne({oauthID:sub});
        if(!user){
            user = await userModel.create({
                oauthID:sub,
                name:name,
                email:email
            })
        }
        const token = jwt.sign({
            id: user._id,
            role: user.role 
        },process.env.JWT_SECRET_KEY,{expiresIn:"7d"});
        return {
            token,
            user
        } 
}

module.exports = {
    verifyToken
}