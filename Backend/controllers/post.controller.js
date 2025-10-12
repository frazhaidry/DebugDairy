const express = require('express');
const Post = require("../models/Post.model");


// Create a new post
exports.CreatePost = async (req , res) => {
    try {
        const { title , problem , solution , resourceLinks, tags} = req.body;

        if(!title || !problem || !solution || !resourceLinks || !tags){
            return res.status(400).json({message: "Please provide all required fields"});
        }
        
        const newPost = new Post({
            title,
            problem,
            solution,
            resourceLinks,
            tags, 
            createdBy: req.user._id
        })

        await newPost.save();
        await newPost.populate("createdBy", "name");
        res.status(201).json({message: "Post created Successfully", post: newPost});
        
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({message: "Internal server error"});
    }
}

// Get all posts
exports.getAllPosts = async (req, res) => {
    try {

        const posts = await Post.find().populate("createdBy", "name").populate("Likes", "name ");

        res.status(200).json({posts});

    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({message: "Internal server error"});
    }
}


// Get a single post by ID
exports.getPostById = async (req, res) => {

    try {
        const { id } = req.params;

        const post = await Post.findById(id).populate("createdBy", "name").populate("Likes", "name ");

        if(!post){
            return res.status(404).json({message: "Post not found"});
        }

        res.status(200).json({post});

    } catch (error) {

        console.error("Error fetching post by ID:", error);

        res.status(500).json({message: "Internal server error"})

    }
}

// Update a post by ID
// controllers/postController.js

exports.updatePostById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, problem, solution, resourceLinks, tags } = req.body;

    // console.log("Incoming Body:", req.body); // ✅ Debug log

    // Find the post
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

     // Authorization check most imp check later
    // if (post.createdBy._id !== req.user._id) {
    //   return res.status(403).json({ message: "Not authorized to update this post" });
    // }

    // Update only provided fields
    if (title) post.title = title;
    if (problem) post.problem = problem;
    if (solution) post.solution = solution;
    if (resourceLinks) post.resourceLinks = resourceLinks;
    if (tags) post.tags = tags;
    post.createdBy = req.user._id; // Ensure createdBy is set to the authenticated user

    // Save updated post
    await post.save();

    res.status(200).json({
      message: "Post updated successfully ✅",
      post,
    });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Delete a post by ID
exports.deletePostById = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Post.findByIdAndDelete(id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        // Authorization check most imp check later
        // if (post.createdBy.toString() !== req.userId.toString()) {
        //     return res.status(403).json({ message: "You are not authorized to delete this post" });
        // }

        res.status(200).json({ message: "Post deleted successfully" });

    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

