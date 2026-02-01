import React, { useState, useEffect } from 'react';
import { FiSave, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const CategoryForm = ({ initialData = {}, onSubmit, loading = false }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: initialData.name || '',
        description: initialData.description || '',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData && Object.keys(initialData).length > 0) {
            setFormData({
                name: initialData.name || '',
                description: initialData.description || '',
            });
        }
    }, [initialData]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Category name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Category name must be at least 2 characters';
        } else if (formData.name.trim().length > 50) {
            newErrors.name = 'Category name cannot exceed 50 characters';
        }

        if (formData.description && formData.description.length > 500) {
            newErrors.description = 'Description cannot exceed 500 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData);
        }
    };

    const handleCancel = () => {
        navigate('/categories');
    };

    return (
        <form onSubmit={handleSubmit} className="category-form">
            <div className="form-group">
                <label htmlFor="name" className="form-label">
                    Category Name <span className="required">*</span>
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className={`form-control ${errors.name ? 'error' : ''}`}
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter category name"
                    disabled={loading}
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
                    className={`form-control ${errors.description ? 'error' : ''}`}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter category description (optional)"
                    rows="4"
                    disabled={loading}
                />
                {errors.description && <span className="form-error">{errors.description}</span>}
                <small className="form-text">
                    {formData.description.length}/500 characters
                </small>
            </div>

            <div className="form-actions">
                <button
                    type="button"
                    className="btn btn-outline"
                    onClick={handleCancel}
                    disabled={loading}
                >
                    <FiX /> Cancel
                </button>
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                >
                    <FiSave /> {loading ? 'Saving...' : 'Save Category'}
                </button>
            </div>
        </form>
    );
};

export default CategoryForm;
