const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: [true, 'Please add a student name'],
  },
  quote: {
    type: String,
    required: [true, 'Please add a quote'],
  },
  courseTitle: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Testimonial', TestimonialSchema);