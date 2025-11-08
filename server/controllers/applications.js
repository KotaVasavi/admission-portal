const Application = require('../models/Application');
const Course = require('../models/Course');
const sendEmail = require('../utils/sendEmail');

// REPLACE YOUR OLD createApplication FUNCTION WITH THIS
exports.createApplication = async (req, res) => {
  try {
    // Add the logged-in user's ID to the request body
    req.body.user = req.user.id;

    // Check if the course exists
    const course = await Course.findById(req.body.course);
    if (!course) {
      return res.status(404).json({ success: false, msg: 'Course not found' });
    }
    
    // Check if user already applied for this course
    const existingApplication = await Application.findOne({ 
      user: req.user.id, 
      course: req.body.course 
    });
    
    if (existingApplication) {
      return res.status(400).json({ 
        success: false, 
        msg: 'You have already applied for this course' 
      });
    }

    // Create the application directly from the request body
    // req.body already has name, email, phone, etc. from the form
    const application = await Application.create(req.body);

    res.status(201).json({ success: true, data: application });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: err.message });
  }
};
// @desc    Get all applications for the logged-in student
// @route   GET /api/applications
exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user.id }).populate('course', 'title imageUrl');
    res.status(200).json({ success: true, data: applications });
  } catch (err) {
    res.status(500).json({ success: false, msg: 'Server Error' });
  }
};

// @desc    Get all applications (Admin)
// @route   GET /api/applications/admin
exports.getAllApplications = async (req, res) => {
  try {
    // Populate with user name/email and course title
    const applications = await Application.find()
      .populate('user', 'name email')
      .populate('course', 'title');
      
    res.status(200).json({ success: true, data: applications });
  } catch (err) {
    res.status(500).json({ success: false, msg: 'Server Error' });
  }
};

// @desc    Update application status (Admin)
// @route   PUT /api/applications/admin/:id
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body; // 'Seat Allotted' or 'Rejected'

    let application = await Application.findById(req.params.id).populate('user course');

    if (!application) {
      return res.status(404).json({ success: false, msg: 'Application not found' });
    }

    application.status = status;
    await application.save();
    
    // --- Send Email Notification ---
    const user = application.user;
    const course = application.course;
    let subject = '';
    let message = '';

    if (status === 'Seat Allotted') {
      subject = `Congratulations! Your Seat is Allotted for ${course.title}`;
      message = `
        Dear ${user.name},
        
        We are pleased to inform you that your application for the ${course.title} course has been approved.
        
        **Your seat has been allotted.**
        
        Please log in to your dashboard to complete the fee payment of $${course.fees} to confirm your admission.
        
        We look forward to welcoming you.
        
        Best regards,
        The Admissions Team
      `;
    } else if (status === 'Rejected') {
      subject = `Application Update for ${course.title}`;
      message = `
        Dear ${user.name},
        
        Thank you for your interest in the ${course.title} course.
        
        After careful review, we regret to inform you that we cannot offer you a seat at this time.
        
        We wish you the best in your future endeavors.
        
        Best regards,
        The Admissions Team
      `;
    }

    try {
      await sendEmail({
        to: user.email,
        subject: subject,
        text: message,
      });
    } catch (emailErr) {
      console.error('Email sending error:', emailErr);
      // Don't block the response for email error, just log it
    }
    // --- End Email ---

    res.status(200).json({ success: true, data: application });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: 'Server Error' });
  }
};