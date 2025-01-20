// routes/rooms.js
import express from "express";
import db from "../server/table.js";

const router = express.Router();

// مسیر GET برای دریافت اتاق‌ها بر اساس categoryId
router.get("/:categoryId", (req, res) => {
  console.log({ req });
  const categoryId = req.params.categoryId;
  console.log("test");
  const query = `SELECT * FROM rooms
INNER JOIN room_categories ON rooms.id = room_categories.room_id
WHERE room_categories.category_id = ?`;

  db.all(query, [categoryId], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    console.log(rows);

    res.json(rows);
  });
});

export default router;
