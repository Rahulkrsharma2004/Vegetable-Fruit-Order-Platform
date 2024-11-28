import React from 'react';
import OrderForm from '../components/OrderForm';
import OrderTracking from '../components/OrderTracking';

function OrderPage() {
  return (
    <div>
      <OrderForm />
      <OrderTracking />
    </div>
  );
}

export default OrderPage;
