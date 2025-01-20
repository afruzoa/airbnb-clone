import sqlite3 from "sqlite3";
import db from "./server/table.js";
import { open } from "sqlite";

const categories = [
  {
    name: "Countryside",
    iconUrl:
      "https://a0.muscache.com/pictures/6ad4bd95-f086-437d-97e3-14d12155ddfe.jpg",
  },
  {
    name: "Icon",
    iconUrl:
      "https://a0.muscache.com/im/pictures/mediaverse/category_icon/original/3e5243c8-4d15-4c6b-97e3-7ba2bb7bb880.png",
  },
  {
    name: "Treehouses",
    iconUrl:
      "https://a0.muscache.com/pictures/4d4a4eba-c7e4-43eb-9ce2-95e1d200d10e.jpg",
  },
  {
    name: "Cabins",
    iconUrl:
      "https://a0.muscache.com/pictures/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg",
  },
  {
    name: "Amazing views",
    iconUrl:
      "https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg",
  },
  {
    name: "Farms",
    iconUrl:
      "https://a0.muscache.com/pictures/aaa02c2d-9f0d-4c41-878a-68c12ec6c6bd.jpg",
  },
  {
    name: "Ski in/out",
    iconUrl:
      "https://a0.muscache.com/pictures/757deeaa-c78f-488f-992b-d3b1ecc06fc9.jpg",
  },
  {
    name: "Beachfront",
    iconUrl:
      "https://a0.muscache.com/pictures/bcd1adc0-5cee-4d7a-85ec-f6730b0f8d0c.jpg",
  },
  {
    name: "Lakefront",
    iconUrl:
      "https://a0.muscache.com/pictures/677a041d-7264-4c45-bb72-52bff21eb6e8.jpg",
  },
  {
    name: "OMG!",
    iconUrl:
      "https://a0.muscache.com/pictures/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg",
  },
  {
    name: "Amazing pool",
    iconUrl:
      "https://a0.muscache.com/pictures/3fb523a0-b622-4368-8142-b5e03df7549b.jpg",
  },
  {
    name: "Castles",
    iconUrl:
      "https://a0.muscache.com/pictures/1b6a8b70-a3b6-48b5-88e1-2243d9172c06.jpg",
  },
  {
    name: "Tiny homes",
    iconUrl:
      "https://a0.muscache.com/pictures/3271df99-f071-4ecf-9128-eb2d2b1f50f0.jpg",
  },
  {
    name: "Off the grid",
    iconUrl:
      "https://a0.muscache.com/pictures/9a2ca4df-ee90-4063-b15d-0de7e4ce210a.jpg",
  },
  {
    name: "Trending",
    iconUrl:
      "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
  },
  {
    name: "Domes",
    iconUrl:
      "https://a0.muscache.com/pictures/89faf9ae-bbbc-4bc4-aecd-cc15bf36cbca.jpg",
  },
  {
    name: "Luxe",
    iconUrl:
      "https://a0.muscache.com/pictures/c8e2ed05-c666-47b6-99fc-4cb6edcde6b4.jpg",
  },
  {
    name: "Boats",
    iconUrl:
      "https://a0.muscache.com/pictures/687a8682-68b3-4f21-8d71-3c3aef6c1110.jpg",
  },
  {
    name: "Design",
    iconUrl:
      "https://a0.muscache.com/pictures/50861fca-582c-4bcc-89d3-857fb7ca6528.jpg",
  },
  {
    name: "play",
    iconUrl:
      "https://a0.muscache.com/pictures/f0c5ca0f-5aa0-4fe5-b38d-654264bacddf.jpg",
  },
  {
    name: "Caves",
    iconUrl:
      "https://a0.muscache.com/pictures/4221e293-4770-4ea8-a4fa-9972158d4004.jpg",
  },
  {
    name: "Rooms",
    iconUrl:
      "https://a0.muscache.com/pictures/7630c83f-96a8-4232-9a10-0398661e2e6f.jpg",
  },
  {
    name: "Yurts",
    iconUrl:
      "https://a0.muscache.com/pictures/4759a0a7-96a8-4dcd-9490-ed785af6df14.jpg",
  },
  {
    name: "Arctic",
    iconUrl:
      "https://a0.muscache.com/pictures/8b44f770-7156-4c7b-b4d3-d92549c8652f.jpg",
  },
  {
    name: "Camping",
    iconUrl:
      "https://a0.muscache.com/pictures/ca25c7f3-0d1f-432b-9efa-b9f5dc6d8770.jpg",
  },
  {
    name: "Trulli",
    iconUrl:
      "https://a0.muscache.com/pictures/33848f9e-8dd6-4777-b905-ed38342bacb9.jpg",
  },
];

const categoryStmt = db.prepare(
  `INSERT INTO categories (name, iconUrl) VALUES (?, ?)`
);
categories.forEach((category) => {
  categoryStmt.run(category.name, category.iconUrl);
});
categoryStmt.finalize();

// 3. Insert data into the "rooms" table
const rooms = [
  {
    name: "Ocean View Suite",
    location: "Miami Beach, FL",
    pricePerNight: 200,
    images: [
      "",
      "public/images/1-main.avif",
      "public/images/2-main.avif",
      "public/images/3-main.avif",
    ],
  },
  {
    name: "Mountain Cabin",
    location: "Aspen, CO",
    pricePerNight: 150,
    images: [
      "public/images/4-main.avif",
      "public/images/5-main.avif",
      "public/images/6-main.avif",
    ],
  },
  {
    name: "City Apartment",
    location: "New York, NY",
    pricePerNight: 300,
    images: ["public/images/7-main.avif"],
  },
  {
    name: "Lakefront Cottage",
    location: "Lake Tahoe, CA",
    pricePerNight: 180,
    images: ["public/images/8-main.jpg"],
  },
  {
    name: "Luxury Villa",
    location: "Beverly Hills, CA",
    pricePerNight: 500,
    images: ["public/images/9-main.webp", "public/images/10-main.avif"],
  },
  {
    name: "Desert Retreat",
    location: "Sedona, AZ",
    pricePerNight: 120,
    images: [
      "public/images/11-main.webp",
      "public/images/12-main.webp",
      "public/images/13-main.avif",
      "public/images/14-main.avif",
    ],
  },
  {
    name: "Beach Bungalow",
    location: "Honolulu, HI",
    pricePerNight: 250,
    images: ["public/images/15-main.avif", "public/images/16-main.avif"],
  },
  {
    name: "Ski Chalet",
    location: "Park City, UT",
    pricePerNight: 300,
    images: ["public/images/17-main.jpeg", "public/images/18-main.avif"],
  },
  {
    name: "Historic Inn",
    location: "Charleston, SC",
    pricePerNight: 140,
    images: ["public/images/19-main.webp", "public/images/20-main.avif"],
  },
  {
    name: "Countryside Cottage",
    location: "Napa Valley, CA",
    pricePerNight: 160,
    images: ["public/images/21main.avif", "public/images/23-main.avif"],
  },
  {
    name: "Modern Loft",
    location: "Seattle, WA",
    pricePerNight: 220,
    images: ["public/images/24-main.avif", "public/images/25-main.jpeg"],
  },
  {
    name: "Rustic Barn",
    location: "Lancaster, PA",
    pricePerNight: 100,
    images: ["public/images/26-main.avif", "public/images/1-main.avif"],
  },
  {
    name: "Ocean View Suite",
    location: "Miami Beach, FL",
    pricePerNight: 200,
    images: [
      "public/images/2-main.avif",
      "public/images/3-main.avif",
      "public/images/4-main.avif",
      "public/images/5-main.avif",
    ],
  },
  {
    name: "Mountain Cabin",
    location: "Aspen, CO",
    pricePerNight: 150,
    images: [
      "public/images/13-main.avif",
      "public/images/14-main.avif",
      "public/images/15-main.avif",
    ],
  },
  {
    name: "City Apartment",
    location: "New York, NY",
    pricePerNight: 300,
    images: ["public/images/1-main.avif"],
  },
  {
    name: "Lakefront Cottage",
    location: "Lake Tahoe, CA",
    pricePerNight: 180,
    images: ["public/images/1-main.avif"],
  },
  {
    name: "Luxury Villa",
    location: "Beverly Hills, CA",
    pricePerNight: 500,
    images: ["public/images/1-main.avif", "public/images/2-main.avif"],
  },
  {
    name: "Desert Retreat",
    location: "Sedona, AZ",
    pricePerNight: 120,
    images: [
      "public/images/1-main.avif",
      "public/images/2-main.avif",
      "public/images/3-main.avif",
      "public/images/4-main.avif",
    ],
  },
  {
    name: "Beach Bungalow",
    location: "Honolulu, HI",
    pricePerNight: 250,
    images: ["public/images/1-main.avif", "public/images/2-main.avif"],
  },
  {
    name: "Ski Chalet",
    location: "Park City, UT",
    pricePerNight: 300,
    images: ["public/images/1-main.avif", "public/images/1-main.avif"],
  },
  {
    name: "Historic Inn",
    location: "Charleston, SC",
    pricePerNight: 140,
    images: ["public/images/1-main.avif", "public/images/1-main.avif"],
  },
  {
    name: "Countryside Cottage",
    location: "Napa Valley, CA",
    pricePerNight: 160,
    images: ["public/images/23-main.avif", "public/images/24-main.avif"],
  },
  {
    name: "Modern Loft",
    location: "Seattle, WA",
    pricePerNight: 220,
    images: ["public/images/3-main.avif", "public/images/4-main.avif"],
  },
  {
    name: "Rustic Barn",
    location: "Lancaster, PA",
    pricePerNight: 100,
    images: ["public/images/1-main.avif", "public/images/2-main.avif"],
  },
];

const createCategoriesTable = async (db) => {
  const tableExists = await db.get(
    `SELECT name FROM sqlite_master WHERE type='table' AND name='categories';`
  );

  if (!tableExists) {
    await db.run(`
                    CREATE TABLE categories (
                      id INTEGER PRIMARY KEY AUTOINCREMENT,
                      name TEXT NOT NULL,
                      iconUrl TEXT
                    );
                  `);
    console.log("Categories table created.");
  }
};

// Create rooms table
const createRoomsTable = async (db) => {
  const tableExists = await db.get(
    `SELECT name FROM sqlite_master WHERE type='table' AND name='rooms';`
  );

  if (!tableExists) {
    await db.run(`
                    CREATE TABLE rooms (
                      id INTEGER PRIMARY KEY AUTOINCREMENT,
                      name TEXT NOT NULL,
                      location TEXT,
                      pricePerNight INTEGER NOT NULL,
                      images TEXT
                    );
                  `);
    console.log("Rooms table created.");
  }
};

// Create room_categories table (to assign rooms to categories)
const createRoomCategoriesTable = async (db) => {
  const tableExists = await db.get(
    `SELECT name FROM sqlite_master WHERE type='table' AND name='room_categories';`
  );

  if (!tableExists) {
    await db.run(`
                    CREATE TABLE room_categories (
                      room_id INTEGER,
                      category_id INTEGER,
                      FOREIGN KEY (room_id) REFERENCES rooms(id),
                      FOREIGN KEY (category_id) REFERENCES categories(id),
                      PRIMARY KEY (room_id, category_id)
                    );
                  `);
    console.log("Room categories table created.");
  }
};

// Open the database connection
const openDb = async () => {
  try {
    const db = await open({
      filename: "./database.db",
      driver: sqlite3.Database,
    });
    console.log("Connected to the database.");
    return db;
  } catch (err) {
    console.error("Failed to connect to the database:", err.message);
    process.exit(1);
  }
};

// Seed categories (insert or update)
const seedCategories = async (db) => {
  //   const categories = categories_;

  const tableExists = await db.get(
    `SELECT name FROM sqlite_master WHERE type='table' AND name='categories';`
  );

  if (!tableExists) {
    console.error(
      "Table 'categories' does not exist. Please create the table first."
    );
    return;
  }

  for (const category of categories) {
    const exists = await db.get(`SELECT id FROM categories WHERE name = ?`, [
      category.name,
    ]);
    if (exists) {
      await db.run(`UPDATE categories SET iconUrl = ? WHERE id = ?`, [
        category.iconUrl,
        exists.id,
      ]);
      console.log(`Category "${category.name}" updated.`);
    } else {
      await db.run(`INSERT INTO categories (name, iconUrl) VALUES (?, ?)`, [
        category.name,
        category.iconUrl,
      ]);
      console.log(`Category "${category.name}" added.`);
    }
  }
};

// Seed rooms (insert or update)
const seedRooms = async (db) => {
  //   const rooms = rooms_;
  for (const room of rooms) {
    const exists = await db.get(`SELECT id FROM rooms WHERE name = ?`, [
      room.name,
    ]);
    if (exists) {
      await db.run(
        `UPDATE rooms SET location = ?, pricePerNight = ?, images = ? WHERE id = ?`,
        [
          room.location,
          room.pricePerNight,
          JSON.stringify(room.images),
          exists.id,
        ]
      );
      console.log(`Room "${room.name}" updated.`);
    } else {
      await db.run(
        `INSERT INTO rooms (name, location, pricePerNight, images) VALUES (?, ?, ?, ?)`,
        [
          room.name,
          room.location,
          room.pricePerNight,
          JSON.stringify(room.images),
        ]
      );
      console.log(`Room "${room.name}" added.`);
    }
  }
};

// Seed room_categories (randomly assign rooms to categories)
const seedRoomCategories = async (db) => {
  const rooms = await db.all(`SELECT id FROM rooms`);
  const categories = await db.all(`SELECT id FROM categories`);

  if (rooms.length === 0 || categories.length === 0) {
    console.error(
      "Cannot assign room categories: Ensure both rooms and categories exist."
    );
    return;
  }

  for (const room of rooms) {
    // Remove existing assignments for the room
    await db.run(`DELETE FROM room_categories WHERE room_id = ?`, [room.id]);

    // Assign to a random category
    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)];
    await db.run(
      `INSERT INTO room_categories (room_id, category_id) VALUES (?, ?)`,
      [room.id, randomCategory.id]
    );
    console.log(`Room ${room.id} assigned to category ${randomCategory.id}.`);
  }
};

// Main function to run seeding
const main = async () => {
  const db = await openDb();

  try {
    await createCategoriesTable(db);
    await createRoomsTable(db);
    await createRoomCategoriesTable(db);

    await seedCategories(db);
    await seedRooms(db);
    await seedRoomCategories(db);
  } catch (err) {
    console.error("Error during seeding:", err.message);
  } finally {
    await db.close();
    console.log("Database connection closed.");
  }
};

main();
