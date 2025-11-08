import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

// Fetch course details
const fetchCourse = async (id) => {
  const { data } = await api.get(`/courses/${id}`);
  return data.data;
};

const submitApplication = (applicationData) => {
  return api.post('/applications', applicationData);
};

const ApplicationForm = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    skills: '',
    statementOfPurpose: '',
  });
 
  
  // Pre-fill form with user data
  useEffect(() => {
    if (user) {
      setFormData(prev => ({ ...prev, name: user.name, email: user.email }));
    }
  }, [user]);

  // Fetch course data
  const { data: course, isLoading: courseLoading } = useQuery({
    queryKey: ['course', courseId],
    queryFn: () => fetchCourse(courseId),
  });

  // Mutation for submitting the form
  const mutation = useMutation({
    mutationFn: submitApplication,
    onSuccess: () => {
      alert('Application submitted successfully!');
      navigate('/dashboard'); // Redirect to student dashboard
    },
    onError: (error) => {
      alert(`Error: ${error.response?.data?.msg || 'Could not submit application.'}`);
    }
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  

const onSubmit = (e) => {
    e.preventDefault();
    // --- REVERT TO SENDING JSON ---
    mutation.mutate({ ...formData, course: courseId });
  };

  if (courseLoading) return <div className="loader">Loading course details...</div>;

  return (
    <div style={{ maxWidth: '700px', margin: 'auto', background: 'var(--dark-purple)', padding: '2rem', borderRadius: '8px' }}>
      <h2>Application for {course?.title}</h2>
      <p>Please fill out the details below to complete your application.</p>
      
      <form onSubmit={onSubmit} style={{ marginTop: '2rem' }}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input type="text" name="name" value={formData.name} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={formData.email} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input type="tel" name="phone" value={formData.phone} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="skills">Relevant Skills</label>
          <textarea name="skills" value={formData.skills} onChange={onChange} rows="4" placeholder="e.g., JavaScript, React, Python, Data Analysis" required></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="statementOfPurpose">Brief Statement of Purpose (Optional)</label>
          <textarea name="statementOfPurpose" value={formData.statementOfPurpose} onChange={onChange} rows="3"></textarea>
        </div>
       

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
          <button type="button" className="btn btn-secondary" onClick={() => navigate(`/course/${courseId}`)}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={mutation.isLoading}>
            {mutation.isLoading ? 'Submitting...' : 'Submit Application'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;