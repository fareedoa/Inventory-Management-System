import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById, updateProduct } from '../services/productService';
import ProductForm from '../components/products/ProductForm';
import Loader from '../components/common/Loader';
import { toast } from 'react-toastify';
import { MESSAGES } from '../utils/constants';
import './ProductFormPage.css';

const EditProduct = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const data = await getProductById(id);
      setProduct(data.product || data);
    } catch (error) {
      toast.error(MESSAGES.PRODUCT_NOT_FOUND);
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    try {
      await updateProduct(id, formData);
      toast.success(MESSAGES.PRODUCT_UPDATED);
      navigate('/products');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update product');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Loader message="Loading product..." />;
  }

  if (!product) {
    return (
      <div className="text-center">
        <p>Product not found</p>
      </div>
    );
  }

  return (
    <div className="product-form-page">
      <div className="page-header">
        <h1>Edit Product</h1>
        <p>Update the product details below</p>
      </div>

      <div className="card">
        <ProductForm onSubmit={handleSubmit} loading={submitting} initialData={product} />
      </div>
    </div>
  );
};

export default EditProduct;
