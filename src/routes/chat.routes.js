const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat.controller');

/**
 * @route POST /api/chat
 * @desc Process user messages and return AI responses
 * @access Private
 */
router.post('/', chatController.processMessage);

module.exports = router; 