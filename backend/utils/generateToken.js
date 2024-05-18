const jwt = require("jsonwebtoken");
require("dotenv").config();

const createAccessToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h" // 1 hour
    });

    // save token in cookies
    res.cookie("jwt_token ", token, {
        maxAge:15*24*60*60*1000, //ms
        httpOnly: true, // prevent XSS attacks cross-site scripting attacks
        sameSite:"strict", // CSRF attacks cross-site request forgery attacks
        secure: false, // set it to true if using https
    })
}

module.exports = createAccessToken
