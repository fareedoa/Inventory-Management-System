import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts, deleteProduct } from '../services/productService';
import ProductTable from '../components/products/ProductTable';
import ProductList from '../components/products/ProductList';
import Loader from '../components/common/Loader';
import { FiPlus, FiGrid, FiList, FiSearch } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { MESSAGES } from '../utils/constants';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchQuery, products]);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data.products || data);
      setFilteredProducts(data.products || data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter(p => p._id !== id));
      toast.success(MESSAGES.PRODUCT_DELETED);
    } catch (error) {
      toast.error(error.response?.data?.message || MESSAGES.DELETE_FAILED);
    }
  };

  const filterProducts = () => {
    if (!searchQuery) {
      setFilteredProducts(products);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = products.filter(
      product =>
        product.name.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query) ||
        product.sku?.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  if (loading) {
    return <Loader message="Loading products..." />;
  }

  return (
    <div className="products-container">
      <div className="products-header">
        <div>
          <h1>Products</h1>
          <p>Manage your inventory items</p>
        </div>
        <Link to="/products/add" className="btn btn-primary">
          <FiPlus /> Add Product
        </Link>
      </div>

      <div className="products-toolbar">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
        </div>

        <div className="view-toggle">
          <button
            className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
            onClick={() => setViewMode('table')}
            title="Table View"
          >
            <FiList />
          </button>
          <button
            className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
            title="Grid View"
          >
            <FiGrid />
          </button>
        </div>
      </div>

      <div className="products-content">
        {filteredProducts.length === 0 ? (
          <div className="card text-center">
            <p>
              {searchQuery ? 'No products found matching your search.' : 'No products yet.'}
            </p>
            {!searchQuery && (
              <Link to="/products/add" className="btn btn-primary mt-2">
                <FiPlus /> Add Your First Product
              </Link>
            )}
          </div>
        ) : viewMode === 'table' ? (
          <ProductTable products={filteredProducts} onDelete={handleDelete} />
        ) : (
          <ProductList products={filteredProducts} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
};

export default Products;
