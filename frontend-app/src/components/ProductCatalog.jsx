import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProductCatalog() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://veg-order-platform.vercel.app/products/')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, []);

  return (
    <div className="product-catalogue">
      {products.map(product => (
        <div key={product._id} className="product-card">
          <h3>{product.name}</h3>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductCatalog;
