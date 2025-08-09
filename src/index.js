import express from 'express';
import { isPalindrome } from './palindrome.js';

const app = express();
const PORT = process.env.PORT || 3000;

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

  const message = {
    id: Date.now(), // temporary ID
    content: content.trim(),
    isPalindrome: isPalindrome(content.trim()),
    createdAt: new Date().toISOString()
  };

  console.log(`Created message:`, message);
  res.status(201).json(message);
});

// GET /messages - List all messages
app.get('/messages', (req, res) => {
  console.log(`GET /messages received`);
  
  const messages = []; // temporary empty array
  console.log(`Returning messages:`, messages);
  res.status(200).json(messages);
});

// GET /messages/:id - Get specific message
app.get('/messages/:id', (req, res) => {
  console.log(`GET /messages/${req.params.id} received`);
  
  const { id } = req.params;
  console.log(`Looking for message with id: ${id}`);
  
  // For now, return 404 since we're not storing data
  res.status(404).json({ error: 'Message not found' });
});

// PUT /messages/:id - Update message
app.put('/messages/:id', (req, res) => {
  console.log(`PUT /messages/${req.params.id} received, body:`, req.body);
  
  const { id } = req.params;
  const { content } = req.body;
  
  if (!content || typeof content !== 'string') {
    return res.status(400).json({ error: 'Message content must be a non-empty string' });
  }

  console.log(`Would update message ${id} with content: ${content}`);
  
  // For now, return 404 since we're not storing data
  res.status(404).json({ error: 'Message not found' });
});

// DELETE /messages/:id - Delete message
app.delete('/messages/:id', (req, res) => {
  console.log(`DELETE /messages/${req.params.id} received`);
  
  const { id } = req.params;
  console.log(`Would delete message with id: ${id}`);
  
  // For now, return 404 since we're not storing data
  res.status(404).json({ error: 'Message not found' });
});

// Only start server if this file is run directly (not imported) to avoid tests not terminating
if (import.meta.url === `file://${process.argv[1]}`) {
  app.listen(PORT, () => {
    console.log(`Palindrome service listening on port ${PORT}`);
  });
}

export default app;