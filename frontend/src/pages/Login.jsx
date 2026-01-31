import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoginForm from '../components/auth/LoginForm';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';
import './Auth.css';

const Login = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await login(formData);
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    
    toast.info('Google Sign-In will be implemented with backend OAuth integration');
    
  };

  return (
    <div className="auth-container">
      {/* Left Side - Branding */}
      <div className="auth-brand-section">
        <div className="brand-content">
          <span className="brand-logo">📦</span>
          <h2 className="brand-title">Inventory Manager</h2>
          <p className="brand-description">
            Streamline your inventory operations with our powerful management system. 
            Track, manage, and optimize your stock in real-time.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="auth-form-section">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Welcome Back</h1>
            <p>Sign in to continue to your account</p>
          </div>

          <LoginForm onSubmit={handleSubmit} loading={loading} />

          {/* Divider */}
          <div className="auth-divider">
            <span>Or</span>
          </div>

          {/* Google Sign-In Button */}
          <button 
            type="button" 
            className="google-signin-btn"
            onClick={handleGoogleSignIn}
          >
            <FcGoogle />
            <span>Continue with Google</span>
          </button>

          {/* Footer */}
          <div className="auth-footer">
            <p>
              Don't have an account?{' '}
              <Link to="/register" className="auth-link">
                Create one now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
