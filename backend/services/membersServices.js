const member = require('../models/membersModel');

// get all members
const getAllMembers = async ()=>{
    return await member.find()
}
// create a member
const createMember = async (name,email,photo,position,category)=>{
    return await member.create({name,email,photo,position,category})
}
// update a member
const updateMember = async (id,name,email,photo,position,category)=>{
    return await member.findByIdAndUpdate(id,{name,email,photo,position,category},{new : true, runValidators : true})
}
// delete a member
const deleteMember = async (id)=>{
    return await member.findByIdAndDelete(id)
}

module.exports = {
    getAllMembers,
    createMember,
    updateMember,
    deleteMember
}
