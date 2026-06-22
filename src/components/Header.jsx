import React from 'react';

/**
 * Header — sticky top navbar
 * Props:
 *  cartCount  : number  – total items in cart (shows badge)
 *  onCartOpen : fn      – called when cart icon is clicked
 */
export default function Header({ cartCount = 0, onCartOpen }) {

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
          urvish<span>.info</span>
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

        {/* Right side: Cart icon + CTA */}
        <div className="navbar-actions">

          {/* 🛒 Cart Icon Button */}
          <button
            className="nav-cart-btn"
            onClick={onCartOpen}
            id="nav-cart-btn"
            aria-label={`Open cart, ${cartCount} items`}
          >
            <svg
              className="nav-cart-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9"  cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>

            {/* Badge — only visible when cart has items */}
            {cartCount > 0 && (
              <span className="nav-cart-badge" aria-label={`${cartCount} items`}>
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </button>

          {/* CTA Button */}
          <button onClick={handleScrollToBuilder} className="btn btn-secondary">
            Get Started
          </button>
        </div>

      </div>
    </header>
  );
}
