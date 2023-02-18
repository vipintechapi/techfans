const model = require("../models/category")

class CategoryController {

  // Method for adding a new category
  static async addCategory(req, res) {
    try {
      const { name } = req.body;
      const category = new model({ name });
      await category.save();
      res.status(201).json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  // Method for getting all categories
  static async getAllCategories(req, res) {
    try {
      const categories = await model.find();
      res.json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  // Method for deleting a category by ID
  static async deleteCategory(req, res) {
    try {
      const { id } = req.params;
      const category = await model.findByIdAndDelete(id);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  // Method for updating a category by ID
  static async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const category = await model.findByIdAndUpdate(
        id,
        { name },
        { new: true }
      );
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
}

module.exports = CategoryController;
