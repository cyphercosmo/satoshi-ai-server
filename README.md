# Satoshi AI Server

A lightweight API server for a Satoshi Nakamoto AI chatbot.

## Features

- RESTful API using Express.js
- Firebase authentication integration
- In-memory conversation storage
- Modular prompt template system
- Mock AI response system (ready for model integration)

## API Endpoints

- `POST /api/chat` - Process user messages and return AI responses
- `GET /api/conversations/:id` - Retrieve conversation history
- `DELETE /api/conversations/:id` - Delete a conversation

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase project (for authentication)

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/satoshi-ai-server.git
cd satoshi-ai-server
```

2. Install dependencies
```
npm install
```

3. Set up environment variables
Create a `.env` file in the root directory with the following variables:
```
PORT=3000
FIREBASE_PROJECT_ID=your-firebase-project-id
NODE_ENV=development
```

4. Start the server
```
npm run dev
```

## Usage

### Chat with Satoshi

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Authorization: Bearer YOUR_FIREBASE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"message": "What do you think about Bitcoin?"}'
```

### Get Conversation History

```bash
curl -X GET http://localhost:3000/api/conversations/CONVERSATION_ID \
  -H "Authorization: Bearer YOUR_FIREBASE_TOKEN"
```

### Delete a Conversation

```bash
curl -X DELETE http://localhost:3000/api/conversations/CONVERSATION_ID \
  -H "Authorization: Bearer YOUR_FIREBASE_TOKEN"
```

## Project Structure

```
src/
├── controllers/       # Request handlers
├── middlewares/       # Express middlewares
├── models/            # Data models
├── routes/            # API routes
├── services/          # Business logic
├── utils/             # Utility functions
└── index.js           # Entry point
```

## Customizing the Satoshi Persona

Edit the `SATOSHI_PERSONA` constant in `src/utils/prompt-template.js` to customize how Satoshi responds to queries.

## License

MIT 