import * as cheerio from 'cheerio';
import fs from 'fs';
import sqlite3 from 'sqlite3';


// Path to your database
const db = new sqlite3.Database('./database.db');

// Reading the HTML file
fs.readFile('index.html', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  const $ = cheerio.load(data); // Load the data into cheerio

  // Extracting data for categories
  const categories = [];
  $('.icon-text').each((i, element) => {
    const name = $(element).text().trim(); // Extract name
    const iconUrl = $(element).find('.icon').attr('src').trim();
    if (iconUrl) {
        iconUrl = iconUrl.trim(); // Only trim if iconUrl is not undefined or null
    } // Extract icon URL
    categories.push({ name, icon_url: iconUrl });
  });

  // Inserting categories into the database
  categories.forEach(category => {
    db.run('INSERT INTO categories (name, icon_url) VALUES (?, ?)', 
      [category.name, category.icon_url], function(err) {
        if (err) {
          console.error('Error inserting category:', err.message);
        } else {
          console.log(`Category inserted with ID: ${this.lastID}`);
        }
    });
  });

  // Extracting data for rooms
  const rooms = [];
  $('h5').each((i, element) => {
    const name = $(element).text().trim(); // Extract room name
    const price = $(element).next('span').text().trim(); // Extract price
    const location = $(element).nextAll('p').first().text().trim(); // Extract location
    const images = $(element).parents('.room').find('img.pics').map((i, el) => $(el).attr('src')).get().join(','); // Extract images
    rooms.push({ name, location, price_per_night: price, images });
  });

  // Inserting rooms into the database
  rooms.forEach(room => {
    db.run('INSERT INTO rooms (name, location, price_per_night, images) VALUES (?, ?, ?, ?)', 
      [room.name, room.location, room.price_per_night, room.images], function(err) {
        if (err) {
          console.error('Error inserting room:', err.message);
        } else {
          console.log(`Room inserted with ID: ${this.lastID}`);
        }
    });
  });

  // Extracting data for room_categories (many-to-many relationship)
  const roomCategories = [];
  $('selector-for-room-category').each((i, element) => {
    const roomId = $(element).find('selector-for-room-id').text().trim();
    const categoryId = $(element).find('selector-for-category-id').text().trim();
    roomCategories.push({ room_id: roomId, category_id: categoryId });
  });

  // Inserting room-category relationships into the database
  roomCategories.forEach(rc => {
    db.run('INSERT INTO room_categories (room_id, category_id) VALUES (?, ?)', 
      [rc.room_id, rc.category_id], function(err) {
        if (err) {
          console.error('Error inserting room-category relationship:', err.message);
        } else {
          console.log('Room-category relationship inserted');
        }
    });
  });

  // Closing the database connection
  db.close();
});
