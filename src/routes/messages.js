import express from 'express';
import { MessageService } from '../services/messageService.js';

const router = express.Router();
const messageService = new MessageService();

// POST /messages - Create message
router.post('/', (req, res) => {
  console.log(`POST /messages received:`, req.body);
  
  const { content } = req.body;
  
  if (!content || typeof content !== 'string') {
    return res.status(400).json({ error: 'Message content must be a non-empty string' });
  }

  const trimmedContent = content.trim();
  const message = messageService.create(trimmedContent);

  console.log(`Created message:`, message);
  res.status(201).json(message);
});

// GET /messages - List all messages
router.get('/', (req, res) => {
  console.log(`GET /messages received`);
  
  const messages = messageService.getAll();
  console.log(`Returning messages:`, messages);
  res.status(200).json(messages);
});

// GET /messages/:id - Get specific message
router.get('/:id', (req, res) => {
  console.log(`GET /messages/${req.params.id} received`);
  
  const { id } = req.params;
  console.log(`Looking for message with id: ${id}`);
  
  const message = messageService.getById(id);
  
  if (!message) {
    return res.status(404).json({ error: 'Message not found' });
  }
  
  console.log(`Found message:`, message);
  res.status(200).json(message);
});

// PUT /messages/:id - Update message
router.put('/:id', (req, res) => {
  console.log(`PUT /messages/${req.params.id} received, body:`, req.body);
  
  const { id } = req.params;
  const { content } = req.body;
  
  if (!content || typeof content !== 'string') {
    return res.status(400).json({ error: 'Message content must be a non-empty string' });
  }

  const trimmedContent = content.trim();
  const message = messageService.update(id, trimmedContent);
  
  if (!message) {
    return res.status(404).json({ error: 'Message not found' });
  }

  console.log(`Updated message:`, message);
  res.status(200).json(message);
});

// DELETE /messages/:id - Delete message
router.delete('/:id', (req, res) => {
  console.log(`DELETE /messages/${req.params.id} received`);
  
  const { id } = req.params;
  console.log(`Looking for message with id: ${id}`);
  
  const deletedMessage = messageService.delete(id);
  
  if (!deletedMessage) {
    return res.status(404).json({ error: 'Message not found' });
  }

  console.log(`Deleted message:`, deletedMessage);
  res.status(200).json(deletedMessage);
});

// Export both the router and the service instance for testing
export { router as messagesRouter, messageService };
export default router;