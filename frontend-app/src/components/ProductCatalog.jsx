import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProductCatalog() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://veg-order-platform.vercel.app/products/')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, []);

  const handleBuyNow = (productId) => {
    navigate(`/cart/${productId}`);
  };

  return (
    <div 
      className="mx-auto p-4 min-h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url(https://st2.depositphotos.com/1003368/6449/i/450/depositphotos_64492521-stock-photo-fruit-and-vegetable-borders-on.jpg)' }}
    >
      <h2 className="text-5xl font-bold text-center text-yellow-800 mb-8">Product Catalog</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {products.map(product => (
          <div key={product._id} className="product-card bg-white bg-opacity-50 shadow-lg rounded-lg p-6 transition transform hover:scale-105 hover:bg-green-100">
            <h3 className="text-2xl font-semibold mb-2 text-green-700">{product.name}</h3>
            <p className="text-xl font-bold text-green-800 mb-2">${product.price}</p>
            <p className={`text-xl mb-2 ${product.stock > 0 ? 'text-green-800' : 'text-red-600'}`}>
              {product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}
            </p>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <button
              onClick={() => handleBuyNow(product._id)}
              disabled={product.stock === 0}
              className={`px-4 py-2 rounded transition ${product.stock > 0 ? 'bg-green-500 text-white hover:bg-green-700' : 'bg-green-500 text-white cursor-not-allowed'}`}
            >
              Buy Now
            </button>
          </div>
        ))}
      </div> 
    </div>
  );
}

export default ProductCatalog;
