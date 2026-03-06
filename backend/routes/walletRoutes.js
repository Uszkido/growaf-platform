const express = require('express');
const router = express.Router();

// Mock Wallet Data
router.get('/balance', (req, res) => {
    res.json({
        balance: 450230.00,
        currency: "NGN",
        status: "Active",
        last_transaction: "Corn Sales"
    });
});

module.exports = router;
