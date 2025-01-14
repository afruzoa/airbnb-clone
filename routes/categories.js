import express from 'express';
import db from '../table.js';  
const router = express.Router();


router.get('/categories', (req, res) => {
    const query = 'SELECT * FROM categories';

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error fetching categories:', err.message);
            res.status(500).json({ error: 'Database error' });
        } else {
            res.json(rows);
        }
    });
});

export default router;
