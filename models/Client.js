const mongoose = require('mongoose');
const orderSchema = require('./Order'); // Импортируем схему заказа

// Схема для клиента
const clientSchema = new mongoose.Schema({
  clientId: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  orders: [orderSchema], // Здесь мы используем схему заказа как поддокумент
});

const Client = mongoose.model('Client', clientSchema); // Модель для клиента
module.exports = Client;
