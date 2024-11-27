import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function OrderTracking() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('https://veg-order-platform.vercel.app/orders/')
      .then(response => {
        setOrders(response.data);
        // toast.success('Orders fetched successfully!');
      })
      .catch(error => {
        console.error('There was an error fetching the orders!', error);
        toast.error('Failed to fetch orders!');
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto mt-10">
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-6 text-center">Order Tracking</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {orders.map(order => (
          <div key={order._id} className="order-card bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-bold mb-2">Order ID: {order._id}</h3>
            <p className="text-gray-700 mb-1"><strong>Product:</strong> {order.product.name}</p>
            <p className="text-gray-700 mb-1"><strong>Quantity:</strong> {order.quantity}</p>
            <p className="text-gray-700 mb-1"><strong>Status:</strong> {order.status}</p>
            <p className="text-gray-700"><strong>Delivery Address:</strong> {order.deliveryAddress}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderTracking;
