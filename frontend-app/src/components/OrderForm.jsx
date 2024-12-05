import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';

function OrderForm() {
  const { productId } = useParams();
  const [order, setOrder] = useState({
    product: '',
    quantity: '',
    buyerName: '',
    contactInfo: '',
    deliveryAddress: '',
  });
  const [product, setProduct] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`https://veg-order-platform.vercel.app/products/${productId}`)
      .then(response => {
        setProduct(response.data);
        setOrder(prevOrder => ({
          ...prevOrder,
          product: response.data.name
        }));
      })
      .catch(error => {
        console.error('There was an error fetching the product!', error);
      });
  }, [productId]);

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (product && order.quantity > product.stock) {
      toast.error(`Only ${product.stock} items available`);
      return;
    }

    axios.post('https://veg-order-platform.vercel.app/orders/post', {
      ...order,
      productId
    })
      .then(response => {
        setProduct(prevProduct => ({
          ...prevProduct,
          stock: prevProduct.stock - order.quantity
        }));
        console.log(response)
        if(response.data.message === 'Order placed successfully'){
          // toast.success('Order placed successfully!');
          alert('Order placed successfully!');
          navigate("/")
        }
      })
      .catch(error => {
        toast.error('There was an error placing the order!');
        console.error('There was an error placing the order!', error);
      });
  };

  return (
    <div className="bg-gradient-to-r from-green-400 via-yellow-300 to-red-400 flex items-center justify-center py-1">
      <ToastContainer />
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-1 md:p-5">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">Place Your Order</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="mb-1">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="product">
              Product (e.g., Apple, Carrot, Banana)
            </label>
            <input
              type="text"
              name="product"
              id="product"
              placeholder="Enter product"
              value={order.product}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              readOnly
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
              placeholder="Enter quantity"
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
              placeholder="Enter your name"
              value={order.buyerName}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactInfo">
              Contact Info (Phone/Email)
            </label>
            <input
              type="text"
              name="contactInfo"
              id="contactInfo"
              placeholder="Enter contact info"
              value={order.contactInfo}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deliveryAddress">
              Delivery Address
            </label>
            <input
              type="text"
              name="deliveryAddress"
              id="deliveryAddress"
              placeholder="Enter delivery address"
              value={order.deliveryAddress}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline w-full"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OrderForm;

