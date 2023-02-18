const Post = require('../models/posts');

class PostController {
  // Add a new post
  static async addPost(req, res) {
    try {
      const { title, categoryId, shortDesc, html, image } = req.body;
      const post = await Post.create({ title, categoryId, shortDesc, html, image });
      res.status(201).json({ success: true, data: post });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Server error' });
    }
  }

  // Get a single post by ID
  static async getPost(req, res) {
    try {
      const post = await Post.findById(req.params.id).populate('categoryId');
      if (!post) {
        return res.status(404).json({ success: false, error: 'Post not found' });
      }
      res.status(200).json({ success: true, data: post });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Server error' });
    }
  }

   // Get all posts with optional filtering by category and title and pagination
   static async getAllPosts(req, res) {
    try {
      const { category, title, page = 1, limit = 10 } = req.query;
      const filter = {};
      if (category) {
        filter.categoryId = category;
      }
      if (title) {
        filter.title = { $regex: new RegExp(title), $options: 'i' };
      }
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const posts = await Post.find(filter)
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(startIndex)
        .populate('categoryId');
      const totalPosts = await Post.countDocuments(filter);
      const totalPages = Math.ceil(totalPosts / limit);
      const pagination = { currentPage: +page, totalPages, totalPosts };
      res.status(200).json({ success: true, data: posts, pagination });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Server error' });
    }
  }

  // Update a post by ID
  static async updatePost(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      }).populate('categoryId');
      if (!post) {
        return res.status(404).json({ success: false, error: 'Post not found' });
      }
      res.status(200).json({ success: true, data: post });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Server error' });
    }
  }

  // Delete a post by ID
  static async deletePost(req, res) {
    try {
      const post = await Post.findByIdAndDelete(req.params.id).populate('categoryId');
      if (!post) {
        return res.status(404).json({ success: false, error: 'Post not found' });
      }
      res.status(200).json({ success: true, data: {} });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Server error' });
    }
  }
}

module.exports = PostController;
