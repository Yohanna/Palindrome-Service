import express from 'express';
import { isPalindrome } from './palindrome.js';

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory storage
let messages = [];
let nextId = 1;

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'palindrome-service'
  });
});

// POST /messages - Create message
app.post('/messages', (req, res) => {
  console.log(`POST /messages received:`, req.body);
  
  const { content } = req.body;
  
  if (!content || typeof content !== 'string') {
    return res.status(400).json({ error: 'Message content must be a non-empty string' });
  }

  const trimmedContent = content.trim();
  const message = {
    id: nextId++,
    content: trimmedContent,
    isPalindrome: isPalindrome(trimmedContent),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  messages.push(message);
  console.log(`Created message:`, message);
  res.status(201).json(message);
});

// GET /messages - List all messages
app.get('/messages', (req, res) => {
  console.log(`GET /messages received`);
  
  console.log(`Returning messages:`, messages);
  res.status(200).json(messages);
});

// GET /messages/:id - Get specific message
app.get('/messages/:id', (req, res) => {
  console.log(`GET /messages/${req.params.id} received`);
  
  const { id } = req.params;
  console.log(`Looking for message with id: ${id}`);
  
  const message = messages.find(msg => msg.id == id);
  
  if (!message) {
    return res.status(404).json({ error: 'Message not found' });
  }
  
  console.log(`Found message:`, message);
  res.status(200).json(message);
});

// PUT /messages/:id - Update message
app.put('/messages/:id', (req, res) => {
  console.log(`PUT /messages/${req.params.id} received, body:`, req.body);
  
  const { id } = req.params;
  const { content } = req.body;
  
  if (!content || typeof content !== 'string') {
    return res.status(400).json({ error: 'Message content must be a non-empty string' });
  }

  const message = messages.find(msg => msg.id == id);
  
  if (!message) {
    return res.status(404).json({ error: 'Message not found' });
  }

  const trimmedContent = content.trim();
  message.content = trimmedContent;
  message.isPalindrome = isPalindrome(trimmedContent);
  message.updatedAt = new Date().toISOString();

  console.log(`Updated message:`, message);
  res.status(200).json(message);
});

// DELETE /messages/:id - Delete message
app.delete('/messages/:id', (req, res) => {
  console.log(`DELETE /messages/${req.params.id} received`);
  
  const { id } = req.params;
  console.log(`Looking for message with id: ${id}`);
  
  const messageIndex = messages.findIndex(msg => msg.id == id);
  
  if (messageIndex === -1) {
    return res.status(404).json({ error: 'Message not found' });
  }

  const deletedMessage = messages.splice(messageIndex, 1)[0];
  console.log(`Deleted message:`, deletedMessage);
  res.status(200).json(deletedMessage);
});

// Only start server if this file is run directly (not imported) to avoid tests not terminating
if (import.meta.url === `file://${process.argv[1]}`) {
  app.listen(PORT, () => {
    console.log(`Palindrome service listening on port ${PORT}`);
  });
}

// Reset function for testing
export function resetStorage() {
  messages = [];
  nextId = 1;
}

export default app;