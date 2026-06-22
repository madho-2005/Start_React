import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import InfoForm from './components/InfoForm';
import Footer from './components/Footer';
import Card from './components/Card';
import Counter from './components/Counter';
import ListRendering from './components/ListRendering';
import ProductUI from './components/ProductUI';
import TaskTracker from './components/TaskTracker';
import CartDrawer from './components/CartDrawer';

// The App component acts as the main layout.
// Cart state is lifted here so Header, ProductUI, and CartDrawer all share it.
function App() {

  // ── Cart state: { [productId]: count } ──
  const [cart, setCart] = useState({});

  // ── Cart drawer open/close ──
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Total number of items across all products
  const cartTotalItems = Object.values(cart).reduce((sum, n) => sum + n, 0);

  // Add one unit of a product
  function handleAddToCart(product) {
    setCart((prev) => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1,
    }));
  }

  // Add one more of an existing item (used by drawer +)
  function handleAddOne(productId) {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  }

  // Remove one unit; if count hits 0, delete the key
  function handleRemoveOne(productId) {
    setCart((prev) => {
      const current = prev[productId] || 0;
      if (current <= 1) {
        const next = { ...prev };
        delete next[productId];
        return next;
      }
      return { ...prev, [productId]: current - 1 };
    });
  }

  // Empty the whole cart
  function handleClearCart() {
    setCart({});
  }

  return (
    <>
      {/* 1. Navigation Header — receives cart count & open handler */}
      <Header
        cartCount={cartTotalItems}
        onCartOpen={() => setIsCartOpen(true)}
      />

      {/* Cart Drawer — slides in from the right */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onAddOne={handleAddOne}
        onRemoveOne={handleRemoveOne}
        onClear={handleClearCart}
      />

      {/* 2. Main Page Content */}
      <main>
        {/* Welcome Hero Area */}
        <Hero />

        {/* ── Task Tracker: Mini Project Roadmap ── */}
        <TaskTracker />

        {/* Day 4 – Props Usage: 3 dynamic cards with title & price passed as props */}
        <section className="container" style={{ padding: '40px 0' }}>
          <h2 className="section-heading">🛒 Our Products</h2>
          <p className="section-sub">
            Props in action — each card receives a unique <code>title</code> &amp; <code>price</code>
          </p>
          <div className="cards-grid">
            <Card title="React Course" price="499" />
            <Card title="JavaScript Pro" price="799" />
            <Card title="Full Stack Bundle" price="1299" />
          </div>
        </section>

        {/* Day 5 + 6 – useState Counter with Event Handling combined */}
        <section className="container" style={{ padding: '0 0 60px 0' }}>
          <h2 className="section-heading">🔢 useState Counter + Events</h2>
          <p className="section-sub">
            <code>onClick</code> alerts &middot; <code>onDoubleClick</code> resets &middot; <code>onMouseEnter</code> shows tooltips
          </p>
          <Counter />
        </section>

        {/* Day 8 – List Rendering: render array using .map() */}
        <ListRendering />

        {/* Day 9 – Product UI: cart state lifted up, passed as props */}
        <ProductUI
          cart={cart}
          onAddToCart={handleAddToCart}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* Dynamic Form & Preview Card Area */}
        <InfoForm />
      </main>

      {/* 3. Bottom Footer */}
      <Footer />
    </>
  );
}

export default App;
