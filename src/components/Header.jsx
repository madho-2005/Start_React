import React from 'react';

// The Header component displays the brand logo and scroll-to-builder link.
export default function Header() {
  
  // Scrolls smoothly to the Profile Builder section
  const handleScrollToBuilder = (e) => {
    e.preventDefault();
    const builderSection = document.getElementById('builder');
    if (builderSection) {
      builderSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="navbar">
      <div className="container navbar-container">
        
        {/* Brand logo */}
        <a href="#home" className="logo">
          SHV<span>.info</span>
        </a>
        
        {/* Navigation links */}
        <nav>
          <ul className="nav-menu">
            <li className="nav-item">
              <a href="#home">Home</a>
            </li>
            <li className="nav-item">
              <a href="#builder" onClick={handleScrollToBuilder}>
                Profile Builder
              </a>
            </li>
          </ul>
        </nav>
        
        {/* CTA Button */}
        <div>
          <button onClick={handleScrollToBuilder} className="btn btn-secondary">
            Get Started
          </button>
        </div>

      </div>
    </header>
  );
}
