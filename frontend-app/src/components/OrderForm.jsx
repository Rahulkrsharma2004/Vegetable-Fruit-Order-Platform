import React, { useState } from 'react';
import axios from 'axios';

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
    axios.post('/api/orders', order)
      .then(response => {
        console.log('Order placed!', response.data);
      })
      .catch(error => {
        console.error('There was an error placing the order!', error);
      });
  };

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="product"
        placeholder="Product"
        value={order.product}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={order.quantity}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="buyerName"
        placeholder="Your Name"
        value={order.buyerName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="contactInfo"
        placeholder="Contact Info"
        value={order.contactInfo}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="deliveryAddress"
        placeholder="Delivery Address"
        value={order.deliveryAddress}
        onChange={handleChange}
        required
      />
      <button type="submit">Place Order</button>
    </form>
  );
}

export default OrderForm;
