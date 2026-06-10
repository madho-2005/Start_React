import React from 'react';

// The Hero component displays the large welcome text and introduction.
export default function Hero() {

  // Scrolls to the builder form when clicked
  const handleGetStarted = () => {
    const builderSection = document.getElementById('builder');
    if (builderSection) {
      builderSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero-section container">
      {/* Category tag */}
      <div className="hero-badge">Single Page Layout</div>
      
      {/* Main Title heading */}
      <h1>
        Create Your Digital <span className="gradient-title">Profile Card</span>
      </h1>
      
      {/* Secondary Description */}
      <p className="hero-description">
        Input your name, age, and details in the form below to watch your professional identity card compile in real-time.
      </p>
      
      {/* Scroll Trigger Button */}
      <button onClick={handleGetStarted} className="btn btn-primary">
        Start Building
      </button>
    </section>
  );
}
