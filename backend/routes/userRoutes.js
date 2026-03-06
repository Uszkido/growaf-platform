const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

// User Authentication
router.post('/register', registerUser);
router.post('/login', loginUser);

// Mock Profile (keeping for now)
router.get('/profile', (req, res) => {
    res.json({ message: "Profile access requires JWT (implementing next)" });
});

module.exports = router;
