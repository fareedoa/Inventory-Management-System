import React, { useState, useEffect } from 'react';
import { validateProductForm, hasErrors } from '../../utils/validators';

const ProductForm = ({ onSubmit, loading, initialData = {} }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    sku: '',
    category: '',
    ...initialData,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData(initialData);
    }
  }, [initialData]);

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
    const validationErrors = validateProductForm(formData);
    
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <div className="form-group">
        <label htmlFor="name" className="form-label">
          Product Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`form-control ${errors.name ? 'error' : ''}`}
          placeholder="Enter product name"
        />
        {errors.name && <span className="form-error">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter product description"
          rows="4"
        />
      </div>

      <div className="grid grid-2">
        <div className="form-group">
          <label htmlFor="price" className="form-label">
            Price ($) *
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className={`form-control ${errors.price ? 'error' : ''}`}
            placeholder="0.00"
            step="0.01"
            min="0"
          />
          {errors.price && <span className="form-error">{errors.price}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="quantity" className="form-label">
            Quantity *
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className={`form-control ${errors.quantity ? 'error' : ''}`}
            placeholder="0"
            min="0"
          />
          {errors.quantity && <span className="form-error">{errors.quantity}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="sku" className="form-label">
          SKU (Stock Keeping Unit)
        </label>
        <input
          type="text"
          id="sku"
          name="sku"
          value={formData.sku}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter SKU"
        />
      </div>

      <div className="form-group">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter category"
        />
      </div>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : 'Save Product'}
        </button>
        <button type="button" className="btn btn-outline" onClick={() => window.history.back()}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
