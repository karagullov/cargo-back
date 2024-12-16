const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  issued: { type: Boolean, required: true },
  // price: { type: Number, required: true },
  // weight: { type: Number, required: true },
  name: { type: String, required: true },
  createdDate: { type: Number, required: true },
  paid: { type: Boolean, required: true },
  // amount: { type: Number, required: true },
  // dateOfPayment: { type: Number, required: true },
  // deliveredDate: { type: Number, required: true },
  // deliverTo: { type: String, required: true },
  // receiventInChina:{ type: Number, required: true },
  trackCode:{ type: String, required: true }, 
  clientId:{ type: String, required: true }, 
  clientName:{type: String, required: true}
});

module.exports = orderSchema; // Мы экспортируем только схему, а не модель
