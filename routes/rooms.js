// routes/rooms.js
import express from 'express';
import db from '../server/table.js';

const router = express.Router();

// مسیر GET برای دریافت اتاق‌ها بر اساس categoryId
router.get('/:categoryId', (req, res) => {
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

export default router;
