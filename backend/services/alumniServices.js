const alumniModel = require('../models/alumniModel');

// get all alumni
const getAllAlumni = async () => {
    return await alumniModel.find();
}

// create alumni
const createAlumni = async (name, email, batch, photo, linkedin) => {
    return await alumniModel.create({ name, email, batch, photo, linkedin });
}

// update alumni
const updateAlumni = async (id, name, email, batch, photo, linkedin) => {
    return await alumniModel.findByIdAndUpdate(id, { name, email, batch, photo, linkedin }, { new: true, runValidators: true });
}

// delete alumni
const deleteAlumni = async (id) => {
    return await alumniModel.findByIdAndDelete(id);
}

module.exports = {
    getAllAlumni,
    createAlumni,
    updateAlumni,
    deleteAlumni
}