const express = require('express');
const router = express.Router();
const { getProducts, addProduct, updateProduct, deleteProduct, getProductById } = require('../controllers/productController');

router.get('/', getProducts);
router.get('/:productId', getProductById);
router.post('/post', addProduct);
router.put('/update/:id', updateProduct);
router.delete('/delete/:id', deleteProduct);

module.exports = router;
