import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import RegisterForm from '../components/auth/RegisterForm';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { MESSAGES } from '../utils/constants';
import './Auth.css';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await register(formData);
      toast.success(MESSAGES?.REGISTER_SUCCESS || 'Account created successfully!');
      
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          MESSAGES?.REGISTER_FAILED || 
                          'Failed to create account. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="auth-container">
      {/* Left Side - Branding */}
      <div className="auth-brand-section">
        <div className="brand-content">
          <span className="brand-logo">📦</span>
          <h2 className="brand-title">EasyStock</h2>
          <p className="brand-description">
            Join thousands of businesses managing their inventory efficiently. 
            Get started today with your free account.
          </p>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="auth-form-section">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Create Account</h1>
            <p>Get started with your inventory management journey</p>
          </div>

          <RegisterForm onSubmit={handleSubmit} loading={loading} />

          <div className="auth-footer">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="auth-link">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;