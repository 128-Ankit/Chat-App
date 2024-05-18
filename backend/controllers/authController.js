const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const createAccessToken = require("../utils/generateToken");

// User SignUp
const Signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
        // Check if user already exists in the database
        const user = await User.findOne({ username });
        if (user) {
            return res.status(409).json({ message: 'User Already Exists' })
        }
        // Validate fields for password and confirmPass
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password does not match." });
        }

        //HASH PASSWORD
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullName,
            username,
            password: hashPassword,
            gender,
            profilePic: gender === 'male' ? boyProfilePic : girlProfilePic
        });

        if (newUser) {
            //Create JWT token here
            await newUser.save();
            const accessToken = createAccessToken(newUser._id, res);

            res.status(200).json({
                success: true,
                _id: newUser._id,
                newUser: newUser.user,
                profilePic: newUser.profilePic,
                message: "User Created successfully!",
                accessToken
            })
        }
        else {
            throw new Error("Creating user failed!");
        }
    } catch (error) {
        console.log("Error: ", error.message);
        res.status(500).json({
            success: false,
            message: "Server Error, User not Created! " + error
        })
    }
}

// User Login
const Login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isCurrectPassword = await bcrypt.compare(password, user?.password || "");
        if (!user || !isCurrectPassword) {
            return res.status(401).json({ success: false, msg: "Invalid Credentials" });
        }
        const accessToken = createAccessToken(user._id, res);
        res.status(200).json({
            success: true,
            _id: user.id,
            username: user.username,
            gender:user.gender,
            profilePic: user.profilePic,
            message:
                "Logged in Successfully! Welcome Back!",
            token: accessToken
        })
    } catch (error) {
        console.log("Error: ", error.message);
        res.status(500).json({
            success: false,
            message: "Server Error, User login failed! " + error
        })
    }
}

// User Logout
const Logout = async (req, res) => {
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({success:true,msg:"User logged out!"})
    } catch (error) {
        console.log("Error: ", error.message);
        res.status(500).json({
            success: false,
            message: "Server Error, User logout failed! " + error
        })
    }
}

module.exports = { Signup, Login, Logout };