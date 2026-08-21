const express = require('express');
const {getAllAlumni} = require('../controllers/alumniController');
const router = express.Router();

router.get('/',getAllAlumni);

module.exports = router;