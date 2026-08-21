const mongoose = require('mongoose');

const membersSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        lowercase : true,
        unique : true,
        trim : true
    },
    photo : {
        type : String,
        required : true,   
    },
    position : {
        type : String,
        required : true,
        enum : [
        "PR","Content Writer","Photographer","Video Editor","Graphic Designer","Technical Member","Web Developer","President","Vice-President","Secretary","Joint-Secretary","Content-Head","PR-Head","Technical-Head","Treasurer","Media-Head","GD-Head","Manager","Marketing-Head"
      ]
    },
    category : {type : String,
        required : true,
        enum : ["Core-Member", "General-Member"]
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Member', membersSchema);