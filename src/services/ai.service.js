const { constructPrompt } = require('../utils/prompt-template');

/**
 * Mock responses for Satoshi AI
 * These will be used until the fine-tuned model is ready
 */
const MOCK_RESPONSES = [
  "The nature of Bitcoin is such that once version 0.1 was released, the core design was set in stone for the rest of its lifetime.",
  "The root problem with conventional currency is all the trust that's required to make it work.",
  "Bitcoin is an implementation of Wei Dai's b-money proposal and Nick Szabo's Bitgold proposal.",
  "The price of any commodity tends to gravitate toward the production cost. If the price is below cost, then production slows down. If the price is above cost, profit can be made by generating and selling more.",
  "I've been working on a new electronic cash system that's fully peer-to-peer, with no trusted third party.",
  "The central bank must be trusted not to debase the currency, but the history of fiat currencies is full of breaches of that trust.",
  "Lost coins only make everyone else's coins worth slightly more. Think of it as a donation to everyone.",
  "Writing a description for this thing for general audiences is bloody hard. There's nothing to relate it to."
];

/**
 * AI Service
 * Handles communication with the AI model (or mock responses for now)
 */
class AIService {
  /**
   * Generate a response from the AI model
   * @param {Array} messages - Array of conversation messages
   * @param {Array} [activeTools=[]] - List of tool names to activate
   * @returns {Promise<Object>} The AI's response
   */
  static async generateResponse(messages, activeTools = []) {
    try {
      // Construct prompt using the template
      const prompt = constructPrompt({ messages, activeTools });
      
      // Check if this is a tool-using scenario
      if (activeTools.length > 0) {
        return this.handleToolBasedResponse(prompt);
      }
      
      // In a real implementation, this would call the actual AI model
      // For now, return a mock response
      return this.getMockResponse();
    } catch (error) {
      console.error('AI Service Error:', error);
      throw new Error('Failed to generate AI response');
    }
  }
  
  /**
   * Handle tool-based responses 
   * This is a placeholder for the actual implementation
   * @param {Object} prompt - Formatted prompt for the AI
   * @returns {Promise<Object>} The AI's response using tools
   */
  static async handleToolBasedResponse(prompt) {
    // In the real implementation, this would:
    // 1. Send the prompt to the AI model
    // 2. Parse the tool calls from the response
    // 3. Execute the tool functions
    // 4. Send the results back to the AI for final response
    
    // For now, just return a mock response mentioning tools
    return {
      role: 'assistant',
      content: "I'd like to help you with that request using tools, but I'm currently in development mode. Soon I'll be able to access real-time blockchain data and other information for you."
    };
  }
  
  /**
   * Get a random mock response
   * @returns {Object} A mock response object
   */
  static getMockResponse() {
    const randomIndex = Math.floor(Math.random() * MOCK_RESPONSES.length);
    return {
      role: 'assistant',
      content: MOCK_RESPONSES[randomIndex]
    };
  }
}

module.exports = AIService; 