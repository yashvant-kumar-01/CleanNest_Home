const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter service name'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Please enter service description'],
    },
    shortDescription: {
      type: String,
      required: [true, 'Please enter service short description'],
    },
    category: {
      type: String,
      required: [true, 'Please specify category'],
      enum: ['Home Cleaning', 'Specialized Cleaning', 'Commercial & Office'],
      default: 'Home Cleaning',
    },
    price: {
      type: Number,
      required: [true, 'Please enter starting price'],
    },
    packages: [
      {
        name: { type: String, required: true }, // e.g. Basic, Standard, Premium
        price: { type: Number, required: true },
        features: [{ type: String }],
        duration: { type: String },
      },
    ],
    duration: {
      type: String,
      required: [true, 'Please specify duration (e.g. 3-4 Hours)'],
    },
    image: {
      type: String,
      required: [true, 'Please provide service image URL'],
    },
    includedItems: [{ type: String }],
    excludedItems: [{ type: String }],
    processSteps: [
      {
        stepNumber: Number,
        title: String,
        description: String,
      },
    ],
    faqs: [
      {
        question: String,
        answer: String,
      },
    ],
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    rating: {
      type: Number,
      default: 4.8,
    },
    totalReviews: {
      type: Number,
      default: 12,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Service', serviceSchema);
