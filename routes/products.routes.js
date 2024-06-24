const express = require('express');
const router = express.Router();
const productController = require('../controllers/products.controllers');
const { validateCreateProduct, validateUpdateProduct, validateDeleteProduct } = require("../validators/products.validator");

router.get('/', productController.getProducts);
router.post('/', validateCreateProduct, productController.createProductController);
router.put('/', validateUpdateProduct, productController.updateProductController);
router.delete('/', validateDeleteProduct, productController.deleteProductController);

module.exports = router;

// GET http://localhost:3000/api/products --> ALL
// PUT http://localhost:3000/api/products?title=manzana
// POST http://localhost:3000/api/products
// ejemplo para POST:
// {
//     "title": "gamba",
//     "price": "19",
//     "description": "gamba rica",
//     "image": "gamba.jpg",
//     "provider": "Dia"
// }