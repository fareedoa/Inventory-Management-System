import React, { useState } from 'react';
import { validateRegisterForm, hasErrors } from '../../utils/validators';

const RegisterForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateRegisterForm(formData);
    
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    const {confirmPassword, ...payload} = formData;
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="form-group">
        <label htmlFor="name" className="form-label">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`form-control ${errors.name ? 'error' : ''}`}
          placeholder="Enter your full name"
        />
        {errors.name && <span className="form-error">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`form-control ${errors.email ? 'error' : ''}`}
          placeholder="Enter your email"
        />
        {errors.email && <span className="form-error">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={`form-control ${errors.password ? 'error' : ''}`}
          placeholder="Create a password"
        />
        {errors.password && <span className="form-error">{errors.password}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword" className="form-label">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={`form-control ${errors.confirmPassword ? 'error' : ''}`}
          placeholder="Confirm your password"
        />
        {errors.confirmPassword && <span className="form-error">{errors.confirmPassword}</span>}
      </div>

      <button type="submit" className="auth-submit-btn" disabled={loading}>
        {loading ? (
          <>
            <span className="spinner"></span>
            Creating account...
          </>
        ) : (
          'Create Account'
        )}
      </button>
    </form>
  );
};

export default RegisterForm;