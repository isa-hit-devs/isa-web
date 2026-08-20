const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type : String,
        required : true,
        trim : true
    },
    description: {
        type : String,
        required : true,
        trim : true
    },
    image: {
        type : String,
        required : true,
    },
    category: {
        type : String,
        required : true,
        enum : ['Tech Monday', 'Tech Photography', 'Walking Wednesday', 'Thought Thursday', 'Quiz Friday', 'Blogs', 'Events']
    }
},{
    timestamps: true
})