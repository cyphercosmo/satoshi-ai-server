const express = require('express');
const router = express.Router();
const chatRoutes = require('./chat.routes');
const conversationRoutes = require('./conversation.routes');
const authMiddleware = require('../middlewares/auth.middleware');

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Protected routes
router.use('/chat', authMiddleware, chatRoutes);
router.use('/conversations', authMiddleware, conversationRoutes);

module.exports = router; 