const alumniModel = require('../models/alumniModel');

// get all alumni
const getAllAlumni = async (page, limit) => {
    const skip = (page - 1) * limit;
    const [alumni, total] = await Promise.all([
        alumniModel.find().skip(skip).limit(limit),
        alumniModel.countDocuments()
    ]);
    return {
        alumni,
        total,
        page,
        totalPages: Math.ceil(total / limit)
    };
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