import React from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../services/api';
import CourseCard from '../../components/common/CourseCard';

const fetchCourses = async () => {
  const { data } = await api.get('/courses');
  return data.data;
};

const CoursesPage = () => {
  const { data: courses, isLoading, isError, error } = useQuery({
    queryKey: ['courses'],
    queryFn: fetchCourses,
  });

  return (
    <div>
      <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>All Courses</h1>
      {/* Add Filter/Search Bar here */}
      
      {isLoading && <div className="loader">Loading courses...</div>}
      {isError && <div className="error-message">{error.message}</div>}

      <div style={gridStyle}>
        {courses && courses.map(course => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '2rem',
};

export default CoursesPage;