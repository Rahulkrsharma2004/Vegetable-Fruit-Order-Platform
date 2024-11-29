const Order = require('../models/order');
const Product = require('../models/product');

exports.placeOrder = async (req, res) => {
  const { productId, quantity, buyerName, contactInfo, deliveryAddress } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    if (product.stock < quantity) {
      return res.status(400).json({ message: `Only ${product.stock} items available` });
    }
    product.stock -= quantity;
    await product.save();
    const order = new Order({
      product: productId,
      quantity,
      buyerName,
      contactInfo,
      deliveryAddress
    });
    const savedOrder = await order.save();
    res.status(201).json({ message: 'Order placed successfully', order: savedOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updateOrderStatus = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
