const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please enter article title'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    excerpt: {
      type: String,
      required: [true, 'Please enter article excerpt'],
    },
    content: {
      type: String,
      required: [true, 'Please enter article content'],
    },
    category: {
      type: String,
      default: 'Cleaning Tips',
    },
    featuredImage: {
      type: String,
      required: [true, 'Please provide featured image URL'],
    },
    author: {
      type: String,
      default: 'CleanNest Team',
    },
    readTime: {
      type: String,
      default: '4 min read',
    },
    status: {
      type: String,
      enum: ['published', 'draft'],
      default: 'published',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Article', articleSchema);
