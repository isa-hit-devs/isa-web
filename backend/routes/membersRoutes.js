const express = require('express');
const {getAllMembers} = require('../controllers/membersController');

const router = express.Router();

router.get('/',getAllMembers);

module.exports = router;