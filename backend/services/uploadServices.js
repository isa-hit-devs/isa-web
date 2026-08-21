// services/uploadService.js
const imagekit = require('../config/imagekit');

const uploadImage = async (file) => {
    const result = await imagekit.upload({
        file: file.buffer.toString('base64'),
        fileName: file.originalname,
        folder: '/blog-posts'
    });
    return result.url;
};

module.exports = { uploadImage };