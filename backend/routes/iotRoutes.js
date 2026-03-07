const express = require('express');
const router = express.Router();

// Generate Simulated Time-Series IoT Data
router.get('/history', (req, res) => {
    try {
        const data = [];
        const now = new Date();

        // Generate the last 24 hours of data
        for (let i = 24; i >= 0; i--) {
            const timePoint = new Date(now.getTime() - i * 60 * 60 * 1000);
            const hourStr = timePoint.getHours() + ':00';

            // Randomize moisture around 60% and pH around 6.5
            const moisture = Math.floor(60 + (Math.random() * 15 - 5)); // 55 to 75
            const ph = parseFloat((6.5 + (Math.random() * 0.8 - 0.4)).toFixed(1)); // 6.1 to 6.9

            data.push({
                time: hourStr,
                moisture: moisture,
                ph: ph
            });
        }

        res.json({ data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error retrieving IoT data' });
    }
});

module.exports = router;
