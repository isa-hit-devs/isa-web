const validateCategories = ['Tech Monday', 'Tech Photography', 'Walking Wednesday', 'Thought Thursday', 'Quiz Friday', 'Blogs', 'Events'];

const validateCategory = (category)=>{
    if(!category){
        return {
            valid : true
        }
    }
    if(!validateCategories.includes(category)){
        return {
            valid : false,
            message: "invalid category"
        }
    }

    return {
        valid : true
    }
};

const idValidator = (id)=>{
    if(!id){
        return{
            valid : false,
            message : "id is missing"
        }  
    }

    return {
        valid : true,
    }
}

const newPostValidator = (title,description,category)=>{
    if(!title || !description || !category){
        return {
            valid : false,
            message : "All fields are required"
        }
    }

    return {
        valid : true
    }
}

module.exports = {
    validateCategory,
    idValidator,
    newPostValidator
}