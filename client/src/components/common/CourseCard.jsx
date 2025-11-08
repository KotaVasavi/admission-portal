import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  return (
    <div className="card">
      <img src={course.imageUrl} alt={course.title} className="card-img" />
      <div className="card-body">
        <h3 className="card-title">{course.title}</h3>
        <p className="card-text">{course.description.substring(0, 100)}...</p>
        <p className="card-text" style={{ fontWeight: 'bold' }}>Duration: {course.duration}</p>
        <Link to={`/course/${course._id}`} className="btn btn-secondary">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;