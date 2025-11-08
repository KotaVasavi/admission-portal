import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaGraduationCap } from 'react-icons/fa';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/');
  };

  const authLinks = (
    <>
      {user?.role === 'admin' ? (
        <li><Link to="/admin">Admin Dashboard</Link></li>
      ) : (
        <li><Link to="/dashboard">My Dashboard</Link></li>
      )}
      <li>
        <a onClick={onLogout} href="#!">Logout</a>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li><Link to="/login" className="btn btn-primary">Login / Register</Link></li>
    </>
  );

  return (
    <nav style={navStyle}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={logoStyle}>
          <Link to="/">
            <FaGraduationCap style={{ marginRight: '10px' }} /> FutureStart
          </Link>
        </h1>
        <ul style={navListStyle}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/courses">Courses</Link></li>
          {/* Add About & Contact if needed */}
          {isAuthenticated ? authLinks : guestLinks}
        </ul>
      </div>
    </nav>
  );
};

// Styles (can move to a CSS file)
const navStyle = {
  backgroundColor: 'var(--bg-dark)',
  color: '#fff',
  padding: '1rem 0',
  position: 'fixed',
  top: 0,
  width: '100%',
  zIndex: 1000,
  boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
};

const logoStyle = {
  fontSize: '1.5rem',
  color: '#fff',
  margin: 0,
};

const navListStyle = {
  display: 'flex',
  listStyle: 'none',
  alignItems: 'center',
  margin: 0,
};

navListStyle.li = {
  marginLeft: '1.5rem',
};

navListStyle.li.a = {
  color: '#fff',
  textDecoration: 'none',
  fontWeight: 'bold',
};

export default Navbar;