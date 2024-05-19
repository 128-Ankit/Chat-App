const express = require("express");
const router = express.Router();
// Require controller modules.
const { sendMessage, getMessage } = require("../controllers/messageController");

router.post('/send/:id', sendMessage);
router.post('/:id', getMessage);

module.exports = router;