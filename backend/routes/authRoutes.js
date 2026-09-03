const express = require('express');
const {googleLogin} = require('../controllers/authController');
const { loginLimiter } = require('../middleware/limiter');
const router = express.Router();

router.post('/google',loginLimiter,googleLogin)

module.exports = router;