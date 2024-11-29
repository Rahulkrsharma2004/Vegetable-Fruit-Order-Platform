import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function OrderTracking() {
  const [orders, setOrders] = useState([]);
  console.log(orders)
  useEffect(() => {
    axios.get('https://veg-order-platform.vercel.app/orders/')
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the orders!', error);
        toast.error('Failed to fetch orders!');
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4">
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-6 text-center text-green-700">Order Tracking</h2>
      <div className="mb-5 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {orders.map(order => (
          <div key={order._id} className="order-card bg-white shadow-lg rounded-lg p-6 border border-green-300 hover:shadow-xl transition-all duration-300">
            <div className="mb-4">
              {/* <img 
                src={order.product.imageUrl || 'https://via.placeholder.com/150'} 
                alt={order.product.name} 
                className="w-full h-48 object-cover rounded-lg"
              /> */}
            </div>
            <h3 className="text-xl font-bold mb-2 text-green-600">Order ID: {order._id}</h3>
            {/* <p className="text-gray-700 mb-1"><strong>Product:</strong> {order}</p> */}
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
