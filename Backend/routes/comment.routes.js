// Backend/routes/comment.routes.js
const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment.controller');
const auth = require('../middlewares/auth.middleware'); // adjust if your file is named differently

// Get all comments for a post
router.get('/posts/:postId/comments', commentCtrl.getComments);

// Add a new comment (auth required)
router.post('/posts/:postId/comments', auth, commentCtrl.addComment);

// Delete a comment (auth required)
router.delete('/posts/:postId/comments/:commentId', auth, commentCtrl.deleteComment);

module.exports = router;
