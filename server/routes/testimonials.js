const express = require('express');
const { getTestimonials } = require('../controllers/testimonials');
const router = express.Router();

router.route('/').get(getTestimonials);

module.exports = router;