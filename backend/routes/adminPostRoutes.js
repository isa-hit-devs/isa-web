const express = require('express');
const { createdPost, updatedPost, deletedPost} = require('../controllers/postController');
const { authMiddleware} = require('../middleware/authMiddleware');
const {adminMiddleware} = require('../middleware/adminMiddleware');
const upload = require('../middleware/upload');
const router = express.Router();

router.post('/',authMiddleware,adminMiddleware, upload.single('image'), createdPost)
router.put('/:id',authMiddleware,adminMiddleware, upload.single('image'), updatedPost)
router.delete('/:id',authMiddleware,adminMiddleware, deletedPost)

module.exports = router