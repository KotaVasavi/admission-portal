import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div className="container" style={{ textAlign: 'center' }}>
        <div style={socialStyle}>
          <a href="#"><FaFacebook /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaLinkedin /></a>
        </div>
        <p>&copy; {new Date().getFullYear()} FutureStart. All Rights Reserved.</p>
        <div style={linksStyle}>
          <a href="#">Privacy Policy</a> | <a href="#">Terms of Use</a> | <a href="#">Contact</a>
        </div>
      </div>
    </footer>
  );
};

const footerStyle = {
  backgroundColor: 'var(--dark-purple)',
  color: 'var(--text-muted)',
  padding: '2rem 0',
  marginTop: '3rem',
};

const socialStyle = {
  margin: '1rem 0',
};

socialStyle.a = {
  color: 'var(--text-light)',
  fontSize: '1.5rem',
  margin: '0 1rem',
};

const linksStyle = {
  marginTop: '1rem',
  fontSize: '0.9rem',
};

linksStyle.a = {
  color: 'var(--text-muted)',
  margin: '0 0.5rem',
};

export default Footer;