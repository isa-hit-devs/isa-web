const express = require('express');
const {createMember,updatedMember,deletedMember} = require('../controllers/membersController');
const {adminMiddleware} = require('../middleware/adminMiddleware');
const {authMiddleware} = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

const router = express.Router();
router.post('/',authMiddleware,adminMiddleware, upload.single('photo'), createMember);
router.put('/:id',authMiddleware,adminMiddleware, upload.single('photo'), updatedMember);
router.delete('/:id',authMiddleware,adminMiddleware, deletedMember);

module.exports = router;