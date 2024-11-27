import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://veg-order-platform.vercel.app/orders')
      .then(response => {
        setOrders(response.data);
        // toast.success('Orders fetched successfully!');
      })
      .catch(error => {
        console.error('There was an error fetching the orders!', error);
        // toast.error('Failed to fetch orders!');
      });

    axios.get('https://veg-order-platform.vercel.app/products')
      .then(response => {
        setProducts(response.data);
        // toast.success('Products fetched successfully!');
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
        // toast.error('Failed to fetch products!');
      });
  }, []);

  const handleStatusChange = (id, status) => {
    axios.put(`https://veg-order-platform.vercel.app/orders/status/${id}`, { status })
      .then(response => {
        setOrders(orders.map(order => order._id === id ? response.data : order));
        toast.success('Order status updated successfully!');
      })
      .catch(error => {
        console.error('There was an error updating the order status!', error);
        toast.error('Failed to update order status!');
      });
  };

  return (
    <div className="admin-dashboard p-6 bg-gray-100 min-h-screen">
      <ToastContainer />
      <div className="order-management mb-8">
        <h2 className="text-2xl font-bold mb-4">Order Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map(order => (
            <div key={order._id} className="order-card bg-white p-4 rounded shadow-md">
              <h3 className="font-semibold text-lg mb-2">Order ID: {order._id}</h3>
              <p className="mb-1"><span className="font-semibold">Product:</span> {order.product.name}</p>
              <p className="mb-1"><span className="font-semibold">Quantity:</span> {order.quantity}</p>
              <p className="mb-1"><span className="font-semibold">Status:</span> {order.status}</p>
              <p className="mb-1"><span className="font-semibold">Delivery Address:</span> {order.deliveryAddress}</p>
              <select
                className="mt-2 p-2 border rounded w-full"
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
      </div>
      <div className="inventory-management">
        <h2 className="text-2xl font-bold mb-4">Inventory Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product._id} className="product-card bg-white p-4 rounded shadow-md">
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <p className="text-gray-700">${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
