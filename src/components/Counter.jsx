import React, { useState } from 'react';
import Modal from './Modal';

// Day 5 + Day 6 Combined – useState Counter with Event Handling
// onClick: + adds count AND shows modal
// onDoubleClick: Reset resets count
// onMouseEnter/Leave: hover shows tooltip text on each button
export default function Counter() {

  // Count state
  const [count, setCount] = useState(0);

  // Tooltip text state — which button is being hovered
  const [tooltip, setTooltip] = useState('');

  // Modal state
  const [modal, setModal] = useState({
    isOpen: false,
    type: 'info',
    title: '',
    message: ''
  });

  // Helper: open modal
  const showModal = (type, title, message) => {
    setModal({ isOpen: true, type, title, message });
  };

  // Helper: close modal
  const closeModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }));
  };

  // ── onClick: increment AND show modal ──
  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    showModal('info', 'Count Increased!', `➕ Counter has been increased to ${newCount}!`);
  };

  // ── onClick: decrement (no modal, just state change) ──
  const handleDecrement = () => {
    if (count > 0) setCount(count - 1);
  };

  // ── onDoubleClick: reset count AND show modal ──
  const handleReset = () => {
    setCount(0);
    showModal('warning', 'Counter Reset', '🔄 The counter has been reset back to zero.');
  };

  // ── onMouseEnter: show tooltip text ──
  const showTooltip = (text) => setTooltip(text);

  // ── onMouseLeave: hide tooltip ──
  const hideTooltip = () => setTooltip('');

  return (
    <div className="counter-card">

      {/* Custom Modal */}
      <Modal
        isOpen={modal.isOpen}
        type={modal.type}
        title={modal.title}
        message={modal.message}
        onClose={closeModal}
      />

      {/* Badge */}
      <span className="counter-badge">useState + Events</span>

      <h3 className="counter-title">🔢 Counter</h3>

      {/* Count Display */}
      <div className={`counter-display ${count > 0 ? 'positive' : ''}`}>
        {count}
      </div>

      {/* Tooltip text (shows on hover) */}
      <div className="counter-tooltip-bar">
        {tooltip ? (
          <span className="counter-tooltip-text">⟵ {tooltip}</span>
        ) : (
          <span className="counter-tooltip-placeholder">hover a button to see its name</span>
        )}
      </div>

      {/* Controls */}
      <div className="counter-controls">

        {/* − button: onClick decrement, hover shows "Minus" */}
        <button
          className="btn counter-btn counter-btn-minus"
          onClick={handleDecrement}
          onMouseEnter={() => showTooltip('Minus  −')}
          onMouseLeave={hideTooltip}
          disabled={count === 0}
        >
          −
        </button>

        {/* Reset button: onDoubleClick resets, hover shows "Reset" */}
        <button
          className="btn counter-btn-reset"
          onDoubleClick={handleReset}
          onMouseEnter={() => showTooltip('Reset  (double-click me!)')}
          onMouseLeave={hideTooltip}
        >
          Reset
        </button>

        {/* + button: onClick increment + modal, hover shows "Plus" */}
        <button
          className="btn counter-btn counter-btn-plus"
          onClick={handleIncrement}
          onMouseEnter={() => showTooltip('Plus  +')}
          onMouseLeave={hideTooltip}
        >
          +
        </button>
      </div>
    </div>
  );
}
