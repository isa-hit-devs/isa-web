const postService = require('../services/postServices');
const {validateCategory, idValidator, newPostValidator} = require('../validators/postValidators')

//get all posts
const getPosts = async (req, res) => {
    try {
        const {category} = req.query;
        const validation = validateCategory(category)
        if(!validation.valid){
            return res.status(400).json({message : validation.message})
        }
        const posts = await postService.getPosts(category)
        if(posts.length === 0){
            return res.status(200).json({message : "No posts created yet", posts : []})
        }
        res.status(200).json({message : "Posts fetched successfully", posts});
    }catch (error) {
        res.status(500).json({message : error.message})
    }
}

// get a single post 

const singlePost = async (req,res) => {
    try {
        const {id} = req.params;
        const validation = idValidator(id)
        if(!validation.valid){
            return res.status(400).json({message : validation.message})
        }
        const singlePostData = await postService.singlePostData(id)
        if(!singlePostData){
            return res.status(404).json({message : "Post not found"})
        }
        res.status(200).json({message : "Post fetched successfully", post : singlePostData});
    } catch (error) {
        if(error.name === 'CastError'){
            return res.status(400).json({message : "Invalid post id"})
        }else{
            res.status(500).json({message : error.message})
        }
    }
}

// create a post 

const createdPost = async(req,res)=>{
    try{
        const {title, description, category} = req.body;
        if(!req.file){
            return res.status(400).json({message : "Please upload an image"})
        }
        const validation = newPostValidator(title, description, category);
        if(!validation.valid){
            return res.status(400).json({message : validation.message})
        }
        // handle image upload
        const imageUrl = await uploadImage(req.file);
        const newPost = await postService.newPost(title, description, imageUrl, category)
        res.status(201).json({message : "Post created successfully", post : newPost});
    }catch (error) {
        res.status(500).json({message : error.message})
    }
}

// update a post 
const updatedPost = async(req,res)=>{
    try{
        const {id} = req.params;
        const validation = idValidator(id)
        if(!validation.valid){
            return res.status(400).json({message : validation.message})
        }
        const {title, description, category} = req.body;
        const imageUrl = req.file ? await uploadImage(req.file) : undefined;
        const updatePost = await postService.updatePost(id,title,description,imageUrl,category)
        if(!updatePost){
            return res.status(404).json({message : "Post not found"})
        }
        res.status(200).json({message : "Post updated successfully", post : updatePost});
    }catch (error) {
        if(error.name === 'CastError'){
            return res.status(400).json({message : "Invalid post id"})
        }else{
            res.status(500).json({message : error.message})
        }
    }
}

// delete a post
const deletedPost = async(req,res)=> {
    try{
        const {id} = req.params;
        const validation = idValidator(id);
        if(!validation.valid){return res.status(400).json({message:validation.message})}
        const deletePost =await postService.deletePost(id)
        if(!deletePost){
            return res.status(404).json({message : "Post not found"})
        }
        res.status(200).json({message : "Post deleted successfully", post : deletePost});
    }catch (error) {
        if(error.name === 'CastError'){
            return res.status(400).json({message : "Invalid post id"});
        }else{
            res.status(500).json({message : error.message})
        }
    }
}

module.exports = {
    getPosts,
    singlePost,
    createdPost,
    updatedPost,
    deletedPost
}