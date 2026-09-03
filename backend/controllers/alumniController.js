const alumniServices = require('../services/alumniServices');
const { validateAlumni, idValidator } = require('../validators/alumniValidators');
const { uploadImage } = require('../services/uploadServices');

const getAllAlumni = async (req, res) => {
    try {
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 10));
        const { alumni, total, totalPages } = await alumniServices.getAllAlumni(page, limit);
        return res.status(200).json({ success: true, message: "Alumni data fetched successfully", alumni, total, page, totalPages })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const createAlumni = async (req, res) => {
    try {
        const { name, email, batch, linkedin } = req.body;
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Please upload a photo" });
        }
        const validation = validateAlumni(name, email, batch, linkedin);
        if (!validation.valid) {
            return res.status(400).json({ success: false, message: validation.message })
        }
        const photo = await uploadImage(req.file);
        const result = await alumniServices.createAlumni(name, email, batch, photo, linkedin);
        return res.status(201).json({ success: true, message: "Alumni created successfully", alumni: result })
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const updateAlumni = async (req, res) => {
    try {
        const { id } = req.params;
        const idValidation = idValidator(id);
        if (!idValidation.valid) {
            return res.status(400).json({ success: false, message: idValidation.message })
        }
        const { name, email, batch, linkedin } = req.body;
        const photo = req.file ? await uploadImage(req.file) : undefined;
        const validation = validateAlumni(name, email, batch, linkedin);
        if (!validation.valid) {
            return res.status(400).json({ success: false, message: validation.message })
        }
        const result = await alumniServices.updateAlumni(id, name, email, batch, photo, linkedin);
        if (!result) {
            return res.status(404).json({ success: false, message: "Alumni not found" })
        }
        return res.status(200).json({ success: true, message: "Alumni updated successfully", alumni: result })
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: "Invalid id value" });
        }
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const deleteAlumni = async (req, res) => {
    try {
        const { id } = req.params;
        const idValidation = idValidator(id);
        if (!idValidation.valid) {
            return res.status(400).json({ success: false, message: idValidation.message })
        }
        const result = await alumniServices.deleteAlumni(id);
        if (!result) {
            return res.status(404).json({ success: false, message: "Alumni not found" })
        }
        return res.status(200).json({ success: true, message: "Alumni deleted successfully", alumni: result })
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: "Invalid id" });
        }
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

module.exports = {
    getAllAlumni,
    createAlumni,
    updateAlumni,
    deleteAlumni
}