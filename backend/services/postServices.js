const post = require('../models/postModel');

// get all posts
const getPosts = async (category, page, limit) => {
    const skip = (page - 1) * limit;
    const filter = category ? { category } : {};
    const [posts, total] = await Promise.all([
        post.find(filter).select('image title category').skip(skip).limit(limit),
        post.countDocuments(filter)
    ]);
    return {
        posts,
        total,
        page,
        totalPages: Math.ceil(total / limit)
    };
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