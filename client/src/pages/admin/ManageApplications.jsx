import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../services/api';

// Fetch all applications
const fetchAllApplications = async () => {
  const { data } = await api.get('/applications/admin');
  return data.data;
};

// Update status
const updateStatus = ({ id, status }) => {
  return api.put(`/applications/admin/${id}`, { status });
};

const ManageApplications = () => {
  const queryClient = useQueryClient();
  const [selectedApp, setSelectedApp] = useState(null); // For modal/review view

  const { data: applications, isLoading, isError, error } = useQuery({
    queryKey: ['allApplications'],
    queryFn: fetchAllApplications,
  });

  const mutation = useMutation({
    mutationFn: updateStatus,
    onSuccess: () => {
      // Invalidate and refetch the 'allApplications' query to get fresh data
      queryClient.invalidateQueries({ queryKey: ['allApplications'] });
      alert('Status updated and notification sent!');
      setSelectedApp(null); // Close modal
    },
    onError: (error) => {
      alert(`Error: ${error.response?.data?.msg || 'Could not update status.'}`);
    }
  });

  const handleUpdate = (id, status) => {
    if (window.confirm(`Are you sure you want to ${status === 'Seat Allotted' ? 'APPROVE' : 'REJECT'} this application? An email will be sent.`)) {
      mutation.mutate({ id, status });
    }
  };

  if (isLoading) return <div className="loader">Loading applications...</div>;
  if (isError) return <div className="error-message">{error.message}</div>;

  return (
    <div>
      <h1>Manage Applications</h1>
      <p>Review, approve, or reject student applications.</p>
      
      <table style={tableStyle}>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Applied On</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
 <tbody>
  {applications?.map(app => (
    <tr key={app._id}>
      <td>{app.user?.name || 'Deleted User'}</td>
      <td>{app.user?.email || 'N/A'}</td>
      <td>{app.course?.title || 'Deleted Course'}</td>
      <td>{new Date(app.appliedAt).toLocaleDateString()}</td>
      <td><span style={statusBadgeStyle(app.status)}>{app.status}</span></td>
      <td>
        <button className="btn btn-secondary" onClick={() => setSelectedApp(app)}>Review</button>
      </td>
    </tr>
  ))}
</tbody>
      </table>

      {/* Review Modal */}
      {selectedApp && (
        <ReviewModal
          app={selectedApp}
          onClose={() => setSelectedApp(null)}
          onUpdate={handleUpdate}
          isLoading={mutation.isLoading}
        />
      )}
    </div>
  );
};

// Review Modal Component (in the same file for brevity)
const ReviewModal = ({ app, onClose, onUpdate, isLoading }) => {


  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <h2>Review Application</h2>
        <button onClick={onClose} style={closeButtonStyle}>&times;</button>
        
        <p><strong>Student:</strong> {app.name} ({app.email})</p>
        <p><strong>Course:</strong> {app.course.title}</p>
        <p><strong>Phone:</strong> {app.phone}</p>
        <hr style={{ margin: '1rem 0', borderColor: 'var(--dark-purple)' }} />

        <p><strong>Skills:</strong></p>
        <pre style={preStyle}>{app.skills}</pre>
        <p><strong>Statement of Purpose:</strong></p>
        <pre style={preStyle}>{app.statementOfPurpose || 'N/A'}</pre>
        
        {app.status === 'Pending Review' && (
          <div style={actionsStyle}>
            <button 
              className="btn btn-primary" 
              style={{ background: '#F44336' }} 
              onClick={() => onUpdate(app._id, 'Rejected')}
              disabled={isLoading}
            >
              {isLoading ? '...' : 'Reject'}
            </button>
            <button 
              className="btn btn-primary" 
              style={{ background: '#4CAF50' }}
              onClick={() => onUpdate(app._id, 'Seat Allotted')}
              disabled={isLoading}
            >
              {isLoading ? '...' : 'Approve & Allot Seat'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Styles
const tableStyle = { width: '100%', borderCollapse: 'collapse', marginTop: '1.5rem' };
tableStyle.thead = { background: 'var(--dark-purple)' };
tableStyle.th = { padding: '1rem', textAlign: 'left', borderBottom: '2px solid var(--bg-dark)' };
tableStyle.td = { padding: '1rem', borderBottom: '1px solid var(--dark-purple)' };

const statusBadgeStyle = (status) => ({
  padding: '0.25rem 0.5rem',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '0.8rem',
  background:
    status === 'Seat Allotted' ? '#4CAF50' :
    status === 'Rejected' ? '#F44336' :
    '#FB8C00',
});

// Modal Styles
const modalOverlayStyle = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1001 };
const modalContentStyle = { background: 'var(--dark-purple)', padding: '2rem', borderRadius: '8px', width: '90%', maxWidth: '600px', position: 'relative' };
const closeButtonStyle = { position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' };
const actionsStyle = { display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' };
const preStyle = { background: '#2a1f44', padding: '0.5rem', borderRadius: '5px', whiteSpace: 'pre-wrap', wordBreak: 'break-all' };

export default ManageApplications;