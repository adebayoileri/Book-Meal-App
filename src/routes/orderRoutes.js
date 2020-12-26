import { Router } from "express";
import orderController from "../controllers/order.controller";
import { checkToken } from "../middleware";

const router = Router();

router.post("/orders", checkToken, orderController.makeOrder);//done
router.get("/orders", checkToken, orderController.getAllOrders);//done
router.put("/orders/cancel/:id", checkToken, orderController.cancelOrder);//done
router.get("/orders/:id", checkToken, orderController.getAnOrder);//done
router.delete("/orders/:id", checkToken, orderController.deleteOrder);// not done
router.get("/orders/items/:id", checkToken, orderController.getAllOrderItems); //done
router.delete(
  "/orders/items/:id",
  checkToken,
  orderController.removeItemFromOrder
);

export default router;
