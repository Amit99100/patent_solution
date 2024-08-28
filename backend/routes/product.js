const express = require('express');
const router = express.Router();
const { createProduct, displayProduct, deleteProduct, productCategory, updateProduct } = require("../controllers/productController");
const { isAuthenticated, isAdmin } = require("../middleware/auth");

// Logging imported functions to debug
console.log('createProduct:', createProduct); // Should log the function definition
console.log('displayProduct:', displayProduct);
console.log('deleteProduct:', deleteProduct);
console.log('productCategory:', productCategory);
console.log('updateProduct:', updateProduct);

// Logging imported middleware functions to debug
console.log('isAuthenticated:', isAuthenticated);
console.log('isAdmin:', isAdmin);

router.post('/product/create', isAuthenticated, isAdmin, createProduct);
router.get('/products/all', displayProduct);
router.delete('/product/delete/:id', isAuthenticated, isAdmin, deleteProduct);
router.put('/product/update/:id', isAuthenticated, isAdmin, updateProduct);
router.get('/product/categories', productCategory);

module.exports = router;
