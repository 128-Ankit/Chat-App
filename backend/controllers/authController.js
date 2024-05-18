const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

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
            confirmPassword,
            gender,
            profilePic: gender === 'male' ? boyProfilePic : girlProfilePic
        });

        await newUser.save();

        res.status(200).json({
            success: true,
            _id: newUser._id,
            newUser: newUser.user,
            profilePic: newUser.profilePic,
            message: "User Created successfully!"
        })
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
    console.log("login");
    // Add your login logic here
    // e.g., verifying user credentials, generating JWT tokens, etc.
    res.send("Login endpoint hit");
}

// User Logout
const Logout = async (req, res) => {
    console.log("logout");
    // Add your logout logic here
    // e.g., invalidating user session, clearing cookies, etc.
    res.send("Logout endpoint hit");
}

module.exports = { Signup, Login, Logout };