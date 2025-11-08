const express = require('express');
const { getCourses, getCourse,getFeaturedCourses } = require('../controllers/courses');
const router = express.Router();
router.route('/featured').get(getFeaturedCourses);
router.route('/').get(getCourses);
router.route('/:id').get(getCourse);

module.exports = router;