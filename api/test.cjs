module.exports = (req, res) => {
    res.json({
        message: "Growaf Diagnostic API - Native Vercel Function (CJS Extension)",
        db_set: !!process.env.DATABASE_URL,
        timestamp: new Date().toISOString()
    });
};
