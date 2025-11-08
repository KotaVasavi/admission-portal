import React from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import { FaUsers, FaClipboardList, FaClock } from 'react-icons/fa';

// This query is also used on the applications page, so it will be cached.
const fetchAllApplications = async () => {
  const { data } = await api.get('/applications/admin');
  return data.data;
};

const AdminDashboard = () => {
  const { data: applications, isLoading } = useQuery({
    queryKey: ['allApplications'],
    queryFn: fetchAllApplications,
  });

  const stats = {
    pending: applications?.filter(app => app.status === 'Pending Review').length || 0,
    allotted: applications?.filter(app => app.status === 'Seat Allotted').length || 0,
    rejected: applications?.filter(app => app.status === 'Rejected').length || 0,
    total: applications?.length || 0,
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {isLoading && <div className="loader">Loading stats...</div>}

      {/* Key Metrics */}
      <div style={gridStyle}>
        <div className="card">
          <div className="card-body" style={{ textAlign: 'center' }}>
            <FaClock size={40} color="var(--primary)" />
            <h2 style={{ fontSize: '2.5rem', margin: '0.5rem 0' }}>{stats.pending}</h2>
            <p>Pending Applications</p>
            <Link to="/admin/applications" className="btn btn-primary">Review Now</Link>
          </div>
        </div>
        <div className="card">
          <div className="card-body" style={{ textAlign: 'center' }}>
            <FaClipboardList size={40} color="#4CAF50" />
            <h2 style={{ fontSize: '2.5rem', margin: '0.5rem 0' }}>{stats.allotted}</h2>
            <p>Total Seats Allotted</p>
          </div>
        </div>
        <div className="card">
          <div className="card-body" style={{ textAlign: 'center' }}>
            <FaUsers size={40} color="var(--secondary)" />
            <h2 style={{ fontSize: '2.5rem', margin: '0.5rem 0' }}>{stats.total}</h2>
            <p>Total Applications</p>
          </div>
        </div>
      </div>

      {/* Quick Access List (Recent 5 Pending) */}
      <h2 style={{ marginTop: '3rem' }}>Recent Pending Applications</h2>
      {isLoading && <div className="loader">Loading applications...</div>}
      <div style={{ background: 'var(--dark-purple)', borderRadius: '8px', overflow: 'hidden' }}>
      {applications?.filter(app => app.status === 'Pending Review').slice(0, 5).map(app => (
  <div key={app._id} style={listItemStyle}>
    <div>
      <strong>{app.user?.name || 'Deleted User'}</strong> applied for <strong>{app.course?.title || 'Deleted Course'}</strong>
      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)'}}>{new Date(app.appliedAt).toLocaleString()}</div>
    </div>
    <Link to="/admin/applications" className="btn btn-secondary">Review</Link>
  </div>
))}
      </div>
    </div>
  );
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '1.5rem',
  marginTop: '1.5rem',
};

const listItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem 1.5rem',
  borderBottom: '1px solid var(--bg-dark)',
};

export default AdminDashboard;