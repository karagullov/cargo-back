const Router = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const orderController = require("../controllers/order.controller");

const router = new Router();

// 2. Добавить зака
router.post("/create", orderController.createOrder);
// 3. Удалить заказ
router.delete("/delete/:trackCode/:clientId", orderController.deleteOrder);
// 4. Изменить заказ
router.put("/edit/:trackCode", orderController.editOrder);
// 5. Поиск заказа по коду
router.get("/search/:trackCode", authMiddleware, orderController.searchOrders);
// 6. История заказов клиента
router.get("/history", authMiddleware, orderController.ordersHistory);
router.get("/allOrders", orderController.getAllOrders);
router.get("/allClients", orderController.getAllClients);
router.put("/set-price", orderController.setPrice);
router.get("/get-price", orderController.getPrice);
router.put("/import", orderController.importFile);
router.put("/edit-client", orderController.editClient);


module.exports = router;


