import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalItems: 0,
    lowStock: 0,
    outOfStock: 0,
    totalValue: 0,
  });

  const [recentItems, setRecentItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch dashboard data
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Replace with your actual API call
      // const response = await getDashboardStats();
      // setStats(response.data);
      
      // Mock data for demonstration
      setTimeout(() => {
        setStats({
          totalItems: 156,
          lowStock: 12,
          outOfStock: 3,
          totalValue: 45780,
        });
        
        setRecentItems([
          { id: 1, name: 'Laptop Dell XPS 15', quantity: 5, price: 1299 },
          { id: 2, name: 'Wireless Mouse', quantity: 45, price: 29.99 },
          { id: 3, name: 'USB-C Cable', quantity: 120, price: 12.99 },
          { id: 4, name: 'Monitor 27"', quantity: 8, price: 349 },
          { id: 5, name: 'Keyboard Mechanical', quantity: 15, price: 89.99 },
        ]);
        
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-description">
          Welcome back! Here's an overview of your inventory.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card stat-card-primary">
          <div className="stat-icon">📦</div>
          <div className="stat-content">
            <div className="stat-label">Total Items</div>
            <div className="stat-value">{stats.totalItems}</div>
            <div className="stat-change positive">
              <span>↑</span> 12% from last month
            </div>
          </div>
        </div>

        <div className="stat-card stat-card-warning">
          <div className="stat-icon">⚠️</div>
          <div className="stat-content">
            <div className="stat-label">Low Stock</div>
            <div className="stat-value">{stats.lowStock}</div>
            <div className="stat-change">
              Items need reordering
            </div>
          </div>
        </div>

        <div className="stat-card stat-card-danger">
          <div className="stat-icon">❌</div>
          <div className="stat-content">
            <div className="stat-label">Out of Stock</div>
            <div className="stat-value">{stats.outOfStock}</div>
            <div className="stat-change negative">
              <span>↓</span> Requires attention
            </div>
          </div>
        </div>

        <div className="stat-card stat-card-success">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <div className="stat-label">Total Value</div>
            <div className="stat-value">${stats.totalValue.toLocaleString()}</div>
            <div className="stat-change positive">
              <span>↑</span> 8% from last month
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2 className="section-title">Quick Actions</h2>
        <div className="action-buttons">
          <Link to="/add-item" className="action-card">
            <div className="action-icon">➕</div>
            <div className="action-content">
              <h3>Add New Item</h3>
              <p>Add a new product to inventory</p>
            </div>
          </Link>

          <Link to="/inventory" className="action-card">
            <div className="action-icon">📋</div>
            <div className="action-content">
              <h3>View Inventory</h3>
              <p>Browse all inventory items</p>
            </div>
          </Link>

          <Link to="/reports" className="action-card">
            <div className="action-icon">📊</div>
            <div className="action-content">
              <h3>Reports</h3>
              <p>View detailed analytics</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Items */}
      <div className="recent-section">
        <div className="section-header">
          <h2 className="section-title">Recent Items</h2>
          <Link to="/inventory" className="view-all-link">
            View All →
          </Link>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="product-name">{item.name}</div>
                  </td>
                  <td>
                    <span className="quantity-badge">{item.quantity}</span>
                  </td>
                  <td>
                    <span className="price">${item.price.toFixed(2)}</span>
                  </td>
                  <td>
                    <span className={`badge ${getStockStatus(item.quantity)}`}>
                      {getStockLabel(item.quantity)}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons-inline">
                      <button className="btn-icon btn-icon-sm" title="Edit">
                        ✏️
                      </button>
                      <button className="btn-icon btn-icon-sm" title="Delete">
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Helper functions
const getStockStatus = (quantity) => {
  if (quantity === 0) return 'badge-danger';
  if (quantity < 10) return 'badge-warning';
  return 'badge-success';
};

const getStockLabel = (quantity) => {
  if (quantity === 0) return 'Out of Stock';
  if (quantity < 10) return 'Low Stock';
  return 'In Stock';
};

export default Dashboard;