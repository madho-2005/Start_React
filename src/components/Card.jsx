import React from 'react';

// Card component accepts title, price, and image as props
// This demonstrates Day 4: Props Usage — passing data into components
export default function Card({ title, price, image, emoji = '🛍️' }) {
  return (
    <div className="product-card">
      {/* Card Image / Thumbnail */}
      <div className="product-card-img-wrap">
        {image ? (
          <img src={image} alt={title} className="product-card-img" />
        ) : (
          <span className="product-card-icon">{emoji}</span>
        )}
      </div>

      {/* Title passed via props */}
      <h3 className="product-card-title">{title}</h3>

      {/* Price passed via props */}
      <p className="product-card-price">₹{price}</p>

      <button className="btn btn-primary product-card-btn">Buy Now</button>
    </div>
  );
}
