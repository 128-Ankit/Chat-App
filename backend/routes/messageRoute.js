const express = require("express");
const router = express.Router();
// Require controller modules.
const { sendMessage, getMessage } = require("../controllers/messageController");
const {protectRoute} = require('../middleware/projectRoute');

router.post('/send/:id', protectRoute, sendMessage);
router.get('/:id', protectRoute, getMessage);

module.exports = router;