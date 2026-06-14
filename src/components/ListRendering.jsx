import React, { useState } from 'react';
import Modal from './Modal';

// Day 8 – List Rendering
// Demonstrates rendering an array using .map() with dynamic add/remove.
export default function ListRendering() {

  // Initial array of skill items — each has a unique id, label, and category tag
  const [skills, setSkills] = useState([
    { id: 1, name: 'HTML & CSS',       category: 'Frontend',  icon: '🎨' },
    { id: 2, name: 'JavaScript',       category: 'Language',  icon: '⚡' },
    { id: 3, name: 'React.js',         category: 'Frontend',  icon: '⚛️'  },
    { id: 4, name: 'Node.js',          category: 'Backend',   icon: '🟢' },
    { id: 5, name: 'Git & GitHub',     category: 'DevOps',    icon: '🔧' },
  ]);

  // Controlled input for adding a new skill
  const [newSkill, setNewSkill]       = useState('');
  const [newCategory, setNewCategory] = useState('Frontend');
  const [newIcon, setNewIcon]         = useState('🚀');

  // Modal state
  const [modal, setModal] = useState({ isOpen: false, type: 'info', title: '', message: '' });
  const showModal = (type, title, message) => setModal({ isOpen: true, type, title, message });
  const closeModal = () => setModal((p) => ({ ...p, isOpen: false }));

  // Add a new skill to the array
  const handleAdd = () => {
    const trimmed = newSkill.trim();
    if (!trimmed) {
      showModal('error', 'Empty Name', 'Please type a skill name before adding.');
      return;
    }
    const next = {
      id: Date.now(), // unique id using timestamp
      name: trimmed,
      category: newCategory,
      icon: newIcon || '📌',
    };
    setSkills([...skills, next]);   // spread old array + append new item
    setNewSkill('');
    showModal('success', 'Skill Added!', `"${trimmed}" has been added to your skill list.`);
  };

  // Remove a skill by filtering it out by id
  const handleRemove = (id, name) => {
    setSkills(skills.filter((s) => s.id !== id));
    showModal('warning', 'Skill Removed', `"${name}" was removed from your list.`);
  };

  // Category badge colour mapping
  const categoryColor = {
    Frontend : { color: '#3b82f6', bg: 'rgba(59,130,246,0.12)',  border: 'rgba(59,130,246,0.25)'  },
    Backend  : { color: '#10b981', bg: 'rgba(16,185,129,0.12)',  border: 'rgba(16,185,129,0.25)'  },
    Language : { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)',  border: 'rgba(245,158,11,0.25)'  },
    DevOps   : { color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)',  border: 'rgba(139,92,246,0.25)'  },
    Other    : { color: '#ec4899', bg: 'rgba(236,72,153,0.12)',  border: 'rgba(236,72,153,0.25)'  },
  };

  const getCatStyle = (cat) => categoryColor[cat] || categoryColor.Other;

  return (
    <section className="container" style={{ padding: '0 0 60px 0' }}>

      {/* Modal */}
      <Modal
        isOpen={modal.isOpen}
        type={modal.type}
        title={modal.title}
        message={modal.message}
        onClose={closeModal}
      />

      {/* Section heading */}
      <h2 style={{ textAlign: 'center', marginBottom: '8px', color: 'var(--text-white)' }}>
        📋 List Rendering
      </h2>
      <p style={{ textAlign: 'center', color: 'var(--text-gray)', marginBottom: '30px' }}>
        Array rendered with <code>.map()</code> · add &amp; remove items dynamically
      </p>

      <div className="list-render-grid">

        {/* ── LEFT: Add-skill form ── */}
        <div className="card list-add-card">
          <div className="list-add-header">
            <span className="list-badge">➕ Add Skill</span>
            <span className="list-count">{skills.length} item{skills.length !== 1 ? 's' : ''}</span>
          </div>

          {/* Skill name */}
          <div className="form-field">
            <label htmlFor="skill-name">Skill Name</label>
            <input
              type="text"
              id="skill-name"
              className="input-text"
              placeholder="e.g. TypeScript"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            />
          </div>

          {/* Category select */}
          <div className="form-field">
            <label htmlFor="skill-category">Category</label>
            <select
              id="skill-category"
              className="input-text input-select"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            >
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Language">Language</option>
              <option value="DevOps">DevOps</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Emoji icon */}
          <div className="form-field">
            <label htmlFor="skill-icon">Icon (emoji)</label>
            <input
              type="text"
              id="skill-icon"
              className="input-text"
              placeholder="e.g. 🚀"
              value={newIcon}
              onChange={(e) => setNewIcon(e.target.value)}
              maxLength={4}
            />
          </div>

          <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleAdd}>
            Add to List
          </button>

          {/* Code hint */}
          <div className="list-code-hint">
            <span className="list-code-line">
              <span style={{ color: '#f59e0b' }}>setSkills</span>
              {'([...skills, newItem])'}
            </span>
          </div>
        </div>

        {/* ── RIGHT: Rendered list using .map() ── */}
        <div className="card list-display-card">
          <div className="list-add-header">
            <span className="list-badge" style={{ color: '#10b981', background: 'rgba(16,185,129,0.1)' }}>
              📋 Skills List
            </span>
            <span className="list-code-tag">{'skills.map((s) => <Item />)'}</span>
          </div>

          {skills.length === 0 ? (
            /* Empty state */
            <div className="list-empty-state">
              <span style={{ fontSize: '40px' }}>📭</span>
              <p>No skills yet — add one on the left!</p>
            </div>
          ) : (
            /* .map() renders each skill as a card row */
            <ul className="skill-list">
              {skills.map((skill, index) => {
                const cat = getCatStyle(skill.category);
                return (
                  <li key={skill.id} className="skill-item" style={{ animationDelay: `${index * 0.05}s` }}>

                    {/* Index badge — shows array index */}
                    <span className="skill-index">[{index}]</span>

                    {/* Emoji icon */}
                    <span className="skill-icon">{skill.icon}</span>

                    {/* Name */}
                    <span className="skill-name">{skill.name}</span>

                    {/* Category badge */}
                    <span
                      className="skill-category"
                      style={{ color: cat.color, background: cat.bg, border: `1px solid ${cat.border}` }}
                    >
                      {skill.category}
                    </span>

                    {/* Remove button */}
                    <button
                      className="skill-remove-btn"
                      onClick={() => handleRemove(skill.id, skill.name)}
                      title="Remove"
                    >
                      ✕
                    </button>

                  </li>
                );
              })}
            </ul>
          )}
        </div>

      </div>
    </section>
  );
}
