import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get user from localStorage (adjust based on your auth implementation)
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  const handleLogout = () => {
    // Clear auth data
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Don't show navbar on auth pages
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-brand">
          <span className="brand-icon">📦</span>
          <span className="brand-text">Inventory Manager</span>
        </Link>

        <div className="navbar-nav">
          <Link 
            to="/dashboard" 
            className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/inventory" 
            className={`nav-link ${location.pathname === '/inventory' ? 'active' : ''}`}
          >
            Inventory
          </Link>
          <Link 
            to="/add-item" 
            className={`nav-link ${location.pathname === '/add-item' ? 'active' : ''}`}
          >
            Add Item
          </Link>
          
          <div className="navbar-user">
            <div className="user-info">
              <div className="user-avatar">
                {user?.name ? user.name.charAt(0).toUpperCase() : user?.email ? user.email.charAt(0).toUpperCase() : 'U'}
              </div>
              <span className="user-name">{user?.name || user?.email || 'User'}</span>
            </div>
            <button onClick={handleLogout} className="btn-logout">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;