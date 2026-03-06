const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');

// Mock admin route to test protection
router.get('/stats', protect, admin, (req, res) => {
    res.json({
        message: "Admin access granted",
        stats: {
            totalUsers: 12450,
            activeVendors: 3205,
            escrowBalance: "₦45.2M"
        }
    });
});

module.exports = router;
