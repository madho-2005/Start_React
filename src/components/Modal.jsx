import React from 'react';

/**
 * Reusable Modal Component — replaces native browser alert()
 *
 * Props:
 *  - isOpen   : boolean  — show or hide the modal
 *  - type     : 'success' | 'error' | 'info' | 'warning'
 *  - title    : string   — bold heading text
 *  - message  : string   — body message text
 *  - onClose  : fn       — called when user clicks OK or the backdrop
 */
export default function Modal({ isOpen, type = 'info', title, message, onClose }) {
  if (!isOpen) return null;

  // Icon and color per type
  const typeConfig = {
    success: { icon: '✅', color: '#10b981', bg: 'rgba(16, 185, 129, 0.12)', border: 'rgba(16, 185, 129, 0.3)' },
    error:   { icon: '❌', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.12)',  border: 'rgba(239, 68, 68, 0.3)'  },
    warning: { icon: '⚠️', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.12)', border: 'rgba(245, 158, 11, 0.3)' },
    info:    { icon: '💡', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.12)', border: 'rgba(59, 130, 246, 0.3)' },
  };

  const cfg = typeConfig[type] || typeConfig.info;

  return (
    // Backdrop — clicking it closes the modal
    <div className="modal-backdrop" onClick={onClose}>
      {/* Modal box — stop click from bubbling to backdrop */}
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>

        {/* Icon circle */}
        <div
          className="modal-icon-circle"
          style={{ backgroundColor: cfg.bg, border: `2px solid ${cfg.border}`, color: cfg.color }}
        >
          {cfg.icon}
        </div>

        {/* Title */}
        <h3 className="modal-title" style={{ color: cfg.color }}>
          {title}
        </h3>

        {/* Message */}
        <p className="modal-message">{message}</p>

        {/* OK button */}
        <button
          className="modal-ok-btn"
          style={{ backgroundColor: cfg.color }}
          onClick={onClose}
        >
          OK
        </button>

      </div>
    </div>
  );
}
