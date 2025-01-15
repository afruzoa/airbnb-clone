import sqlite3 from 'sqlite3';
import express from 'express';
import ViteExpress from 'vite-express';

const app = express();
const port = 3000;

// Initialize the SQLite database
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Middleware for parsing JSON
app.use(express.json());

// Define the '/api/categories' route
app.get('/api/categories', (req, res) => {
  const query = 'SELECT * FROM categories';
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error fetching data:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(rows); // Send data as JSON
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
