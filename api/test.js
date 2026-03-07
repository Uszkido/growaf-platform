module.exports = (req, res) => {
    res.json({
        message: "Growaf Diagnostic API - Native Vercel Function",
        db_set: !!process.env.DATABASE_URL,
        cloudinary_set: !!process.env.CLOUDINARY_CLOUD_NAME,
        timestamp: new Date().toISOString()
    });
};
