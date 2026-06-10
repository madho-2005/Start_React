import React, { useState } from 'react';

// Day 5 + Day 6 Combined – useState Counter with Event Handling
// onClick: + adds count AND shows alert
// onDoubleClick: Reset resets count
// onMouseEnter/Leave: hover shows tooltip text on each button
export default function Counter() {

  // Count state
  const [count, setCount] = useState(0);

  // Tooltip text state — which button is being hovered
  const [tooltip, setTooltip] = useState('');

  // ── onClick: increment AND alert ──
  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    alert(`➕ Count increased to ${newCount}!`);
  };

  // ── onClick: decrement (no alert, just state change) ──
  const handleDecrement = () => {
    if (count > 0) setCount(count - 1);
  };

  // ── onDoubleClick: reset count ──
  const handleReset = () => {
    setCount(0);
    alert('🔄 Counter has been reset!');
  };

  // ── onMouseEnter: show tooltip text ──
  const showTooltip = (text) => setTooltip(text);

  // ── onMouseLeave: hide tooltip ──
  const hideTooltip = () => setTooltip('');

  return (
    <div className="counter-card">
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

        {/* + button: onClick increment + alert, hover shows "Plus" */}
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
