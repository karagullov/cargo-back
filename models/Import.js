const mongoose = require('mongoose');

const importSchema = new mongoose.Schema({
  timestamp:{type: Number, required: true},
  paid: { type: Boolean, required: true },
  price:{ type: Number, required: true },
  weight:{ type: Number, required: true },
  clientId: { type: String, required: true },
  amount:{ type: Number, required: true },
});

module.exports = importSchema; // Мы экспортируем только схему, а не модель
