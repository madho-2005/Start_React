import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import InfoForm from './components/InfoForm';
import Footer from './components/Footer';
import Card from './components/Card';
import Counter from './components/Counter';
import ListRendering from './components/ListRendering';
import ProductUI from './components/ProductUI';

// The App component acts as the main layout, rendering our separated components.
function App() {
  return (
    <>
      {/* 1. Navigation Header bar */}
      <Header />

      {/* 2. Main Page Content wrapper */}
      <main>
        {/* Welcome Hero Area */}
        <Hero />

        {/* Day 4 – Props Usage: 3 dynamic cards with title & price passed as props */}
        <section className="container" style={{ padding: '40px 0' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '8px', color: 'var(--text-white)' }}>
            🛒 Our Products
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--text-gray)', marginBottom: '30px' }}>
            Props in action — each card receives a unique <code>title</code> &amp; <code>price</code>
          </p>
          <div className="cards-grid">
            {/* Card 1 */}
            <Card title="React Course" price="499" />
            {/* Card 2 */}
            <Card title="JavaScript Pro" price="799" />
            {/* Card 3 */}
            <Card title="Full Stack Bundle" price="1299" />
          </div>
        </section>

        {/* Day 5 + 6 – useState Counter with Event Handling combined */}
        <section className="container" style={{ padding: '0 0 60px 0' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '8px', color: 'var(--text-white)' }}>
            🔢 useState Counter + Events
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--text-gray)', marginBottom: '30px' }}>
            <code>onClick</code> alerts &middot; <code>onDoubleClick</code> resets &middot; <code>onMouseEnter</code> shows tooltips
          </p>
          <Counter />
        </section>


        {/* Day 8 – List Rendering: render array using .map() */}
        <ListRendering />

        {/* Day 9 – Product UI: styled product cards with props + .map() + cart state */}
        <ProductUI />

        {/* Dynamic Form & Preview Card Area */}
        <InfoForm />
      </main>

      {/* 3. Bottom Footer Area */}
      <Footer />
    </>
  );
}

export default App;
