const Course = require('../models/Course');

// @desc    Get all courses
// @route   GET /api/courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({ success: true, count: courses.length, data: courses });
  } catch (err) {
    res.status(500).json({ success: false, msg: 'Server Error' });
  }
};

// @desc    Get single course
// @route   GET /api/courses/:id
exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, msg: 'Course not found' });
    }
    res.status(200).json({ success: true, data: course });
  } catch (err) {
    res.status(500).json({ success: false, msg: 'Server Error' });
  }
};
// @desc    Get featured courses
// @route   GET /api/courses/featured
exports.getFeaturedCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isFeatured: true });
    res.status(200).json({ success: true, count: courses.length, data: courses });
  } catch (err) {
    res.status(500).json({ success: false, msg: 'Server Error' });
  }
};