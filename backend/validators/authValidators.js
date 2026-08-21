const validateGoogleToken = (idToken)=>{
    if(!idToken){
        return {
            valid : false,
            message : "No token"
        }
    }

    if (typeof idToken !== "string") {
        return {
            valid: false,
            message: "Google ID token must be a string"
        };
    }

    return {
        valid : true
    }
}

module.exports = {
    validateGoogleToken
}