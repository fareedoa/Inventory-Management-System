import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllCategories, deleteCategory, toggleCategoryStatus } from '../services/categoryService';
import Loader from '../components/common/Loader';
import { FiPlus, FiEdit2, FiTrash2, FiToggleLeft, FiToggleRight } from 'react-icons/fi';
import { toast } from 'react-toastify';
import './Categories.css';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [includeInactive, setIncludeInactive] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
    }, [includeInactive]);

    const fetchCategories = async () => {
        try {
            const response = await getAllCategories(includeInactive);
            setCategories(response.data || []);
        } catch (error) {
            console.error('Error fetching categories:', error);
            toast.error('Failed to fetch categories');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, name) => {
        if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
            try {
                await deleteCategory(id);
                setCategories(categories.filter(cat => cat._id !== id));
                toast.success('Category deleted successfully');
            } catch (error) {
                toast.error(error.response?.data?.message || 'Failed to delete category');
            }
        }
    };

    const handleToggleStatus = async (id) => {
        try {
            const response = await toggleCategoryStatus(id);
            setCategories(categories.map(cat =>
                cat._id === id ? response.data : cat
            ));
            toast.success(response.message);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to toggle category status');
        }
    };

    const handleEdit = (id) => {
        navigate(`/categories/edit/${id}`);
    };

    if (loading) {
        return <Loader message="Loading categories..." />;
    }

    return (
        <div className="categories-container">
            <div className="categories-header">
                <div>
                    <h1>Categories</h1>
                    <p>Manage your product categories</p>
                </div>
                <Link to="/categories/add" className="btn btn-primary">
                    <FiPlus /> Add Category
                </Link>
            </div>

            <div className="categories-toolbar">
                <div className="filter-toggle">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={includeInactive}
                            onChange={(e) => setIncludeInactive(e.target.checked)}
                        />
                        <span>Show inactive categories</span>
                    </label>
                </div>
            </div>

            <div className="categories-content">
                {categories.length === 0 ? (
                    <div className="card text-center">
                        <p>No categories yet.</p>
                        <Link to="/categories/add" className="btn btn-primary mt-2">
                            <FiPlus /> Add Your First Category
                        </Link>
                    </div>
                ) : (
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Products</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category) => (
                                    <tr key={category._id}>
                                        <td>
                                            <div className="category-name">{category.name}</div>
                                        </td>
                                        <td>
                                            <div className="category-description">
                                                {category.description || 'No description'}
                                            </div>
                                        </td>
                                        <td>
                                            <span className="product-count-badge">
                                                {category.productCount || 0}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`badge ${category.isActive ? 'badge-success' : 'badge-danger'}`}>
                                                {category.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="d-flex gap-1">
                                                <button
                                                    className="btn btn-sm btn-outline"
                                                    onClick={() => handleEdit(category._id)}
                                                    title="Edit"
                                                >
                                                    <FiEdit2 />
                                                </button>
                                                <button
                                                    className={`btn btn-sm ${category.isActive ? 'btn-warning' : 'btn-secondary'}`}
                                                    onClick={() => handleToggleStatus(category._id)}
                                                    title={category.isActive ? 'Deactivate' : 'Activate'}
                                                >
                                                    {category.isActive ? <FiToggleRight /> : <FiToggleLeft />}
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => handleDelete(category._id, category.name)}
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
                )}
            </div>
        </div>
    );
};

export default Categories;
