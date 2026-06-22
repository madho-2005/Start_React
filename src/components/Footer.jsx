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

        {/* Nav links */}
        <div className="footer-links">
          <a href="#task-tracker-section" className="footer-link">Tasks</a>
          <a href="#product-ui-section" className="footer-link">Products</a>
          <a href="#builder" className="footer-link">Builder</a>
        </div>

        {/* Copyright disclaimer */}
        <div className="footer-text">
          &copy; {new Date().getFullYear()} urvish.info &mdash; React Learning App
        </div>

      </div>
    </footer>
  );
}
