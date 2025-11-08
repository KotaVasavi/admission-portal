import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const fetchCourse = async (id) => {
  const { data } = await api.get(`/courses/${id}`);
  return data.data;
};

const CourseDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const { data: course, isLoading, isError, error } = useQuery({
    queryKey: ['course', id],
    queryFn: () => fetchCourse(id),
  });

  const handleRegisterClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      // Check if user is an admin
      if (user.role === 'admin') {
         alert('Admins cannot apply for courses.');
         return;
      }
      navigate(`/apply/${id}`);
    }
  };

  if (isLoading) return <div className="loader">Loading...</div>;
  if (isError) return <div className="error-message">{error.message}</div>;

  return (
    <div style={detailsStyle}>
      <img src={course.imageUrl} alt={course.title} style={imgStyle} />
      <h1>{course.title}</h1>
      
      <button className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '1rem 2rem', margin: '1rem 0' }} onClick={handleRegisterClick}>
        Register for this Course
      </button>

      <div style={infoGridStyle}>
        <div style={infoBoxStyle}><strong>Duration:</strong> {course.duration}</div>
        <div style={infoBoxStyle}><strong>Eligibility:</strong> {course.eligibility}</div>
        <div style={infoBoxStyle}><strong>Fees:</strong> ${course.fees}</div>
      </div>

      <h2>Overview</h2>
      <p>{course.description}</p>

      <h2>Curriculum</h2>
      <ul style={curriculumListStyle}>
        {course.curriculum.map((item, index) => (
          <li key={index}>
            <strong>{item.module}:</strong> {item.details}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Styles
const detailsStyle = { background: 'var(--dark-purple)', padding: '2rem', borderRadius: '8px' };
const imgStyle = { width: '100%', height: '400px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1.5rem' };
const infoGridStyle = { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', margin: '1.5rem 0' };
const infoBoxStyle = { background: '#2a1f44', padding: '1rem', borderRadius: '5px' };
const curriculumListStyle = { listStyle: 'none', paddingLeft: 0 };
curriculumListStyle.li = { background: '#2a1f44', padding: '0.75rem', marginBottom: '0.5rem', borderRadius: '5px' };

export default CourseDetailsPage;