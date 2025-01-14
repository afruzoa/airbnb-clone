import * as cheerio from 'cheerio'; // استفاده درست از cheerio
import fs from 'fs';
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./database.sqlite');


// خواندن فایل HTML
const html = fs.readFileSync('./index.html', 'utf-8');
const $ = cheerio.load(html);

// استخراج دسته‌بندی‌ها از HTML
const categories = [];
$('.category-icon').each((index, element) => {
    const name = $(element).find('.icon-text').text();
    const icon_url = $(element).find('img').attr('src');
    categories.push({ name, icon_url });
});

// اضافه کردن دسته‌بندی‌ها به دیتابیس
db.serialize(() => {
    const stmt = db.prepare('INSERT INTO categories (name, icon_url) VALUES (?, ?)');
    categories.forEach(category => {
        stmt.run(category.name, category.icon_url);
    });
    stmt.finalize();
});

const rooms = [];
$('.pics').each((index, element) => {
    const name = $(element).find('h5').text(); // نام اتاق
    const location = $(element).find('p').text(); // مکان (اگر وجود دارد)
    const price_per_night = $(element).find('span').text().replace('Sold out', '').trim(); // قیمت (اگر وجود دارد)
    const images = $(element).find('img').attr('src'); // آدرس عکس

    rooms.push({ name, location, price_per_night, images });
});

// اضافه کردن اتاق‌ها به دیتابیس
db.serialize(() => {
    const stmt = db.prepare('INSERT INTO rooms (name, location, price_per_night, images) VALUES (?, ?, ?, ?)');
    rooms.forEach(room => {
        stmt.run(room.name, room.location, room.price_per_night, room.images);
    });
    stmt.finalize();
});

db.close();