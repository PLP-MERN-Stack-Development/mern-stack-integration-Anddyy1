// server/routes/categories.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Debug check — you can remove this after confirming it's working
console.log('✅ Category routes loaded successfully');

// @route   GET /api/categories
// @desc    Get all categories
// @access  Public
router.get('/', categoryController.getAllCategories);

// @route   GET /api/categories/:id
// @desc    Get a single category
// @access  Public
router.get('/:id', categoryController.getCategoryById);

// @route   POST /api/categories
// @desc    Create a new category
// @access  Private (Add JWT middleware later)
router.post('/', categoryController.createCategory);

// @route   PUT /api/categories/:id
// @desc    Update a category
// @access  Private
router.put('/:id', categoryController.updateCategory);

// @route   DELETE /api/categories/:id
// @desc    Delete a category
// @access  Private
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
