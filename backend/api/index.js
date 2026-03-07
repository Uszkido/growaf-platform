const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic Route
app.get('/api', (req, res) => {
    res.json({ message: "Welcome to Growaf Backend API (Serverless)" });
});

// Routes
const userRoutes = require('../routes/userRoutes');
const productRoutes = require('../routes/productRoutes');
const walletRoutes = require('../routes/walletRoutes');
const adminRoutes = require('../routes/adminRoutes');
const aiRoutes = require('../routes/aiRoutes');

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/wallets', walletRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/ai', aiRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

// Export for Vercel Serverless
module.exports = app;
