import sqlite3 from 'sqlite3';

const sqlite = sqlite3.verbose();
const db = new sqlite.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    } else {
        console.log('Successfully connected to the database.');
    }
});
db.run(`
    CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        icon_url TEXT NOT NULL
    )
`, (err) => {
    if (err) {
        console.error('Error creating the categories table:', err.message);
    } else {
        console.log('The categories table has been successfully created.');
    }
});

db.run(`
    CREATE TABLE IF NOT EXISTS rooms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    price_per_night REAL NOT NULL,
    images TEXT NOT NULL
    )
`, (err) => {
    if (err) {
    console.log('Error creating rooms table:', err.message);
    } else {
    console.log('Rooms table created successfully');
    }
});

db.run(`
    CREATE TABLE IF NOT EXISTS category_room (
    category_id INTEGER,
    room_id INTEGER,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (room_id) REFERENCES rooms(id)
    )
`, (err) => {
    if (err) {
    console.log('Error creating category_room table:', err.message);
    } else {
    console.log('Category-Room relation table created successfully');
    }
});

const categories = [
{ name: 'Luxury', icon_url: 'http://example.com/luxury_icon.png' },
{ name: 'Budget', icon_url: 'http://example.com/budget_icon.png' },
];

categories.forEach(category => {
db.run('INSERT INTO categories (name, icon_url) VALUES (?, ?)', [category.name, category.icon_url], (err) => {
    if (err) {
    console.error('Error inserting category:', err.message);
    } else {
    console.log(`Category "${category.name}" added successfully`);
    }
});
});

export default db;
