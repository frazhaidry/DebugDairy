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

    likes: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        default: []
    },

}, {timestamps: true}) // Mongoose will automatically add `createdAt` and `updatedAt` fields

const Post = mongoose.model("Post", postSchema);

module.exports = Post;