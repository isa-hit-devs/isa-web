const post = require('../models/postModel');

// get all posts
 const getPosts = async (category)=>{
    return await post.find(category ? {category} : {}).select('image title category');
}

//get single post
const singlePostData = async(id)=>{
    return await post.findById(id)
}

//create a post
const newPost = async(title, description, image, category)=>{
    return await post.create({title,description,image,category})
}

//update a post
const updatePost = async(id,title,description,image,category)=>{
    return await post.findByIdAndUpdate(id,{title,description,image,category},{new : true, runValidators:true})
}

//delete a post
const deletePost = async(id)=>{
    return await post.findByIdAndDelete(id)
}

module.exports = {
    getPosts,
    singlePostData,
    newPost,
    updatePost,
    deletePost
}