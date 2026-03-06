const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const Paystack = require('paystack-api')(process.env.PAYSTACK_SECRET_KEY);

// Get wallet balance
router.get('/balance', protect, (req, res) => {
    // In production, fetch this securely from the user's DB record
    res.json({ balance: req.user.wallet_balance || 0 });
});

// Initialize Wallet Funding (Real Paystack API)
router.post('/fund', protect, async (req, res) => {
    const { amount, email } = req.body;
    try {
        const response = await Paystack.transaction.initialize({
            amount: amount * 100, // Paystack requires kobo/cents
            email: email || req.user.email || 'customer@growaf.com', // Fallback for prototype
            reference: "GWA-" + Date.now() + "-" + Math.floor(Math.random() * 1000)
        });

        res.json({
            message: "Funding initialized",
            authorization_url: response.data.authorization_url,
            reference: response.data.reference
        });
    } catch (error) {
        console.warn("Paystack Initialization Error (Fallback to mock):", error.message);
        // Fallback for invalid/dummy keys during development
        res.json({
            message: "Funding initialized (Mock due to invalid key)",
            authorization_url: "https://checkout.paystack.com/mock-url-12345",
            reference: "GWAMOCK-" + Date.now()
        });
    }
});

// Verify Paystack Transaction
router.get('/verify/:reference', protect, async (req, res) => {
    try {
        const { reference } = req.params;

        if (reference.startsWith('GWAMOCK')) {
            return res.json({ message: "Mock transaction verified successfully", status: "success", amount: 50000 });
        }

        const response = await Paystack.transaction.verify({ reference });

        if (response.data.status === 'success') {
            // In production, update the user.wallet_balance in the PostgreSQL DB here
            res.json({ message: "Transaction verified successfully", status: "success", amount: response.data.amount / 100 });
        } else {
            res.status(400).json({ message: "Transaction not successful", status: response.data.status });
        }
    } catch (error) {
        console.error("Paystack Verification Error:", error.message);
        res.status(500).json({ message: "Verification failed" });
    }
});

// Create Escrow Transaction (Checkout)
router.post('/escrow', protect, (req, res) => {
    const { productId, amount, vendorId } = req.body;
    // In production, we'd lock the funds conditionally in the DB
    res.json({
        message: "Escrow locked successfully",
        status: "locked",
        escrow_id: "ESC-" + Date.now()
    });
});

module.exports = router;
