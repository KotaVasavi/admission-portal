import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import api from '../../services/api';

const fetchMyApplications = async () => {
  const { data } = await api.get('/applications');
  return data.data;
};

const StudentDashboard = () => {
  const { user } = useAuth();
  const { data: applications, isLoading, isError, error } = useQuery({
    queryKey: ['myApplications'],
    queryFn: fetchMyApplications,
  });

  return (
    <div>
      <h1 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Welcome, {user?.name}!</h1>
      <p>Here you can track the status of all your course applications.</p>

      <h2 style={{ marginTop: '2rem' }}>My Applications</h2>
      {isLoading && <div className="loader">Loading applications...</div>}
      {isError && <div className="error-message">{error.message}</div>}

      <div style={applicationsContainerStyle}>
        {applications && applications.length > 0 ? (
          applications.map(app => (
            <div key={app._id} className="card" style={{ flexDirection: 'row', alignItems: 'center', gap: '1.5rem' }}>
              <img 
                src={app.course.imageUrl} 
                alt={app.course.title} 
                style={{ width: '150px', height: '100px', objectFit: 'cover', borderRadius: '8px 0 0 8px' }} 
              />
              <div style={{ flex: 1, padding: '1rem' }}>
                <h3 style={{ color: 'var(--text-light)', margin: 0 }}>{app.course.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Applied on: {new Date(app.appliedAt).toLocaleDateString()}
                </p>
              </div>
              <div style={statusBadgeStyle(app.status)}>
                {app.status}
              </div>
            </div>
          ))
        ) : (
          !isLoading && <p>You have not applied to any courses yet.</p>
        )}
      </div>

      {/* Notifications/Alerts Section */}
      <div style={{ background: 'var(--dark-purple)', padding: '1.5rem', borderRadius: '8px', marginTop: '2rem' }}>
        <h3>Notifications</h3>
        {applications?.some(app => app.status === 'Seat Allotted') ? (
          <div style={{ color: '#4CAF50', fontWeight: 'bold' }}>
            🎉 Congratulations! You have a seat allotment! Please check your applications and email for fee payment details.
          </div>
        ) : (
          <p style={{ color: 'var(--text-muted)' }}>No new notifications.</p>
        )}
      </div>
    </div>
  );
};

const applicationsContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  marginTop: '1.5rem',
};

const statusBadgeStyle = (status) => ({
  padding: '0.5rem 1rem',
  borderRadius: '20px',
  color: '#fff',
  fontWeight: 'bold',
  marginRight: '1.5rem',
  background:
    status === 'Seat Allotted' ? '#4CAF50' :
    status === 'Rejected' ? '#F44336' :
    '#FB8C00', // Pending
});

export default StudentDashboard;