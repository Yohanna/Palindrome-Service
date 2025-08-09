import express from 'express';

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

app.listen(PORT, () => {
  console.log(`Palindrome service listening on port ${PORT}`);
});

export default app;