const mongoose = require('mongoose');

// Define a Mongoose schema for a categories collection
const categoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
}, { timestamps: true });

// Create a Mongoose model for the categories schema
const Category = mongoose.model('catogories', categoriesSchema);

module.exports = Category;
