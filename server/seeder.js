const Course = require('./models/Course');
const Testimonial = require('./models/Testimonial');

const courses = [
  {
    title: 'Full-Stack Web Development',
    description: 'Master React, Node.js, and MongoDB to build complex web applications from scratch.',
    duration: '12 Weeks',
    eligibility: 'Basic HTML, CSS, and JS knowledge.',
    fees: 1500,
    imageUrl: 'https://images.unsplash.com/photo-1542744095-291d1f657634?crop=entropy&w=1080&h=720&q=80',
    isFeatured: true, // <-- SET TO TRUE
    curriculum: [
      { module: 'Module 1: React Fundamentals', details: 'Components, State, Props' },
      { module: 'Module 2: Advanced React', details: 'Context API, Hooks, React Router' },
      { module: 'Module 3: Node.js & Express', details: 'Building robust APIs' },
      { module: 'Module 4: MongoDB', details: 'Database design and Mongoose' },
    ],
  },
  {
    title: 'Data Science & Machine Learning',
    description: 'Learn Python, Pandas, Scikit-learn, and TensorFlow to become a data scientist.',
    duration: '16 Weeks',
    eligibility: 'Python and Statistics background.',
    fees: 2000,
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&w=1080&h=720&q=80',
    isFeatured: false, // <-- SET TO FALSE
    curriculum: [
      { module: 'Module 1: Python for Data Science', details: 'Numpy, Pandas' },
      { module: 'Module 2: Data Visualization', details: 'Matplotlib, Seaborn' },
      { module: 'Module 3: Machine Learning', details: 'Regression, Classification' },
      { module: 'Module 4: Deep Learning', details: 'TensorFlow and Keras' },
    ],
  },
  // Add a third course that is also featured
  {
    title: 'UX/UI Design Principles',
    description: 'Create beautiful, user-centric designs with Figma, Sketch, and Adobe XD.',
    duration: '8 Weeks',
    eligibility: 'A creative mindset.',
    fees: 950,
    imageUrl: 'https://images.unsplash.com/photo-1581291518857-4e2655e34d6e?crop=entropy&w=1080&h=720&q=80',
    isFeatured: true, // <-- SET TO TRUE
    curriculum: [
      { module: 'Module 1: Design Thinking', details: 'User Personas, Empathy Maps' },
      { module: 'Module 2: Figma Fundamentals', details: 'Prototyping and Components' },
      { module: 'Module 3: Visual Design', details: 'Typography, Color Theory' },
    ],
  },
];

// --- ADD TESTIMONIALS DATA ---
const testimonials = [
  {
    studentName: 'Alex Johnson',
    quote: 'This platform changed my life. The Full-Stack course is practical and the instructors are top-notch!',
    courseTitle: 'Full-Stack Web Development',
  },
  {
    studentName: 'Maria Garcia',
    quote: 'I landed a job as a UX designer just weeks after completing my course. Highly recommend!',
    courseTitle: 'UX/UI Design Principles',
  },
];
// ------------------------------

const seeder = async () => {
  try {
    // Clear existing data
    await Course.deleteMany();
    await Testimonial.deleteMany(); 

    // Insert new data
    await Course.insertMany(courses);
    await Testimonial.insertMany(testimonials); // Insert testimonials

    console.log('Data Seeded...');
  } catch (err) {
    console.error('Seeder error:', err.message);
  }
};

module.exports = seeder;