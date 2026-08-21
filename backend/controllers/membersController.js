const membersServices = require('../services/membersServices');
const { validateMember, idValidator } = require('../validators/membersValidators');

const getAllMembers = async (req, res) => {
    try {
        const result = await membersServices.getAllMembers()
        return res.status(200).json({ success: true, message: "Members data fetched successfully", members: result })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const createMember = async (req, res) => {
    try {
        const { name, email, photo, position, category } = req.body;
        const validation = validateMember(name, email, photo, position, category);
        if (!validation.valid) {
            return res.status(400).json({ success: false, message: validation.message })
        }
        const result = await membersServices.createMember(name, email, photo, position, category);
        return res.status(200).json({ success: true, message: "Member created successfully", member: result })
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
        const { name, email, photo, position, category } = req.body;
        const validation = validateMember(name, email, photo, position, category);
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
            return res.status(400).json({ message: "Invalid post id" });
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
            return res.status(400).json({ message: "Invalid post id" });
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