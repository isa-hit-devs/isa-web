const express = require('express');
const {authMiddleware} = require('../middleware/authMiddleware');
const {adminMiddleware} = require('../middleware/adminMiddleware');
const {createAlumni,updateAlumni,deleteAlumni} = require('../controllers/alumniController');
const upload = require('../middleware/upload');
const router = express.Router();
router.post('/',authMiddleware,adminMiddleware, upload.single('photo'), createAlumni);
router.put('/:id',authMiddleware,adminMiddleware, upload.single('photo'), updateAlumni);
router.delete('/:id',authMiddleware,adminMiddleware,deleteAlumni);

module.exports = router;