const express = require("express");
const router = express.Router();
// Require controller modules.
const { Signup, Login, Logout } = require('../controllers/authController');

router.post('/signup', Signup);
router.post('/login', Login);
router.post('/logout', Logout);

module.exports = router;