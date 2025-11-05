const Category = require('../models/Category');

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    console.error('❌ Error fetching categories:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch categories' });
  }
};

// Get category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' });
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    console.error('❌ Error fetching category:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch category' });
  }
};

// Create new category
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newCategory = new Category({ name, description });
    await newCategory.save();
    res.status(201).json({ success: true, message: '✅ Category created', data: newCategory });
  } catch (error) {
    console.error('❌ Error creating category:', error);
    res.status(500).json({ success: false, message: 'Failed to create category' });
  }
};

// Update category
exports.updateCategory = async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCategory) return res.status(404).json({ success: false, message: 'Category not found' });
    res.status(200).json({ success: true, message: '✅ Category updated', data: updatedCategory });
  } catch (error) {
    console.error('❌ Error updating category:', error);
    res.status(500).json({ success: false, message: 'Failed to update category' });
  }
};

// Delete category
exports.deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) return res.status(404).json({ success: false, message: 'Category not found' });
    res.status(200).json({ success: true, message: '🗑️ Category deleted' });
  } catch (error) {
    console.error('❌ Error deleting category:', error);
    res.status(500).json({ success: false, message: 'Failed to delete category' });
  }
};
