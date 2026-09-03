const membersServices = require('../services/membersServices');
const { validateMember, idValidator } = require('../validators/membersValidators');
const { uploadImage } = require('../services/uploadServices');

const getAllMembers = async (req, res) => {
    try {
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 10));
        const { members, total, totalPages } = await membersServices.getAllMembers(page, limit);
        return res.status(200).json({ success: true, message: "Members data fetched successfully", members, total, page, totalPages })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const createMember = async (req, res) => {
    try {
        const { name, email, position, category } = req.body;
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Please upload a photo" });
        }
        const validation = validateMember(name, email, position, category);
        if (!validation.valid) {
            return res.status(400).json({ success: false, message: validation.message })
        }
        const photo = await uploadImage(req.file);
        const result = await membersServices.createMember(name, email, photo, position, category);
        return res.status(201).json({ success: true, message: "Member created successfully", member: result })
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const updatedMember = async (req, res) => {
    try {
        const { id } = req.params;
        const idValidation = idValidator(id);
        if (!idValidation.valid) {
            return res.status(400).json({ success: false, message: idValidation.message })
        }
        const { name, email, position, category } = req.body;
        const photo = req.file ? await uploadImage(req.file) : undefined;
        const validation = validateMember(name, email, position, category);
        if (!validation.valid) {
            return res.status(400).json({ success: false, message: validation.message })
        }
        const result = await membersServices.updateMember(id, name, email, photo, position, category);
        if (!result) {
            return res.status(404).json({ success: false, message: "Member not found" })
        }
        return res.status(200).json({ success: true, message: "Member updated successfully", member: result })
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: "Invalid post ID" });
        }
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }

}

const deletedMember = async (req, res) => {
    try {
        const { id } = req.params;
        const idValidation = idValidator(id);
        if (!idValidation.valid) {
            return res.status(400).json({ success: false, message: idValidation.message })
        }
        const result = await membersServices.deleteMember(id);
        if (!result) {
            return res.status(404).json({ success: false, message: "Member not found" })
        }
        return res.status(200).json({ success: true, message: "Member deleted successfully", member: result })
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: "Invalid value" });
        }
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }

}

module.exports = {
    getAllMembers,
    createMember,
    updatedMember,
    deletedMember
}