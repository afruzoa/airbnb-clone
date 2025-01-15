import express from 'express';
import db from './server/table.js';
import categoriesRoute from './routes/categories.js';
import roomsRoute from './routes/rooms.js';

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/categories', categoriesRoute);
app.use('/api/rooms', roomsRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
