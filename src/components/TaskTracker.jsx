import React, { useState } from 'react';

// ── Task data ────────────────────────────────────────────────────────────────
const INITIAL_TASKS = [
  {
    id: 1,
    name: 'Mini Project Start',
    type: 'Project',
    typeColor: '#3b82f6',
    description: 'Start eCommerce UI',
    goal: 'Basic layout ready',
    status: 'Done',
    icon: '🚀',
  },
  {
    id: 2,
    name: 'Add to Cart',
    type: 'State',
    typeColor: '#8b5cf6',
    description: 'Add cart button with count',
    goal: 'Cart count updates',
    status: 'Done',
    icon: '🛒',
  },
  {
    id: 3,
    name: 'Improve UI',
    type: 'Design',
    typeColor: '#ec4899',
    description: 'Make UI better with CSS',
    goal: 'Better design',
    status: 'Done',
    icon: '🎨',
  },
  {
    id: 4,
    name: 'Code Cleanup',
    type: 'Best Practice',
    typeColor: '#10b981',
    description: 'Refactor code & structure',
    goal: 'Clean code',
    status: 'Done',
    icon: '🧹',
  },
];

// Status config — color & label for each option
const STATUS_CONFIG = {
  Pending:     { color: '#94a3b8', bg: 'rgba(148,163,184,0.12)', border: 'rgba(148,163,184,0.3)', dot: '#94a3b8' },
  'In Progress': { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)',  border: 'rgba(245,158,11,0.3)',  dot: '#f59e0b' },
  Done:        { color: '#10b981', bg: 'rgba(16,185,129,0.12)',  border: 'rgba(16,185,129,0.3)',  dot: '#10b981' },
  Blocked:     { color: '#ef4444', bg: 'rgba(239,68,68,0.12)',   border: 'rgba(239,68,68,0.3)',   dot: '#ef4444' },
};

// ── StatusBadge ──────────────────────────────────────────────────────────────
function StatusBadge({ status, onChange, taskId }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.Pending;

  return (
    <div className="tt-status-wrapper">
      <select
        className="tt-status-select"
        value={status}
        onChange={(e) => onChange(taskId, e.target.value)}
        id={`status-select-${taskId}`}
        style={{
          color: cfg.color,
          backgroundColor: cfg.bg,
          borderColor: cfg.border,
        }}
      >
        {Object.keys(STATUS_CONFIG).map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      <span className="tt-status-dot" style={{ backgroundColor: cfg.dot }} />
    </div>
  );
}

// ── TaskRow ──────────────────────────────────────────────────────────────────
function TaskRow({ task, onStatusChange, index }) {
  const isDone = task.status === 'Done';

  return (
    <div
      className={`tt-row ${isDone ? 'tt-row--done' : ''}`}
      id={`task-row-${task.id}`}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {/* Icon + Name */}
      <div className="tt-col tt-col-name">
        <span className="tt-row-icon">{task.icon}</span>
        <div className="tt-name-stack">
          <span className={`tt-task-name ${isDone ? 'tt-task-name--done' : ''}`}>
            {task.name}
          </span>
          {isDone && <span className="tt-done-line" aria-hidden="true" />}
        </div>
      </div>

      {/* Type pill */}
      <div className="tt-col tt-col-type">
        <span
          className="tt-type-pill"
          style={{
            color: task.typeColor,
            backgroundColor: `${task.typeColor}18`,
            border: `1px solid ${task.typeColor}33`,
          }}
        >
          {task.type}
        </span>
      </div>

      {/* Description */}
      <div className="tt-col tt-col-desc">
        <span className="tt-desc-text">{task.description}</span>
      </div>

      {/* Goal */}
      <div className="tt-col tt-col-goal">
        <span className="tt-goal-text" style={{ color: task.typeColor }}>
          {task.goal}
        </span>
      </div>

      {/* Status */}
      <div className="tt-col tt-col-status">
        <StatusBadge status={task.status} onChange={onStatusChange} taskId={task.id} />
      </div>
    </div>
  );
}

// ── Progress Bar ─────────────────────────────────────────────────────────────
function ProgressBar({ tasks }) {
  const done = tasks.filter((t) => t.status === 'Done').length;
  const pct = Math.round((done / tasks.length) * 100);

  return (
    <div className="tt-progress-wrap">
      <div className="tt-progress-labels">
        <span className="tt-progress-label">Overall Progress</span>
        <span className="tt-progress-pct">{pct}%</span>
      </div>
      <div className="tt-progress-track">
        <div
          className="tt-progress-fill"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      <div className="tt-progress-legend">
        {Object.entries(STATUS_CONFIG).map(([label, cfg]) => {
          const count = tasks.filter((t) => t.status === label).length;
          return count > 0 ? (
            <span key={label} className="tt-legend-item">
              <span className="tt-legend-dot" style={{ backgroundColor: cfg.dot }} />
              {label}: <strong>{count}</strong>
            </span>
          ) : null;
        })}
      </div>
    </div>
  );
}

// ── Main TaskTracker ─────────────────────────────────────────────────────────
export default function TaskTracker() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  // Update a task's status
  function handleStatusChange(taskId, newStatus) {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  }

  const doneCount = tasks.filter((t) => t.status === 'Done').length;
  const allDone = doneCount === tasks.length;

  return (
    <section className="tt-section container" id="task-tracker-section">

      {/* Section header */}
      <div className="tt-header">
        <span className="tt-header-badge">📋 Mini Project Roadmap</span>
        <h2 className="tt-header-title gradient-title">Task Tracker</h2>
        <p className="tt-header-sub">
          Track every milestone — update status live with <code>useState</code>
        </p>
      </div>

      {/* Progress bar */}
      <ProgressBar tasks={tasks} />

      {/* Completion banner */}
      {allDone && (
        <div className="tt-all-done-banner" id="all-done-banner">
          <span className="tt-all-done-icon">🎉</span>
          <span className="tt-all-done-text">All tasks completed! Great work!</span>
        </div>
      )}

      {/* Table card */}
      <div className="tt-table-card">

        {/* Table header */}
        <div className="tt-table-head">
          <div className="tt-col tt-col-name">Task</div>
          <div className="tt-col tt-col-type">Category</div>
          <div className="tt-col tt-col-desc">Description</div>
          <div className="tt-col tt-col-goal">Goal</div>
          <div className="tt-col tt-col-status">Status</div>
        </div>

        {/* Task rows */}
        <div className="tt-table-body">
          {tasks.map((task, i) => (
            <TaskRow
              key={task.id}
              task={task}
              onStatusChange={handleStatusChange}
              index={i}
            />
          ))}
        </div>
      </div>

      {/* Footer hint */}
      <div className="tt-footer-hint">
        <span className="tt-hint-text">
          💡 Click the <code>Status</code> dropdown on any row to update it live
        </span>
      </div>

    </section>
  );
}
