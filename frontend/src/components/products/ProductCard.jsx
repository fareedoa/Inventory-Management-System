import React from 'react';
import { FiEdit2, FiTrash2, FiPackage } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { STOCK_THRESHOLDS } from '../../utils/constants';
import './ProductCard.css';

const ProductCard = ({ product, onDelete }) => {
  const navigate = useNavigate();

  const getStockBadge = (quantity) => {
    if (quantity <= STOCK_THRESHOLDS.OUT_OF_STOCK) {
      return <span className="badge badge-danger">Out of Stock</span>;
    } else if (quantity <= STOCK_THRESHOLDS.LOW_STOCK) {
      return <span className="badge badge-warning">Low Stock</span>;
    }
    return <span className="badge badge-success">In Stock</span>;
  };

  const handleEdit = () => {
    navigate(`/products/edit/${product._id}`);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      onDelete(product._id);
    }
  };

  return (
    <div className="product-card">
      <div className="product-card-header">
        <div className="product-icon">
          <FiPackage />
        </div>
        {getStockBadge(product.quantity)}
      </div>
      
      <div className="product-card-body">
        <h3 className="product-card-title">{product.name}</h3>
        {product.description && (
          <p className="product-card-description">{product.description}</p>
        )}
        
        <div className="product-card-details">
          <div className="detail-item">
            <span className="detail-label">Price:</span>
            <span className="detail-value">${parseFloat(product.price).toFixed(2)}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Quantity:</span>
            <span className="detail-value">{product.quantity}</span>
          </div>
          {product.sku && (
            <div className="detail-item">
              <span className="detail-label">SKU:</span>
              <span className="detail-value">{product.sku}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="product-card-footer">
        <button className="btn btn-sm btn-outline" onClick={handleEdit}>
          <FiEdit2 /> Edit
        </button>
        <button className="btn btn-sm btn-danger" onClick={handleDelete}>
          <FiTrash2 /> Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
