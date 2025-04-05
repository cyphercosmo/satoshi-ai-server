const { v4: uuidv4 } = require('uuid');

// In-memory storage for conversations
const conversations = new Map();

/**
 * Conversation Model
 * Handles the storage and retrieval of conversation data
 */
class ConversationModel {
  /**
   * Create a new conversation
   * @param {string} userId - The user ID associated with the conversation
   * @returns {object} The created conversation
   */
  static createConversation(userId) {
    const id = uuidv4();
    const timestamp = new Date().toISOString();
    
    const conversation = {
      id,
      userId,
      messages: [],
      createdAt: timestamp,
      updatedAt: timestamp
    };
    
    conversations.set(id, conversation);
    return conversation;
  }
  
  /**
   * Add a message to a conversation
   * @param {string} conversationId - The ID of the conversation
   * @param {string} role - The role of the message sender (user/assistant)
   * @param {string} content - The content of the message
   * @returns {object|null} The updated conversation or null if not found
   */
  static addMessage(conversationId, role, content) {
    const conversation = conversations.get(conversationId);
    
    if (!conversation) {
      return null;
    }
    
    const timestamp = new Date().toISOString();
    const message = {
      id: uuidv4(),
      role,
      content,
      timestamp
    };
    
    conversation.messages.push(message);
    conversation.updatedAt = timestamp;
    
    conversations.set(conversationId, conversation);
    return conversation;
  }
  
  /**
   * Get a conversation by ID
   * @param {string} conversationId - The ID of the conversation
   * @param {string} userId - The user ID to validate ownership
   * @returns {object|null} The conversation or null if not found
   */
  static getConversation(conversationId, userId) {
    const conversation = conversations.get(conversationId);
    
    if (!conversation || conversation.userId !== userId) {
      return null;
    }
    
    return conversation;
  }
  
  /**
   * Delete a conversation
   * @param {string} conversationId - The ID of the conversation to delete
   * @param {string} userId - The user ID to validate ownership
   * @returns {boolean} Whether the deletion was successful
   */
  static deleteConversation(conversationId, userId) {
    const conversation = conversations.get(conversationId);
    
    if (!conversation || conversation.userId !== userId) {
      return false;
    }
    
    return conversations.delete(conversationId);
  }
  
  /**
   * Get all conversations for a user
   * @param {string} userId - The user ID to filter by
   * @returns {Array} Array of conversations belonging to the user
   */
  static getUserConversations(userId) {
    const userConversations = [];
    
    for (const conversation of conversations.values()) {
      if (conversation.userId === userId) {
        userConversations.push(conversation);
      }
    }
    
    return userConversations;
  }
}

module.exports = ConversationModel; 