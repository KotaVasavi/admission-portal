const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  course: {
    type: mongoose.Schema.ObjectId,
    ref: 'Course',
    required: true,
  },
  // Form details
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  skills: {
    type: String,
    required: true,
  },
  statementOfPurpose: {
    type: String,
  },
  
  // Application status
  status: {
    type: String,
    enum: ['Pending Review', 'Seat Allotted', 'Rejected'],
    default: 'Pending Review',
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Application', ApplicationSchema);