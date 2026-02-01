import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCategory } from '../services/categoryService';
import CategoryForm from '../components/categories/CategoryForm';
import { toast } from 'react-toastify';
import './ProductFormPage.css';

const AddCategory = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (formData) => {
        setLoading(true);
        try {
            await createCategory(formData);
            toast.success('Category created successfully');
            navigate('/categories');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create category');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="product-form-page">
            <div className="page-header">
                <h1>Add New Category</h1>
                <p>Create a new category for your products</p>
            </div>

            <div className="card">
                <CategoryForm onSubmit={handleSubmit} loading={loading} />
            </div>
        </div>
    );
};

export default AddCategory;
