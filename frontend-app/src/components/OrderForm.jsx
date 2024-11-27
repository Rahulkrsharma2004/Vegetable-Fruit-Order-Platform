import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function OrderForm() {
  const [order, setOrder] = useState({
    product: '',
    quantity: '',
    buyerName: '',
    contactInfo: '',
    deliveryAddress: '',
  });

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://veg-order-platform.vercel.app/orders', order)
      .then(response => {
        toast.success('Order placed successfully!');
        // Add logic to redirect to home page if necessary
      })
      .catch(error => {
        toast.error('There was an error placing the order!');
        console.error('There was an error placing the order!', error);
      });
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <ToastContainer />
      <form className="order-form bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-center">Place Your Order</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="product">
            Product
          </label>
          <input
            type="text"
            name="product"
            id="product"
            placeholder="Product"
            value={order.product}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            placeholder="Quantity"
            value={order.quantity}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="buyerName">
            Your Name
          </label>
          <input
            type="text"
            name="buyerName"
            id="buyerName"
            placeholder="Your Name"
            value={order.buyerName}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactInfo">
            Contact Info
          </label>
          <input
            type="text"
            name="contactInfo"
            id="contactInfo"
            placeholder="Contact Info"
            value={order.contactInfo}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deliveryAddress">
            Delivery Address
          </label>
          <input
            type="text"
            name="deliveryAddress"
            id="deliveryAddress"
            placeholder="Delivery Address"
            value={order.deliveryAddress}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
}

export default OrderForm;
