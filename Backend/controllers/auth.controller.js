const express = require("express");
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register User
exports.registerUser = async (req, res) => {
    try {
        let { name, email, password } = req.body;

        // Trim inputs
        name = name?.trim();
        email = email?.trim().toLowerCase();
        password = password?.trim();

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Please provide all required fields" });
        }

        // Name validation
        const nameRegex = /^[A-Za-z ]+$/;
        if (!nameRegex.test(name)) return res.status(400).json({ success: false, message: "Name must contain only alphabets" });
        if (name.length < 2) return res.status(400).json({ success: false, message: "Name must be at least 2 characters long" });

        // Email validation
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if (!emailRegex.test(email)) return res.status(400).json({ success: false, message: "Please enter a valid email address" });

        // Password validation
        if (password.length < 6 || password.length > 64) return res.status(400).json({ success: false, message: "Password must be between 6 and 64 characters long" });
        if (!/[A-Z]/.test(password)) return res.status(400).json({ success: false, message: "Password must contain at least one uppercase letter" });
        if (!/[0-9]/.test(password)) return res.status(400).json({ success: false, message: "Password must contain at least one number" });
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return res.status(400).json({ success: false, message: "Password must contain at least one special character" });

        // Check existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ success: false, message: "User already exists" });

        // Hash password and save user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        const { password: _, ...safeUser } = newUser._doc;
        res.status(201).json({ success: true, message: "User registered successfully", user: safeUser });

    } catch (error) {
        console.error("Error in user registration:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Login API
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).json({ message: "Please provide all required fields" });

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return res.status(400).json({ message: "Please enter a valid email address" });

        if (password.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters long" });
        if (!/[A-Z]/.test(password)) return res.status(400).json({ message: "Password must contain at least one uppercase letter" });
        if (!/[0-9]/.test(password)) return res.status(400).json({ message: "Password must contain at least one number" });
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return res.status(400).json({ message: "Password must contain at least one special character" });

        const user = await User.findOne({ email }).select("+password");
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials" });

        // Generate JWT token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        // Set cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        });

        const { password: _, ...safeUser } = user._doc;
        res.status(200).json({ message: "Login successful", user: safeUser, token });

    } catch (error) {
        console.error("Error in user login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Logout API
exports.logoutUser = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        });
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Error in user logout:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
