const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    problem: {
        type: String,
        required: true,
    },
    solution: {
        type: String,
        required: true,
    },
    resourceLinks: [
         {
            type: String,
            required: true
         }
    ],

    tags: [
        {
            type: String,
            required: true
        }
    ],

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    Likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],

    createdAt: {
        type: Date,
        default: Date.now
    },

}, {timestamps: true})

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
