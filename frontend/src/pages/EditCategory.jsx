import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCategoryById, updateCategory } from '../services/categoryService';
import CategoryForm from '../components/categories/CategoryForm';
import Loader from '../components/common/Loader';
import { toast } from 'react-toastify';
import './ProductFormPage.css';

const EditCategory = () => {
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [category, setCategory] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetchCategory();
    }, [id]);

    const fetchCategory = async () => {
        try {
            const response = await getCategoryById(id);
            setCategory(response.data);
        } catch (error) {
            toast.error('Failed to fetch category');
            navigate('/categories');
        } finally {
            setFetchLoading(false);
        }
    };

    const handleSubmit = async (formData) => {
        setLoading(true);
        try {
            await updateCategory(id, formData);
            toast.success('Category updated successfully');
            navigate('/categories');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update category');
        } finally {
            setLoading(false);
        }
    };

    if (fetchLoading) {
        return <Loader message="Loading category..." />;
    }

    return (
        <div className="product-form-page">
            <div className="page-header">
                <h1>Edit Category</h1>
                <p>Update category information</p>
            </div>

            <div className="card">
                <CategoryForm
                    initialData={category}
                    onSubmit={handleSubmit}
                    loading={loading}
                />
            </div>
        </div>
    );
};

export default EditCategory;
