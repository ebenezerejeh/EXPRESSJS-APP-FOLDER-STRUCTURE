const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const createError = require('http-errors')




const Product = require('../Models/Product.model');
const ProductController = require('../Controllers/Product.controller')


router.get('/', ProductController.getAllProducts)


router.post('/', ProductController.createNewProduct)

// end point by params
router.get('/:id', ProductController.findProductById);


router.patch('/:id', ProductController.updateProductById);


router.delete('/:id', ProductController.deleteProductById)


module.exports = router;