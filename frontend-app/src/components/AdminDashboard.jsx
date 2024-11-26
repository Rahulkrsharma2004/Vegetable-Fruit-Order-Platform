import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://veg-order-platform.vercel.app/orders')
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the orders!', error);
      });

    axios.get('https://veg-order-platform.vercel.app/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, []);

  const handleStatusChange = (id, status) => {
    axios.put(`https://veg-order-platform.vercel.app/orders/status/${id}`, { status })
      .then(response => {
        setOrders(orders.map(order => order._id === id ? response.data : order));
      })
      .catch(error => {
        console.error('There was an error updating the order status!', error);
      });
  };

  return (
    <div className="admin-dashboard">
      <div className="order-management">
        <h2>Order Management</h2>
        {orders.map(order => (
          <div key={order._id} className="order-card">
            <h3>Order ID: {order._id}</h3>
            <p>Product: {order.product.name}</p>
            <p>Quantity: {order.quantity}</p>
            <p>Status: {order.status}</p>
            <p>Delivery Address: {order.deliveryAddress}</p>
            <select
              value={order.status}
              onChange={(e) => handleStatusChange(order._id, e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
      <div className="inventory-management">
        <h2>Inventory Management</h2>
        {products.map(product => (
          <div key={product._id} className="product-card">
            <h3>{product.name}</h3>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
