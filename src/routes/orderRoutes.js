import { Router } from "express";
import orderController from "../controllers/order.controller";
import { checkToken } from "../middleware";

const router = Router();

router.post("/orders", checkToken, orderController.makeOrder);
router.get("/orders", checkToken, orderController.getAllOrders);
router.put("/orders/cancel/:id", checkToken, orderController.cancelOrder);
router.get("/orders/:id", checkToken, orderController.getAnOrder);
router.delete("/orders/:id", checkToken, orderController.deleteOrder);
router.get("/orders/items/:id", checkToken, orderController.getAllOrderItems);
router.delete(
  "/orders/items/:id",
  checkToken,
  orderController.removeItemFromOrder
);

export default router;
