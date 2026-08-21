const validBatch = ['2020-2024','2021-2025','2022-2026','2023-2027','2024-2028'];

const validateAlumni = (name, email, batch, photo, linkedin)=>{
    if(!name || !email || !batch || !photo ){
        return{
            valid : false,
            message : "All fields are required"
        }
    }
    if(!validBatch.includes(batch)){
        return {
            valid : false,
            message : "Invalid Batch"
        }
    }
    if(typeof name !== 'string' || typeof email !== 'string' || typeof batch !== 'string' || typeof photo !== 'string' || (linkedin && typeof linkedin !== 'string') ){
        return {
            valid : false,
            message : "Invalid data types"
        }
    }

    return {
        valid : true
    }
}

const idValidator = (id) => {
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
    validateAlumni,
    idValidator
}