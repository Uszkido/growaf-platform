const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

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

module.exports = router;
