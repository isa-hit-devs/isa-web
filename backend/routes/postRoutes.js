const express = require('express');
const { getPosts, singlePost } = require('../controllers/postController');
const router = express.Router();

router.get('/', getPosts)
router.get('/:id', singlePost)

module.exports = router