import { Router } from "express";
import menuController from "../controllers/menu.controller";
import { checkToken, checkCaterer } from "../middleware";

const router = Router();

router.get("/menu", menuController.getMenu);

router.post("/menu", checkToken, checkCaterer, menuController.addMealToMenu);

router.delete(
  "/menu/meals/:id",
  checkToken,
  checkCaterer,
  menuController.removeMealFromMenu
);

export default router;
