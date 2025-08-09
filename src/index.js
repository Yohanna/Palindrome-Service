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

// Only start server if this file is run directly (not imported) to avoid tests not terminating
if (import.meta.url === `file://${process.argv[1]}`) {
  app.listen(PORT, () => {
    console.log(`Palindrome service listening on port ${PORT}`);
  });
}

// Reset function for testing
export function resetStorage() {
  messageService.reset();
}

export default app;