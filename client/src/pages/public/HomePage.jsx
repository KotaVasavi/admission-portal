import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../../services/api';
import CourseCard from '../../components/common/CourseCard';

// Helper component for loading/error
const Loader = ({ text = "Loading..." }) => <div className="loader">{text}</div>;
const Error = ({ message })=> <div className="error-message">{message}</div>;

// --- NEW FETCHER ---
const fetchFeaturedCourses = async () => {
  const { data } = await api.get('/courses/featured'); // Fetches from the new endpoint
  return data.data;
};

// --- NEW FETCHER ---
const fetchTestimonials = async () => {
  const { data } = await api.get('/testimonials');
  return data.data;
};

const HomePage = () => {
  // Query for Featured Courses
  const { 
    data: courses, 
    isLoading: coursesLoading, 
    isError: coursesIsError, 
    error: coursesError 
  } = useQuery({
    queryKey: ['featuredCourses'],
    queryFn: fetchFeaturedCourses,
  });

  // Query for Testimonials
  const { 
    data: testimonials, 
    isLoading: testimonialsLoading, 
    isError: testimonialsIsError, 
    error: testimonialsError 
  } = useQuery({
    queryKey: ['testimonials'],
    queryFn: fetchTestimonials,
  });

  return (
    <div>
      {/* Hero Section */}
      <section style={heroStyle}>
        
        <h1>Start Your Future Today</h1>
        <p style={{ fontSize: '1.2rem', margin: '1rem 0' }}>Discover your passion and unlock your potential with our expert-led courses.</p>
        <Link to="/courses" className="btn btn-primary btn-lg">Explore Courses</Link>
      </section>

      {/* Featured Courses */}
      <section style={{ margin: '3rem 0' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>Featured Courses</h2>
        {coursesLoading && <Loader text="Loading courses..." />}
        {coursesIsError && <Error message={coursesError.message} />}
        <div style={gridStyle}>
          {courses && courses.map(course => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
        {courses && courses.length === 0 && !coursesLoading && (
           <p style={{ textAlign: 'center' }}>No featured courses available at this time.</p>
        )}
      </section>

      {/* Testimonials --- NOW DYNAMIC --- */}
      <section style={{ margin: '3rem 0', background: 'var(--dark-purple)', padding: '2rem', borderRadius: '8px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>What Our Students Say</h2>
        
        {testimonialsLoading && <Loader text="Loading testimonials..." />}
        {testimonialsIsError && <Error message={testimonialsError.message} />}
        
        {testimonials && testimonials.length > 0 && (
          <div style={{ textAlign: 'center', fontStyle: 'italic' }}>
            {/* Displaying the first testimonial from the DB */}
            <p>"{testimonials[0].quote}"</p>
            <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>- {testimonials[0].studentName}</p>
            {testimonials[0].courseTitle && (
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{testimonials[0].courseTitle}</p>
            )}
          </div>
        )}
         {testimonials && testimonials.length === 0 && !testimonialsLoading && (
           <p style={{ textAlign: 'center' }}>No testimonials available yet.</p>
        )}
      </section>
    </div>
  );
};

// Styles
const heroStyle = {
  height: '60vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  background: 'linear-gradient(rgba(33, 24, 50, 0.8), rgba(33, 24, 50, 0.8)), url("https://images.unsplash.com/photo-1522202176988-66273c2fd553?crop=entropy&w=1920&h=1080&q=80") no-repeat center center/cover',
  color: '#fff',
  padding: '0 2rem',
  borderRadius: '8px',
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '2rem',
};

export default HomePage;