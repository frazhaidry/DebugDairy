const mongoose = require("mongoose");


function connectDB() {
    try {
        mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
    
}

module.exports = connectDB;