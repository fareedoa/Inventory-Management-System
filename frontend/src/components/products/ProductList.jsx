import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products, onDelete }) => {
  if (!products || products.length === 0) {
    return (
      <div className="text-center p-4">
        <p>No products found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-3">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default ProductList;
