const Client = require("../models/Client");
const Price = require("../models/Price");


class OrderController {
    async createOrder (req, res)  {
        // const { clientId } = req.user;
        const { issued, price, name, createdDate, paid, weight, amount, dateOfPayment, deliveredDate,deliverTo,receiventInChina, trackCode, clientId  } = req.body;
      
        try {
          // Находим клиента по clientId
          let client = await Client.findOne({ clientId });
      
          if (!client) {
            // Если клиента нет, возвращаем ошибку
            return res.status(404).send('Client not found');
          }
        const orderExist=client.orders.find((item)=>item.trackCode===trackCode)
      if(orderExist){
        return res.status(404).send(`Order with trackCode ${trackCode} already exists`);
      }
      
          // Создаем новый заказ
          const newOrder = {issued, price, name, createdDate, paid, weight, amount, dateOfPayment, deliveredDate,deliverTo,receiventInChina,trackCode,clientId };
      
          // Добавляем заказ в массив заказов клиента
          client.orders.push(newOrder);
      
          // Сохраняем обновленного клиента
          await client.save();
      
          res.status(201).json(client);
        } catch (err) {
          console.error(err);
          res.status(500).send('Server error');
        }
      }

      async deleteOrder(req, res)  {
        // const { clientId } = req.user;
        const { trackCode, clientId } = req.params;
        try {
          // Находим клиента
          const client = await Client.findOne({ clientId });
      
          if (!client) {
            return res.status(404).send('Client not found');
          }
      
          // Удаляем заказ по коду
          client.orders = client.orders.filter(order => order.trackCode !== trackCode);
      
          await client.save();
          res.status(200).json(client);
        } catch (err) {
          console.error(err);
          res.status(500).send('Server error');
        }
      }

      async editOrder(req, res) {
        // const { clientId } = req.user;
        const { trackCode } = req.params;
        const { issued, price, name, createdDate, paid, weight, amount, dateOfPayment, deliveredDate,deliverTo,receiventInChina,clientId  } = req.body;
      
        try {
          const client = await Client.findOne({ clientId });
      
          if (!client) {
            return res.status(404).send('Client not found');
          }
      
          // Ищем заказ по коду
          const orderIndex = client.orders.findIndex(order => order.trackCode === trackCode);
      
          if (orderIndex === -1) {
            return res.status(404).send('Order not found');
          }
      
          // Обновляем данные заказа
          client.orders[orderIndex] = {trackCode, issued, price, name, createdDate, paid, weight, amount, dateOfPayment, deliveredDate,deliverTo,receiventInChina,clientId };
      
          await client.save();
          res.status(200).json(client);
        } catch (err) {
          console.error(err);
          res.status(500).send('Server error');
        }
      }

      async searchOrders(req, res) {
        const { clientId } = req.user;
        const { trackCode } = req.params;
      
        try {
          const client = await Client.findOne({ clientId });
      
          if (!client) {
            return res.status(404).send('Client not found');
          }
      
          const order = client.orders.find(order => order.trackCode === trackCode);
      
          if (!order) {
            return res.status(404).send('Order not found');
          }
      
          res.status(200).json(order);
        } catch (err) {
          console.error(err);
          res.status(500).send('Server error');
        }
      }

      async ordersHistory(req, res) {
        const { clientId } = req.user;
      
        try {
          const client = await Client.findOne({ clientId });
      
          if (!client) {
            return res.status(404).send('Client not found');
          }
      
          res.status(200).json(client.orders);
        } catch (err) {
          console.error(err);
          res.status(500).send('Server error');
        }
      }

      async getAllOrders(req, res) {
        try {
          // Fetch all clients from the database
          const clients = await Client.find();
    // console.log(111,clients);
    
          // Extract all orders from each client and flatten the array
          const allOrders = clients.flatMap(client => client.orders);
    
          // Return the combined orders
          res.status(200).json(allOrders);
        } catch (err) {
          console.error(err);
          res.status(500).send('Server error');
        }
      }

      async getAllClients(req, res) {
        try {
          // Fetch all clients from the database
          const clients = await Client.find();
          // Return the combined orders
          res.status(200).json(clients);
        } catch (err) {
          console.error(err);
          res.status(500).send('Server error');
        }
      }

      async setPrice(req, res) {
        try {
        const { price } = req.body;
          // Fetch all clients from the database
          let oldPrice = await Price.findOne(); 
          console.log(111,oldPrice);

          if (!oldPrice) {
      // Если запись отсутствует, создаём новую
      oldPrice = new Price({ price });
    } else {
      // Обновляем существующую запись
      oldPrice.price = price;
    }
          
         // Сохраняем изменения
    await oldPrice.save();
          // Return the combined orders
          res.status(200).json(oldPrice);
        } catch (err) {
          console.error(err);
          res.status(500).send('Server error');
        }
      }

      async getPrice(req, res) {
        try {
        const { price } = req.body;
          // Fetch all clients from the database
          let oldPrice = await Price.findOne(); 

          // Return the combined orders
          res.status(200).json(oldPrice);
        } catch (err) {
          console.error(err);
          res.status(500).send('Server error');
        }
      }

    
}

module.exports = new OrderController();


