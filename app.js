import express from "express";
import bodyParser from "body-parser";
import sqlite3 from 'sqlite3';
import db from './table.js'; 

const app = express();
const sqlite = sqlite3.verbose();
app.use(bodyParser.json());


app.post('/categories', (req, res) => {
    let sql = "INSERT INTO categories(name, icon_url) VALUES (?, ?)";
    try {
        const { name, icon_url } = req.body;
        db.run(sql, [name, icon_url], (err) => {
            if (err) return res.json({ status: 300, success: false, error: err });
            console.log("Successful input", name, icon_url);
            return res.json({
                status: 200,
                success: true,
                message: "Category added successfully",
            });
        });
    } catch (error) {
        return res.json({
            status: 400,
            success: false,
            message: "Error while adding category"
        });
    }
});

app.get("/categories", (req, res) => {
    let sql = "SELECT * FROM categories";
    const { field, type } = req.query;
    if (field && type) sql += ` WHERE ${field} LIKE '%${type}%'`;
    
    try {
        db.all(sql, [], (err, rows) => {
            if (err) return res.json({ status: 300, success: false, error: err });
            if (rows.length < 1) return res.json({ status: 300, success: false, error: "No match" });
            return res.json({ status: 200, data: rows, success: true });
        });
    } catch (error) {
        return res.json({
            status: 400,
            success: false,
            message: "Error fetching categories"
        });
    }
});

app.post('/rooms', (req, res) => {
    let sql = "INSERT INTO rooms(name, location, price_per_night, images) VALUES (?, ?, ?, ?)";
    try {
        const { name, location, price_per_night, images } = req.body;
        db.run(sql, [name, location, price_per_night, images], (err) => {
            if (err) return res.json({ status: 300, success: false, error: err });
            console.log("Room added successfully", name);
            return res.json({
                status: 200,
                success: true,
                message: "Room added successfully",
            });
        });
    } catch (error) {
        return res.json({
            status: 400,
            success: false,
            message: "Error while adding room"
        });
    }
});

app.get("/rooms", (req, res) => {
    const { categoryId } = req.query;  
    let sql = `
        SELECT rooms.* FROM rooms
        JOIN category_room ON rooms.id = category_room.room_id
        WHERE category_room.category_id = ?;
    `;
    try {
        db.all(sql, [categoryId], (err, rows) => {
            if (err) return res.json({ status: 500, success: false, error: err });
            if (rows.length < 1) return res.json({ status: 300, success: false, error: "No rooms found" });
            return res.json({ status: 200, data: rows, success: true });
        });
    } catch (error) {
        return res.json({
            status: 400,
            success: false,
            message: "Error fetching rooms"
        });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
