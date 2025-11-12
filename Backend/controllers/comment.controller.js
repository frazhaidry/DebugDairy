// Backend/controllers/comment.controller.js
const Comment = require('../models/Comment');
const mongoose = require('mongoose');

exports.getComments = async (req, res) => {
  try {
    const { postId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(postId))
      return res.status(400).json({ message: 'Invalid post ID' });

    const comments = await Comment.find({ postId })
      .sort({ createdAt: -1 })
      .populate('userId', 'name email'); // adjust fields if needed
    res.json({ comments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { body } = req.body;
    const userId = req.user?.id || req.user?._id;

    if (!userId)
      return res.status(401).json({ message: 'Authentication required' });
    if (!body || !body.trim())
      return res.status(400).json({ message: 'Comment text required' });

    const comment = new Comment({ postId, userId, body: body.trim() });
    await comment.save();
    await comment.populate('userId', 'name email');
    res.status(201).json({ comment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const userId = req.user?.id || req.user?._id;

    if (!userId)
      return res.status(401).json({ message: 'Authentication required' });

    const comment = await Comment.findOne({ _id: commentId, postId });
    if (!comment)
      return res.status(404).json({ message: 'Comment not found' });

    if (comment.userId.toString() !== userId.toString() && !req.user.isAdmin)
      return res.status(403).json({ message: 'Not authorized' });

    await comment.deleteOne();
    res.json({ message: 'Deleted successfully', id: commentId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
