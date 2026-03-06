const db = require('../config/db');

// @desc    Get all products from DB
// @route   GET /api/products
const getProducts = async (req, res) => {
    try {
        const result = await db.query(`
            SELECT p.*, s.name as store_name, c.name as category_name 
            FROM products p
            LEFT JOIN stores s ON p.store_id = s.id
            LEFT JOIN categories c ON p.category_id = c.id
            ORDER BY p.created_at DESC
        `);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a new product (Protected)
// @route   POST /api/products
const createProduct = async (req, res) => {
    const { name, description, price, stock, category_id, images } = req.body;

    try {
        // Find store for the user
        const storeResult = await db.query('SELECT id FROM stores WHERE user_id = $1', [req.user_id]);
        let store_id;

        if (storeResult.rows.length === 0) {
            // Auto-create store if not exists (for demo simplicity)
            const newStore = await db.query('INSERT INTO stores (user_id, name) VALUES ($1, $2) RETURNING id', [req.user_id, 'My Sample Store']);
            store_id = newStore.rows[0].id;
        } else {
            store_id = storeResult.rows[0].id;
        }

        const newProduct = await db.query(
            'INSERT INTO products (store_id, category_id, name, description, price, stock, images) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [store_id, category_id, name, description, price, stock, images || []]
        );

        res.status(201).json(newProduct.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getProducts, createProduct };
