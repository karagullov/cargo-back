const mongoose = require('mongoose');
const orderSchema = require('./Order'); // Импортируем схему заказа

// Схема для клиента
const clientSchema = new mongoose.Schema({
  clientId: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  city: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: false },
  weight: { type: Number, required: false },
  amount: { type: Number, required: false },
  paid: { type: Boolean, required: false },
  dateOfPayment: { type: Number, required: false },
  deliveredDate: { type: Number, required: false },
  // deliverTo: { type: String, required: true },
  receiventInChina:{ type: Number, required: false },
  // trackCodes: {type: Array, required: false},
  orders: [orderSchema], // Здесь мы используем схему заказа как поддокумент
});

const Client = mongoose.model('Client', clientSchema); // Модель для клиента
module.exports = Client;
