const express = require('express');
const router = express.Router();
const conversationController = require('../controllers/conversation.controller');

/**
 * @route GET /api/conversations/:id
 * @desc Retrieve conversation history
 * @access Private
 */
router.get('/:id', conversationController.getConversation);

/**
 * @route DELETE /api/conversations/:id
 * @desc Delete a conversation
 * @access Private
 */
router.delete('/:id', conversationController.deleteConversation);

module.exports = router; 