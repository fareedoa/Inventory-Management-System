import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
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