const express = require('express');
const router = express.Router();
const OpenAI = require('openai');
const { uploadScan } = require('../config/cloudinary');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

router.post('/advisor', async (req, res) => {
    try {
        const { crop, region, issue } = req.body;

        if (!crop || !region || !issue) {
            return res.status(400).json({ message: "Please provide crop, region, and issue details." });
        }

        const prompt = `You are an expert African agronomist consulting for Growaf. A farmer in ${region} is growing ${crop} and facing the following issue: "${issue}". Provide a concise, highly actionable 3-step solution to help them, focusing on sustainable and locally available resources.`;

        // We use a mock response structure here if the key is invalid, but try the real API first.
        try {
            const completion = await openai.chat.completions.create({
                messages: [{ role: "user", content: prompt }],
                model: "gpt-3.5-turbo",
            });
            res.json({ advice: completion.choices[0].message.content });
        } catch (apiError) {
            // Fallback for dummy keys or rate limits during development
            console.warn("OpenAI API Error (Fallback to mock data):", apiError.message);
            res.json({
                advice: `Mock AI Consultation for ${crop} in ${region}:\n1. Ensure adequate drainage immediately to prevent root rot in the current soil conditions.\n2. Apply a localized organic compost mix enriched with neem cake to deter pests.\n3. Monitor the crop daily and maintain a strict watering schedule. (Note: Real OpenAI key was invalid, this is a simulated response.)`
            });
        }

    } catch (error) {
        console.error("AI Advisor Error:", error);
        res.status(500).json({ message: "An error occurred while fetching AI advice." });
    }
});

// Mock yield prediction data generator
router.get('/yield-prediction', (req, res) => {
    try {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const currentMonthIndex = new Date().getMonth();

        const data = [];
        let baseVolume = 120;
        let basePrice = 250000;

        // Generate 12 months starting from current
        for (let i = 0; i < 12; i++) {
            const mIndex = (currentMonthIndex + i) % 12;

            // Add some sinusoidal seasonal variation to volume and inverse to price
            const seasonalFactor = Math.sin((i / 12) * Math.PI * 2);
            const volume = Math.floor(baseVolume + (seasonalFactor * 40) + (Math.random() * 20 - 10));
            const price = Math.floor(basePrice - (seasonalFactor * 50000) + (Math.random() * 10000 - 5000));

            data.push({
                month: months[mIndex],
                volume: volume,
                price: price
            });
        }
        res.json({ data });
    } catch (err) {
        res.status(500).json({ message: "Error generating yield prediction." });
    }
});

// Pest detection image scan simulation
router.post('/pest-detect', uploadScan.single('image'), async (req, res) => {
    // We now have a secure Cloudinary URL uploaded automatically via multer-storage-cloudinary
    const imageUrl = req.file ? req.file.path : null;
    console.log("Image successfully uploaded to Cloudinary:", imageUrl);

    // In a real app we'd send imageUrl to OpenAI Vision API here.
    // Since we don't assume a valid key, we will simulate a high quality AI diagnosis

    // Slight delay to simulate processing
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await sleep(2000);

    const threats = [
        {
            diagnosis: "Fall Armyworm (Spodoptera frugiperda)", severity: "Critical", confidence: 0.94,
            description: "Deep feeding damage observed on the central whorl of the crop. This pest can devastate entire yields within weeks if unchecked.",
            treatment: [
                "Deploy pheromone traps immediately to monitor adult moth populations.",
                "Apply an organic, neem-based biopesticide directly into the whorl of affected plants.",
                "Consider introducing natural predators like parasitic wasps (Trichogramma) for long-term control."
            ]
        },
        {
            diagnosis: "Cassava Mosaic Disease (CMD)", severity: "High", confidence: 0.88,
            description: "Distinct chlorotic mosaic patterns and leaf distortion detected. This viral infection restricts photosynthesis profoundly.",
            treatment: [
                "Uproot and safely burn all infected plants immediately to prevent whitefly transmission.",
                "Ensure subsequent plantings use strictly certified disease-free stem cuttings.",
                "Implement rigorous whitefly vector control using insecticidal soaps."
            ]
        },
        {
            diagnosis: "Tomato Blight (Phytophthora infestans)", severity: "Moderate", confidence: 0.91,
            description: "Dark, water-soaked lesions detected on the foliage edges with slight white fungal growth indicative of excessive moisture.",
            treatment: [
                "Prune the lower vegetative canopy immediately to increase air circulation.",
                "Apply a copper-based preventative fungicide across the field.",
                "Adjust the irrigation schedule to water only the base of plants during early morning hours."
            ]
        }
    ];

    // Pick a random simulated threat
    const randomThreat = threats[Math.floor(Math.random() * threats.length)];

    res.json(randomThreat);
});

module.exports = router;
