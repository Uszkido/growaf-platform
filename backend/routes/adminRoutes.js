const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const pool = require('../config/db');

// Platform Statistics
router.get('/stats', protect, admin, async (req, res) => {
    try {
        const usersCount = await pool.query('SELECT COUNT(*) FROM users');
        res.json({
            message: "Admin access granted",
            stats: {
                totalUsers: parseInt(usersCount.rows[0].count),
                activeVendors: 3205, // Mock
                escrowBalance: "₦45.2M"
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all users
router.get('/users', protect, admin, async (req, res) => {
    try {
        const result = await pool.query('SELECT id, name, email, role, location, created_at FROM users ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Suspend user (mocked success)
router.post('/users/:id/suspend', protect, admin, async (req, res) => {
    res.json({ message: `User ${req.params.id} has been suspended.` });
});

module.exports = router;
