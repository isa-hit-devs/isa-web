const mongoose = require('mongoose');

const alumniSchema = new mongoose.Schema({
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
    batch : {
        type : String,
        required : true,
        enum : ['2020-2024','2021-2025','2022-2026','2023-2027','2024-2028'],
    },
    linkedin : {
        type : String,
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Alumni', alumniSchema);