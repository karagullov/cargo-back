const Client = require("../models/Client");
const Price = require("../models/Price");


class OrderController {
    async createOrder (req, res)  {
        // const { clientId } = req.user;
        const { issued, name, createdDate, paid, trackCode, clientId  } = req.body;
      
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
      console.log(111,client.name);
      
          // Создаем новый заказ
          const newOrder = {issued, name, createdDate, paid,trackCode,clientId,clientName:client.name };
      
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

       async deleteOrders(req, res)  {
        const { clientId } = req.params;
        try {
          // Находим клиента
          const client = await Client.findOne({ clientId });
      
          if (!client) {
            return res.status(404).send('Client not found');
          }
      
          // Удаляем заказ по коду
          client.orders = []
          client.paid = false
          client.amount = 0
          client.weight = 0
          client.price = 0
      
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
        const { issued, name, createdDate, paid,clientId ,clientName } = req.body;
      
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
          client.orders[orderIndex] = {trackCode, issued, name, createdDate, paid,clientId ,clientName};
      
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

        async getClient(req, res) {
        const { clientId } = req.user;
      
        try {
          const client = await Client.findOne({ clientId });
      
          if (!client) {
            return res.status(404).send('Client not found');
          }
      
          res.status(200).json(client);
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
          res.status(200).json(clients);
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

      async editClient(req,res){
        const { clientId ,price,weight,amount, paid,dateOfPayment,imports } = req.body;

          const client = await Client.findOne({ clientId });

          if (!client) {
            return res.status(404).send('Client not found');
          }


        //  const newOrders =   client.orders.map((order)=>{
        //     if(trackCodes.find(order.trackCode)){
        //       return {...order, }
        //     }
        //    })

        client.price = price
        client.weight = weight
        client.amount = amount
        client.imports = imports
        if(dateOfPayment){
  client.paid = !!paid
        client.dateOfPayment=dateOfPayment
        }
      
        client.save()
          res.status(200).json('Success');

      }




      async importFile(req, res){
         try {
        const { file } = req.body;
// const results = []; 
console.log(222,file);


        file.forEach(async(item) => {
           const { clientId, trackCodes, price, weight ,timestamp} = item;

           const client = await Client.findOne({ clientId });

           if(!client)return


        //  const newOrders =   client.orders.map((order)=>{
        //     if(trackCodes.find(order.trackCode)){
        //       return {...order, }
        //     }
        //    })
client.deliveredDate = Date.now()
        client.price = price
        client.weight = weight
        client.amount = trackCodes.length
        client.save()



        client.imports.push({amount:trackCodes.length, price,weight,clientId,timestamp,paid:false})


        });
       
          res.status(200).json('Success');
        } catch (err) {
          console.error(err);
          res.status(500).send('Server error');
        }
      }

    
}

module.exports = new OrderController();


