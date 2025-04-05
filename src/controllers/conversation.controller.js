const ConversationModel = require('../models/conversation.model');

/**
 * Conversation Controller
 * Manages conversation history operations
 */
const conversationController = {
  /**
   * Get a conversation by ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  getConversation: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.uid;
      
      if (!id) {
        return res.status(400).json({
          status: 'error',
          message: 'Conversation ID is required'
        });
      }
      
      const conversation = ConversationModel.getConversation(id, userId);
      
      if (!conversation) {
        return res.status(404).json({
          status: 'error',
          message: 'Conversation not found or access denied'
        });
      }
      
      return res.status(200).json({
        status: 'success',
        data: { conversation }
      });
    } catch (error) {
      console.error('Conversation Controller Error:', error);
      
      return res.status(500).json({
        status: 'error',
        message: 'Failed to get conversation',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },
  
  /**
   * Delete a conversation by ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  deleteConversation: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.uid;
      
      if (!id) {
        return res.status(400).json({
          status: 'error',
          message: 'Conversation ID is required'
        });
      }
      
      const success = ConversationModel.deleteConversation(id, userId);
      
      if (!success) {
        return res.status(404).json({
          status: 'error',
          message: 'Conversation not found or access denied'
        });
      }
      
      return res.status(200).json({
        status: 'success',
        message: 'Conversation deleted successfully'
      });
    } catch (error) {
      console.error('Conversation Controller Error:', error);
      
      return res.status(500).json({
        status: 'error',
        message: 'Failed to delete conversation',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
};

module.exports = conversationController; 