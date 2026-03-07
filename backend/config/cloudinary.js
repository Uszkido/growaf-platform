const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const dotenv = require('dotenv');

dotenv.config();

// Configure Cloudinary with environment variables
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer Storage Engine for normal product uploads
const productStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'growaf_products',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [{ width: 800, height: 800, crop: 'limit' }], // Optimize size
    },
});

// Configure Multer Storage Engine for pest detection AI scans
const diagnosisStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'growaf_pest_scans',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [{ width: 1024, height: 1024, crop: 'limit' }], // Maintain detail for AI
    },
});

const uploadProduct = multer({ storage: productStorage });
const uploadScan = multer({ storage: diagnosisStorage });

module.exports = {
    cloudinary,
    uploadProduct,
    uploadScan
};
