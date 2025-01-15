// routes/categories.js
import express from 'express';
import db from '../server/table.js';

const router = express.Router();

// مسیر GET برای دریافت دسته‌بندی‌ها
router.get('/', (req, res) => {
  db.all("SELECT * FROM categories", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

export default router;
