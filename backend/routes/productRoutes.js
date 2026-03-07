const express = require('express');
const router = express.Router();
const { getProducts, createProduct } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const { uploadProduct } = require('../config/cloudinary');

router.get('/', getProducts);
router.post('/', protect, uploadProduct.array('images', 5), createProduct);

module.exports = router;
