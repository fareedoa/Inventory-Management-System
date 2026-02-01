import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FiPackage, FiLayout, FiBox, FiFolder, FiPlus, FiUser, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    setIsMobileMenuOpen(false);
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
          <div className="brand-icon">
            <FiPackage />
          </div>
          <span className="brand-text">Inventory Manager</span>
        </Link>

        <button
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>

        <div className={`navbar-nav ${isMobileMenuOpen ? 'active' : ''}`}>
          <Link
            to="/dashboard"
            className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <FiLayout className="nav-icon" /> Dashboard
          </Link>
          <Link
            to="/products"
            className={`nav-link ${location.pathname === '/products' ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <FiBox className="nav-icon" /> Inventory
          </Link>
          <Link
            to="/categories"
            className={`nav-link ${location.pathname.startsWith('/categories') ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <FiFolder className="nav-icon" /> Categories
          </Link>
          <Link
            to="/products/add"
            className={`nav-link ${location.pathname === '/products/add' ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <FiPlus className="nav-icon" /> Add Item
          </Link>

          <div className="navbar-user">
            <div className="user-info">
              <div className="user-avatar">
                {user?.name ? user.name.charAt(0).toUpperCase() : <FiUser />}
              </div>
              <span className="user-name">{user?.name || user?.email || 'User'}</span>
            </div>
            <button onClick={handleLogout} className="btn-logout">
              <FiLogOut /> Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;