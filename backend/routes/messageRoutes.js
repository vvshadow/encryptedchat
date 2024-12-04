const express = require('express');
const { sendMessage, getMessages } = require('../controllers/messageController');
const router = express.Router();

router.post('/send', sendMessage);
router.get('/:from/:to', getMessages);

module.exports = router;
