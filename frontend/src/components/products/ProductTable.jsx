import React from 'react';
import { FiEdit2, FiTrash2, FiEye } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { STOCK_THRESHOLDS } from '../../utils/constants';

const ProductTable = ({ products, onDelete }) => {
  const navigate = useNavigate();

  const getStockBadge = (quantity) => {
    if (quantity <= STOCK_THRESHOLDS.OUT_OF_STOCK) {
      return <span className="badge badge-danger">Out of Stock</span>;
    } else if (quantity <= STOCK_THRESHOLDS.LOW_STOCK) {
      return <span className="badge badge-warning">Low Stock</span>;
    }
    return <span className="badge badge-success">In Stock</span>;
  };

  const handleEdit = (id) => {
    navigate(`/products/edit/${id}`);
  };

  const handleDelete = (product) => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      onDelete(product._id);
    }
  };

  if (!products || !Array.isArray(products) || products.length === 0) {
    return (
      <div className="text-center p-4">
        <p>No products found.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>SKU</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                <div>
                  <div className="product-name">{product.name}</div>
                  {product.description && (
                    <div className="product-description">{product.description.substring(0, 50)}...</div>
                  )}
                </div>
              </td>
              <td>{product.sku || 'N/A'}</td>
              <td>${parseFloat(product.price).toFixed(2)}</td>
              <td>{product.quantity}</td>
              <td>{getStockBadge(product.quantity)}</td>
              <td>
                <div className="d-flex gap-1">
                  <button
                    className="btn btn-sm btn-outline"
                    onClick={() => handleEdit(product._id)}
                    title="Edit"
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(product)}
                    title="Delete"
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
  );
};

export default ProductTable;
