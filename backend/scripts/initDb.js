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

        // Expanded Categories
        const seedCategories = `
            INSERT INTO categories (name, icon) VALUES 
            ('Crops', '🌾'), 
            ('Livestock', '🐄'), 
            ('Machinery', '🚜'), 
            ('Seeds', '🌱'),
            ('Fertilizers', '🧪'),
            ('Poultry', '🐔'),
            ('Fish', '🐟'),
            ('Organic', '🥗')
            ON CONFLICT (name) DO NOTHING;
        `;
        await db.query(seedCategories);
        console.log('Seed categories expanded!');

        // Create a Mock Premium Vendor
        const seedVendor = `
            INSERT INTO users (name, email, password_hash, role, location) 
            VALUES ('Kido Farms Enterprise', 'vendor@kidofarms.com', 'mockhash', 'Farmer', 'Abuja, Nigeria')
            ON CONFLICT (email) DO NOTHING
            RETURNING id;
        `;
        const vendorResult = await db.query(seedVendor);

        let vendorId = null;
        if (vendorResult.rows.length > 0) {
            vendorId = vendorResult.rows[0].id;
        } else {
            // Fetch existing
            const existing = await db.query("SELECT id FROM users WHERE email='vendor@kidofarms.com'");
            if (existing.rows.length > 0) vendorId = existing.rows[0].id;
        }

        if (vendorId) {
            // Create a store for the vendor
            const seedStore = `
                INSERT INTO stores (user_id, name, description, verification_status)
                VALUES (${vendorId}, 'Kido Farms Enterprise Hub', 'Premium agricultural producer based in Abuja.', 'Verified')
                RETURNING id;
            `;
            const storeResult = await db.query(seedStore);
            let storeId = storeResult.rows[0]?.id;

            if (!storeId) {
                const existingStore = await db.query(`SELECT id FROM stores WHERE user_id=${vendorId}`);
                if (existingStore.rows.length > 0) storeId = existingStore.rows[0].id;
            }

            if (storeId) {
                // Inject Massive Catalog of Premium Products
                const seedProducts = `
                    INSERT INTO products (store_id, category_id, name, description, price, stock, images, rating) VALUES 
                    (
                        ${storeId}, 
                        (SELECT id FROM categories WHERE name='Seeds' LIMIT 1), 
                        'Premium Hybrid Maize Seeds', 
                        'High yield, drought-resistant hybrid maize seeds suitable for West African climates. Expected yield: 5 tons/ha.', 
                        15000, 
                        200, 
                        ARRAY['https://images.unsplash.com/photo-1590680187844-32386395b008?w=800'], 
                        4.8
                    ),
                    (
                        ${storeId}, 
                        (SELECT id FROM categories WHERE name='Machinery' LIMIT 1), 
                        'Solar Power Irrigation Pump', 
                        'Eco-friendly solar powered surface water pump. Can lift up to 20m. Comes with 2 solar panels and cables.', 
                        120000, 
                        15, 
                        ARRAY['https://images.unsplash.com/photo-1592982537447-6f2afba5aede?w=800'], 
                        4.9
                    ),
                    (
                        ${storeId}, 
                        (SELECT id FROM categories WHERE name='Fertilizers' LIMIT 1), 
                        'Organic NPK Rich Compost (50kg)', 
                        'Pure organic compost enriched with essential nutrients. Perfect for improving soil structures and crop yield organically.', 
                        8500, 
                        500, 
                        ARRAY['https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800'], 
                        4.6
                    ),
                    (
                        ${storeId}, 
                        (SELECT id FROM categories WHERE name='Crops' LIMIT 1), 
                        'Export-Grade Cassava Tubers', 
                        'Freshly harvested, large sized cassava tubers ready for processing into Garri or industrial starch.', 
                        25000, 
                        50, 
                        ARRAY['https://images.unsplash.com/photo-1518568740560-33314ebb50cb?w=800'], 
                        4.5
                    ),
                    (
                        ${storeId}, 
                        (SELECT id FROM categories WHERE name='Poultry' LIMIT 1), 
                        'Day-Old Broiler Chicks (Carton of 50)', 
                        'Healthy, vaccinated Agrited broiler day-old chicks. Fast growth rate with excellent feed conversion.', 
                        30000, 
                        100, 
                        ARRAY['https://images.unsplash.com/photo-1548677028-4b726c04fdfa?w=800'], 
                        4.7
                    )
                    ON CONFLICT DO NOTHING;
                `;
                await db.query(seedProducts);
                console.log('Expanded Catalog Seeded!');
            }
        }

        process.exit(0);
    } catch (err) {
        console.error('Error initializing database:', err);
        process.exit(1);
    }
};

initDatabase();
