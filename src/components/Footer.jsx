import React from 'react';

// The Footer component outputs copyright text at the bottom.
export default function Footer() {
  return (
    <footer className="page-footer">
      <div className="container footer-container">
        
        {/* Logo link */}
        <a href="#home" className="logo">
          urvish<span>.info</span>
        </a>
        
        {/* Copyright disclaimer */}
        <div className="footer-text">
          &copy; {new Date().getFullYear()} urvish.info. Simple Single-Page React App.
        </div>

      </div>
    </footer>
  );
}
