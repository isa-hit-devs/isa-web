const adminMiddleware = (req,res,next)=>{
    try{
        if(req.user.role !== 'admin'){
            return res.status(403).json({success : false, message : "Admin rights required!"})
        }
        next()
    }catch(error){
        return res.status(500).json({success : false, message : "Internal Server error"})
    }
}

module.exports = {
    adminMiddleware
}