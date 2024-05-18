const express = require("express");
const router = express.Router();
// Require controller modules.
const { Signup, Login, Logout } = require('../controllers/authController');

router.post('/signup', Signup);
router.get('/login', Login);
router.get('/logout', Logout);

module.exports = router;