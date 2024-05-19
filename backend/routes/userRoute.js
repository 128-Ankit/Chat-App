const express = require("express");
const router = express.Router();
// Require controller modules.
const { getUsersForSidebar } = require("./../controllers/userController");
const {protectRoute} = require('../middleware/projectRoute');


router.get('/', protectRoute, getUsersForSidebar);

module.exports = router;