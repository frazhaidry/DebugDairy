const express = require("express");
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Register User
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Please enter a valid email address" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }
        if (!/[A-Z]/.test(password)) {
            return res.status(400).json({ message: "Password must contain at least one uppercase letter" });
        }
        if (!/[0-9]/.test(password)) {
            return res.status(400).json({ message: "Password must contain at least one number" });
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return res.status(400).json({ message: "Password must contain at least one special character" });
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        })

        await newUser.save();

        const { password: _, ...safeUser } = newUser._doc;
        res.status(201).json({ message: "User registered successfully", user: safeUser });

    } catch (error) {
        console.error("Error in user registration:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//Login API
exports.loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;
        console.log(email, password); // for Debugging

        if (!email || !password) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Please enter a valid email address" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }
        if (!/[A-Z]/.test(password)) {
            return res.status(400).json({ message: "Password must contain at least one uppercase letter" });
        }
        if (!/[0-9]/.test(password)) {
            return res.status(400).json({ message: "Password must contain at least one number" });
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return res.status(400).json({ message: "Password must contain at least one special character" });
        }

        const user = await User.findOne({ email }).select("+password");
        console.log(user); // for Debugging

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        console.log(isPasswordValid);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        console.log("Password is valid");// for Debugging
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        console.log(token);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        });

        console.log("successfully login"); // for Debugging
        const { password: _, ...safeUser } = user._doc;
        res.status(200).json({ message: "Login successful", user: safeUser });

    } catch (error) {
        console.error("Error in user Login:", error);
        res.status(500).json({ message: "Internal Server Error" });

    }
}

exports.logoutUser = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        });
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Error in user Logout:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

