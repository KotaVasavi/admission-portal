import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const { name, email, password, confirmPassword } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }
        await register(name, email, password, confirmPassword);
      }
      
      // Navigate will be handled by redirect
    } catch (err) {
      const errMsg = err.response?.data?.msg || 'An error occurred. Please try again.';
      setError(errMsg);
    }
    setLoading(false);
  };

  // If already logged in, redirect
  if (isAuthenticated) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace />;
  }

  return (
    <div style={authBoxStyle}>
      <div style={tabsStyle}>
        <button onClick={() => setIsLogin(true)} style={isLogin ? activeTabStyle : tabStyle}>Login</button>
        <button onClick={() => setIsLogin(false)} style={!isLogin ? activeTabStyle : tabStyle}>Register</button>
      </div>

      <h2 style={{ textAlign: 'center' }}>{isLogin ? 'Login' : 'Create Account'}</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={onSubmit}>
        {!isLogin && (
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" name="name" value={name} onChange={onChange} required />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={password} onChange={onChange} required />
        </div>
        {!isLogin && (
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" name="confirmPassword" value={confirmPassword} onChange={onChange} required />
          </div>
        )}
        
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
          {loading ? (isLogin ? 'Logging in...' : 'Registering...') : (isLogin ? 'Login' : 'Create Account')}
        </button>
      </form>
    </div>
  );
};

// Styles
const authBoxStyle = {
  maxWidth: '450px',
  margin: '2rem auto',
  padding: '2rem',
  background: 'var(--dark-purple)',
  borderRadius: '8px',
};
const tabsStyle = { display: 'flex', marginBottom: '1.5rem' };
const tabStyle = {
  flex: 1,
  padding: '1rem',
  background: 'var(--bg-dark)',
  border: 'none',
  color: 'var(--text-muted)',
  cursor: 'pointer',
  fontSize: '1rem',
};
const activeTabStyle = { ...tabStyle, background: 'var(--secondary)', color: '#fff' };

export default LoginPage;