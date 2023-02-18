const express = require('express');
const router = express.Router();
const PostController = require("../controllers/posts")

// Posts API endpoints
router.post('/', PostController.addPost);
router.get('/', PostController.getAllPosts);
router.get('/:id', PostController.getPost);
router.put('/:id', PostController.updatePost);
router.delete('/:id', PostController.deletePost);

module.exports = router;
