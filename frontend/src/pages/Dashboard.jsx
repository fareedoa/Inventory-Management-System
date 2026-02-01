import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiBox, FiAlertTriangle, FiXCircle, FiDollarSign, FiPlus, FiList, FiEdit2, FiTrash2, FiArrowRight } from 'react-icons/fi';
import { getDashboardStats, getRecentItems } from '../services/dashboardService';
import { deleteProduct } from '../services/productService';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  
  const [stats, setStats] = useState({
    totalItems: 0,
    lowStock: 0,
    outOfStock: 0,
    totalValue: 0,
  });

  const [recentItems, setRecentItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch stats and recent items in parallel
      const [statsResponse, itemsResponse] = await Promise.all([
        getDashboardStats(),
        getRecentItems(5)
      ]);

      setStats(statsResponse.data);
      setRecentItems(itemsResponse.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to load dashboard data. Please try again.');
      
      // If unauthorized, redirect to login
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (productId) => {
    navigate(`/products/edit/${productId}`);
  };

  const handleDelete = async (productId, productName) => {
    // Confirm deletion
    const confirmed = window.confirm(
      `Are you sure you want to delete "${productName}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      await deleteProduct(productId);
      
      // Show success message
      alert('Product deleted successfully!');
      
      // Refresh dashboard data
      fetchDashboardData();
    } catch (error) {
      console.error('Error deleting product:', error);
      
      // Show error message
      const errorMessage = error.response?.data?.message || 'Failed to delete product. Please try again.';
      alert(errorMessage);
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

  if (error) {
    return (
      <div className="error-container">
        <p className="error-text">{error}</p>
        <button onClick={fetchDashboardData} className="btn btn-primary">
          Retry
        </button>
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
          <div className="stat-icon">
            <FiBox />
          </div>
          <div className="stat-content">
            <div className="stat-label">Total Items</div>
            <div className="stat-value">{stats.totalItems}</div>
            <div className="stat-change positive">
              <span>↑</span> 12% from last month
            </div>
          </div>
        </div>

        <div className="stat-card stat-card-warning">
          <div className="stat-icon">
            <FiAlertTriangle />
          </div>
          <div className="stat-content">
            <div className="stat-label">Low Stock</div>
            <div className="stat-value">{stats.lowStock}</div>
            <div className="stat-change">
              Items need reordering
            </div>
          </div>
        </div>

        <div className="stat-card stat-card-danger">
          <div className="stat-icon">
            <FiXCircle />
          </div>
          <div className="stat-content">
            <div className="stat-label">Out of Stock</div>
            <div className="stat-value">{stats.outOfStock}</div>
            <div className="stat-change negative">
              <span>↓</span> Requires attention
            </div>
          </div>
        </div>

        <div className="stat-card stat-card-success">
          <div className="stat-icon">
            <FiDollarSign />
          </div>
          <div className="stat-content">
            <div className="stat-label">Total Value</div>
            <div className="stat-value">${stats.totalValue.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}</div>
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
          <Link to="/products/add" className="action-card">
            <div className="action-icon">
              <FiPlus />
            </div>
            <div className="action-content">
              <h3>Add New Item</h3>
              <p>Add a new product to inventory</p>
            </div>
          </Link>

          <Link to="/products" className="action-card">
            <div className="action-icon">
              <FiList />
            </div>
            <div className="action-content">
              <h3>View Inventory</h3>
              <p>Browse all inventory items</p>
            </div>
          </Link>

          <Link to="/categories" className="action-card">
            <div className="action-icon">
              <FiList />
            </div>
            <div className="action-content">
              <h3>Categories</h3>
              <p>Browse through all categories</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Items */}
      <div className="recent-section">
        <div className="section-header">
          <h2 className="section-title">Recent Items</h2>
          <Link to="/products" className="view-all-link">
            View All <FiArrowRight />
          </Link>
        </div>

        {recentItems.length === 0 ? (
          <div className="empty-state">
            <p>No products found. Add your first product to get started!</p>
            <Link to="/products/add" className="btn btn-primary">
              Add Product
            </Link>
          </div>
        ) : (
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
                  <tr key={item._id}>
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
                      <span className={`badge ${getStockStatus(item.quantity, item.lowStockThreshold)}`}>
                        {getStockLabel(item.quantity, item.lowStockThreshold)}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons-inline">
                        <button 
                          className="btn-icon btn-icon-sm" 
                          title="Edit"
                          onClick={() => handleEdit(item._id)}
                        >
                          <FiEdit2 />
                        </button>
                        <button 
                          className="btn-icon btn-icon-sm" 
                          title="Delete"
                          onClick={() => handleDelete(item._id, item.name)}
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper functions
const getStockStatus = (quantity, lowStockThreshold = 10) => {
  if (quantity === 0) return 'badge-danger';
  if (quantity <= lowStockThreshold) return 'badge-warning';
  return 'badge-success';
};

const getStockLabel = (quantity, lowStockThreshold = 10) => {
  if (quantity === 0) return 'Out of Stock';
  if (quantity <= lowStockThreshold) return 'Low Stock';
  return 'In Stock';
};

export default Dashboard;