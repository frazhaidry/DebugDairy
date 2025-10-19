const Post = require("../models/Post.model");
const userAuth = require("../middlewares/auth.middleware");
const { CreatePost, getAllPosts, getPostById, updatePostById, deletePostById } = require("../controllers/post.controller");

const express = require("express");
const postRouter = express.Router();


// Create a new post
postRouter.post("/", userAuth, CreatePost);

// Get all posts
postRouter.get("/", getAllPosts);
    
// Get a single post by ID
postRouter.get("/:id", getPostById);

// Update a post by ID
postRouter.put("/:id", userAuth, updatePostById);

// Delete a post by ID
postRouter.delete("/:id", userAuth, deletePostById);


module.exports = postRouter;

const Post = require("../models/Post.model");
const userAuth = require("../middlewares/auth.middleware");
const { CreatePost, getAllPosts, getPostById, updatePostById, deletePostById, toggleLikePost } = require("../controllers/post.controller");

const express = require("express");
const postRouter = express.Router();


// Create a new post
postRouter.post("/", userAuth, CreatePost);

// Get all posts
postRouter.get("/", getAllPosts);
    
// Get a single post by ID
postRouter.get("/:id", getPostById);

// Update a post by ID
postRouter.put("/:id", userAuth, updatePostById);

// Delete a post by ID
postRouter.delete("/:id", userAuth, deletePostById);

// Toggle like/unlike a post
postRouter.put("/:id/like", userAuth, toggleLikePost);


module.exports = postRouter;