const authSevice = require('../services/authServices');
const {validateGoogleToken} =  require('../validators/authValidators');

const googleLogin = async(req,res)=>{
    try{
        const {idToken} = req.body;
        const validate = validateGoogleToken(idToken);
        if(!validate.valid){
            return res.status(400).json({message : validate.message})
        }
        const result = await authSevice.verifyToken(idToken);
        return res.status(200).json({message : "login successfull", user : result.user, token : result.token})
        
    }catch(error){
        console.error("Google login error:", error);
        return res.status(500).json({message : "Internal server error",})
    }
}

module.exports = {
    googleLogin
}