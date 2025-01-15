import express from 'express';
import ViteExpress from 'vite-express';
import pkg from 'sqlite3'; // استفاده از import پیش‌فرض برای sqlite3
const { Database } = pkg;

import db from './server/table.js'; // اتصال به پایگاه داده
import categoriesRoute from './routes/categories.js'; // ایمپورت روت‌های دسته‌بندی
import roomsRoute from './routes/rooms.js';

const app = express();
const port = 3000;
app.use('/api/categories', categoriesRoute);
app.use('/api/rooms', roomsRoute);
app.get('/api/categories', (req, res) => {
  db.all("SELECT * FROM categories", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// مسیر GET برای دریافت اتاق‌ها بر اساس categoryId
app.get('/api/rooms/:categoryId', (req, res) => {
  const categoryId = req.params.categoryId;
  const query = `
    SELECT rooms.* FROM rooms
    JOIN category_room ON rooms.id = category_room.roomId
    WHERE category_room.categoryId = ?
  `;

  db.all(query, [categoryId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// راه‌اندازی Vite برای Front-end
ViteExpress.listen(app, port, () => console.log(`Server is running on http://localhost:${port}`));
