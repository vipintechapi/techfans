const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/category');

// Route for getting all categories
router.post('/', CategoryController.addCategory);
router.get('/', CategoryController.getAllCategories);
router.put('/:id', CategoryController.updateCategory);
router.delete('/:id', CategoryController.deleteCategory);

module.exports = router;
