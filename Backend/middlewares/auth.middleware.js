const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

const userAuth = async(req, res , next) => {
    try {
        const cookies = req.cookies;
        const { token } = cookies;
        if(!token){
            return res.status(401).json({message: "Authentication token missing"});
        }
        const decodedObj = await jwt.verify(token, process.env.JWT_SECRET);
        const { _id} = decodedObj;

        const user = await User.findById(_id);

        if(!user){
            throw new Error("User not found");
        }
        req.user = user;

        next();

    } catch (error) {
        console.error("Authentication error:", error);
        res.status(401).json({ message: "Authentication failed" });
    }
    
}

module.exports = userAuth;