const express = require('express');
const {
  createApplication,
  getMyApplications,
  getAllApplications,
  updateApplicationStatus,
} = require('../controllers/applications');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Student routes
router.route('/')
.post(protect, authorize('student'), createApplication) 
  .get(protect, authorize('student'), getMyApplications);

// Admin routes
router.route('/admin')
  .get(protect, authorize('admin'), getAllApplications);

router.route('/admin/:id')
  .put(protect, authorize('admin'), updateApplicationStatus);

module.exports = router;