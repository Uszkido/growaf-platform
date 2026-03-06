const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc    Register a new user
// @route   POST /api/users/register
const registerUser = async (req, res) => {
    const { name, email, password, role, location } = req.body;

    try {
        // Check if user exists
        const userExists = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert user
        const newUser = await db.query(
            'INSERT INTO users (name, email, password_hash, role, location) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, role',
            [name, email, hashedPassword, role || 'Buyer', location]
        );

        // Create Wallet for new user
        await db.query('INSERT INTO wallets (user_id) VALUES ($1)', [newUser.rows[0].id]);

        // Generate JWT
        const token = jwt.sign({ id: newUser.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.status(201).json({
            user: newUser.rows[0],
            token
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Login user
// @route   POST /api/users/login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userResult = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = userResult.rows[0];

        if (user && (await bcrypt.compare(password, user.password_hash))) {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' });
            res.json({
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
                token
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { registerUser, loginUser };
