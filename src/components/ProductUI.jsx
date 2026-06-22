import React, { useState } from 'react';

// ── Product data array ──────────────────────────────────────────────────
// Each object has all the props a ProductCard needs.
// We .map() over this array to render cards — combining Day 4 (Props) + Day 8 (Lists)
// INR formatter — e.g. 1,66,900
const inr = (n) => '₹' + n.toLocaleString('en-IN');

const PRODUCTS = [
  {
    id: 1,
    emoji: '💻',
    category: 'Electronics',
    categoryColor: '#3b82f6',
    name: 'MacBook Pro M3',
    description: '16‑inch Liquid Retina XDR, 18GB RAM, 512GB SSD',
    price: 166900,
    originalPrice: 207900,
    rating: 4.9,
    reviews: 2341,
    badge: 'Best Seller',
    badgeColor: '#f59e0b',
  },
  {
    id: 2,
    emoji: '📱',
    category: 'Mobile',
    categoryColor: '#8b5cf6',
    name: 'iPhone 16 Pro',
    description: '6.3‑inch OLED, A18 Pro chip, 48MP camera system',
    price: 119900,
    originalPrice: 134900,
    rating: 4.8,
    reviews: 5892,
    badge: 'New',
    badgeColor: '#10b981',
  },
  {
    id: 3,
    emoji: '🎧',
    category: 'Audio',
    categoryColor: '#ec4899',
    name: 'Sony WH‑1000XM5',
    description: 'Industry‑leading noise cancelling, 30hr battery',
    price: 23990,
    originalPrice: 29990,
    rating: 4.7,
    reviews: 8120,
    badge: '20% OFF',
    badgeColor: '#ef4444',
  },
  {
    id: 4,
    emoji: '⌚',
    category: 'Wearable',
    categoryColor: '#10b981',
    name: 'Apple Watch Ultra 2',
    description: 'Titanium case, GPS + Cellular, 60hr battery',
    price: 66900,
    originalPrice: 70900,
    rating: 4.6,
    reviews: 1203,
    badge: 'Popular',
    badgeColor: '#3b82f6',
  },
  {
    id: 5,
    emoji: '🖥️',
    category: 'Monitor',
    categoryColor: '#f59e0b',
    name: 'LG UltraWide 34"',
    description: '34‑inch curved WQHD, 144Hz, 1ms response time',
    price: 57990,
    originalPrice: 74990,
    rating: 4.5,
    reviews: 3450,
    badge: 'Sale',
    badgeColor: '#ef4444',
  },
  {
    id: 6,
    emoji: '🎮',
    category: 'Gaming',
    categoryColor: '#8b5cf6',
    name: 'PS5 DualSense Edge',
    description: 'Pro controller with adaptive triggers & haptic feedback',
    price: 16990,
    originalPrice: 19990,
    rating: 4.8,
    reviews: 6710,
    badge: 'Top Rated',
    badgeColor: '#10b981',
  },
];

// ── Star Rating helper ──────────────────────────────────────────────────
function StarRating({ rating }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="pc-stars" aria-label={`Rating: ${rating} out of 5`}>
      {stars.map((s) => (
        <span
          key={s}
          className={s <= Math.round(rating) ? 'pc-star filled' : 'pc-star'}
        >
          ★
        </span>
      ))}
      <span className="pc-rating-num">{rating}</span>
    </div>
  );
}

// ── Single ProductCard ──────────────────────────────────────────────────
// Props: product data + onAddToCart callback + cartCount from parent
function ProductCard({ product, onAddToCart, cartCount }) {
  const [added, setAdded] = useState(false);

  function handleAdd() {
    onAddToCart(product);
    setAdded(true);
    // Reset button text after 1.5s
    setTimeout(() => setAdded(false), 1500);
  }

  const discount =
    product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

  return (
    <div className="pc-card" id={`product-card-${product.id}`}>
      {/* Badge */}
      <span
        className="pc-badge"
        style={{ backgroundColor: `${product.badgeColor}22`, color: product.badgeColor, border: `1px solid ${product.badgeColor}44` }}
      >
        {product.badge}
      </span>

      {/* Product Image / Emoji Area */}
      <div className="pc-image-area" style={{ background: `${product.categoryColor}12` }}>
        <span className="pc-emoji">{product.emoji}</span>
      </div>

      {/* Category pill */}
      <span
        className="pc-category"
        style={{ color: product.categoryColor, backgroundColor: `${product.categoryColor}18`, border: `1px solid ${product.categoryColor}30` }}
      >
        {product.category}
      </span>

      {/* Name */}
      <h3 className="pc-name">{product.name}</h3>

      {/* Description */}
      <p className="pc-desc">{product.description}</p>

      {/* Stars */}
      <StarRating rating={product.rating} />
      <p className="pc-reviews">({product.reviews.toLocaleString()} reviews)</p>

      {/* Price Row */}
      <div className="pc-price-row">
        <span className="pc-price">{inr(product.price)}</span>
        {discount > 0 && (
          <>
            <span className="pc-original-price">{inr(product.originalPrice)}</span>
            <span className="pc-discount-tag">-{discount}%</span>
          </>
        )}
      </div>

      {/* Add to Cart Button */}
      <button
        id={`add-to-cart-${product.id}`}
        className={`pc-cart-btn ${added ? 'pc-cart-btn--added' : ''}`}
        onClick={handleAdd}
      >
        {added ? '✅ Added!' : '🛒 Add to Cart'}
      </button>

      {/* Cart count indicator — shows how many are in the cart */}
      {cartCount > 0 && (
        <p className="pc-in-cart">× {cartCount} in cart</p>
      )}
    </div>
  );
}

// ── Main ProductUI Section ──────────────────────────────────────────────
// Cart state is lifted to App.jsx — receives cart + handlers as props
export default function ProductUI({ cart, onAddToCart, onOpenCart }) {

  return (
    <section className="pc-section container" id="product-ui-section">

      {/* Section Header */}
      <div className="pc-header">
        <span className="pc-header-badge">📦 Day 9 · Product UI</span>
        <h2 className="pc-header-title gradient-title">Styled Product Cards</h2>
        <p className="pc-header-sub">
          <code>products.map()</code> renders each card · Props pass data · <code>useState</code> tracks the cart
        </p>
      </div>

      {/* Product Cards Grid — rendered with .map() */}
      <div className="pc-grid">
        {PRODUCTS.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            cartCount={cart[product.id] || 0}
          />
        ))}
      </div>

      {/* View Cart CTA — appears when cart has items */}
      {Object.values(cart).some((qty) => qty > 0) && (
        <div className="pc-view-cart-wrap">
          <button
            className="pc-view-cart-btn"
            onClick={onOpenCart}
            id="view-cart-btn"
          >
            🛒 View Cart — {Object.values(cart).reduce((s, n) => s + n, 0)} items
          </button>
        </div>
      )}

    </section>
  );
}
