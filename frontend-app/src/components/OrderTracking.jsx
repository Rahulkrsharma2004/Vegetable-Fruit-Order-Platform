import React, { useState, useEffect } from 'react';
import axios from 'axios';

function OrderTracking() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('https://veg-order-platform.vercel.app/orders/')
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the orders!', error);
      });
  }, []);

  return (
    <div className="order-tracking">
      {orders.map(order => (
        <div key={order._id} className="order-card">
          <h3>Order ID: {order._id}</h3>
          <p>Product: {order.product.name}</p>
          <p>Quantity: {order.quantity}</p>
          <p>Status: {order.status}</p>
          <p>Delivery Address: {order.deliveryAddress}</p>
        </div>
      ))}
    </div>
  );
}

export default OrderTracking;
