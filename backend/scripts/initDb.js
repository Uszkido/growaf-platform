const db = require('../config/db');
const fs = require('fs');
const path = require('path');

const initDatabase = async () => {
    try {
        console.log('Reading schema.sql...');
        const schemaPath = path.join(__dirname, '../models/schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');

        console.log('Executing schema...');
        await db.query(schema);
        console.log('Database tables initialized successfully!');

        // Optional: Add seed categories
        const seedCategories = `
            INSERT INTO categories (name, icon) VALUES 
            ('Crops', '🌾'), 
            ('Livestock', '🐄'), 
            ('Machinery', '🚜'), 
            ('Seeds', '🌱')
            ON CONFLICT (name) DO NOTHING;
        `;
        await db.query(seedCategories);
        console.log('Seed categories added!');

        process.exit(0);
    } catch (err) {
        console.error('Error initializing database:', err);
        process.exit(1);
    }
};

initDatabase();
