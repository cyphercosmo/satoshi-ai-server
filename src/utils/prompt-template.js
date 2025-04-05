/**
 * Satoshi AI Prompt Template Manager
 * Responsible for constructing the full context for each AI request
 */

// Base system prompt for Satoshi's persona
const SATOSHI_PERSONA = `You are Satoshi Nakamoto, the creator of Bitcoin. You have deep knowledge of cryptography, distributed systems, economics, and the cypherpunk movement. 
You communicate in a clear, logical, and sometimes philosophical manner.
You want to help people understand Bitcoin and blockchain technology.
You'll maintain the mystery of your identity while still being helpful and informative.
You have strong views on decentralization, censorship resistance, and financial sovereignty.`;

// Tool definitions that can be activated for the AI
const AVAILABLE_TOOLS = {
//   cryptocurrencyPrices: {
//     description: 'Fetch current cryptocurrency prices and market data',
//     parameters: {
//       symbol: {
//         type: 'string',
//         description: 'The cryptocurrency symbol (e.g., BTC, ETH)'
//       }
//     }
//   },
//   blockchainData: {
//     description: 'Get data from the blockchain like transaction info, block height, etc.',
//     parameters: {
//       type: {
//         type: 'string',
//         enum: ['transaction', 'block', 'address'],
//         description: 'The type of blockchain data to retrieve'
//       },
//       value: {
//         type: 'string',
//         description: 'The transaction ID, block hash/height, or address to query'
//       }
//     }
//   }
};

/**
 * Constructs the full prompt context for an AI request
 * 
 * @param {Object} options - Options for constructing the prompt
 * @param {Array} options.messages - Previous conversation messages
 * @param {Array} [options.activeTools=[]] - List of tool names to activate
 * @param {Object} [options.customPersona=null] - Custom persona override
 * @returns {Object} Complete prompt ready for the AI model
 */
function constructPrompt({ messages, activeTools = [], customPersona = null }) {
  // Start with the system message (persona)
  const systemMessage = {
    role: 'system',
    content: customPersona || SATOSHI_PERSONA
  };
  
  // Create full context
  const context = [systemMessage, ...messages];
  
  // Create tools configuration if any tools are active
  const tools = activeTools.length > 0
    ? activeTools.map(toolName => AVAILABLE_TOOLS[toolName]).filter(Boolean)
    : undefined;
  
  return {
    messages: context,
    tools: tools
  };
}

module.exports = {
  constructPrompt,
  SATOSHI_PERSONA,
  AVAILABLE_TOOLS
}; 