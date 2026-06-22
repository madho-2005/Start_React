import React, { useEffect } from 'react';

// INR formatter
const inr = (n) => '₹' + n.toLocaleString('en-IN');

// Product data mirrored here so the drawer can show product names
const PRODUCTS = [
  { id: 1, emoji: '💻', name: 'MacBook Pro M3',      price: 166900 },
  { id: 2, emoji: '📱', name: 'iPhone 16 Pro',        price: 119900 },
  { id: 3, emoji: '🎧', name: 'Sony WH‑1000XM5',     price: 23990  },
  { id: 4, emoji: '⌚', name: 'Apple Watch Ultra 2',  price: 66900  },
  { id: 5, emoji: '🖥️', name: 'LG UltraWide 34"',   price: 57990  },
  { id: 6, emoji: '🎮', name: 'PS5 DualSense Edge',   price: 16990  },
];

/**
 * CartDrawer — slide-in panel from the right
 *
 * Props:
 *  isOpen       : boolean  – show/hide the drawer
 *  onClose      : fn       – close the drawer
 *  cart         : object   – { [productId]: count }
 *  onRemoveOne  : fn(id)   – reduce qty by 1
 *  onAddOne     : fn(id)   – increase qty by 1
 *  onClear      : fn       – empty the cart
 */
export default function CartDrawer({ isOpen, onClose, cart, onRemoveOne, onAddOne, onClear }) {

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Build line-items from cart object
  const items = Object.entries(cart)
    .filter(([, qty]) => qty > 0)
    .map(([id, qty]) => {
      const p = PRODUCTS.find((p) => p.id === Number(id));
      return { ...p, qty };
    });

  const totalItems = items.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        className={`cd-backdrop ${isOpen ? 'cd-backdrop--open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ── Drawer Panel ── */}
      <aside
        className={`cd-drawer ${isOpen ? 'cd-drawer--open' : ''}`}
        aria-label="Shopping Cart"
        role="dialog"
        aria-modal="true"
        id="cart-drawer"
      >
        {/* Header */}
        <div className="cd-header">
          <div className="cd-header-left">
            <span className="cd-header-icon">🛒</span>
            <div>
              <h2 className="cd-title">Your Cart</h2>
              <p className="cd-subtitle">
                {totalItems > 0
                  ? `${totalItems} item${totalItems !== 1 ? 's' : ''}`
                  : 'Empty'}
              </p>
            </div>
          </div>
          <button className="cd-close-btn" onClick={onClose} id="cart-close-btn" aria-label="Close cart">
            ✕
          </button>
        </div>

        {/* ── Body ── */}
        <div className="cd-body">
          {items.length === 0 ? (
            /* Empty state */
            <div className="cd-empty">
              <span className="cd-empty-icon">🛍️</span>
              <p className="cd-empty-title">Your cart is empty</p>
              <p className="cd-empty-sub">Add some products from the store!</p>
              <button className="btn btn-primary cd-shop-btn" onClick={onClose}>
                Browse Products
              </button>
            </div>
          ) : (
            /* Item list */
            <ul className="cd-item-list">
              {items.map((item) => (
                <li key={item.id} className="cd-item" id={`cart-item-${item.id}`}>
                  {/* Emoji */}
                  <div className="cd-item-emoji">{item.emoji}</div>

                  {/* Info */}
                  <div className="cd-item-info">
                    <span className="cd-item-name">{item.name}</span>
                    <span className="cd-item-unit">{inr(item.price)} each</span>
                  </div>

                  {/* Qty controls */}
                  <div className="cd-qty-controls">
                    <button
                      className="cd-qty-btn cd-qty-minus"
                      onClick={() => onRemoveOne(item.id)}
                      aria-label={`Remove one ${item.name}`}
                      id={`cart-minus-${item.id}`}
                    >
                      −
                    </button>
                    <span className="cd-qty-num">{item.qty}</span>
                    <button
                      className="cd-qty-btn cd-qty-plus"
                      onClick={() => onAddOne(item.id)}
                      aria-label={`Add one ${item.name}`}
                      id={`cart-plus-${item.id}`}
                    >
                      +
                    </button>
                  </div>

                  {/* Line total */}
                  <span className="cd-item-total">
                    {inr(item.price * item.qty)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ── Footer ── */}
        {items.length > 0 && (
          <div className="cd-footer">
            {/* Order summary */}
            <div className="cd-summary">
              <div className="cd-summary-row">
                <span className="cd-summary-label">Subtotal</span>
                <span className="cd-summary-value">{inr(totalPrice)}</span>
              </div>
              <div className="cd-summary-row">
                <span className="cd-summary-label">Shipping</span>
                <span className="cd-summary-free">Free</span>
              </div>
              <div className="cd-summary-divider" />
              <div className="cd-summary-row cd-summary-row--total">
                <span className="cd-total-label">Total</span>
                <span className="cd-total-value">{inr(totalPrice)}</span>
              </div>
            </div>

            {/* Actions */}
            <button className="cd-checkout-btn" id="cart-checkout-btn">
              Checkout — {inr(totalPrice)}
            </button>
            <button className="cd-clear-btn" onClick={onClear} id="cart-clear-btn">
              Clear Cart
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
