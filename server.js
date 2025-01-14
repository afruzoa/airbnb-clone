import express from "express";
import ViteExpress from "vite-express";
import categoriesRoute from './routes/categories.js';
import db from './table.js'; 
const app = express();
app.use('/api', categoriesRoute);
app.get('/api/rooms', (req, res) => {
    const { categoryId } = req.query; // دریافت categoryId از query string
    if (!categoryId) {
      return res.status(400).send('Category ID is required');
    }
  
    db.all(`
      SELECT rooms.id, rooms.name, rooms.location, rooms.price_per_night, rooms.images
      FROM rooms
      JOIN category_room ON rooms.id = category_room.room_id
      WHERE category_room.category_id = ?
    `, [categoryId], (err, rows) => {
      if (err) {
        return res.status(500).send('Error fetching rooms');
      }
      res.json(rows);
    });
  });
  
app.get("/message", (_, res) => res.send("Hello from express!"));

ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));
