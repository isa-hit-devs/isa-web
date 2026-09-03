const validPosition = [
        "PR","Content Writer","Photographer","Video Editor","Graphic Designer","Technical Member","Web Developer","President","Vice-President","Secretary","Joint-Secretary","Content-Head","PR-Head","Technical-Head","Treasurer","Media-Head","GD-Head","Manager","Marketing-Head"
      ]
const validCategory = ["Core-Member", "General-Member"]



const validateMember = (name, email, position, category) => {
    if (!name || !email || !position || !category) {
        return {
            valid: false,
            message: "All fields are required"
        }
    }
    if (typeof name != 'string' || typeof email != 'string' || typeof position != 'string' || typeof category != 'string') {
        return {
            valid: false,
            message: "Invalid data types"
        }
    }
    if (!validPosition.includes(position)) {
        return {
            valid: false,
            message: "Invalid Position"
        }
    }
    if (!validCategory.includes(category)) {
        return {
            valid: false,
            message: "Invalid Category"
        }
    }
    return {
        valid: true,
    }
}

const idValidator = (id)=>{
    if(!id){
        return{
            valid : false,
            message : "Id is missing"
        }
    }
    return {
        valid : true
    }
}

module.exports = {
    validateMember,
    idValidator
}