import React from 'react';

// Card component accepts title and price as props
// This demonstrates Day 4: Props Usage — passing data into components
export default function Card({ title, price }) {
  return (
    <div className="product-card">
      {/* Card Icon / Thumbnail placeholder */}
      <div className="product-card-icon">🛍️</div>

      {/* Title passed via props */}
      <h3 className="product-card-title">{title}</h3>

      {/* Price passed via props */}
      <p className="product-card-price">₹{price}</p>

      <button className="btn btn-primary product-card-btn">Buy Now</button>
    </div>
  );
}
