const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, 'Please enter your name'],
        trim: true
    },
    email : {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        trim: true,
        lowercase: true
    },
    role : {
        type : String,
        enum : ['user', 'admin'],
        default : 'user'
    },
    oauthID : {
        type : String,
        unique : true,
        required : [true, 'Please enter your oauthID']
    }
},{
    timestamps : true
});

module.exports = mongoose.model('User', userSchema);