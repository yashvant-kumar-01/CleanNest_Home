const Article = require('../models/Article');

// @desc    Get all published articles
// @route   GET /api/articles
// @access  Public
const getArticles = async (req, res, next) => {
  try {
    const articles = await Article.find({ status: 'published' }).sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    next(error);
  }
};

// @desc    Get article by slug
// @route   GET /api/articles/:slug
// @access  Public
const getArticleBySlug = async (req, res, next) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug, status: 'published' });
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json(article);
  } catch (error) {
    next(error);
  }
};

// @desc    Create an article (Admin)
// @route   POST /api/articles
// @access  Private/Admin
const createArticle = async (req, res, next) => {
  try {
    const { title, excerpt, content, category, featuredImage, author, readTime } = req.body;

    if (!title || !excerpt || !content || !featuredImage) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const article = await Article.create({
      title,
      slug,
      excerpt,
      content,
      category: category || 'Cleaning Tips',
      featuredImage,
      author: author || 'CleanNest Team',
      readTime: readTime || '5 min read',
      status: 'published',
    });

    res.status(201).json(article);
  } catch (error) {
    next(error);
  }
};

// @desc    Update article (Admin)
// @route   PUT /api/articles/:id
// @access  Private/Admin
const updateArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedArticle);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete article (Admin)
// @route   DELETE /api/articles/:id
// @access  Private/Admin
const deleteArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getArticles,
  getArticleBySlug,
  createArticle,
  updateArticle,
  deleteArticle,
};
