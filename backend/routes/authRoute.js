const express = require("express");
const router = express.Router();
// Require controller modules.
const { Signup, Login, Logout } = require('../controllers/authController');

router.get('/signup', Signup);
router.get('/login', Login);
router.get('/logout', Logout);

module.exports = router;