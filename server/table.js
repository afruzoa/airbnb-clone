import sqlite3 from 'sqlite3';
const { Database } = sqlite3;

// Create or connect to the database
const db = new Database('./database.db', (err) => {
  if (err) {
    console.error('Failed to connect to database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Table creation logic
const createTables = () => {
  // Categories table
  db.run(
    `CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      icon_url TEXT NOT NULL
    );`
  );

  // Rooms table
  db.run(
    `CREATE TABLE IF NOT EXISTS rooms (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price_per_night REAL NOT NULL,
      location TEXT NOT NULL,
      images TEXT NOT NULL
    );`
  );

  // Many-to-Many relationship table
  db.run(
    `CREATE TABLE IF NOT EXISTS category_room (
      category_id INTEGER,
      room_id INTEGER,
      FOREIGN KEY(category_id) REFERENCES categories(id),
      FOREIGN KEY(room_id) REFERENCES rooms(id)
    );`
  );
};

// Initialize tables
db.serialize(createTables);

export default db;
