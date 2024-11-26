import React from 'react';
import OrderForm from '../components/OrderForm';
import OrderTracking from '../components/OrderTracking';

function OrderPage() {
  return (
    <div className="order-page">
      <h1>Place Order</h1>
      <OrderForm />
      <h1>Track Your Order</h1>
      <OrderTracking />
    </div>
  );
}

export default OrderPage;
