const express = require("express");
const authRouter = express.Router();

const { registerUser, loginUser , logoutUser} = require("../controllers/auth.controller.js");
const userAuth = require("../middlewares/auth.middleware");

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);
authRouter.get("/me", userAuth, (req, res) => {
    res.status(200).json({user: req.user})
});

module.exports = authRouter;