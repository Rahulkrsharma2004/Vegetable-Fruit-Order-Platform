const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  product: { type: String , required: true },
  quantity: { type: Number, required: true },
  buyerName: { type: String, required: true },
  contactInfo: { type: String, required: true },
  deliveryAddress: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'In Progress', 'Delivered'], default: 'Pending' },
},{
    versionKey:false,
});

module.exports = mongoose.model('Order', orderSchema);
