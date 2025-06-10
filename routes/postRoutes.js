const express = require('express');
const router = express.Router();
const {
  getPosts,
  getPost,
  // Removed: createPost, updatePost, deletePost
} = require('../controllers/postController');

router.route('/').get(getPosts); // Only allow GET for all posts
router.route('/:id').get(getPost); // Only allow GET for a single post

module.exports = router;