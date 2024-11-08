const Router = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const orderController = require("../controllers/order.controller");

const router = new Router();

// 2. Добавить заказ
router.post("/create", authMiddleware, orderController.createOrder);
// 3. Удалить заказ
router.delete("/delete/:trackCode", authMiddleware, orderController.deleteOrder);
// 4. Изменить заказ
router.put("/edit/:trackCode", authMiddleware, orderController.editOrder);
// 5. Поиск заказа по коду
router.get("/search/:trackCode", authMiddleware, orderController.searchOrders);
// 6. История заказов клиента
router.get("/history", authMiddleware, orderController.ordersHistory);

module.exports = router;
