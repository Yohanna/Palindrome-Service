import express from 'express';
import messagesRouter, { messageService } from './routes/messages.js';
import healthRouter from './routes/health.js';

// Suppress console.log during tests
if (process.env.NODE_ENV === 'test') {
  console.log = () => {};
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Route handlers
app.use('/health', healthRouter);
app.use('/messages', messagesRouter);

app.listen(PORT, () => {
  console.log(`Palindrome service listening on port ${PORT}`);
});

// Reset function for testing
export function resetStorage() {
  messageService.reset();
}

export default app;