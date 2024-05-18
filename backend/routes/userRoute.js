const express = require("express");
const router = express.Router();

// Require controller modules.

router.get('/userRouter', (req,res) => {
    res.json({msg: "Welcome to the UserRouter"});
});

module.exports = router