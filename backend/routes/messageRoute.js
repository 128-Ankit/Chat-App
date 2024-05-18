const express = require("express");
const router = express.Router();

// Require controller modules.

router.get('/msgRouter', (req,res) => {
    res.json({msg: "Welcome to the MessageRouter"});
});

module.exports = router