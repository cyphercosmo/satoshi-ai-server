const ConversationModel = require('../models/conversation.model');
const AIService = require('../services/ai.service');

/**
 * Chat Controller
 * Handles processing messages and managing chat interactions
 */
const chatController = {
  /**
   * Process a user message and return AI response
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  processMessage: async (req, res) => {
    try {
      const { message, conversationId, tools = [] } = req.body;
      const userId = req.user.uid;
      
      if (!message || typeof message !== 'string') {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid message format. Message must be a string.'
        });
      }
      
      let conversation;
      
      // If there's no conversationId, create a new conversation
      if (!conversationId) {
        conversation = ConversationModel.createConversation(userId);
      } else {
        // Otherwise, get the existing conversation
        conversation = ConversationModel.getConversation(conversationId, userId);
        
        if (!conversation) {
          return res.status(404).json({
            status: 'error',
            message: 'Conversation not found or access denied'
          });
        }
      }
      
      // Add the user message to the conversation
      conversation = ConversationModel.addMessage(conversation.id, 'user', message);
      
      // Format the messages for the AI
      const formattedMessages = conversation.messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      // Generate AI response
      const aiResponse = await AIService.generateResponse(formattedMessages, tools);
      
      // Add the AI response to the conversation
      conversation = ConversationModel.addMessage(
        conversation.id,
        aiResponse.role,
        aiResponse.content,
        aiResponse.recommendations,
        aiResponse.token_cost
      );
      
      return res.status(200).json({
        status: 'success',
        data: {
          conversation: {
            id: conversation.id,
            messages: conversation.messages.slice(-2), // Return just the latest exchange
            updatedAt: conversation.updatedAt
          },
          recommendations: aiResponse.recommendations,
          token_cost: aiResponse.token_cost
        }
      });
    } catch (error) {
      console.error('Chat Controller Error:', error);
      
      return res.status(500).json({
        status: 'error',
        message: 'Failed to process message',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
};

module.exports = chatController; 