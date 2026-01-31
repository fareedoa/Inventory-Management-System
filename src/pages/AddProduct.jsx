import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../services/productService';
import ProductForm from '../components/products/ProductForm';
import { toast } from 'react-toastify';
import { MESSAGES } from '../utils/constants';
import './ProductFormPage.css';

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await createProduct(formData);
      toast.success(MESSAGES.PRODUCT_ADDED);
      navigate('/products');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-form-page">
      <div className="page-header">
        <h1>Add New Product</h1>
        <p>Fill in the details to add a new product to your inventory</p>
      </div>

      <div className="card">
        <ProductForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
};

export default AddProduct;
