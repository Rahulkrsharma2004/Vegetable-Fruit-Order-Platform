const Order = require('../models/order');


const Product = require('../models/product');
exports.placeOrder = async (req, res) => {
  const { productId, quantity, buyerName, contactInfo, deliveryAddress } = req.body;

  try {
    // Fetch the product details to check the available stock
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the product has enough stock
    if (product.stock < quantity) {
      return res.status(400).json({ message: `Only ${product.stock} items available` });
    }

    // Deduct the ordered quantity from the product stock
    product.stock -= quantity;

    // Save the updated product stock
    await product.save();

    // Create a new order with the provided details
    const order = new Order({
      product: productId,
      quantity,
      buyerName,
      contactInfo,
      deliveryAddress
    });

    // Save the new order
    const savedOrder = await order.save();

    res.status(201).json({ message: 'Order placed successfully', order: savedOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};










// exports.placeOrder = async (req, res) => {
//   const order = new Order(req.body);
//   try {
//     const savedOrder = await order.save();
//     res.status(201).json(savedOrder);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };


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
