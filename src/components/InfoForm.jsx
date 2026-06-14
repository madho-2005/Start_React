import React, { useState } from 'react';
import Modal from './Modal';

// The InfoForm component manages form input states (name, age, gender)
// and displays a live synchronization preview card.
export default function InfoForm() {

  // State object storing form values
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '', // Stores 'Male', 'Female', or 'Other'
    occupation: '',
    bio: '',
    hobby: '',
    interest: ''
  });

  // State to track if form was submitted
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Modal state — controls which alert popup is shown
  const [modal, setModal] = useState({
    isOpen: false,
    type: 'info',
    title: '',
    message: ''
  });

  // Helper: open the modal with given content
  const showModal = (type, title, message) => {
    setModal({ isOpen: true, type, title, message });
  };

  // Helper: close the modal
  const closeModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }));
  };

  // Updates form state dynamically on typing/clicking
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Age increment/decrement handlers
  const handleAgeUp = () => {
    const current = parseInt(formData.age) || 0;
    if (current < 120) {
      setFormData({ ...formData, age: String(current + 1) });
    }
  };

  const handleAgeDown = () => {
    const current = parseInt(formData.age) || 0;
    if (current > 1) {
      setFormData({ ...formData, age: String(current - 1) });
    }
  };

  // Triggers when user submits form — shows success modal
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.age || !formData.gender) {
      showModal('error', 'Missing Fields', 'Please fill out all required fields marked with *.');
      return;
    }
    setIsSubmitted(true);
    showModal('success', 'Profile Generated!', `Great job, ${formData.name}! Your profile card has been created and is live on the right.`);
  };

  // Clears the inputs and resets view
  const handleReset = () => {
    setFormData({
      name: '',
      age: '',
      gender: '',
      occupation: '',
      bio: '',
      hobby: '',
      interest: ''
    });
    setIsSubmitted(false);
  };

  // Download button — shows info modal
  const handleDownload = () => {
    showModal('info', 'Download', '📥 Download feature coming soon! Your profile card will be exported as a PDF.');
  };

  // Helper to select avatar emoji based on gender
  const getAvatar = () => {
    if (formData.gender === 'Male') return '👨';
    if (formData.gender === 'Female') return '👩';
    if (formData.gender === 'Other') return '🧑';
    return '👤';
  };

  return (
    <section id="builder" className="container main-content">

      {/* Custom Modal — replaces all native alert() calls */}
      <Modal
        isOpen={modal.isOpen}
        type={modal.type}
        title={modal.title}
        message={modal.message}
        onClose={closeModal}
      />

      <div className="form-preview-grid">

        {/* LEFT COLUMN: Input Form */}
        <div>
          {!isSubmitted ? (
            <div className="card">
              <h2 className="form-title">Profile Configuration</h2>

              <form onSubmit={handleFormSubmit}>

                {/* Name Field */}
                <div className="form-field">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="input-text"
                    placeholder="e.g. Urvish Thummar"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Age Field — Custom +/- buttons instead of native number spinner */}
                <div className="form-field">
                  <label htmlFor="age">Age *</label>
                  <div className="age-input-wrapper">
                    <button
                      type="button"
                      className="age-btn age-btn-minus"
                      onClick={handleAgeDown}
                      disabled={!formData.age || parseInt(formData.age) <= 1}
                    >
                      −
                    </button>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      className="input-text age-input-field"
                      placeholder="25"
                      value={formData.age}
                      onChange={handleInputChange}
                      min="1"
                      max="120"
                      required
                    />
                    <button
                      type="button"
                      className="age-btn age-btn-plus"
                      onClick={handleAgeUp}
                      disabled={parseInt(formData.age) >= 120}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Gender Radio buttons */}
                <div className="form-field">
                  <label>Gender *</label>
                  <div className="radio-group">

                    <label className="radio-option">
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={formData.gender === 'Male'}
                        onChange={handleInputChange}
                        required
                      />
                      <span>Male</span>
                    </label>

                    <label className="radio-option">
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={formData.gender === 'Female'}
                        onChange={handleInputChange}
                      />
                      <span>Female</span>
                    </label>

                    <label className="radio-option">
                      <input
                        type="radio"
                        name="gender"
                        value="Other"
                        checked={formData.gender === 'Other'}
                        onChange={handleInputChange}
                      />
                      <span>Other</span>
                    </label>

                  </div>
                </div>

                {/* Occupation Field */}
                <div className="form-field">
                  <label htmlFor="occupation">Occupation</label>
                  <input
                    type="text"
                    id="occupation"
                    name="occupation"
                    className="input-text"
                    placeholder="e.g. Full Stack Developer"
                    value={formData.occupation}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Hobby Field */}
                <div className="form-field">
                  <label htmlFor="hobby">Hobby</label>
                  <input
                    type="text"
                    id="hobby"
                    name="hobby"
                    className="input-text"
                    placeholder="e.g. Photography, Gaming"
                    value={formData.hobby}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Interest Field */}
                <div className="form-field">
                  <label htmlFor="interest">Interest</label>
                  <input
                    type="text"
                    id="interest"
                    name="interest"
                    className="input-text"
                    placeholder="e.g. AI, Space, Music"
                    value={formData.interest}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Bio Field */}
                <div className="form-field">
                  <label htmlFor="bio">Biography</label>
                  <textarea
                    id="bio"
                    name="bio"
                    className="input-text"
                    placeholder="Tell us about yourself..."
                    value={formData.bio}
                    onChange={handleInputChange}
                    style={{ minHeight: '80px', resize: 'vertical' }}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  Generate Profile Card
                </button>

              </form>
            </div>
          ) : (
            <div className="card success-box">
              <div className="success-check-circle">✓</div>
              <h2>Saved Successfully!</h2>
              <p style={{ color: 'var(--text-gray)', marginTop: '8px', marginBottom: '20px' }}>
                Your digital profile data is saved and previewed on the right.
              </p>
              <div className="success-buttons">
                <button onClick={handleReset} className="btn btn-secondary">
                  Create New Card
                </button>
                <button onClick={handleDownload} className="btn btn-primary">
                  Download
                </button>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Live Card Preview */}
        <div>
          <div className="card">

            {/* Live syncing status indicator */}
            <div className="preview-title-bar">
              <span className="preview-badge">Live Profile Card</span>
              <span style={{ fontSize: '12px', color: 'var(--primary-color)' }}>● Active Sync</span>
            </div>

            {/* Avatar Circle */}
            <div className={`preview-avatar-circle ${formData.gender ? 'filled' : ''}`}>
              {getAvatar()}
            </div>

            {/* Displaying values dynamically from form state */}
            <div className="preview-data-list">

              <div className="preview-item">
                <span className="preview-label">Name</span>
                <span className="preview-value">
                  {formData.name || <span className="placeholder-text">Urvish Thummar</span>}
                </span>
              </div>

              <div className="preview-item">
                <span className="preview-label">Age</span>
                <span className="preview-value">
                  {formData.age ? `${formData.age} years old` : <span className="placeholder-text">25</span>}
                </span>
              </div>

              <div className="preview-item">
                <span className="preview-label">Gender</span>
                <span className="preview-value">
                  {formData.gender || <span className="placeholder-text">Not selected</span>}
                </span>
              </div>

              <div className="preview-item">
                <span className="preview-label">Occupation</span>
                <span className="preview-value">
                  {formData.occupation || <span className="placeholder-text">Developer</span>}
                </span>
              </div>

              <div className="preview-item">
                <span className="preview-label">Hobby</span>
                <span className="preview-value">
                  {formData.hobby || <span className="placeholder-text">Not specified</span>}
                </span>
              </div>

              <div className="preview-item">
                <span className="preview-label">Interest</span>
                <span className="preview-value">
                  {formData.interest || <span className="placeholder-text">Not specified</span>}
                </span>
              </div>

              <div className="preview-item preview-item-last" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <span className="preview-label" style={{ marginBottom: '5px' }}>Bio</span>
                <span className="preview-value" style={{ fontWeight: 'normal', color: formData.bio ? 'var(--text-white)' : 'var(--text-gray)' }}>
                  {formData.bio || <span className="placeholder-text">User biography details...</span>}
                </span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
