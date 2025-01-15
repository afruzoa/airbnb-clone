import sqlite3 from "sqlite3";
import db from "./server/table.js";
const seedData = () => {
    db.serialize(() => {
        // 1. Clear existing data from all tables
        db.run(`DELETE FROM category_room`);
        db.run(`DELETE FROM categories`);
        db.run(`DELETE FROM rooms`);

        // 2. Insert data into the "categories" table
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
            { name: "Cabins", iconUrl: "https://a0.muscache.com/pictures/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg" },
            { name: "Amazing views", iconUrl: "https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg" },
            { name: "Farms", iconUrl: "https://a0.muscache.com/pictures/aaa02c2d-9f0d-4c41-878a-68c12ec6c6bd.jpg" },
            { name: "Ski in/out", iconUrl: "https://a0.muscache.com/pictures/757deeaa-c78f-488f-992b-d3b1ecc06fc9.jpg" },
            { name: "Beachfront", iconUrl: "https://a0.muscache.com/pictures/bcd1adc0-5cee-4d7a-85ec-f6730b0f8d0c.jpg" },
            { name: "Lakefront", iconUrl: "https://a0.muscache.com/pictures/677a041d-7264-4c45-bb72-52bff21eb6e8.jpg" },
            { name: "OMG!", iconUrl: "https://a0.muscache.com/pictures/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg" },
            { name: "Amazing pool", iconUrl: "https://a0.muscache.com/pictures/3fb523a0-b622-4368-8142-b5e03df7549b.jpg" },
            { name: "Castles", iconUrl: "https://a0.muscache.com/pictures/1b6a8b70-a3b6-48b5-88e1-2243d9172c06.jpg" },
            { name: "Tiny homes", iconUrl: "https://a0.muscache.com/pictures/3271df99-f071-4ecf-9128-eb2d2b1f50f0.jpg" },
            { name: "Off the grid", iconUrl: "https://a0.muscache.com/pictures/9a2ca4df-ee90-4063-b15d-0de7e4ce210a.jpg" },
            { name: "Trending", iconUrl: "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg" },
            { name: "Domes", iconUrl: "https://a0.muscache.com/pictures/89faf9ae-bbbc-4bc4-aecd-cc15bf36cbca.jpg" },
            { name: "Luxe", iconUrl: "https://a0.muscache.com/pictures/c8e2ed05-c666-47b6-99fc-4cb6edcde6b4.jpg" },
            { name: "Boats", iconUrl: "https://a0.muscache.com/pictures/687a8682-68b3-4f21-8d71-3c3aef6c1110.jpg" },
            { name: "Design", iconUrl: "https://a0.muscache.com/pictures/50861fca-582c-4bcc-89d3-857fb7ca6528.jpg" },
            { name: "play", iconUrl: "https://a0.muscache.com/pictures/f0c5ca0f-5aa0-4fe5-b38d-654264bacddf.jpg" },
            { name: "Caves", iconUrl: "https://a0.muscache.com/pictures/4221e293-4770-4ea8-a4fa-9972158d4004.jpg" },
            { name: "Rooms", iconUrl: "https://a0.muscache.com/pictures/7630c83f-96a8-4232-9a10-0398661e2e6f.jpg" },
            { name: "Yurts", iconUrl: "https://a0.muscache.com/pictures/4759a0a7-96a8-4dcd-9490-ed785af6df14.jpg" },
            { name: "Arctic", iconUrl: "https://a0.muscache.com/pictures/8b44f770-7156-4c7b-b4d3-d92549c8652f.jpg" },
            { name: "Camping", iconUrl: "https://a0.muscache.com/pictures/ca25c7f3-0d1f-432b-9efa-b9f5dc6d8770.jpg" },
            { name: "Trulli", iconUrl: "https://a0.muscache.com/pictures/33848f9e-8dd6-4777-b905-ed38342bacb9.jpg" },
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
                name: "Deluxe Suite",
                pricePerNight: 250.0,
                location: "New York",
                images: JSON.stringify([
                    "https://example.com/deluxe1.png",
                    "https://example.com/deluxe2.png",
                ]), // Convert array to JSON string
            },
            {
                name: "Family Room",
                pricePerNight: 150.0,
                location: "Los Angeles",
                images: JSON.stringify([
                    "https://example.com/family1.png",
                    "https://example.com/family2.png",
                ]),
            },
            {
                name: "Economy Room",
                pricePerNight: 75.0,
                location: "San Francisco",
                images: JSON.stringify([
                    "https://example.com/economy1.png",
                    "https://example.com/economy2.png",
                ]),
            },
        ];

        const roomStmt = db.prepare(
            `INSERT INTO rooms (name, pricePerNight, location, images) VALUES (?, ?, ?, ?)`
        );
        rooms.forEach((room) => {
            roomStmt.run(room.name, room.pricePerNight, room.location, room.images);
        });
        roomStmt.finalize();

        // 4. Insert data into the "category_room" (many-to-many relationship) table
        const categoryRoomMappings = [
            { categoryId: 1, roomId: 1 }, // Luxury -> Deluxe Suite
            { categoryId: 2, roomId: 2 }, // Family -> Family Room
            { categoryId: 3, roomId: 3 }, // Budget -> Economy Room
            { categoryId: 2, roomId: 1 }, // Family -> Deluxe Suite
        ];

        const categoryRoomStmt = db.prepare(
            `INSERT INTO category_room (categoryId, roomId) VALUES (?, ?)`
        );
        categoryRoomMappings.forEach((mapping) => {
            categoryRoomStmt.run(mapping.categoryId, mapping.roomId);
        });
        categoryRoomStmt.finalize();

        console.log("✅ Data seeding completed successfully.");
    });

    // Close the database connection after seeding
    db.close((err) => {
        if (err) {
            console.error("Error closing the database:", err.message);
        } else {
            console.log("✅ Database connection closed.");
        }
    });
};

// Run the seeding function
seedData();
