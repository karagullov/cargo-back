const Router = require("express");
const Client = require("../models/Client");
const config = require("config");

const router = new Router();

// router.post(
//   "/create-client",
//   async (req, res) => {
//     const { clientId, phone, city } = req.body;

//   try {
//     // Проверяем, существует ли уже клиент с таким clientId
//     const existingClient = await Client.findOne({ clientId });
//     if (existingClient) {
//       return res.status(400).send('Client already exists');
//     }

//     // Создаем нового клиента с пустым массивом заказов
//     const newClient = new Client({
//       clientId,
//       phone,
//       city,
//       orders: []
//     });

//     // Сохраняем клиента в базе данных
//     await newClient.save();

//     res.status(201).json(newClient); // Отправляем ответ с созданным клиентом
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
//   }
// );

module.exports = router;
