import sqlite3 from 'sqlite3';
const { Database } = sqlite3;

// ایجاد یا اتصال به پایگاه داده
const db = new Database('./database.db');

// ایجاد جداول دسته‌بندی‌ها (Categories)
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      iconUrl TEXT NOT NULL
    );
  `);

  // ایجاد جداول اتاق‌ها (Rooms)
  db.run(`
    CREATE TABLE IF NOT EXISTS rooms (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      pricePerNight REAL NOT NULL,
      location TEXT NOT NULL,
      images TEXT NOT NULL
    );
  `);

  // ایجاد جدول ارتباطی (Many-to-Many) بین دسته‌بندی‌ها و اتاق‌ها
  db.run(`
    CREATE TABLE IF NOT EXISTS category_room (
    categoryId INTEGER,
    roomId INTEGER,
    FOREIGN KEY(categoryId) REFERENCES categories(id),
    FOREIGN KEY(roomId) REFERENCES rooms(id)
    );
  `);
});

export default db;
