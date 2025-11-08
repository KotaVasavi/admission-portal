const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a course title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  duration: {
    type: String,
    required: [true, 'Please add a duration'],
  },
  eligibility: {
    type: String,
    required: [true, 'Please add eligibility criteria'],
  },
  fees: {
    type: Number,
    required: [true, 'Please add fee structure'],
  },
  curriculum: [
    {
      module: String,
      details: String,
    },
  ],
  imageUrl: {
    type: String,
    default: 'https://via.placeholder.com/1080x720.png?text=Modern+Course',
  },
  // --- ADD THIS LINE ---
  isFeatured: {
    type: Boolean,
    default: false,
  },
  // --------------------
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Course', CourseSchema);