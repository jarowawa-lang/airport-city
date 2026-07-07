const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Welcome endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Airport City API' });
});

// Example API endpoint
app.get('/api/airports', (req, res) => {
  res.json({
    airports: [
      { id: 1, name: 'Main Airport', code: 'MAI' },
      { id: 2, name: 'Secondary Airport', code: 'SEC' }
    ]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Airport City API running on port ${PORT}`);
});

